# EVO Studio — Specialists Section

## Overview

Showcases the salon's team with portrait photos, names, and specializations. Builds trust by putting faces to the brand. Positioned after Pricing — the visitor knows what's offered and what it costs, now they meet who will deliver.

## Design References

- **Tru Salon:** Circular portrait photos in a rotatable gallery, 8 stylists, smooth fade transitions between profiles, grayscale effects, names displayed below
- **Kalm Moments:** Founder-focused with personal quote, no traditional team grid

**Blend for EVO:** Portrait card grid (not carousel — simpler, more accessible) with elegant photo treatment. Warm overlay on hover reveals the specialist's details. Clean, personal, trustworthy.

## 1. Section Layout

### Container

- `id="specialists"`, `scroll-margin-top` matching header height
- Background: `background.default` (#FFFFFF)
- Vertical padding: `80px` mobile, `120px` desktop
- Content max-width: `1200px`, centered

### Section Header

1. **Overline:** "Our Team" — Inter, 12px, letter-spacing 3px, uppercase, `primary.main`
2. **Title:** `copy.specialists.title` ("Our Specialists") — Playfair Display (h2), 36px mobile / 48px desktop, `text.primary`, centered
3. **Subtitle:** New copy — Inter, 0.9375rem, `text.primary` at 70% opacity, max-width 480px, centered

### Spacing

- Header to grid: `56px` mobile, `72px` desktop

## 2. Specialist Cards

### Grid

- CSS Grid: `repeat(2, 1fr)` xs-sm, `repeat(3, 1fr)` md, `repeat(4, 1fr)` lg+
- Gap: `24px` mobile, `32px` desktop
- Centered if fewer than full row

### Card Structure

Each card is a `Box`:

1. **Photo container:**
   - Aspect ratio: `3 / 4` (portrait, matching service cards)
   - `border-radius: 12px`
   - `overflow: hidden`
   - Image: `object-fit: cover`, full container
   - Default: slight desaturation — `filter: saturate(0.85)` for cohesive look

2. **Text below photo:**
   - Name: Playfair Display (h4), 1.125rem, `text.primary`, font-weight 600, `mt: 1.5`
   - Specialization: Inter, 0.8125rem, `text.primary` at 60% opacity, `mt: 0.25`

3. **Hover state:**
   - Photo: `saturate(1)` + `scale(1.03)`, transition `0.5s`
   - Optional: subtle warm overlay fade-in at bottom for emphasis

### Card Semantics

- **No `tabIndex`, no `role="article"`** — cards are not interactive and must not pollute the tab order.
- Photo: `alt="{name}"` on `<img>` (not background image — use actual `<img>` for a11y)
- When booking-from-card is added, wrap the card in an `<a>` tag for free keyboard + screen reader support.

## 3. Data

Static placeholder data in `copy.ts` for now. Future: fetched via React Query (`queryKeys.specialists.all`).

### Placeholder Specialists

```ts
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
```

## 4. Animation

- Cards: staggered `fadeInUp`, `0.1s` per card, triggered by `useInView` on grid container
- Photo desaturation → full color on viewport entry (subtle, only with motion enabled)
- All gated by `prefers-reduced-motion`

## 5. Assets

```
src/assets/
├── specialist-1.jpg
├── specialist-2.jpg
├── specialist-3.jpg
└── specialist-4.jpg
```

Placeholder portraits (Unsplash, professional beauty/salon context, warm lighting, portrait-oriented).

## 6. File Structure

```
src/features/specialists/
├── specialists-section.tsx    # Main section
├── specialist-card.tsx        # Individual card
└── index.ts
```

## 7. Component Interfaces

### SpecialistsSection

```tsx
export function SpecialistsSection(): JSX.Element
```

- Reads from `copy.specialists`
- Maps items to `SpecialistCard` components
- Uses `useInView` for scroll animation

### SpecialistCard

```tsx
export interface SpecialistCardProps {
  name: string
  specialization: string
  image: string
  index: number
  animate: boolean
}

export function SpecialistCard(props: SpecialistCardProps): JSX.Element
```

## 8. Responsive Breakpoints

| Breakpoint    | Columns | Photo aspect | Title size |
| ------------- | ------- | ------------ | ---------- |
| xs (0-599)    | 2       | 3:4          | 36px       |
| sm (600-899)  | 2       | 3:4          | 40px       |
| md (900-1199) | 3       | 3:4          | 44px       |
| lg (1200+)    | 4       | 3:4          | 48px       |

## 9. Accessibility

- Section: `aria-labelledby` on h2
- Photos: real `<img>` tags with descriptive `alt` text
- Cards: not focusable (no interactive behavior yet). When links are added, use `<a>` wrappers.
- All animations respect `prefers-reduced-motion`
- Semantic: `<section>`, `<h2>`, `<h3>` for names

## Out of Scope

- Specialist detail pages or modals
- Booking directly from specialist card (CTA links to `#book`)
- Bio/description text (kept minimal — name + specialization only)
- API integration (static for now)
