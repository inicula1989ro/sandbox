# Signature Services Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Signature Services section — a responsive card grid showcasing five service categories with portrait-ratio image cards, brand tint overlay, and staggered scroll-triggered animations.

**Architecture:** Feature folder `features/services/` with two components: `ServicesSection` (layout + header) and `ServiceCard` (individual card). Uses `useInView` hook for scroll-triggered animation. Static data from `copy.ts`. Placeholder images from Unsplash imported as modules.

**Tech Stack:** React 19, MUI v9 (Box, Typography), CSS Grid, CSS keyframes, `useInView` hook.

**Depends on:** `shared-infrastructure` plan (useInView hook, updated copy.ts).

---

## File Map

### Create

- `packages/web/src/assets/services-hair.jpg` — placeholder image
- `packages/web/src/assets/services-nails.jpg` — placeholder image
- `packages/web/src/assets/services-face.jpg` — placeholder image
- `packages/web/src/assets/services-brows.jpg` — placeholder image
- `packages/web/src/assets/services-body.jpg` — placeholder image
- `packages/web/src/features/services/service-card.tsx` — individual card
- `packages/web/src/features/services/services-section.tsx` — section layout
- `packages/web/src/features/services/index.ts` — barrel export

### Modify

- `packages/web/src/app/app.tsx` — replace services placeholder with ServicesSection

---

## Task 1: Download Placeholder Images

**Files:**

- Create: `packages/web/src/assets/services-hair.jpg`
- Create: `packages/web/src/assets/services-nails.jpg`
- Create: `packages/web/src/assets/services-face.jpg`
- Create: `packages/web/src/assets/services-brows.jpg`
- Create: `packages/web/src/assets/services-body.jpg`

- [ ] **Step 1: Download five placeholder images from Unsplash**

```bash
cd /Users/alekseyborisko/Projects/beaty/packages/web/src/assets

curl -L -o services-hair.jpg "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
curl -L -o services-nails.jpg "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80"
curl -L -o services-face.jpg "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
curl -L -o services-brows.jpg "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
curl -L -o services-body.jpg "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80"
```

If any URL fails, find a replacement Unsplash image (beauty/salon theme, portrait-oriented, soft lighting) and download at `w=800&q=80`.

- [ ] **Step 2: Verify all images exist and are reasonable size**

```bash
ls -la /Users/alekseyborisko/Projects/beaty/packages/web/src/assets/services-*.jpg
```

Expected: 5 files, each 50-400KB.

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/assets/services-*.jpg
git commit -m "chore: add placeholder service category images"
```

---

## Task 2: ServiceCard Component

**Files:**

- Create: `packages/web/src/features/services/service-card.tsx`

- [ ] **Step 1: Create ServiceCard component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/services/service-card.tsx`:

```tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export interface ServiceCardProps {
  title: string
  description: string
  image: string
  index: number
  animate: boolean
}

const fadeInUp = {
  '@keyframes fadeInUp': {
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}

export function ServiceCard({ title, description, image, index, animate }: ServiceCardProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '3 / 4',
        borderRadius: 3,
        overflow: 'hidden',
        opacity: animate ? 1 : 0,
        ...fadeInUp,
        '@media (prefers-reduced-motion: no-preference)': {
          animation: animate
            ? `fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s both`
            : 'none',
        },
        '@media (prefers-reduced-motion: reduce)': {
          opacity: 1,
        },
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          '.MuiBox-root:hover > &': {
            transform: 'scale(1.05)',
          },
        }}
      />

      {/* Brand overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(231, 181, 192, 0.55)',
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          '.MuiBox-root:hover > &': {
            opacity: 0.65,
          },
        }}
      />

      {/* Bottom gradient for text readability */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          p: { xs: 2.5, md: 3 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: { xs: '1.5rem', md: '1.75rem' },
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>
      </Box>
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
git add packages/web/src/features/services/service-card.tsx
git commit -m "feat: add ServiceCard component with image overlay and hover effects"
```

---

## Task 3: ServicesSection Component

**Files:**

- Create: `packages/web/src/features/services/services-section.tsx`
- Create: `packages/web/src/features/services/index.ts`

- [ ] **Step 1: Create ServicesSection component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/services/services-section.tsx`:

```tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import servicesBody from '@/assets/services-body.jpg'
import servicesBrows from '@/assets/services-brows.jpg'
import servicesFace from '@/assets/services-face.jpg'
import servicesHair from '@/assets/services-hair.jpg'
import servicesNails from '@/assets/services-nails.jpg'
import { copy } from '@/constants/copy'
import { ServiceCard } from '@/features/services/service-card'
import { useInView } from '@/hooks/use-in-view'

const serviceCategories = [
  { ...copy.services.categories.hair, image: servicesHair },
  { ...copy.services.categories.nails, image: servicesNails },
  { ...copy.services.categories.face, image: servicesFace },
  { ...copy.services.categories.browsLashes, image: servicesBrows },
  { ...copy.services.categories.body, image: servicesBody },
]

const fadeInUp = {
  '@keyframes fadeInUp': {
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}

export function ServicesSection() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <Box
      component="section"
      id="services"
      ref={ref}
      sx={{
        scrollMarginTop: { xs: '64px', md: '72px' },
        bgcolor: 'background.default',
        py: { xs: 10, md: 15 },
        px: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Section Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 7, md: 9 },
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
            {copy.services.overline}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.25rem', sm: '2.5rem', md: '2.75rem', lg: '3rem' },
              color: 'text.primary',
              mb: 2,
            }}
          >
            {copy.services.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.9375rem',
              color: 'text.primary',
              opacity: 0.7,
              maxWidth: 520,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            {copy.services.subtitle}
          </Typography>
        </Box>

        {/* Card Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          {serviceCategories.map((category, index) => (
            <ServiceCard
              key={category.title}
              title={category.title}
              description={category.description}
              image={category.image}
              index={index}
              animate={inView}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
```

- [ ] **Step 2: Create barrel export**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/services/index.ts`:

```ts
export { ServicesSection } from '@/features/services/services-section'
```

- [ ] **Step 3: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/features/services/
git commit -m "feat: add ServicesSection with card grid and scroll animation"
```

---

## Task 4: Integrate Into App Shell

**Files:**

- Modify: `packages/web/src/app/app.tsx`

- [ ] **Step 1: Update app.tsx**

Replace contents of `/Users/alekseyborisko/Projects/beaty/packages/web/src/app/app.tsx`:

```tsx
import { Header, SectionPlaceholder } from '@/components/layout'
import { HeroSection } from '@/features/hero'
import { ServicesSection } from '@/features/services'

const sectionIds = ['prices', 'specialists', 'about', 'gallery', 'contact', 'book']

export function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        {sectionIds.map((id) => (
          <SectionPlaceholder key={id} id={id} />
        ))}
      </main>
    </>
  )
}
```

- [ ] **Step 2: Verify typecheck and lint**

```bash
yarn typecheck && yarn lint
```

Expected: passes.

- [ ] **Step 3: Verify build**

```bash
yarn build
```

Expected: successful build.

- [ ] **Step 4: Visual verification**

Start dev server (`yarn dev`), open browser, scroll past hero. Verify:

- Section header (overline + title + subtitle) appears centered
- Five cards render in a grid (1 col mobile, 2 col tablet, 3 col desktop)
- Cards show placeholder images with pink tint overlay
- Hover: image scales up, overlay lightens
- Cards fade in with stagger when scrolling into view
- Text is readable (white on gradient)

- [ ] **Step 5: Commit**

```bash
git add packages/web/src/app/app.tsx
git commit -m "feat: integrate ServicesSection into app shell"
```
