# EVO Studio — Gallery Section

## Overview

Visual showcase of the salon's work and atmosphere. High-impact, image-forward section that lets the work speak for itself. Positioned after About — the visitor knows the story, now they see the results.

## Design References

- **Tru Salon:** Full-width image blocks, staggered/overlapping layouts, grayscale and zoom effects, continuous visual flow without lightbox
- **Kalm Moments:** Horizontal scrolling gallery triggered by vertical scroll (ScrollTrigger pin), immersive experience, masked/cropped imagery

**Blend for EVO:** Horizontal-scroll gallery on desktop (Kalm Moments-inspired immersive feel) with fallback to a simple masonry/grid on mobile. No lightbox — keep it flowing and elegant. Brand-tinted treatment on hover.

## 1. Section Layout

### Container

- `id="gallery"`, `scroll-margin-top` matching header height
- Background: `background.default` (#FFFFFF)
- Vertical padding: `80px` mobile, `120px` desktop (top only — gallery bleeds to edge on desktop)

### Section Header

1. **Overline:** "Our Work" — Inter, 12px, letter-spacing 3px, uppercase, `primary.main`
2. **Title:** `copy.gallery.title` ("Gallery") — Playfair Display (h2), 36px mobile / 48px desktop, `text.primary`, centered
3. **Subtitle:** New copy — Inter, 0.9375rem, `text.primary` at 70% opacity, centered

### Spacing

- Header to gallery: `48px` mobile, `64px` desktop

## 2. Gallery Layout

### Desktop (md+): Horizontal Scroll Strip

- Single row of images, `overflow-x: auto`, `scroll-snap-type: x mandatory`
- Each image: fixed height `420px`, auto width based on aspect ratio, `scroll-snap-align: start`
- Gap: `16px` between images
- Horizontal padding: `calc((100vw - 1200px) / 2)` left (aligns with content), `48px` right
- Scrollbar: hidden (`scrollbar-width: none`, `::-webkit-scrollbar { display: none }`)
- Scroll hint: subtle gradient fade on the right edge (`linear-gradient(to left, white 0%, transparent 80px)`)

**No GSAP/scroll-hijacking.** Native CSS scroll-snap for touch/trackpad users.

**Keyboard scrolling:** Native `overflow-x` does NOT support arrow-key navigation. The scroll container gets `tabIndex={0}` and an explicit `onKeyDown` handler that calls `scrollBy({ left: ±300, behavior: 'smooth' })` on `ArrowLeft`/`ArrowRight`. This is the only element in the gallery that enters the tab order.

**Mouse wheel:** No wheel-to-horizontal translation. Hijacking vertical scroll inside a primary page section is too risky across mice, trackpads, and platform combinations. Users scroll horizontally via trackpad (native), touch swipe (native), or keyboard arrows (explicit handler above).

### Mobile (xs-sm): Vertical Grid

- 2-column grid, gap `8px`
- Alternating tall/short items for visual rhythm:
  - Odd items: aspect ratio `3:4`
  - Even items: aspect ratio `1:1`
- Creates a Pinterest-like staggered effect without masonry JS

### Image Treatment

- `border-radius: 8px` (slightly tighter than cards for gallery feel)
- `object-fit: cover`
- Default: full color
- Hover: subtle `scale(1.03)` + light brand overlay `rgba(231, 181, 192, 0.15)`, transition `0.4s`

## 3. Data

Static array of placeholder images. Future: fetched via React Query (`queryKeys.gallery.all`).

### Placeholder Images

8-10 images covering different service categories:

```
src/assets/gallery/
├── gallery-1.jpg    # Hair styling result
├── gallery-2.jpg    # Nail art close-up
├── gallery-3.jpg    # Facial treatment
├── gallery-4.jpg    # Salon interior
├── gallery-5.jpg    # Brow work
├── gallery-6.jpg    # Hair coloring result
├── gallery-7.jpg    # Manicure detail
└── gallery-8.jpg    # Relaxation/ambiance
```

## 4. Animation

- Section header: `fadeInUp` on scroll (uses `useInView`)
- Gallery images: staggered `fadeInUp` on scroll, `0.08s` per image
- On mobile grid: images animate as they enter viewport individually
- All gated by `prefers-reduced-motion`

## 5. Copy Changes

Update `constants/copy.ts`:

```ts
gallery: {
  overline: 'Our Work',
  title: 'Gallery',
  subtitle: 'A glimpse into the results and the atmosphere at EVO Studio.',
},
```

## 6. File Structure

```
src/features/gallery/
├── gallery-section.tsx     # Main section with header + gallery
├── gallery-strip.tsx       # Desktop horizontal scroll strip
├── gallery-grid.tsx        # Mobile vertical grid
├── gallery-image.tsx       # Single image with hover treatment
└── index.ts
```

## 7. Component Interfaces

### GallerySection

```tsx
export function GallerySection(): JSX.Element
```

- Reads from `copy.gallery`
- Renders `GalleryStrip` on md+, `GalleryGrid` on xs-sm
- Uses `useInView` for header animation

### GalleryStrip

```tsx
export interface GalleryStripProps {
  images: Array<{ src: string; alt: string }>
  animate: boolean
}

export function GalleryStrip(props: GalleryStripProps): JSX.Element
```

### GalleryGrid

```tsx
export interface GalleryGridProps {
  images: Array<{ src: string; alt: string }>
  animate: boolean
}

export function GalleryGrid(props: GalleryGridProps): JSX.Element
```

### GalleryImage

```tsx
export interface GalleryImageProps {
  src: string
  alt: string
  aspectRatio?: string
  index: number
  animate: boolean
}

export function GalleryImage(props: GalleryImageProps): JSX.Element
```

## 8. Responsive Breakpoints

| Breakpoint    | Layout           | Image height        | Columns |
| ------------- | ---------------- | ------------------- | ------- |
| xs (0-599)    | Vertical grid    | Auto (aspect ratio) | 2       |
| sm (600-899)  | Vertical grid    | Auto (aspect ratio) | 2       |
| md (900-1199) | Horizontal strip | 380px               | n/a     |
| lg (1200+)    | Horizontal strip | 420px               | n/a     |

## 9. Accessibility

- Section: `aria-labelledby` on h2
- Images: real `<img>` with descriptive `alt` text (e.g., "Hair coloring result — warm balayage")
- Horizontal scroll: keyboard arrow keys via explicit `onKeyDown` handler (see section 2), touch swipe, trackpad native
- Scroll container: `role="region"`, `aria-label="Gallery"`, `tabIndex={0}` — this is the ONLY focusable element in the gallery (individual images are not in the tab order)
- Mouse wheel: no hijacking — native page scroll preserved. Horizontal scroll via trackpad, touch, or keyboard only.
- All animations respect `prefers-reduced-motion`
- No content hidden behind interaction (all images visible by scrolling)

## Out of Scope

- Lightbox / full-screen image viewer
- Category filtering tabs
- Instagram feed integration
- Video content
- Image upload / CMS
