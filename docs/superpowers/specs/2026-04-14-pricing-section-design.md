# EVO Studio — Pricing Section

## Overview

Displays a curated selection of popular services with starting prices. Not a full price list — a teaser that builds confidence ("prices are transparent and reasonable") with a CTA to view the complete list. Positioned after Services — the natural next question after "what do you offer?" is "how much?".

## Design References

- **Tru Salon:** No visible pricing on site — services presented as aspirational blocks. Pricing deferred to booking flow.
- **Kalm Moments:** Pricing tiers embedded within service cards — duration + price pairs, clean layout.

**Blend for EVO:** Standalone pricing section with an elegant, minimal list. Not embedded in service cards (those are visual/aspirational). Clean rows with service name, divider, and price — like a refined restaurant menu. Warm background for contrast.

## 1. Section Layout

### Container

- `id="prices"`, `scroll-margin-top` matching header height
- Background: `brand.light` (#F5E6EA) — warm tinted background to alternate from white services section above
- Vertical padding: `80px` mobile, `120px` desktop
- Content max-width: `720px`, centered (narrower — pricing is a focused, readable list)

### Section Header

1. **Overline:** "Transparent Pricing" — Inter, 12px, letter-spacing 3px, uppercase, `primary.main`
2. **Title:** `copy.pricing.title` ("Selected Prices") — Playfair Display (h2), 36px mobile / 48px desktop, `text.primary`, centered
3. **Subtitle:** New copy — Inter, 0.9375rem, `text.primary` at 70% opacity, centered

### Spacing

- Header to price list: `48px` mobile, `64px` desktop
- Price list to CTA: `40px`

## 2. Price List

### Row Layout

Each price item is a horizontal row:

```
[Service Name] ··············· [Price]
```

- **Service name:** Inter, 1rem, `text.primary`, font-weight 500
- **Dotted divider:** `border-bottom: 1px dotted` `brand.dark` at 40% opacity, `flex: 1`, margin `0 16px`, aligned to text baseline
- **Price:** Inter, 0.9375rem, font-weight 600, `text.primary`
- Row padding: `16px 0`
- Separator between rows: `1px solid brand.main` at 20% opacity

### Items

From `copy.pricing.items`:

1. Manicure — from 300 MDL
2. Haircut — from 250 MDL
3. Coloring — from 600 MDL
4. Facial care — from 450 MDL

### CTA Button

- Text: `copy.pricing.cta` ("View full price list")
- Style: `Button variant="outlined"`, `text.primary` border, centered below list
- Links to `#book` (placeholder — future: link to full price page or PDF)

## 3. Animation

- Section header: `fadeInUp` on scroll
- Price rows: staggered `fadeInUp`, `0.08s` per row (fast, 4 items)
- CTA: `fadeInUp` after last row
- All gated by `prefers-reduced-motion`
- Uses shared `useInView` hook

## 4. Copy Changes

Update `constants/copy.ts`:

```ts
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
```

## 5. File Structure

```
src/features/pricing/
├── pricing-section.tsx    # Main section
├── price-row.tsx          # Single price row
└── index.ts
```

## 6. Component Interfaces

### PricingSection

```tsx
export function PricingSection(): JSX.Element
```

- Reads from `copy.pricing`
- Maps items to `PriceRow` components
- Uses `useInView` for scroll animation

### PriceRow

```tsx
export interface PriceRowProps {
  service: string
  price: string
  index: number
  animate: boolean
}

export function PriceRow(props: PriceRowProps): JSX.Element
```

## 7. Responsive Breakpoints

| Breakpoint   | Max width | Row layout               | Title size |
| ------------ | --------- | ------------------------ | ---------- |
| xs (0-599)   | 100%      | Horizontal, smaller text | 36px       |
| sm (600-899) | 600px     | Horizontal               | 40px       |
| md+          | 720px     | Horizontal, spacious     | 48px       |

On very narrow screens (< 360px): stack service name above price if needed — but at 300px+ the dotted-line layout should fit.

## 8. Accessibility

- Section: `aria-labelledby` on h2
- Price list: `role="list"` on container, `role="listitem"` on each row
- Prices: screen readers hear "Manicure, from 300 MDL" naturally (no hidden text needed)
- Dotted divider: `aria-hidden="true"` (decorative)
- CTA button: clear link text, no "click here"
- All animations respect `prefers-reduced-motion`

## Out of Scope

- Full price list page (placeholder CTA)
- Category filtering
- Currency conversion
- Dynamic pricing from API
