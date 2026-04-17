# Pricing Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Pricing section — a curated list of popular services with starting prices, styled as an elegant restaurant-menu layout with dotted dividers, on a warm tinted background.

**Architecture:** Feature folder `features/pricing/` with two components: `PricingSection` (layout + header + CTA) and `PriceRow` (service name ··· price). Uses `useInView` for scroll animation. Static data from `copy.ts`.

**Tech Stack:** React 19, MUI v9 (Box, Typography, Button), CSS flexbox, `useInView` hook.

**Depends on:** `shared-infrastructure` plan (useInView hook, updated copy.ts).

---

## File Map

### Create

- `packages/web/src/features/pricing/price-row.tsx` — single price row
- `packages/web/src/features/pricing/pricing-section.tsx` — section layout
- `packages/web/src/features/pricing/index.ts` — barrel export

### Modify

- `packages/web/src/app/app.tsx` — replace prices placeholder with PricingSection

---

## Task 1: PriceRow Component

**Files:**

- Create: `packages/web/src/features/pricing/price-row.tsx`

- [ ] **Step 1: Create PriceRow component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/pricing/price-row.tsx`:

```tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export interface PriceRowProps {
  service: string
  price: string
  index: number
  animate: boolean
}

const fadeInUp = {
  '@keyframes fadeInUp': {
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}

export function PriceRow({ service, price, index, animate }: PriceRowProps) {
  return (
    <Box
      role="listitem"
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'rgba(231, 181, 192, 0.2)',
        '&:last-of-type': { borderBottom: 'none' },
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
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '1rem',
          fontWeight: 500,
          color: 'text.primary',
          whiteSpace: 'nowrap',
        }}
      >
        {service}
      </Typography>

      {/* Dotted divider */}
      <Box
        aria-hidden="true"
        sx={{
          flex: 1,
          mx: 2,
          borderBottom: '1px dotted',
          borderColor: 'rgba(212, 145, 159, 0.4)',
          alignSelf: 'center',
          mb: '2px',
        }}
      />

      <Typography
        sx={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: 'text.primary',
          whiteSpace: 'nowrap',
        }}
      >
        {price}
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
git add packages/web/src/features/pricing/price-row.tsx
git commit -m "feat: add PriceRow component with dotted divider layout"
```

---

## Task 2: PricingSection Component

**Files:**

- Create: `packages/web/src/features/pricing/pricing-section.tsx`
- Create: `packages/web/src/features/pricing/index.ts`

- [ ] **Step 1: Create PricingSection component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/pricing/pricing-section.tsx`:

```tsx
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { copy } from '@/constants/copy'
import { PriceRow } from '@/features/pricing/price-row'
import { useInView } from '@/hooks/use-in-view'

const fadeInUp = {
  '@keyframes fadeInUp': {
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}

export function PricingSection() {
  const { ref, inView } = useInView({ threshold: 0.15 })

  return (
    <Box
      component="section"
      id="prices"
      ref={ref}
      sx={{
        scrollMarginTop: { xs: '64px', md: '72px' },
        bgcolor: 'background.paper',
        py: { xs: 10, md: 15 },
        px: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Box sx={{ maxWidth: 720, mx: 'auto' }}>
        {/* Section Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
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
            {copy.pricing.overline}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.25rem', sm: '2.5rem', md: '2.75rem', lg: '3rem' },
              color: 'text.primary',
              mb: 2,
            }}
          >
            {copy.pricing.title}
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
            {copy.pricing.subtitle}
          </Typography>
        </Box>

        {/* Price List */}
        <Box role="list">
          {copy.pricing.items.map((item, index) => (
            <PriceRow
              key={item.service}
              service={item.service}
              price={item.price}
              index={index}
              animate={inView}
            />
          ))}
        </Box>

        {/* CTA */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 5,
            ...fadeInUp,
            opacity: inView ? 1 : 0,
            '@media (prefers-reduced-motion: no-preference)': {
              animation: inView
                ? `fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${copy.pricing.items.length * 0.08 + 0.1}s both`
                : 'none',
            },
            '@media (prefers-reduced-motion: reduce)': {
              opacity: 1,
            },
          }}
        >
          <Button
            variant="outlined"
            href="#book"
            size="large"
            sx={{
              borderColor: 'text.primary',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'text.primary',
                bgcolor: 'rgba(43, 43, 43, 0.08)',
              },
            }}
          >
            {copy.pricing.cta}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
```

- [ ] **Step 2: Create barrel export**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/pricing/index.ts`:

```ts
export { PricingSection } from '@/features/pricing/pricing-section'
```

- [ ] **Step 3: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/features/pricing/
git commit -m "feat: add PricingSection with menu-style price list"
```

---

## Task 3: Integrate Into App Shell

**Files:**

- Modify: `packages/web/src/app/app.tsx`

- [ ] **Step 1: Update app.tsx**

Add `PricingSection` import and replace the prices placeholder. The file should look like:

```tsx
import { Header, SectionPlaceholder } from '@/components/layout'
import { HeroSection } from '@/features/hero'
import { PricingSection } from '@/features/pricing'
import { ServicesSection } from '@/features/services'

const sectionIds = ['specialists', 'about', 'gallery', 'contact', 'book']

export function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PricingSection />
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

Start dev server (`yarn dev`), open browser, scroll to pricing section. Verify:

- Warm pink background (#F5E6EA) contrasts with white services section above
- Section header (overline + title + subtitle) centered
- Four price rows with dotted dividers
- "View full price list" outlined button below
- Staggered fade-in animation on scroll
- Responsive: rows stay horizontal even on mobile (no stacking)

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/app/app.tsx
git commit -m "feat: integrate PricingSection into app shell"
```
