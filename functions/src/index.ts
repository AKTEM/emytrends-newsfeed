import { onRequest, Request } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import type { Response } from "express";
import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getAppCheck } from "firebase-admin/app-check";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

if (!getApps().length) initializeApp();

const PAYPAL_CLIENT_ID = defineSecret("PAYPAL_CLIENT_ID");
const PAYPAL_SECRET    = defineSecret("PAYPAL_SECRET");
const PAYPAL_ENV       = defineSecret("PAYPAL_ENV");

// Allow-list. Add your prod domain(s) here.
const ALLOWED_ORIGINS = new Set<string>([
  "http://localhost:8080",
  "http://localhost:5173",
  "https://id-preview--9054b9f1-2a8b-4189-90a3-72b18df877d0.lovable.app",
]);
// Also allow *.lovable.app and *.lovableproject.com preview/hosting subdomains.
function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  try {
    const host = new URL(origin).hostname;
    return host.endsWith(".lovable.app") || host.endsWith(".lovableproject.com");
  } catch {
    return false;
  }
}

function applyCors(req: Request, res: Response): boolean {
  const origin = req.headers.origin as string | undefined;
  if (isAllowedOrigin(origin)) {
    res.set("Access-Control-Allow-Origin", origin as string);
    res.set("Vary", "Origin");
  }
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set(
    "Access-Control-Allow-Headers",
    (req.headers["access-control-request-headers"] as string) ||
      "Content-Type, Authorization, X-Firebase-AppCheck"
  );
  res.set("Access-Control-Max-Age", "3600");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return true;
  }
  return false;
}

async function verifyCaller(req: Request): Promise<{ uid: string; email?: string }> {
  // App Check: soft-verify. If the header is present, it must be valid.
  // Once console-side enforcement is on, unverified callers are rejected upstream.
  const appCheckToken = req.header("X-Firebase-AppCheck");
  if (appCheckToken) {
    try {
      await getAppCheck().verifyToken(appCheckToken);
    } catch {
      throw new Error("Invalid App Check token");
    }
  }

  const authHeader = req.header("Authorization") || "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new Error("Missing Authorization bearer token");
  const decoded = await getAuth().verifyIdToken(match[1]);
  return { uid: decoded.uid, email: decoded.email };
}

function paypalBase(env: string) {
  return env === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

async function getAccessToken(clientId: string, secret: string, env: string) {
  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const res = await fetch(`${paypalBase(env)}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error(`PayPal token failed: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

// ---------- Server-authoritative pricing ----------
interface ClientCartItem {
  productId: string;
  quantity: number;
  variantId?: string | number;
  color?: string;
  length?: string;
}

interface PricedItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  length?: string;
}

async function priceCart(items: ClientCartItem[]): Promise<{
  priced: PricedItem[];
  subtotal: number;
}> {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Empty cart");
  }
  const db = getFirestore();
  const priced: PricedItem[] = [];
  let subtotal = 0;

  for (const raw of items) {
    const qty = Math.max(1, Math.floor(Number(raw.quantity) || 0));
    if (!raw.productId || qty <= 0) throw new Error("Invalid cart item");

    const snap = await db.collection("products").doc(String(raw.productId)).get();
    if (!snap.exists) throw new Error(`Product not found: ${raw.productId}`);
    const p = snap.data() as {
      title: string;
      price: number;
      images?: string[];
      inStock?: boolean;
      lengthOptions?: Array<{ id: string | number; label: string; price?: number }>;
    };

    if (p.inStock === false) throw new Error(`Out of stock: ${p.title}`);

    // Use variant price if the client selected a length variant with its own price.
    let unitPrice = Number(p.price) || 0;
    if (raw.variantId != null && Array.isArray(p.lengthOptions)) {
      const v = p.lengthOptions.find((o) => String(o.id) === String(raw.variantId));
      if (v && typeof v.price === "number") unitPrice = v.price;
    }
    if (!(unitPrice > 0)) throw new Error(`Invalid price for ${p.title}`);

    const lineTotal = Math.round(unitPrice * qty * 100) / 100;
    subtotal = Math.round((subtotal + lineTotal) * 100) / 100;

    priced.push({
      productId: String(raw.productId),
      title: p.title,
      price: unitPrice,
      quantity: qty,
      image: p.images?.[0] ?? "",
      color: raw.color,
      length: raw.length,
    });
  }

  return { priced, subtotal };
}

// ============================================================
// createPayPalOrder — auth-gated, server-priced
// ============================================================
export const createPayPalOrder = onRequest(
  { secrets: [PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_ENV], cors: false, invoker: "public" },
  async (req, res) => {
    if (applyCors(req, res)) return;
    try {
      if (req.method !== "POST") { res.status(405).json({ error: "Method Not Allowed" }); return; }

      let caller: { uid: string; email?: string };
      try {
        caller = await verifyCaller(req);
      } catch (e: any) {
        res.status(401).json({ error: e?.message ?? "Unauthorized" });
        return;
      }

      const { items, currency = "USD" } = (req.body ?? {}) as {
        items?: ClientCartItem[];
        currency?: string;
      };

      let priced;
      try {
        priced = await priceCart(items ?? []);
      } catch (e: any) {
        res.status(400).json({ error: e?.message ?? "Invalid cart" });
        return;
      }

      const env = PAYPAL_ENV.value() || "sandbox";
      const token = await getAccessToken(PAYPAL_CLIENT_ID.value(), PAYPAL_SECRET.value(), env);

      const r = await fetch(`${paypalBase(env)}/v2/checkout/orders`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: { currency_code: currency, value: priced.subtotal.toFixed(2) },
              custom_id: caller.uid,
            },
          ],
        }),
      });
      const data = await r.json();
      if (!r.ok) { res.status(r.status).json(data); return; }

      // Stash pending order intent keyed by PayPal order id — used at capture time
      // so the client can't reshape items between create and capture.
      await getFirestore().collection("pendingOrders").doc(data.id).set({
        userId: caller.uid,
        userEmail: caller.email ?? null,
        items: priced.priced,
        totalAmount: priced.subtotal,
        currency,
        createdAt: FieldValue.serverTimestamp(),
      });

      res.status(200).json({ id: data.id });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e?.message ?? "Internal error" });
    }
  }
);

// ============================================================
// capturePayPalOrder — auth-gated, writes order server-side
// ============================================================
export const capturePayPalOrder = onRequest(
  { secrets: [PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_ENV], cors: false, invoker: "public" },
  async (req, res) => {
    if (applyCors(req, res)) return;
    try {
      if (req.method !== "POST") { res.status(405).json({ error: "Method Not Allowed" }); return; }

      let caller: { uid: string; email?: string };
      try {
        caller = await verifyCaller(req);
      } catch (e: any) {
        res.status(401).json({ error: e?.message ?? "Unauthorized" });
        return;
      }

      const { orderID, shippingAddress } = (req.body ?? {}) as {
        orderID?: string;
        shippingAddress?: Record<string, unknown>;
      };
      if (!orderID) { res.status(400).json({ error: "Missing orderID" }); return; }

      const db = getFirestore();
      const pendingRef = db.collection("pendingOrders").doc(orderID);
      const pendingSnap = await pendingRef.get();
      if (!pendingSnap.exists) {
        res.status(404).json({ error: "Unknown order" });
        return;
      }
      const pending = pendingSnap.data() as {
        userId: string;
        userEmail?: string | null;
        items: PricedItem[];
        totalAmount: number;
        currency: string;
      };
      if (pending.userId !== caller.uid) {
        res.status(403).json({ error: "Order does not belong to caller" });
        return;
      }

      const env = PAYPAL_ENV.value() || "sandbox";
      const token = await getAccessToken(PAYPAL_CLIENT_ID.value(), PAYPAL_SECRET.value(), env);

      const r = await fetch(`${paypalBase(env)}/v2/checkout/orders/${orderID}/capture`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      const data = await r.json();
      if (!r.ok) { res.status(r.status).json(data); return; }

      // Write the trusted order document.
      const orderRef = await db.collection("orders").add({
        userId: caller.uid,
        userEmail: caller.email ?? pending.userEmail ?? null,
        items: pending.items,
        totalAmount: pending.totalAmount,
        status: "order_placed",
        shippingAddress: shippingAddress ?? {},
        paymentMethod: "paypal",
        paypalOrderId: orderID,
        paypalCaptureId: data?.purchase_units?.[0]?.payments?.captures?.[0]?.id ?? null,
        statusHistory: [
          {
            status: "order_placed",
            date: new Date(),
            note: `PayPal capture ${data?.id ?? orderID}`,
          },
        ],
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      // Best-effort cleanup.
      await pendingRef.delete().catch(() => undefined);

      res.status(200).json({ ok: true, orderId: orderRef.id, paypal: data });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e?.message ?? "Internal error" });
    }
  }
);
