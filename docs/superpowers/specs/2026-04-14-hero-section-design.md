# EVO Studio — Hero Section + Sticky Header Design

## Overview

First visible section of the EVO Studio website. Full-viewport hero with centered text over a tinted background image, plus a sticky header with navigation and booking CTA.

## Decisions

- **Layout:** Centered over full-bleed image (variant B — Kalm Moments-inspired)
- **Booking CTA:** Links to Altegio (URL TBD, placeholder `#book`)
- **Logo:** PNG with `filter: brightness(0) invert(1)` for white-on-transparent state, original dark version on scrolled state. See "Logo & Header Readability" section below for risks and mitigation.
- **Scope:** Sticky Header + Hero Section + placeholder section anchors for navigation

## 1. Sticky Header

### Elements

- **Left:** Text wordmark "EVO Studio" (Playfair Display, font-weight 600). White on transparent state, `#2B2B2B` on scrolled state. When a proper logo file (PNG/SVG with transparency) is provided, replace the text with an `<img>`.
- **Center:** Navigation links — Services, Prices, Specialists, About, Gallery, Contact. Each links to `#section-id` (placeholder sections rendered below hero).
- **Right:** "Book Now" button (primary, pill-shape, `#E91E63`). Links to `#book`.

### Behavior

- **Initial state (over hero):** Transparent background, white text/wordmark. Readable because the hero has a dark top gradient (see section 2).
- **On scroll (past ~80px):** `background: rgba(255, 255, 255, 0.95)` with `backdrop-filter: blur(12px)`, dark text (`#2B2B2B`), subtle `box-shadow: 0 1px 4px rgba(0,0,0,0.08)`. Transition: `0.3s ease`.
- **Height:** 72px desktop, 64px mobile.
- **Position:** `position: fixed`, full width, `z-index: 1100`.

### Mobile

- Navigation hidden, replaced by hamburger icon (`aria-label="Open navigation menu"`).
- "Book Now" stays visible in header next to hamburger.
- Hamburger opens MUI `Drawer` (anchor right) with nav links + "Book Now" at bottom.
- **Focus trap:** When drawer is open, Tab cycles within the drawer only. Focus returns to hamburger on close.
- **Keyboard:** `Escape` closes the drawer.
- **Aria:** Drawer has `role="navigation"`, `aria-label="Main navigation"`.

## 2. Hero Section

### Layout

- **Height:** `100vh` desktop, `100svh` mobile (accounts for mobile browser chrome).
- **Background layers (bottom to top):**
  1. Stock beauty portrait image (`background-size: cover`, `background-position: center`)
  2. Brand tint overlay: `rgba(231, 181, 192, 0.75)`
  3. Dark top gradient for header readability: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, transparent 140px)`
- **Content:** Centered vertically and horizontally, `max-width: 600px`, `text-align: center`.
- **Padding-top:** accounts for header height (72px desktop, 64px mobile).

### Content Stack (top to bottom)

1. **Overline:** `copy.brand.name` ("EVO Studio") — Inter, 12px, `letter-spacing: 3px`, `text-transform: uppercase`, color `#E91E63`.
2. **Headline:** `copy.hero.headline` — Playfair Display (h2), 48px desktop / 32px mobile, `#2B2B2B`, `font-weight: 700`.
3. **Subheadline:** `copy.hero.subheadline` — **Inter** (sans-serif, not body1), 16-18px, `#2B2B2B` at 80% opacity, `max-width: 460px`. Sans-serif keeps it clean and readable, matching the brand system of sans body text.
4. **CTA row:** horizontal on desktop (`flex-direction: row`), vertical stack on mobile (`flex-direction: column`).
   - "Book Now" — `Button variant="contained"`, primary color, `href="#book"` (Altegio placeholder).
   - "View Services" — `Button variant="outlined"`, dark border, `href="#services"`.

### Spacing

- Overline to Headline: 16px
- Headline to Subheadline: 14px
- Subheadline to CTA row: 28px
- CTA gap: 12px

### Animation

- Content fades in on page load: `opacity: 0 → 1`, `translateY: 20px → 0`, duration `0.8s`, ease `cubic-bezier(0.4, 0, 0.2, 1)`.
- Staggered: overline (+0s), headline (+0.1s), subheadline (+0.2s), CTAs (+0.3s).
- **Reduced motion:** Wrap in `@media (prefers-reduced-motion: no-preference)`. When reduced motion is preferred, all content appears immediately without animation.

### Scroll Indicator

- Thin chevron (`KeyboardArrowDown` icon from MUI) at bottom center, 32px below content.
- Pulse animation: `opacity 0.4 → 1`, `translateY 0 → 8px`, duration `2s`, infinite.
- `onClick`: smooth scroll to the first section below hero.
- `aria-label="Scroll to content"`, `role="button"`, `tabIndex={0}`.
- Hides after user scrolls past hero (`IntersectionObserver` on hero element).
- **Reduced motion:** Static, no pulse.

### Background Image

- Placeholder: high-quality Unsplash image (beauty/salon theme, soft natural light).
- Saved to `src/assets/hero-bg.jpg` and imported as module.
- The combination of brand tint + dark top gradient ensures text readability regardless of image content.

## 3. Placeholder Sections

To ensure navigation links don't break, render placeholder `<section>` elements below the hero with matching IDs. Each is a minimal empty container (~1px height or visually hidden) that serves as a scroll target:

```tsx
<section id="services" />
<section id="prices" />
<section id="specialists" />
<section id="about" />
<section id="gallery" />
<section id="contact" />
<section id="book" />
```

These will be replaced by real section components as they are built. This approach means:

- Nav links work immediately (smooth scroll to anchor).
- No broken or dead navigation on the first shipped version.
- Each future section simply replaces its placeholder.

## 4. File Structure

```
src/
├── components/layout/
│   ├── header.tsx              # Sticky header with scroll-aware state
│   ├── mobile-menu.tsx         # MUI Drawer with nav + booking CTA
│   ├── section-placeholder.tsx # Reusable placeholder <section> with id
│   └── index.ts
├── features/hero/
│   ├── hero-section.tsx        # Hero component
│   ├── scroll-indicator.tsx    # Animated scroll hint
│   └── index.ts
├── hooks/
│   └── use-scroll-position.ts  # Scroll position hook for header
├── assets/
│   ├── logo.jpg                # Brand logo (temporary, will be replaced)
│   └── hero-bg.jpg             # Hero background image (placeholder)
```

## 5. Component Interfaces

### Header

```tsx
export function Header(): JSX.Element
```

- Uses `useScrollPosition()` to toggle transparent/solid state.
- Nav items from `copy.nav`.
- Text wordmark "EVO Studio" as logo (Playfair Display, styled via `sx`).
- Manages mobile menu open/close state internally.

### MobileMenu

```tsx
export interface MobileMenuProps {
  open: boolean
  onClose: () => void
}
```

- MUI `Drawer` (anchor: right).
- Nav items from `copy.nav` as list.
- "Book Now" button at bottom.
- Focus trap and keyboard `Escape` handled by MUI Drawer natively.
- `aria-label="Main navigation"`.

### HeroSection

```tsx
export function HeroSection(): JSX.Element
```

- Reads content from `copy.hero` and `copy.brand`.
- Background image imported as module.
- Three overlay layers (image, tint, gradient).
- Staggered fade-in animation (respects `prefers-reduced-motion`).

### ScrollIndicator

```tsx
export function ScrollIndicator(): JSX.Element
```

- MUI `KeyboardArrowDown` icon.
- Pulse animation via CSS `@keyframes` (respects `prefers-reduced-motion`).
- `IntersectionObserver` to hide when hero leaves viewport.
- `aria-label="Scroll to content"`, keyboard accessible.

### useScrollPosition

```tsx
export function useScrollPosition(): { scrollY: number; isScrolled: boolean }
```

- Returns current scroll Y and `isScrolled` (true when past 80px).
- Uses `requestAnimationFrame` throttling.
- Cleans up listener on unmount.

## 6. Integration with App Shell

Update `app/app.tsx`:

```tsx
export function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SectionPlaceholder id="services" />
        <SectionPlaceholder id="prices" />
        <SectionPlaceholder id="specialists" />
        <SectionPlaceholder id="about" />
        <SectionPlaceholder id="gallery" />
        <SectionPlaceholder id="contact" />
        <SectionPlaceholder id="book" />
      </main>
    </>
  )
}
```

## 7. Responsive Breakpoints

Using MUI's default breakpoints:

- **xs (0-599px):** Mobile — stacked CTAs, hamburger menu, 32px headline
- **sm (600-899px):** Large mobile — same as xs but wider content area
- **md (900-1199px):** Tablet — horizontal CTAs, full nav visible, 40px headline
- **lg (1200px+):** Desktop — full layout, 48px headline

## 8. Accessibility

- **Reduced motion:** All animations gated by `@media (prefers-reduced-motion: no-preference)`.
- **Mobile menu:** MUI Drawer provides native focus trap, `Escape` to close, focus return.
- **Hamburger button:** `aria-label="Open navigation menu"`, `aria-expanded` state.
- **Scroll indicator:** `role="button"`, `tabIndex={0}`, `aria-label="Scroll to content"`, keyboard `Enter`/`Space` triggers scroll.
- **Nav links:** Semantic `<nav>` wrapper with `aria-label="Main navigation"`.
- **Hero heading:** h2 is appropriate (h1 reserved for page-level if needed later, or can be h1 if this is the page title — decided as h1 during implementation if no other h1 exists).
- **Color contrast:** `#2B2B2B` on brand tint overlay meets WCAG AA for large text. Overline `#E91E63` on tinted background also meets AA for its size.

## Logo & Header Readability (P1 Risk)

The transparent header over the hero image has two fragile points that must be addressed:

### 1. Header text readability over arbitrary hero images

**Problem:** White text/logo on a transparent header is only readable because the dark top gradient (`rgba(0,0,0,0.3) → transparent`) and brand tint overlay (`rgba(231,181,192,0.75)`) darken the top of the hero image. If the hero image is changed to a lighter photo, the gradient may not provide enough contrast.

**Mitigation (implemented):**

- The brand tint overlay at 0.75 opacity is dense enough to mute any image to a mid-tone pink
- The dark top gradient adds a secondary safety net for the header zone specifically
- Both layers together guarantee WCAG AA contrast for white text against any source image

**Hard requirement:** The dark top gradient (`linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 140px)`) MUST remain whenever the hero image changes. Removing it will break header readability.

### 2. Logo PNG with CSS filter

**Problem:** The current approach uses `filter: brightness(0) invert(1)` to turn the dark logo white on the transparent header. This is fragile: it only works correctly on logos with no color detail (pure black/dark), and the filter chain can produce artifacts on some browsers.

**Current status:** The existing logo.png is a simple dark-on-transparent mark, so the filter produces a clean white version. This works.

**Future improvement:** When the brand provides assets, replace with two separate logo files (`logo-dark.png` + `logo-light.png` or a single SVG with CSS `fill` control). This eliminates the filter hack entirely. Until then, the current approach is acceptable but should be treated as temporary.

## Out of Scope

- Real Altegio booking integration (placeholder `#book` link)
- Dual logo variants (using filter-based inversion for now)
- Section content (only placeholder anchors)
- Footer
