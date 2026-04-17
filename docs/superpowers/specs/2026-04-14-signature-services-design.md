# EVO Studio — Signature Services Section

## Overview

The first content section below the hero. Showcases the five service categories as an elegant card grid. The visitor scrolls past the hero and immediately sees what EVO Studio offers, with clear visual hierarchy and a path to booking.

## Design References

- **Tru Salon:** Full-bleed aspirational imagery, muted overlays, generous whitespace, luxury typography. Services presented as large promotional blocks rather than small cards.
- **Kalm Moments:** Three-column card grid, image backgrounds with text overlays, staggered scroll-triggered animations, warm natural palette.

**Blend for EVO Studio:** Kalm Moments' structured card grid with Tru Salon's aspirational image treatment and muted overlay aesthetic. Warm, feminine, premium.

## Decisions

- **Section title:** "Signature Services" (replaces "Our Services" — more premium positioning)
- **Layout:** Responsive card grid — 1 col mobile, 2 col tablet, 3 col desktop (top row 3, bottom row 2 centered)
- **Card style:** Portrait-ratio image cards with brand tint overlay, category title + short description
- **Animation:** Staggered fade-in on scroll (IntersectionObserver), consistent with hero pattern
- **Data:** Static from `copy.ts` (no API, no React Query for this section)
- **Images:** Placeholder Unsplash images per category, imported as modules

## 1. Section Layout

### Container

- `id="services"`, `scroll-margin-top` matching header height (64px mobile / 72px desktop)
- Background: `background.default` (#FFFFFF) — clean contrast after brand-tinted hero
- Vertical padding: `80px` mobile, `120px` desktop
- Content max-width: `1200px`, centered

### Section Header

1. **Overline:** "EVO Studio" — Inter, 12px, `letter-spacing: 3px`, uppercase, color `primary.main` (#E91E63). Same style as hero overline for visual continuity.
2. **Title:** "Signature Services" — Playfair Display (h2), 36px mobile / 48px desktop, `text.primary`, font-weight 600.
3. **Subtitle:** Brand tagline or short intro — Inter, 0.9375rem, `text.primary` at 70% opacity, max-width 520px, centered.

### Spacing

- Overline to Title: 12px
- Title to Subtitle: 16px
- Subtitle to Card Grid: 56px mobile, 72px desktop

## 2. Service Cards

### Grid

- CSS Grid via MUI `Box` with `display: 'grid'`
- Columns: `1fr` (xs), `repeat(2, 1fr)` (sm), `repeat(3, 1fr)` (md+)
- Gap: `24px` mobile, `32px` desktop
- Bottom row (2 cards) centered: use `justifyContent: 'center'` on grid or place items with `gridColumn` offset on md+

### Card Structure

Each card is a `Box` with:

1. **Background image:** Category-specific placeholder (Unsplash, beauty/salon theme)
   - `background-size: cover`, `background-position: center`
2. **Brand overlay:** `rgba(231, 181, 192, 0.55)` — lighter than hero (0.75) to let images show through more
3. **Aspect ratio:** `3 / 4` (portrait) — using CSS `aspect-ratio` property
4. **Content (bottom-aligned):**
   - Category title — Playfair Display (h4), white, font-weight 600, 1.5rem mobile / 1.75rem desktop
   - Description — Inter, 0.875rem, white at 90% opacity, max 2 lines
5. **Bottom gradient:** `linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)` — ensures text readability over any image
6. **Border radius:** `theme.shape.borderRadius` (12px)

### Hover State

- Image scale: `transform: scale(1.05)`, `transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
- Overlay shifts: opacity `0.55 → 0.35` (image becomes more visible)
- Container has `overflow: hidden` to clip scaled image
- **No `cursor: pointer`** — cards are not interactive (no links, no click handlers). Hover effect is purely decorative.

### Card Semantics

- No `tabIndex`, no `role="article"`, no focus ring — cards are not interactive elements and must not pollute the tab order.
- Semantic HTML only: `<div>` with `<h3>` for card title. Screen readers see the heading hierarchy naturally.
- When click-through is added in the future, wrap each card in an `<a>` tag — that gives keyboard focus, click handling, and screen reader announcement for free.

## 3. Animation

### Scroll-triggered Fade-in

- Uses `IntersectionObserver` (threshold `0.15`, `triggerOnce: true`)
- Same `fadeInUp` keyframe as hero: `opacity 0 → 1`, `translateY 24px → 0`, `0.7s`, `cubic-bezier(0.4, 0, 0.2, 1)`
- **Stagger:** Each card gets `animation-delay: index * 0.1s` (0s, 0.1s, 0.2s, 0.3s, 0.4s)
- Section header animates first (no delay), cards follow
- **Reduced motion:** `@media (prefers-reduced-motion: no-preference)` gate. Content renders immediately when motion is reduced.

### Custom Hook: `useInView`

```tsx
export function useInView(options?: IntersectionObserverInit): {
  ref: RefCallback<Element>
  inView: boolean
}
```

- Wraps `IntersectionObserver`
- `triggerOnce` behavior: disconnects after first intersection
- Reusable for future sections (about, gallery, etc.)

## 4. Copy Changes

Update `constants/copy.ts`:

```ts
services: {
  overline: 'EVO Studio',
  title: 'Signature Services',
  subtitle: 'Five directions of beauty and care, each guided by experienced professionals.',
  categories: {
    hair: { title: 'Hair', description: 'Cuts, coloring, styling and treatments' },
    nails: { title: 'Nails', description: 'Manicure, pedicure, gel and nail art' },
    face: { title: 'Face', description: 'Facials, peels, skincare rituals' },
    browsLashes: { title: 'Brows & Lashes', description: 'Shaping, tinting, lamination and extensions' },
    body: { title: 'Body', description: 'Massage, wraps and body treatments' },
  },
},
```

## 5. Assets

Five placeholder images (Unsplash, beauty/salon theme, soft natural light, portrait-oriented):

```
src/assets/
├── services-hair.jpg
├── services-nails.jpg
├── services-face.jpg
├── services-brows.jpg
└── services-body.jpg
```

Images imported as modules in the component. Each ~200-400KB, optimized for web.

## 6. File Structure

```
src/
├── features/services/
│   ├── services-section.tsx     # Main section component
│   ├── service-card.tsx         # Individual card component
│   └── index.ts                 # Barrel export
├── hooks/
│   └── use-in-view.ts           # IntersectionObserver hook (reusable)
```

## 7. Component Interfaces

### ServicesSection

```tsx
export function ServicesSection(): JSX.Element
```

- Reads content from `copy.services`
- Maps `serviceCategories` array (ordered) to `ServiceCard` components
- Uses `useInView` for section-level scroll animation trigger
- Replaces `SectionPlaceholder id="services"` in `app.tsx`

### ServiceCard

```tsx
export interface ServiceCardProps {
  title: string
  description: string
  image: string
  index: number
  animate: boolean
}

export function ServiceCard(props: ServiceCardProps): JSX.Element
```

- `image`: imported module path
- `index`: for stagger delay calculation
- `animate`: controlled by parent's `useInView` state

### useInView

```tsx
export function useInView(options?: IntersectionObserverInit & { triggerOnce?: boolean }): {
  ref: RefCallback<Element>
  inView: boolean
}
```

- Default: `threshold: 0.15`, `triggerOnce: true`
- Returns ref callback (no `useRef` dependency — works with conditional rendering)
- Cleans up observer on unmount

## 8. Integration

Update `app/app.tsx`:

```tsx
import { ServicesSection } from '@/features/services'

// Replace SectionPlaceholder id="services" with:
;<ServicesSection />
```

Remove `'services'` from the `sectionIds` array.

## 9. Responsive Breakpoints

| Breakpoint    | Columns | Card size                   | Section padding | Title size |
| ------------- | ------- | --------------------------- | --------------- | ---------- |
| xs (0-599)    | 1       | Full width                  | 80px 24px       | 36px       |
| sm (600-899)  | 2       | ~50%                        | 80px 32px       | 40px       |
| md (900-1199) | 3       | ~33%                        | 120px 40px      | 44px       |
| lg (1200+)    | 3       | ~33% (max 1200px container) | 120px 0         | 48px       |

Bottom row (2 cards on 3-col layout): Cards span columns 1-2 and 2-3 respectively, leaving the center alignment effect. Alternative: use flexbox wrap with fixed card max-width for natural centering.

## 10. Accessibility

- **Reduced motion:** All animations gated by `@media (prefers-reduced-motion: no-preference)`
- **Cards are not focusable** — no tab stop, no interactive role. When links are added, use `<a>` wrappers.
- **Screen readers:** Section has `aria-labelledby` pointing to the h2. Cards use semantic `<h3>` headings.
- **Color contrast:** White text on dark gradient overlay meets WCAG AA for large text. Tested against lightest possible card image.
- **Semantic HTML:** `<section>` wrapper, `<h2>` for section title, `<h3>` for card titles

## Out of Scope

- Click-through to individual service pages (placeholder — cards are non-linking for now)
- Service detail modals or expandable cards
- Price display on cards (handled in separate Pricing section)
- Real service images from salon (using Unsplash placeholders)
- API integration (static data from copy.ts)
