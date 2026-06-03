// Client helpers that call your Firebase Functions.
// The Functions hold the PayPal Secret and talk to PayPal's REST API.

const CREATE_ORDER_URL = import.meta.env.VITE_PAYPAL_CREATE_ORDER_URL;
const CAPTURE_ORDER_URL = import.meta.env.VITE_PAYPAL_CAPTURE_ORDER_URL;

export interface CreateOrderPayload {
  amount: number;
  currency?: string;
}

export async function createPayPalOrder(
  payload: CreateOrderPayload
): Promise<string> {
  if (!CREATE_ORDER_URL) {
    throw new Error(
      "VITE_PAYPAL_CREATE_ORDER_URL is not set. Deploy the Firebase function and add the URL to .env."
    );
  }
  const res = await fetch(CREATE_ORDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: payload.amount.toFixed(2),
      currency: payload.currency ?? "USD",
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`createPayPalOrder failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  if (!data.id) throw new Error("createPayPalOrder: missing order id in response");
  return data.id as string;
}

export async function capturePayPalOrder(orderID: string): Promise<any> {
  if (!CAPTURE_ORDER_URL) {
    throw new Error(
      "VITE_PAYPAL_CAPTURE_ORDER_URL is not set. Deploy the Firebase function and add the URL to .env."
    );
  }
  const res = await fetch(CAPTURE_ORDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderID }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`capturePayPalOrder failed: ${res.status} ${text}`);
  }
  return res.json();
}
