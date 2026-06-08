## Goal
Fix the PayPal checkout error so localhost and the deployed site can create/capture orders successfully.

## What I confirmed from the codebase
- The frontend is calling two env-provided backend URLs directly from the browser: `src/lib/paypal.ts`.
- The current `.env` values point to Cloud Run URLs ending in `createpaypalorder-...run.app` and `capturepaypalorder-...run.app`.
- The current Firebase source does include CORS handling for `localhost`, `127.0.0.1`, Firebase Hosting, Lovable, and Vercel: `functions/src/index.ts`.
- The reported browser error is specifically a failed preflight with no `Access-Control-Allow-Origin`, which means the browser is not receiving the CORS headers it should be getting from the function.

## Likely root cause
The deployed URL currently in `.env` is not serving the same code that exists in `functions/src/index.ts` now.
That usually means one of these is true:
1. the function URL in `.env` is stale/wrong for the currently exported function name,
2. the latest functions code never deployed successfully,
3. the deployed service exists but is rejecting/handling OPTIONS before your CORS code runs.

Because the source code already allows `http://localhost:8080`, the active failure is most likely deployment/URL mismatch rather than a frontend bug.

## Plan
1. Verify the live function names and URLs that Firebase actually exposes for the current exports.
2. Update the functions code so CORS handling is explicit and resilient for preflight/error paths.
3. Align `.env` with the real deployed function URLs returned by deployment instead of assuming the older `createpaypalorder` / `capturepaypalorder` URLs are still correct.
4. Tighten the client-side PayPal helper and button error handling so backend failures surface clearly instead of generic “PayPal error, please try again”.
5. Validate the full flow for both order creation and capture.

## Technical changes I would make
- In `functions/src/index.ts`
  - keep the allowed-origin logic,
  - ensure every OPTIONS, success, and error response includes CORS headers,
  - add small diagnostics so failed requests reveal whether the origin was accepted.
- In `src/lib/paypal.ts`
  - normalize request/response handling,
  - surface backend error bodies cleanly,
  - avoid hiding useful status details.
- In `src/components/checkout/PayPalCheckoutButton.tsx`
  - improve displayed error messages so PayPal SDK errors and backend errors are distinguishable.
- In `.env`
  - replace the current function URLs with the exact URLs produced by the successful Firebase deploy.

## Expected outcome
- `POST` to create order succeeds from localhost.
- PayPal button no longer fails with `create_order_error: Failed to fetch`.
- If backend config is still wrong, the UI will show the real backend error instead of a generic message.

## Notes
- Your `.env` format itself looks fine.
- `firebase deploy --only functions` should still be run from the project root.
- If the deployment output shows URLs different from the ones in `.env`, those deploy-returned URLs are the ones the frontend must use.