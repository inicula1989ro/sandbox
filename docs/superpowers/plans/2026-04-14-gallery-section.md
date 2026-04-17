# Gallery Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Gallery section — a horizontal-scroll image strip on desktop (with keyboard/wheel support) and a vertical 2-column grid on mobile, showcasing the salon's work.

**Architecture:** Feature folder `features/gallery/` with four components: `GallerySection` (layout + header), `GalleryStrip` (desktop horizontal scroller), `GalleryGrid` (mobile vertical grid), and `GalleryImage` (single image with hover). Desktop strip uses native CSS scroll-snap with explicit JS for keyboard arrows and wheel-to-horizontal translation. Mobile uses CSS Grid with alternating aspect ratios.

**Tech Stack:** React 19, MUI v9 (Box, Typography, useMediaQuery), CSS scroll-snap, `useInView` hook.

**Depends on:** `shared-infrastructure` plan (useInView hook, updated copy.ts).

---

## File Map

### Create

- `packages/web/src/assets/gallery/gallery-1.jpg` through `gallery-8.jpg` — placeholder images
- `packages/web/src/features/gallery/gallery-image.tsx` — single image with hover
- `packages/web/src/features/gallery/gallery-strip.tsx` — desktop horizontal scroller
- `packages/web/src/features/gallery/gallery-grid.tsx` — mobile vertical grid
- `packages/web/src/features/gallery/gallery-section.tsx` — section layout
- `packages/web/src/features/gallery/index.ts` — barrel export

### Modify

- `packages/web/src/app/app.tsx` — replace gallery placeholder with GallerySection

---

## Task 1: Download Placeholder Gallery Images

**Files:**

- Create: `packages/web/src/assets/gallery/gallery-1.jpg` through `gallery-8.jpg`

- [ ] **Step 1: Create gallery directory and download images**

```bash
mkdir -p /Users/alekseyborisko/Projects/beaty/packages/web/src/assets/gallery
cd /Users/alekseyborisko/Projects/beaty/packages/web/src/assets/gallery

curl -L -o gallery-1.jpg "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80"
curl -L -o gallery-2.jpg "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80"
curl -L -o gallery-3.jpg "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80"
curl -L -o gallery-4.jpg "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&q=80"
curl -L -o gallery-5.jpg "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80"
curl -L -o gallery-6.jpg "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80"
curl -L -o gallery-7.jpg "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80"
curl -L -o gallery-8.jpg "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
```

If any URL fails, find a replacement beauty/salon Unsplash image at `w=800&q=80`.

- [ ] **Step 2: Verify files exist**

```bash
ls -la /Users/alekseyborisko/Projects/beaty/packages/web/src/assets/gallery/
```

Expected: 8 files, each 50-400KB.

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/assets/gallery/
git commit -m "chore: add placeholder gallery images"
```

---

## Task 2: GalleryImage Component

**Files:**

- Create: `packages/web/src/features/gallery/gallery-image.tsx`

- [ ] **Step 1: Create GalleryImage component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/gallery/gallery-image.tsx`:

```tsx
import Box from '@mui/material/Box'

export interface GalleryImageProps {
  src: string
  alt: string
  aspectRatio?: string
  index: number
  animate: boolean
}

const fadeInUp = {
  '@keyframes fadeInUp': {
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}

export function GalleryImage({ src, alt, aspectRatio, index, animate }: GalleryImageProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        aspectRatio: aspectRatio ?? undefined,
        flexShrink: 0,
        ...fadeInUp,
        opacity: animate ? 1 : 0,
        '@media (prefers-reduced-motion: no-preference)': {
          animation: animate
            ? `fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s both`
            : 'none',
        },
        '@media (prefers-reduced-motion: reduce)': {
          opacity: 1,
        },
        '&:hover img': {
          transform: 'scale(1.03)',
        },
        '&:hover .gallery-overlay': {
          opacity: 1,
        },
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      {/* Brand overlay on hover */}
      <Box
        className="gallery-overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(231, 181, 192, 0.15)',
          opacity: 0,
          transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/features/gallery/gallery-image.tsx
git commit -m "feat: add GalleryImage component with hover overlay"
```

---

## Task 3: GalleryStrip (Desktop Horizontal Scroller)

**Files:**

- Create: `packages/web/src/features/gallery/gallery-strip.tsx`

- [ ] **Step 1: Create GalleryStrip component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/gallery/gallery-strip.tsx`:

```tsx
import Box from '@mui/material/Box'
import { useCallback, useRef } from 'react'

import { GalleryImage } from '@/features/gallery/gallery-image'

export interface GalleryStripProps {
  images: ReadonlyArray<{ src: string; alt: string }>
  animate: boolean
}

const SCROLL_AMOUNT = 300

export function GalleryStrip({ images, animate }: GalleryStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const container = scrollRef.current
    if (!container) return

    if (e.key === 'ArrowRight') {
      e.preventDefault()
      container.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' })
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      container.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' })
    }
  }, [])

  // No wheel-to-horizontal translation — native page scroll is preserved.
  // Horizontal scrolling via: trackpad (native), touch swipe (native), keyboard arrows (above).

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        ref={scrollRef}
        role="region"
        aria-label="Gallery"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          pl: { md: 'calc((100vw - 1200px) / 2)', lg: 'calc((100vw - 1200px) / 2)' },
          pr: 6,
          py: 1,
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 4,
            borderRadius: 2,
          },
        }}
      >
        {images.map((image, index) => (
          <Box
            key={image.alt}
            sx={{
              height: { md: 380, lg: 420 },
              flexShrink: 0,
              scrollSnapAlign: 'start',
            }}
          >
            <GalleryImage src={image.src} alt={image.alt} index={index} animate={animate} />
          </Box>
        ))}
      </Box>

      {/* Right edge fade hint */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 80,
          background: 'linear-gradient(to left, rgba(255,255,255,1) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/features/gallery/gallery-strip.tsx
git commit -m "feat: add GalleryStrip with scroll-snap, keyboard, and wheel support"
```

---

## Task 4: GalleryGrid (Mobile Vertical Grid)

**Files:**

- Create: `packages/web/src/features/gallery/gallery-grid.tsx`

- [ ] **Step 1: Create GalleryGrid component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/gallery/gallery-grid.tsx`:

```tsx
import Box from '@mui/material/Box'

import { GalleryImage } from '@/features/gallery/gallery-image'

export interface GalleryGridProps {
  images: ReadonlyArray<{ src: string; alt: string }>
  animate: boolean
}

export function GalleryGrid({ images, animate }: GalleryGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 1,
        px: { xs: 3, sm: 4 },
      }}
    >
      {images.map((image, index) => (
        <GalleryImage
          key={image.alt}
          src={image.src}
          alt={image.alt}
          aspectRatio={index % 2 === 0 ? '3 / 4' : '1 / 1'}
          index={index}
          animate={animate}
        />
      ))}
    </Box>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/features/gallery/gallery-grid.tsx
git commit -m "feat: add GalleryGrid with alternating aspect ratios"
```

---

## Task 5: GallerySection Component

**Files:**

- Create: `packages/web/src/features/gallery/gallery-section.tsx`
- Create: `packages/web/src/features/gallery/index.ts`

- [ ] **Step 1: Create GallerySection component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/gallery/gallery-section.tsx`:

```tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import gallery1 from '@/assets/gallery/gallery-1.jpg'
import gallery2 from '@/assets/gallery/gallery-2.jpg'
import gallery3 from '@/assets/gallery/gallery-3.jpg'
import gallery4 from '@/assets/gallery/gallery-4.jpg'
import gallery5 from '@/assets/gallery/gallery-5.jpg'
import gallery6 from '@/assets/gallery/gallery-6.jpg'
import gallery7 from '@/assets/gallery/gallery-7.jpg'
import gallery8 from '@/assets/gallery/gallery-8.jpg'
import { copy } from '@/constants/copy'
import { GalleryGrid } from '@/features/gallery/gallery-grid'
import { GalleryStrip } from '@/features/gallery/gallery-strip'
import { useInView } from '@/hooks/use-in-view'

const galleryImages = [
  { src: gallery1, alt: 'Hair styling result' },
  { src: gallery2, alt: 'Nail art close-up' },
  { src: gallery3, alt: 'Facial treatment' },
  { src: gallery4, alt: 'Salon interior' },
  { src: gallery5, alt: 'Brow shaping result' },
  { src: gallery6, alt: 'Hair coloring result' },
  { src: gallery7, alt: 'Manicure detail' },
  { src: gallery8, alt: 'Relaxation ambiance' },
]

const fadeInUp = {
  '@keyframes fadeInUp': {
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}

export function GallerySection() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <Box
      component="section"
      id="gallery"
      ref={ref}
      sx={{
        scrollMarginTop: { xs: '64px', md: '72px' },
        bgcolor: 'background.default',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 15 },
      }}
    >
      {/* Section Header */}
      <Box
        sx={{
          textAlign: 'center',
          mb: { xs: 6, md: 8 },
          px: { xs: 3, sm: 4, md: 5 },
          ...fadeInUp,
          opacity: inView ? 1 : 0,
          '@media (prefers-reduced-motion: no-preference)': {
            animation: inView ? 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) both' : 'none',
          },
          '@media (prefers-reduced-motion: reduce)': {
            opacity: 1,
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'primary.main',
            mb: 1.5,
          }}
        >
          {copy.gallery.overline}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2.25rem', sm: '2.5rem', md: '2.75rem', lg: '3rem' },
            color: 'text.primary',
            mb: 2,
          }}
        >
          {copy.gallery.title}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.9375rem',
            color: 'text.primary',
            opacity: 0.7,
            lineHeight: 1.6,
          }}
        >
          {copy.gallery.subtitle}
        </Typography>
      </Box>

      {/* Gallery Content */}
      {isDesktop ? (
        <GalleryStrip images={galleryImages} animate={inView} />
      ) : (
        <GalleryGrid images={galleryImages} animate={inView} />
      )}
    </Box>
  )
}
```

- [ ] **Step 2: Create barrel export**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/gallery/index.ts`:

```ts
export { GallerySection } from '@/features/gallery/gallery-section'
```

- [ ] **Step 3: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/features/gallery/
git commit -m "feat: add GallerySection with horizontal strip and mobile grid"
```

---

## Task 6: Integrate Into App Shell

**Files:**

- Modify: `packages/web/src/app/app.tsx`

- [ ] **Step 1: Update app.tsx**

Add `GallerySection` import and replace placeholder. The file should look like:

```tsx
import { Header, SectionPlaceholder } from '@/components/layout'
import { AboutSection } from '@/features/about'
import { GallerySection } from '@/features/gallery'
import { HeroSection } from '@/features/hero'
import { PricingSection } from '@/features/pricing'
import { ServicesSection } from '@/features/services'
import { SpecialistsSection } from '@/features/specialists'

const sectionIds = ['contact', 'book']

export function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <SpecialistsSection />
        <AboutSection />
        <GallerySection />
        {sectionIds.map((id) => (
          <SectionPlaceholder key={id} id={id} />
        ))}
      </main>
    </>
  )
}
```

- [ ] **Step 2: Verify typecheck, lint, build**

```bash
yarn typecheck && yarn lint && yarn build
```

Expected: all pass.

- [ ] **Step 3: Visual verification**

Start dev server, scroll to gallery. Verify:

- Desktop (900px+): horizontal scroll strip, images in a row, scroll-snap on swipe/trackpad
- Keyboard: Tab to strip → ArrowRight/Left scrolls images smoothly
- Mouse wheel: hovering over strip → vertical wheel scrolls horizontally
- Wheel at boundaries: does NOT hijack page scroll when strip is at start/end
- Right edge: white gradient fade hint
- Mobile: 2-column grid with alternating 3:4 and 1:1 aspect ratios
- Hover: subtle scale + pink overlay on each image
- Staggered fade-in animation on scroll

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/app/app.tsx
git commit -m "feat: integrate GallerySection into app shell"
```
