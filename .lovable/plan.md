# PayPal Payment Integration Plan

## ⚠️ Security notice first
You pasted your PayPal **Client ID** and **Secret** in chat. The Client ID is safe to ship in the frontend, but the **Secret must never touch the browser or be committed to git**. Because it was shared in plaintext:

1. After we finish, go to the PayPal Developer Dashboard → your app → **rotate the Secret** before going live.
2. The Secret will live only in Firebase Functions config (`firebase functions:config:set`) on your machine — I cannot set it for you because this project uses **your own Firebase**, not Lovable Cloud, and I have no shell access to your Firebase project.

---

## Architecture

```text
[React app]  --create order-->  [Firebase Function: createPayPalOrder]  --REST--> PayPal
     |                                                                                |
     | approves in PayPal popup (PayPal JS SDK)                                       |
     v                                                                                |
[React app]  --capture order--> [Firebase Function: capturePayPalOrder] --REST--> PayPal
                                         |
                                         v
                                 Firestore `orders` (status: paid)
```

Why a backend at all: PayPal's REST API requires the Secret to mint an access token and to capture payments. Doing it from the browser would leak the Secret and let users forge "paid" orders.

---

## Part A — What I will do in the frontend (this project)

1. **Install** `@paypal/react-paypal-js`.
2. **Add env var** `VITE_PAYPAL_CLIENT_ID` to `.env` and `src/vite-env.d.ts` (Client ID only — public).
3. **Wrap the app** (in `src/index.tsx`) with `<PayPalScriptProvider>` configured for sandbox + USD.
4. **New file** `src/lib/paypal.ts` — two helpers `createPayPalOrder()` and `capturePayPalOrder(orderId)` that call the Firebase Functions endpoints (URLs read from `VITE_PAYPAL_CREATE_ORDER_URL` and `VITE_PAYPAL_CAPTURE_ORDER_URL` env vars you'll paste after deploy).
5. **New file** `src/components/checkout/PayPalCheckoutButton.tsx` — renders `<PayPalButtons>`, wires `createOrder` → backend, `onApprove` → capture → on success writes the order to Firestore via the existing `addOrder()` in `src/lib/firebaseOrders.ts`, clears the cart, navigates to an order-confirmation route.
6. **Wire it into** `src/screens/CheckoutPage/CheckoutPage.tsx`: replace the current "CHECK OUT" button with the PayPal button when cart isn't empty. Keep existing layout/styling.
7. **Add** a simple `/order-confirmation/:id` route + screen that reads the order from Firestore and shows a success summary.

I will not put the Secret anywhere in the frontend, and I will not commit any real key beyond the Client ID you already shared.

---

## Part B — What you do in Firebase (step-by-step)

I cannot run these for you because Firebase is on your own Google account. Follow exactly:

### B1. One-time setup (skip steps you've already done)
```bash
npm install -g firebase-tools
firebase login
cd <your local clone of this repo>
firebase init functions    # choose existing project "kurt-hair", TypeScript, install deps
```
This creates a `functions/` folder.

### B2. Install deps inside `functions/`
```bash
cd functions
npm install node-fetch@2 cors
npm install -D @types/cors @types/node-fetch@2
```

### B3. Store PayPal credentials as Functions config (NOT in code)
```bash
firebase functions:config:set \
  paypal.client_id="AV8iMhHmBQPvAN7xu-tXEeVBd77Z2XWrmLb1zcQKGNWvaJXVsZZ1dX49mTHCaLearAKrIZS40inPan" \
  paypal.secret="EHzVdn09Nket_D_jdXWTr81aJ9tFBH1gSLCQ4UsuKcD5WLJzhCA6R615FQe6vSRUVI3sLtdNH9iFbvJ" \
  paypal.env="sandbox"
```
(Rotate the Secret in the PayPal dashboard first, then run with the new value.)

### B4. Paste this into `functions/src/index.ts`
I'll generate the full file for you in build mode; it exports two HTTPS functions:
- `createPayPalOrder(amount, currency)` → gets an OAuth token from `https://api-m.sandbox.paypal.com/v1/oauth2/token`, then POSTs to `/v2/checkout/orders` with `intent: CAPTURE`, returns `{ id }`.
- `capturePayPalOrder(orderID)` → POSTs to `/v2/checkout/orders/{id}/capture`, returns the capture result.
Both wrap with `cors({ origin: true })` and include the `Authorization: Bearer <access_token>` header. The sandbox base URL is read from config so flipping to live is one config change.

### B5. Deploy
```bash
firebase deploy --only functions
```
Copy the two printed URLs (they look like `https://us-central1-kurt-hair.cloudfunctions.net/createPayPalOrder`).

### B6. Add those URLs + Client ID to the frontend `.env`
```
VITE_PAYPAL_CLIENT_ID=AV8iMhHmBQPvAN7xu-tXEeVBd77Z2XWrmLb1zcQKGNWvaJXVsZZ1dX49mTHCaLearAKrIZS40inPan
VITE_PAYPAL_CREATE_ORDER_URL=https://us-central1-kurt-hair.cloudfunctions.net/createPayPalOrder
VITE_PAYPAL_CAPTURE_ORDER_URL=https://us-central1-kurt-hair.cloudfunctions.net/capturePayPalOrder
```
Restart the dev preview.

### B7. Test in sandbox
Log in at https://developer.paypal.com/dashboard/accounts and grab a **Personal sandbox account** (email + password). Use it in the PayPal popup at checkout. Verify:
- New doc appears in Firestore `orders` with status `paid`.
- Capture appears in PayPal Sandbox dashboard → Activity.

### B8. Going live later
1. Create a Live app in PayPal dashboard, copy Live Client ID + Secret.
2. `firebase functions:config:set paypal.client_id="..." paypal.secret="..." paypal.env="live"` and redeploy.
3. Update `VITE_PAYPAL_CLIENT_ID` to the Live Client ID.

---

## Files I'll create/modify in build mode

- **Create**: `src/lib/paypal.ts`, `src/components/checkout/PayPalCheckoutButton.tsx`, `src/screens/OrderConfirmationPage/OrderConfirmationPage.tsx` (+ `index.ts`)
- **Modify**: `src/index.tsx` (PayPalScriptProvider + route), `src/screens/CheckoutPage/CheckoutPage.tsx` (swap button), `src/vite-env.d.ts` (env types), `.env` (placeholders + Client ID)
- **Provide as copy-paste** (not written into repo since this project has no `functions/` folder): full `functions/src/index.ts` for you to paste.

Confirm and I'll switch to build mode and implement Part A + hand you the exact `functions/src/index.ts` to paste.