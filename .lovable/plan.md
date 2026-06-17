## Hero section redesign

Update the homepage hero to use the owner's photo, with different layouts for desktop and mobile.

### Assets
- Upload `hero_kurt.png` (full desktop image) and `up2.jpg` (mobile portrait crop) via `lovable-assets` from `/mnt/user-uploads/`, save pointer JSONs to `src/assets/`.

### Desktop (lg and up) — matches image 2
- Full-width background image (`hero_kurt.png`) covering the hero area.
- Overlay text on the left: "REDEFINE BEAUTY WITH EVERY STRAND" (white, large), subtitle "Explore luxurious wigs and extensions", and amber "SHOP NOW" button.
- No split grid; text sits on top of the image (left-aligned, vertically centered).

### Mobile (below lg) — matches image 4 behavior
- Show only the portrait image (`up2.jpg`) at the top, full width, no text overlay.
- Below the image: same text block ("REDEFINE BEAUTY WITH EVERY STRAND", subtitle, "SHOP NOW" button) on a dark background, stacked, as it currently is.

### Files to edit
- `src/screens/LandingPage/sections/HeroSection/HeroSection.tsx` — restructure into two layouts:
  - `lg:block hidden` → desktop overlay layout with `hero_kurt.png` as background.
  - `lg:hidden block` → mobile layout with `up2.jpg` portrait on top + text section below.
- Rest of homepage (Trending, Video, Hair Extensions, Treatments, Footer) untouched.

No other files change.
