# Security Hardening Plan

Four changes, in the order they should ship. Each one is independently deployable.

---

## 1. Firestore + Storage security rules (critical)

There are **no `firestore.rules` or `storage.rules` files** in the repo, which means rules are whatever is set in the Firebase console — very likely the default "test mode" (open to the world) or an early permissive set. Anyone with the project ID can read/write every collection directly, bypassing the app.

**Create `firestore.rules`** with least-privilege access:

- `products`, `blogPosts`, `siteSettings` → **public read**, **admin-only write** (write requires `exists(/databases/$(database)/documents/admins/$(request.auth.uid))`).
- `orders` → user can read/create only their own (`request.auth.uid == resource.data.userId`); admins read/write all. No client updates to `status` / `totalAmount` — only admins can update.
- `users`, `addresses`, `wishlists`, `userProfiles` → owner-only (`request.auth.uid == userId`).
- `admins` → **no client access** (read/write denied). Only server/console can modify. `AdminContext` uses `getDoc` on the caller's own uid — that specific read is allowed via a narrow rule.
- Default: deny.

**Create `storage.rules`**:

- `products/**` → public read, admin-only write.
- `users/{uid}/**` → owner-only.
- Default: deny.

**Update `firebase.json`** to register both rules files so `firebase deploy` publishes them.

## 2. PayPal Functions: require auth + recompute price server-side (critical)

Today `createPayPalOrder` is `invoker: "public"` and trusts the client-supplied `amount`. A user can pay $0.01 for a $500 cart, and bots can spam the endpoint.

Changes in `functions/src/index.ts`:

- Verify a Firebase Auth ID token on every call. Read `Authorization: Bearer <idToken>` header, verify with `admin.auth().verifyIdToken()`. Reject if missing/invalid. Guest checkout stays possible only if you want — recommended: require sign-in for checkout.
- New request shape: client sends `{ items: [{ productId, quantity, variantId? }], currency }` — **no amount**.
- Function loads each product from Firestore server-side, computes `subtotal = Σ price × quantity` (using `variantId` price if present), applies shipping/tax rules that already exist in `CartContext`, and passes that authoritative total to PayPal.
- Return `{ id }` as today. `capturePayPalOrder` also gets auth verification.
- After capture succeeds, function writes the `orders/{id}` document itself with the trusted total, and returns `orderId` to the client — so the client can no longer forge order totals through Firestore either. This pairs with the "no client writes to orders.totalAmount" rule above.

Client changes in `src/lib/paypal.ts` and `PayPalCheckoutButton.tsx`:

- Attach `Authorization: Bearer ${await user.getIdToken()}` header.
- Send cart items instead of `amount`.
- Stop calling `addOrder` from the client on approval — trust the orderId returned by `capturePayPalOrder`.
- Disable the PayPal button when `!user` and prompt sign-in.

Also **tighten CORS**: replace the "reflect any origin" logic with an allow-list of the production domain + `localhost:8080` for dev.

## 3. Firebase App Check (bot / abuse protection)

Install and initialize App Check with reCAPTCHA v3 in `src/lib/firebase.ts`:

```ts
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true,
});
```

- Requires a reCAPTCHA v3 site key (I'll add it via `add_secret` flow once approved — the site key itself is publishable so it goes in `.env` as `VITE_RECAPTCHA_SITE_KEY`; the secret half stays in Firebase console).
- In the Firebase console, **enforce App Check on Firestore, Storage, and the PayPal Cloud Functions** after we confirm the client is sending valid tokens (soft-launch first, then enforce).
- Cloud Functions: read the `X-Firebase-AppCheck` header and verify with `admin.appCheck().verifyToken()` alongside the ID token check from step 2.

## 4. Out of scope for this plan

- 2FA wiring, HIBP toggle, email enumeration protection — separate smaller task.
- Rewriting existing orders' totals — new rules apply to new writes; historical data stays.
- No UI/visual changes.

---

## Technical details

**New files**
- `firestore.rules`
- `storage.rules`

**Modified files**
- `firebase.json` — register rules files.
- `functions/src/index.ts` — auth + App Check verification, server-side price computation, server-side order write, CORS allow-list.
- `functions/package.json` — ensure `firebase-admin` is a dep (may already be transitive).
- `src/lib/firebase.ts` — initialize App Check.
- `src/lib/paypal.ts` — attach ID token + App Check token, send items instead of amount.
- `src/components/checkout/PayPalCheckoutButton.tsx` — remove client-side `addOrder`, gate on `user`.
- `.env` example — add `VITE_RECAPTCHA_SITE_KEY`.

**Deployment steps the user has to run once code is merged**
1. `firebase deploy --only firestore:rules,storage:rules`
2. `firebase deploy --only functions`
3. In Firebase console → App Check: register the web app with reCAPTCHA v3 site+secret keys, then enable enforcement per service.

**Testing checklist**
- Unauthenticated read of `products` still works (public storefront).
- Unauthenticated write to `products` from the browser devtools fails.
- Signed-in user can only see their own orders in `/dashboard/orders`.
- PayPal checkout with a tampered `amount` in devtools is ignored — final charge matches server total.
- Admin login still grants full access to admin dashboard.

Approve and I'll implement in this order: rules → functions → App Check.
