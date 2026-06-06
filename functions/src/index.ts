import { onRequest, Request } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import type { Response } from "express";

const PAYPAL_CLIENT_ID = defineSecret("PAYPAL_CLIENT_ID");
const PAYPAL_SECRET    = defineSecret("PAYPAL_SECRET");
const PAYPAL_ENV       = defineSecret("PAYPAL_ENV");

// Allow localhost (any port), *.lovable.app, *.lovableproject.com, *.vercel.app,
// kurt-hair Firebase hosting, and your custom domain(s).
const ORIGIN_PATTERNS: RegExp[] = [
  /^https?:\/\/localhost(:\d+)?$/,
  /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
  /^https:\/\/([a-z0-9-]+\.)*lovable\.app$/i,
  /^https:\/\/([a-z0-9-]+\.)*lovableproject\.com$/i,
  /^https:\/\/([a-z0-9-]+\.)*vercel\.app$/i,
  /^https:\/\/kurt-hair\.web\.app$/i,
  /^https:\/\/kurt-hair\.firebaseapp\.com$/i,
];

function applyCors(req: Request, res: Response): boolean {
  const origin = (req.headers.origin as string) || "";
  const allowed = ORIGIN_PATTERNS.some((re) => re.test(origin));

  if (allowed) {
    res.set("Access-Control-Allow-Origin", origin);
    res.set("Vary", "Origin");
  }
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
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
  { secrets: [PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_ENV] },
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
  { secrets: [PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_ENV] },
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
