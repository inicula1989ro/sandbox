# EVO Studio — Footer

## Overview

Compact site footer below the Contact section. Provides navigation echo, legal links, and brand closure. Not a major content section — minimal and functional.

## Design References

- **Tru Salon:** Dark footer, stacked logo, contact/hours, social icons, CTA buttons
- **Kalm Moments:** Large animated brand text, dark brown background, contact icons, social links, legal links

**Blend for EVO:** Minimal dark footer that complements the dark Contact section above. Seamless transition (same dark background). Logo, compact nav, social links, copyright. No redundant contact info (already in the section above).

## 1. Layout

### Container

- No `id` needed (not a scroll target)
- Background: `text.primary` (#2B2B2B) — same as Contact section for seamless flow
- Top border: `1px solid rgba(255,255,255,0.08)` — subtle separator from Contact
- Vertical padding: `48px` mobile, `64px` desktop
- Content max-width: `1200px`, centered

### Desktop (md+): Three-Column Row

```
[Logo + Tagline]     [Nav Links]     [Social + Copyright]
```

- Grid: `1fr auto 1fr`
- Vertically centered

**Left — Brand:**

- Logo: `<img>` (logo.png), height `36px`, `filter: brightness(0) invert(1)` for white version
- Tagline: `copy.brand.tagline` — Inter, 0.8125rem, white at 50% opacity, `mt: 0.75`

**Center — Navigation:**

- Horizontal list of nav links from `copy.nav` (same 6 items as header)
- Inter, 0.8125rem, white at 60% opacity
- Hover: white at 100% opacity, transition `0.2s`
- Gap: `24px`

**Right — Social + Legal:**

- Social icon row (Instagram, Facebook, TikTok) — same style as Contact section
- Copyright: Inter, 0.75rem, white at 40% opacity, `mt: 1`
- Text: "2026 EVO Studio. All rights reserved."

### Mobile (xs-sm): Stacked Center-Aligned

All three groups stacked vertically, centered:

1. Logo + tagline
2. Nav links (2-column grid or wrapped row)
3. Social icons
4. Copyright

Gap between groups: `32px`

## 2. File Structure

```
src/components/layout/
├── footer.tsx    # Footer component
└── index.ts     # Update barrel export
```

Not a feature folder — footer is a layout component like Header.

## 3. Component Interface

### Footer

```tsx
export function Footer(): JSX.Element
```

- Reads from `copy.brand`, `copy.nav`, `copy.social`
- Semantic `<footer>` element
- No props needed

## 4. Copy Changes

Add to `constants/copy.ts`:

```ts
footer: {
  copyright: '2026 EVO Studio. All rights reserved.',
},
```

## 5. Integration

Update `app/app.tsx`:

```tsx
import { Footer } from '@/components/layout'

export function App() {
  return (
    <>
      <Header />
      <main>{/* sections */}</main>
      <Footer />
    </>
  )
}
```

## 6. Responsive Breakpoints

| Breakpoint | Layout        | Alignment             |
| ---------- | ------------- | --------------------- |
| xs-sm      | Stacked       | Center                |
| md+        | Three columns | Left / Center / Right |

## 7. Accessibility

- Semantic `<footer>` element
- Nav: `<nav aria-label="Footer navigation">`
- Social links: `aria-label` on each icon button
- All links have visible focus states
- Color contrast: white at 60% on #2B2B2B meets WCAG AA for UI text

## Out of Scope

- Privacy Policy / Terms pages (placeholder links if needed)
- Newsletter signup
- Language switcher
- Back-to-top button
