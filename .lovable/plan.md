## Fix hero images not loading on localhost

**Cause:** `hero_kurt.png` and `hero_portrait.jpg` are referenced via Lovable's CDN path `/__l5e/assets-v1/...` (through their `.asset.json` pointers). That route only exists on Lovable's preview/published infrastructure — the local Vite dev server has no handler for it, so both images 404 locally.

**Fix:** Move both hero images into `public/` so Vite serves them as plain static files (same approach that made the background image work locally).

### Steps

1. Download the two images from their current CDN URLs into `public/`:
   - `public/hero_kurt.png`
   - `public/hero_portrait.jpg`
2. Update `src/screens/LandingPage/sections/HeroSection/HeroSection.tsx`:
   - Remove the two `.asset.json` imports.
   - Reference the images as `/hero_kurt.png` and `/hero_portrait.jpg`.
3. Delete the now-unused pointer files:
   - `src/assets/hero_kurt.png.asset.json`
   - `src/assets/hero_portrait.jpg.asset.json`
4. Verify locally: hero shows on desktop (full-width image + overlay text) and mobile (portrait image on top, text below).

No design/layout changes — only the image source paths change.
