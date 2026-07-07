// Client helpers that call our Firebase Functions.
// The Functions hold the PayPal Secret, verify the caller's Firebase ID token,
// re-price the cart from Firestore, and write the final order server-side.

import { auth } from "./firebase";
import { getToken } from "firebase/app-check";
import { getAppCheckInstance } from "./firebase";

const CREATE_ORDER_URL = import.meta.env.VITE_PAYPAL_CREATE_ORDER_URL;
const CAPTURE_ORDER_URL = import.meta.env.VITE_PAYPAL_CAPTURE_ORDER_URL;

export interface CartItemPayload {
  productId: string;
  quantity: number;
  variantId?: string | number;
  color?: string;
  length?: string;
}

export interface ShippingAddressPayload {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

async function authHeaders(): Promise<Record<string, string>> {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be signed in to check out.");
  const idToken = await user.getIdToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${idToken}`,
  };
  // Attach App Check token if initialized (optional until enforcement is on).
  const appCheck = getAppCheckInstance();
  if (appCheck) {
    try {
      const { token } = await getToken(appCheck, /* forceRefresh */ false);
      if (token) headers["X-Firebase-AppCheck"] = token;
    } catch {
      /* non-fatal until enforcement is enabled */
    }
  }
  return headers;
}

export async function createPayPalOrder(params: {
  items: CartItemPayload[];
  currency?: string;
}): Promise<string> {
  if (!CREATE_ORDER_URL) {
    throw new Error(
      "VITE_PAYPAL_CREATE_ORDER_URL is not set. Deploy the Firebase function and add the URL to .env."
    );
  }
  const headers = await authHeaders();
  const res = await fetch(CREATE_ORDER_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      items: params.items,
      currency: params.currency ?? "USD",
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

export async function capturePayPalOrder(
  orderID: string,
  shippingAddress?: ShippingAddressPayload
): Promise<{ ok: true; orderId: string; paypal: any }> {
  if (!CAPTURE_ORDER_URL) {
    throw new Error(
      "VITE_PAYPAL_CAPTURE_ORDER_URL is not set. Deploy the Firebase function and add the URL to .env."
    );
  }
  const headers = await authHeaders();
  const res = await fetch(CAPTURE_ORDER_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ orderID, shippingAddress }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`capturePayPalOrder failed: ${res.status} ${text}`);
  }
  return res.json();
}
