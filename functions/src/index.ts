import { onRequest, Request } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import type { Response } from "express";

const PAYPAL_CLIENT_ID = defineSecret("PAYPAL_CLIENT_ID");
const PAYPAL_SECRET    = defineSecret("PAYPAL_SECRET");
const PAYPAL_ENV       = defineSecret("PAYPAL_ENV");

// Reflect any origin. CORS here is a browser-safety mechanism, not auth.
// PayPal Secret stays server-side; abuse is bounded by PayPal validation.
// If you want to lock this down later, swap to an allow-list.
function applyCors(req: Request, res: Response): boolean {
  const origin = (req.headers.origin as string) || "*";

  res.set("Access-Control-Allow-Origin", origin);
  res.set("Vary", "Origin");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set(
    "Access-Control-Allow-Headers",
    req.headers["access-control-request-headers"] as string ||
      "Content-Type, Authorization"
  );
  res.set("Access-Control-Max-Age", "3600");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return true;
  }
  return false;
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
  const data = await res.json();
  return data.access_token as string;
}

export const createPayPalOrder = onRequest(
  { secrets: [PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_ENV], cors: true, invoker: "public" },
  async (req, res) => {
    if (applyCors(req, res)) return;
    try {
      if (req.method !== "POST") { res.status(405).json({ error: "Method Not Allowed" }); return; }
      const { amount, currency = "USD" } = req.body ?? {};
      if (!amount) { res.status(400).json({ error: "Missing amount" }); return; }

      const env = PAYPAL_ENV.value() || "sandbox";
      const token = await getAccessToken(PAYPAL_CLIENT_ID.value(), PAYPAL_SECRET.value(), env);

      const r = await fetch(`${paypalBase(env)}/v2/checkout/orders`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [{ amount: { currency_code: currency, value: String(amount) } }],
        }),
      });
      const data = await r.json();
      if (!r.ok) { res.status(r.status).json(data); return; }
      res.status(200).json({ id: data.id });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e?.message ?? "Internal error" });
    }
  }
);

export const capturePayPalOrder = onRequest(
  { secrets: [PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_ENV], cors: true, invoker: "public" },
  async (req, res) => {
    if (applyCors(req, res)) return;
    try {
      if (req.method !== "POST") { res.status(405).json({ error: "Method Not Allowed" }); return; }
      const { orderID } = req.body ?? {};
      if (!orderID) { res.status(400).json({ error: "Missing orderID" }); return; }

      const env = PAYPAL_ENV.value() || "sandbox";
      const token = await getAccessToken(PAYPAL_CLIENT_ID.value(), PAYPAL_SECRET.value(), env);

      const r = await fetch(`${paypalBase(env)}/v2/checkout/orders/${orderID}/capture`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      const data = await r.json();
      if (!r.ok) { res.status(r.status).json(data); return; }
      res.status(200).json(data);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e?.message ?? "Internal error" });
    }
  }
);
