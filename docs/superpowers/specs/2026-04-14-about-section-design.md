# EVO Studio — About Section

## Overview

Combined "About Us" + "Why EVO Studio" section. Tells the salon's story and communicates its six differentiators. Positioned after Specialists — the emotional anchor of the page before the visual gallery.

## Design References

- **Tru Salon:** Aspirational imagery with gradient overlays, minimal text, full-width visual blocks
- **Kalm Moments:** Split layout (image + text), founder quote, clip-path image reveals, staggered text animation

**Blend for EVO:** Two-part section — a cinematic split-layout for the salon story, followed by a compact benefits grid for the six selling points. Warm, confident, personal.

## 1. Section Layout

### Container

- `id="about"`, `scroll-margin-top` matching header height
- Background: `brand.light` (#F5E6EA) — soft tinted background to visually separate from white sections above and below
- Vertical padding: `80px` mobile, `120px` desktop
- Content max-width: `1200px`, centered

### Part A: Salon Story (Split Layout)

**Desktop (md+):** Two-column grid, `1fr 1fr`, gap `64px`, vertically centered.

- **Left column — Image:**
  - Full-height image of salon interior or detail shot
  - `border-radius: 12px`
  - Aspect ratio: `4 / 5` (portrait)
  - Subtle `box-shadow: 0 24px 48px rgba(0,0,0,0.08)`

- **Right column — Text:**
  1. Overline: "Our Story" — Inter, 12px, letter-spacing 3px, uppercase, `primary.main`
  2. Title: `copy.about.title` ("About Us") — Playfair Display (h2), 36px mobile / 44px desktop, `text.primary`
  3. Description: `copy.about.description` — Inter, 1rem, `text.primary` at 85% opacity, line-height 1.7
  4. Founder quote (new copy): italic, Inter, 1rem, `text.primary` at 70% opacity, left border `3px solid brand.main`, `padding-left: 24px`
  5. Founder attribution: Inter, 0.875rem, `text.primary` at 60% opacity

**Mobile (xs-sm):** Single column, stacked — image on top (aspect 16:10 for horizontal space efficiency), text below.

### Part B: Why EVO (Benefits Grid)

Below the story block, separated by `56px` mobile / `72px` desktop.

- **Title:** "Why EVO Studio" — Playfair Display (h3), 28px mobile / 36px desktop, centered
- **Grid:** 2 columns mobile, 3 columns tablet+, gap `32px`
- **Each benefit item:**
  - Decorative number or small icon (MUI icon, `brand.dark` color, 32px)
  - Title: the benefit text from `copy.whyEvo.points` — Inter, 0.9375rem, font-weight 600, `text.primary`
  - No description needed — the title is self-explanatory
  - Optional: thin top border `1px solid brand.main` above each item for visual rhythm

## 2. Animation

- Image: fade-in + slight scale (`0.95 → 1`) on scroll, `0.8s`
- Text elements: staggered `fadeInUp` (same as hero/services), 0.1s increments
- Benefits grid: staggered per item, `0.05s` increments (faster since there are 6)
- All gated by `prefers-reduced-motion`
- Uses shared `useInView` hook

## 3. Copy Changes

Add to `constants/copy.ts`:

```ts
about: {
  overline: 'Our Story',
  title: 'About Us',
  description: 'EVO Studio is a space of beauty, care and relaxation, where every detail is designed to make you feel comfortable, confident and well looked after.',
  quote: 'We believe every woman deserves a place where she can slow down, feel cared for, and leave more confident than when she arrived.',
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
    { icon: 'auto_awesome', title: 'Attention to detail' },
  ],
},
```

Note: `whyEvo.points` changes from string array to object array to support icons.

## 4. Assets

```
src/assets/
└── about-salon.jpg    # Salon interior or detail shot (Unsplash placeholder)
```

## 5. File Structure

```
src/features/about/
├── about-section.tsx    # Main section: story + benefits
├── benefit-item.tsx     # Single benefit with icon + title
└── index.ts
```

## 6. Component Interfaces

### AboutSection

```tsx
export function AboutSection(): JSX.Element
```

- Reads from `copy.about` and `copy.whyEvo`
- Two-part layout: story split + benefits grid
- Uses `useInView` for scroll animations

### BenefitItem

```tsx
export interface BenefitItemProps {
  icon: string
  title: string
  index: number
  animate: boolean
}

export function BenefitItem(props: BenefitItemProps): JSX.Element
```

- Maps icon string to MUI icon component
- Stagger delay based on index

## 7. Responsive Breakpoints

| Breakpoint    | Story layout | Benefits cols | Padding    |
| ------------- | ------------ | ------------- | ---------- |
| xs (0-599)    | Stacked      | 2             | 80px 24px  |
| sm (600-899)  | Stacked      | 2             | 80px 32px  |
| md (900-1199) | Side by side | 3             | 120px 40px |
| lg (1200+)    | Side by side | 3             | 120px 0    |

## 8. Accessibility

- Section: `aria-labelledby` pointing to the h2
- Quote: `<blockquote>` with `<footer>` for attribution
- Benefit icons: `aria-hidden="true"` (decorative, title carries meaning)
- All animations respect `prefers-reduced-motion`

## Out of Scope

- Team member profiles (handled in Specialists section)
- Salon video tour
- Timeline / history
