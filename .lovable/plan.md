## Fix homepage image loading and pinned products scroll

### 1. Swap image URLs to Picsum (stable, instant)

**`src/components/sections/MetiersDeckSection.tsx`** — replace all 6 `image` fields in the `metiers` array with the provided `https://picsum.photos/seed/asp-*/900/1200` URLs.

**`src/components/sections/ArtisansCardFlipSection.tsx`** — replace the 3 artisan `image` fields with the provided `https://picsum.photos/seed/asp-artisan-*/800/1100` URLs.

### 2. Rewrite `PinnedProductsSection` with robust scroll detection

In **`src/pages/HomePage.tsx`**, replace the existing `PinnedProductsSection` component with the new version:

- Picsum image URLs for all 5 products
- Per-product `accent` color
- Desktop: 400vh section, sticky inner, horizontal track translated via `transform: translate3d(...)`
- Scroll detection tries `lenisInstance` first (polled every 100ms until ready), with a native `window.scroll` listener always attached as fallback
- Clamps translateX between 0 and `-(track.scrollWidth - innerWidth + 64)`
- Mobile (`<768px`): native horizontal snap-scroll carousel
- Staggered card vertical offset (alternating 0/40px), badges, accent bars, "+" add button

`HomePage.tsx` already renders `<PinnedProductsSection />` in place — no integration change needed beyond the component rewrite.

### Files touched

- `src/components/sections/MetiersDeckSection.tsx` (image URLs only)
- `src/components/sections/ArtisansCardFlipSection.tsx` (image URLs only)
- `src/pages/HomePage.tsx` (replace `PinnedProductsSection` component)
