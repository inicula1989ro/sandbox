# Specialists Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Specialists section — a portrait photo grid of the salon's team members with names, specializations, and subtle desaturation-to-color hover treatment.

**Architecture:** Feature folder `features/specialists/` with two components: `SpecialistsSection` (layout + header) and `SpecialistCard` (photo + text). Uses `useInView` for scroll animation. Static placeholder data from `copy.ts`. Real `<img>` tags for accessibility.

**Tech Stack:** React 19, MUI v9 (Box, Typography), CSS Grid, CSS filters, `useInView` hook.

**Depends on:** `shared-infrastructure` plan (useInView hook, updated copy.ts).

---

## File Map

### Create

- `packages/web/src/assets/specialist-1.jpg` — placeholder portrait
- `packages/web/src/assets/specialist-2.jpg` — placeholder portrait
- `packages/web/src/assets/specialist-3.jpg` — placeholder portrait
- `packages/web/src/assets/specialist-4.jpg` — placeholder portrait
- `packages/web/src/features/specialists/specialist-card.tsx` — individual card
- `packages/web/src/features/specialists/specialists-section.tsx` — section layout
- `packages/web/src/features/specialists/index.ts` — barrel export

### Modify

- `packages/web/src/app/app.tsx` — replace specialists placeholder with SpecialistsSection

---

## Task 1: Download Placeholder Portraits

**Files:**

- Create: `packages/web/src/assets/specialist-1.jpg` through `specialist-4.jpg`

- [ ] **Step 1: Download four placeholder portraits from Unsplash**

```bash
cd /Users/alekseyborisko/Projects/beaty/packages/web/src/assets

curl -L -o specialist-1.jpg "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80"
curl -L -o specialist-2.jpg "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80"
curl -L -o specialist-3.jpg "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80"
curl -L -o specialist-4.jpg "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80"
```

If any URL fails, find a replacement Unsplash portrait (professional woman, warm lighting, headshot/upper body).

- [ ] **Step 2: Verify files exist**

```bash
ls -la /Users/alekseyborisko/Projects/beaty/packages/web/src/assets/specialist-*.jpg
```

Expected: 4 files, each 30-200KB.

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/assets/specialist-*.jpg
git commit -m "chore: add placeholder specialist portrait images"
```

---

## Task 2: SpecialistCard Component

**Files:**

- Create: `packages/web/src/features/specialists/specialist-card.tsx`

- [ ] **Step 1: Create SpecialistCard component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/specialists/specialist-card.tsx`:

```tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export interface SpecialistCardProps {
  name: string
  specialization: string
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

export function SpecialistCard({
  name,
  specialization,
  image,
  index,
  animate,
}: SpecialistCardProps) {
  return (
    <Box
      sx={{
        ...fadeInUp,
        opacity: animate ? 1 : 0,
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
      {/* Photo container */}
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '3 / 4',
          borderRadius: 3,
          overflow: 'hidden',
          '&:hover img': {
            filter: 'saturate(1)',
            transform: 'scale(1.03)',
          },
        }}
      >
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'saturate(0.85)',
            transition:
              'filter 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </Box>

      {/* Text below photo */}
      <Typography
        variant="h4"
        sx={{
          fontSize: '1.125rem',
          fontWeight: 600,
          color: 'text.primary',
          mt: 1.5,
        }}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.8125rem',
          color: 'text.primary',
          opacity: 0.6,
          mt: 0.25,
        }}
      >
        {specialization}
      </Typography>
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
git add packages/web/src/features/specialists/specialist-card.tsx
git commit -m "feat: add SpecialistCard with desaturation hover effect"
```

---

## Task 3: SpecialistsSection Component

**Files:**

- Create: `packages/web/src/features/specialists/specialists-section.tsx`
- Create: `packages/web/src/features/specialists/index.ts`

- [ ] **Step 1: Create SpecialistsSection component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/specialists/specialists-section.tsx`:

```tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import specialist1 from '@/assets/specialist-1.jpg'
import specialist2 from '@/assets/specialist-2.jpg'
import specialist3 from '@/assets/specialist-3.jpg'
import specialist4 from '@/assets/specialist-4.jpg'
import { copy } from '@/constants/copy'
import { SpecialistCard } from '@/features/specialists/specialist-card'
import { useInView } from '@/hooks/use-in-view'

const specialistImages = [specialist1, specialist2, specialist3, specialist4]

const fadeInUp = {
  '@keyframes fadeInUp': {
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}

export function SpecialistsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <Box
      component="section"
      id="specialists"
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
            {copy.specialists.overline}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.25rem', sm: '2.5rem', md: '2.75rem', lg: '3rem' },
              color: 'text.primary',
              mb: 2,
            }}
          >
            {copy.specialists.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.9375rem',
              color: 'text.primary',
              opacity: 0.7,
              maxWidth: 480,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            {copy.specialists.subtitle}
          </Typography>
        </Box>

        {/* Card Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          {copy.specialists.items.map((specialist, index) => (
            <SpecialistCard
              key={specialist.name}
              name={specialist.name}
              specialization={specialist.specialization}
              image={specialistImages[index] ?? specialist1}
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

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/specialists/index.ts`:

```ts
export { SpecialistsSection } from '@/features/specialists/specialists-section'
```

- [ ] **Step 3: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/features/specialists/
git commit -m "feat: add SpecialistsSection with portrait grid"
```

---

## Task 4: Integrate Into App Shell

**Files:**

- Modify: `packages/web/src/app/app.tsx`

- [ ] **Step 1: Update app.tsx**

Add `SpecialistsSection` import and replace placeholder. The file should look like:

```tsx
import { Header, SectionPlaceholder } from '@/components/layout'
import { HeroSection } from '@/features/hero'
import { PricingSection } from '@/features/pricing'
import { ServicesSection } from '@/features/services'
import { SpecialistsSection } from '@/features/specialists'

const sectionIds = ['about', 'gallery', 'contact', 'book']

export function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <SpecialistsSection />
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

Start dev server, scroll to specialists. Verify:

- White background contrasts with pink pricing above
- 4 specialist cards with portraits in 3:4 ratio
- Names and specializations below each photo
- Photos slightly desaturated, full color on hover
- Scale-up effect on hover
- 2 cols mobile, 3 cols tablet, 4 cols desktop
- Staggered fade-in on scroll

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/app/app.tsx
git commit -m "feat: integrate SpecialistsSection into app shell"
```
