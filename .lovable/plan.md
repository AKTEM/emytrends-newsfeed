
## Current state: honest audit

The app works, but it is **not** optimized for Firestore billing. Firestore charges primarily per **document read**, and today the site re-reads the same data on almost every navigation. Concrete issues:

1. **No caching across navigation.** `useProducts()` in `ShopAllPage`, `SearchModal`, `TrendingSection`, etc. calls `getAllProducts()` / `getProductsByCategory("Trending")` on every mount. Navigating Home → Shop → Home = 3 full product-collection reads.
2. **`TrendingSection` uses `getProductsByCategory("Trending")` and then slices to 4** — Firestore still reads every matching doc. Should use `limit(4)`.
3. **`SearchModal` loads the entire products collection** just to filter client-side, every time it opens.
4. **Admin dashboard** (`AdminDashboardHome`, `AdminAnalytics`) calls `getAllProducts() + getAllOrders() + getAllBlogPosts()` on every visit. On a real store this scales linearly with catalog + order history = the single most expensive screen.
5. **No Firestore persistent cache enabled.** The SDK supports IndexedDB persistence (`persistentLocalCache`) which serves repeat reads for free — currently off.
6. **`PromoBanner`** already caches in `localStorage` (good), but `getSiteSettings` still refetches on every page load in the background. Fine, but could use SDK cache instead.
7. **Product images** are served from Firebase Storage (egress billed). No `<img loading="lazy">` audit, no width hints.
8. **Cloud Functions (`createPayPalOrder`, `capturePayPalOrder`)** — fine, only invoked at checkout.

Nothing here is broken; it just costs more than it needs to.

## Plan — changes to make (no UX regressions)

### 1. Enable Firestore persistent cache (biggest single win)
In `src/lib/firebase.ts`, initialize Firestore with:
```ts
initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
})
```
Effect: repeat `getDoc`/`getDocs` for unchanged data are served from IndexedDB — **0 billed reads** on repeat navigation within a session and across sessions.

### 2. Add a lightweight in-memory cache layer in `useProducts`
Module-level `Map<cacheKey, { data, ts }>` with a TTL (e.g. 5 min). Keys: `"all"`, `"featured"`, `"cat:Trending"`, etc. Cuts intra-session refetches even before IndexedDB.

### 3. Use `limit()` where the UI only shows N items
- `TrendingSection`: `query(products, where("category","==","Trending"), limit(4))` — add `getTrendingProducts(n)` in `firebaseProducts.ts`. Reads 4 docs instead of all trending docs.
- `getFeaturedProducts` — add optional `limit` parameter for homepage strips.

### 4. Make `SearchModal` lazy
Only fetch products the first time the modal is opened (not on mount of the header) and reuse the cache from step 2.

### 5. Admin dashboard: use Firestore aggregation
Replace `getAll*().length` with `getCountFromServer(collection)` — 1 read per aggregation instead of N. For revenue, keep a running total in a `stats/summary` doc updated by order creation (or accept N reads only on Analytics page, not on Home).

### 6. Image + asset hygiene (Storage egress)
- Add `loading="lazy"` and `decoding="async"` on all non-hero product images.
- Ensure product uploads go through the existing `imageCompression` util (verify it runs on admin uploads).
- Add long `Cache-Control: public, max-age=31536000, immutable` on uploaded product images (set metadata at upload time in `firebaseStorage.ts`).

### 7. Small correctness/cost items
- `PromoBanner`: keep localStorage cache, but also skip the network refetch if cached value is <10 min old.
- `WishlistContext` / `CartContext`: confirm they don't subscribe with `onSnapshot` to anything server-side (a live listener bills continuously).

## Out of scope
- No visual/design changes.
- No changes to auth, checkout flow, PayPal functions, or data schema.
- No migration of data.

## Expected impact
For a typical visitor browsing 4–5 pages: Firestore reads drop from ~5×(catalog size) to roughly **one** catalog fetch per session (first visit) and **zero** on repeat visits until data changes. Admin dashboard reads drop from O(products+orders+blogs) to O(1) per visit.

Approve and I'll implement the changes above in the order listed.
