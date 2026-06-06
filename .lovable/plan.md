## Goal
Fix the PayPal checkout so clicking the PayPal button creates and captures orders reliably on localhost, Lovable preview domains, and your real site.

## What’s causing the current error
The current failure happens before PayPal order creation completes.

### Confirmed issues in the codebase
1. **CORS origin list is too narrow**
   In `functions/src/index.ts`, CORS only allows:
   - `http://localhost:8080`
   - `https://kurthair-pay.vercel.app`

   That means requests from Lovable preview or any other domain are blocked.

2. **The deployed function likely does not match the current source**
   Your localhost error still says the response has **no `Access-Control-Allow-Origin` header at all**. Since localhost is already in the allowlist, that strongly suggests the deployed Cloud Run/Firebase function is still an older version or the current source was not deployed successfully.

3. **Functions dependency setup is incomplete**
   `functions/src/index.ts` imports `cors`, but `functions/package.json` does **not** list `cors` in dependencies. If that package is missing locally, deploy/build can fail or deploy stale output.

4. **`.env` has malformed PayPal function URLs**
   In `.env`, both values have a leading space after `=`:
   - `VITE_PAYPAL_CREATE_ORDER_URL= https://...`
   - `VITE_PAYPAL_CAPTURE_ORDER_URL= https://...`

   That can produce broken fetch URLs or inconsistent behavior depending on how Vite parses them.

## Plan

### 1. Fix the frontend environment values
Update `.env` so both PayPal function URLs have **no leading space**.

### 2. Harden the Firebase HTTP functions for browser calls
Update `functions/src/index.ts` so both functions:
- answer `OPTIONS` preflight requests explicitly
- always return CORS headers on success and error paths
- allow your actual environments, including localhost and Lovable preview/published domains
- avoid silently failing when the request origin changes

Preferred implementation:
- use a small shared helper that sets headers manually
- echo back the request origin only if it matches an allowlist/pattern
- include `Access-Control-Allow-Methods: POST, OPTIONS`
- include `Access-Control-Allow-Headers: Content-Type`

### 3. Fix functions dependencies and deployment readiness
Update `functions/package.json` to include:
- `cors` if you keep middleware-based CORS, or remove the import entirely if switching to manual headers

Then verify the Firebase functions project is deployable with the current source and secrets setup.

### 4. Redeploy the Firebase functions
Redeploy the functions so the live endpoint actually matches the fixed source.

### 5. Re-test the PayPal flow end-to-end
Test from:
- localhost
- Lovable preview/public domain

Expected result:
- browser preflight succeeds
- `createPayPalOrder` returns an order id
- PayPal popup continues normally
- if any error remains, it becomes a real backend/PayPal response instead of generic `Failed to fetch`

## Technical details
### Files to update
- `.env`
- `functions/src/index.ts`
- `functions/package.json`

### Most likely root cause ranking
1. deployed function is still old / not redeployed correctly
2. CORS allowlist excludes current frontend domain
3. malformed `.env` URL values
4. missing `cors` dependency in the functions package

### After this fix
If checkout still fails, the next error will likely be one of these instead of CORS:
- missing Firebase secret values (`PAYPAL_CLIENT_ID`, `PAYPAL_SECRET`, `PAYPAL_ENV`)
- invalid PayPal sandbox credentials
- PayPal API rejection for order/capture payload

Those are much easier to diagnose once CORS is removed as the blocker.