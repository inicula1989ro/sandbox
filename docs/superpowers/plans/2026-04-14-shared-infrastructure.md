# Shared Infrastructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `useInView` hook, extend the MUI theme with reusable typography/color tokens, and update `copy.ts` with all section content — shared foundations that every section plan depends on.

**Architecture:** `useInView` wraps IntersectionObserver with trigger-once semantics and returns a ref callback + boolean. Theme gets custom typography variants (`overline2`, `subtitle`) and structured palette tokens to eliminate hardcoded font families and color literals. Copy updates add overline/title/subtitle fields and restructure `whyEvo.points` to include icons.

**Tech Stack:** React 19, MUI v9 theme, IntersectionObserver API, TypeScript strict.

---

## Style Tokens Reference

**All section plans MUST use theme tokens instead of hardcoded values.** The code blocks in section plans use inline values for readability; during implementation, substitute per this mapping:

| Hardcoded value                                                         | Theme token                                                                                                                                     |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `fontFamily: '"Inter", sans-serif'`                                     | `theme.typography.fontFamily` (Inter is the default)                                                                                            |
| `color: '#FFFFFF'`                                                      | `'common.white'`                                                                                                                                |
| `color: 'rgba(255,255,255,0.9)'`                                        | `'rgba(255,255,255,0.9)'` via `alpha(theme.palette.common.white, 0.9)` or keep as rgba (acceptable for white opacity variants in dark sections) |
| `color: 'rgba(255,255,255,0.8)'`                                        | same pattern                                                                                                                                    |
| `bgcolor: 'rgba(231, 181, 192, 0.55)'`                                  | `alpha(theme.palette.brand.main, 0.55)` — use `theme.palette.brand.main` as base                                                                |
| `fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase'` | `theme.typography.overline` (extended in Task 2)                                                                                                |
| `fontSize: '0.9375rem', opacity: 0.7`                                   | `theme.typography.subtitle2` (extended in Task 2)                                                                                               |
| `color: 'text.primary'`                                                 | already correct                                                                                                                                 |
| `color: 'primary.main'`                                                 | already correct                                                                                                                                 |
| `color: 'brand.main'`                                                   | already correct                                                                                                                                 |

**The key rule:** No raw `fontFamily` declarations in components. Inter is the theme default; Playfair Display is on `h1`–`h6`; if you need Inter explicitly, just don't set `fontFamily` (it inherits). Use `variant="overline"` or `variant="subtitle2"` for the recurring patterns.

---

## File Map

### Create

- `packages/web/src/hooks/use-in-view.ts` — IntersectionObserver hook (reusable)

### Modify

- `packages/web/src/styles/theme.ts` — extend with overline and subtitle2 typography variants
- `packages/web/src/constants/copy.ts` — add overline/subtitle fields to all sections, restructure whyEvo

---

## Task 1: useInView Hook

**Files:**

- Create: `packages/web/src/hooks/use-in-view.ts`

- [ ] **Step 1: Create the hook**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/hooks/use-in-view.ts`:

```ts
import { useCallback, useRef, useState } from 'react'

interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean
}

export function useInView(options: UseInViewOptions = {}) {
  const { triggerOnce = true, threshold = 0.15, root, rootMargin } = options
  const [inView, setInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const ref = useCallback(
    (node: Element | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }

      if (!node) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (triggerOnce) {
              observer.disconnect()
            }
          } else if (!triggerOnce) {
            setInView(false)
          }
        },
        { threshold, root, rootMargin },
      )

      observer.observe(node)
      observerRef.current = observer
    },
    [triggerOnce, threshold, root, rootMargin],
  )

  return { ref, inView }
}
```

- [ ] **Step 2: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes with no errors.

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/hooks/use-in-view.ts
git commit -m "feat: add useInView hook with IntersectionObserver and trigger-once"
```

---

## Task 2: Extend MUI Theme With Reusable Typography Variants

**Files:**

- Modify: `packages/web/src/styles/theme.ts`

- [ ] **Step 1: Add overline and subtitle2 typography variants to theme**

Edit `/Users/alekseyborisko/Projects/beaty/packages/web/src/styles/theme.ts`. Add these entries inside the `typography` object:

```ts
overline: {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  fontSize: '0.75rem',
  fontWeight: 500,
  letterSpacing: '3px',
  textTransform: 'uppercase' as const,
  lineHeight: 1.5,
},
subtitle2: {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  fontSize: '0.9375rem',
  fontWeight: 400,
  lineHeight: 1.6,
},
```

These encode the two recurring patterns across all sections:

- `overline`: section label above the title ("EVO Studio", "Our Team", etc.)
- `subtitle2`: section subtitle below the title

- [ ] **Step 2: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes. MUI's `TypographyVariants` already includes `overline` and `subtitle2`.

- [ ] **Step 3: Verify existing components still render correctly**

```bash
yarn build
```

Expected: passes. The `overline` and `subtitle2` variants are additive and don't affect existing components that don't use them.

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/styles/theme.ts
git commit -m "feat: extend theme with overline and subtitle2 typography variants"
```

---

## Task 3: Update copy.ts With All Section Content

**Files:**

- Modify: `packages/web/src/constants/copy.ts`

- [ ] **Step 1: Replace full copy.ts**

Replace the contents of `/Users/alekseyborisko/Projects/beaty/packages/web/src/constants/copy.ts` with:

```ts
export const copy = {
  brand: {
    name: 'EVO Studio',
    tagline: 'Beauty, care and confidence in one refined space.',
  },
  nav: {
    services: 'Services',
    prices: 'Prices',
    specialists: 'Specialists',
    about: 'About',
    gallery: 'Gallery',
    contact: 'Contact',
  },
  hero: {
    headline: 'Trust your beauty to professionals',
    subheadline: 'Hair, nails, skincare and beauty treatments in a calm and elegant setting.',
    cta: 'Book Now',
    ctaSecondary: 'View Services',
  },
  services: {
    overline: 'EVO Studio',
    title: 'Signature Services',
    subtitle: 'Five directions of beauty and care, each guided by experienced professionals.',
    categories: {
      hair: { title: 'Hair', description: 'Cuts, coloring, styling and treatments' },
      nails: { title: 'Nails', description: 'Manicure, pedicure, gel and nail art' },
      face: { title: 'Face', description: 'Facials, peels, skincare rituals' },
      browsLashes: {
        title: 'Brows & Lashes',
        description: 'Shaping, tinting, lamination and extensions',
      },
      body: { title: 'Body', description: 'Massage, wraps and body treatments' },
    },
  },
  pricing: {
    overline: 'Transparent Pricing',
    title: 'Selected Prices',
    subtitle: 'Starting prices for our most popular treatments.',
    cta: 'View full price list',
    items: [
      { service: 'Manicure', price: 'from 300 MDL' },
      { service: 'Haircut', price: 'from 250 MDL' },
      { service: 'Coloring', price: 'from 600 MDL' },
      { service: 'Facial care', price: 'from 450 MDL' },
    ],
  },
  specialists: {
    overline: 'Our Team',
    title: 'Our Specialists',
    subtitle: 'Passionate professionals who make every visit exceptional.',
    cta: 'Book',
    items: [
      { name: 'Ana M.', specialization: 'Hair Stylist' },
      { name: 'Elena R.', specialization: 'Nail Artist' },
      { name: 'Victoria P.', specialization: 'Aesthetician' },
      { name: 'Cristina D.', specialization: 'Brow & Lash Specialist' },
    ],
  },
  about: {
    overline: 'Our Story',
    title: 'About Us',
    description:
      'EVO Studio is a space of beauty, care and relaxation, where every detail is designed to make you feel comfortable, confident and well looked after.',
    quote:
      'We believe every woman deserves a place where she can slow down, feel cared for, and leave more confident than when she arrived.',
    quoteAttribution: '— The EVO Studio Team',
  },
  whyEvo: {
    title: 'Why EVO Studio',
    points: [
      { icon: 'people', title: 'Experienced specialists' },
      { icon: 'favorite', title: 'Personalized care' },
      { icon: 'star', title: 'Premium products' },
      { icon: 'spa', title: 'Elegant atmosphere' },
      { icon: 'verified', title: 'Hygiene and comfort' },
      { icon: 'autoAwesome', title: 'Attention to detail' },
    ],
  },
  gallery: {
    overline: 'Our Work',
    title: 'Gallery',
    subtitle: 'A glimpse into the results and the atmosphere at EVO Studio.',
  },
  contact: {
    overline: 'Get in Touch',
    title: 'Contact & Booking',
    address: 'str. Nicolae Starostenco 25',
    phone: '+373 783 67 347',
    hours: 'Mon — Sat: 9:00 — 20:00',
    ctaBook: 'Book an appointment',
    ctaCall: 'Call now',
    ctaDirections: 'Get directions',
    mapPlaceholder: 'View on Google Maps',
  },
  social: {
    instagram: '#',
    facebook: '#',
  },
  footer: {
    copyright: '2026 EVO Studio. All rights reserved.',
  },
} as const
```

- [ ] **Step 2: Verify typecheck and lint**

```bash
yarn typecheck && yarn lint
```

Expected: passes. If `whyEvo.points` change from string[] to object[] causes errors elsewhere, fix them (unlikely — `whyEvo` is only referenced in copy.ts and not yet consumed by any component).

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/constants/copy.ts
git commit -m "feat: add overline/subtitle fields and restructure copy for all sections"
```
