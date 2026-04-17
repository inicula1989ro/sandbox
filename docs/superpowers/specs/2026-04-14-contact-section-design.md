# EVO Studio — Contact & Booking Section

## Overview

Final content section before the footer. Combines contact information, a map, and a prominent booking CTA. The culmination of the page's narrative: you've seen the services, prices, team, story, and results — now take action.

## Design References

- **Tru Salon:** Dark footer with contact/hours, multiple CTAs, social links
- **Kalm Moments:** Multiple booking triggers throughout site, flatpickr date picker, multi-channel contact (phone, WhatsApp, LINE, email), address with landmark

**Blend for EVO:** Clean split layout — map on one side, contact details + booking CTA on the other. Dark, warm background for visual weight and contrast with the rest of the page. Simple and actionable.

## 1. Section Layout

### Container

- `id="contact"`, `scroll-margin-top` matching header height
- Also serves as `id="book"` target (both nav links scroll here)
- Background: `text.primary` (#2B2B2B) — dark section for dramatic contrast
- Vertical padding: `80px` mobile, `120px` desktop
- Content max-width: `1200px`, centered

### Desktop (md+): Two-Column Split

Grid `1fr 1fr`, gap `64px`, vertically centered.

**Left column — Contact Info:**

1. **Overline:** "Get in Touch" — Inter, 12px, letter-spacing 3px, uppercase, `brand.main` (#E7B5C0)
2. **Title:** `copy.contact.title` ("Contact & Booking") — Playfair Display (h2), 36px mobile / 44px desktop, white
3. **Address:** MUI `PlaceOutlined` icon + `copy.contact.address` — Inter, 0.9375rem, white at 80% opacity
4. **Phone:** MUI `PhoneOutlined` icon + `copy.contact.phone` — Inter, 0.9375rem, white at 80% opacity, `href="tel:..."` link
5. **Hours:** MUI `AccessTimeOutlined` icon + working hours — Inter, 0.9375rem, white at 80% opacity

- Icon + text rows: flex row, gap `12px`, aligned center
- Rows stacked vertically, gap `16px`
- Icons: `brand.main` color, 20px

6. **CTA Buttons (stacked or row):**
   - "Book an appointment" — `Button variant="contained"`, `primary.main`, large, `href="#book"` (placeholder for Altegio)
   - "Call now" — `Button variant="outlined"`, white border, white text, `href="tel:+37378367347"`
   - "Get directions" — `Button variant="text"`, white text, `href` to Google Maps

- Buttons: gap `12px`, stacked on mobile, row on desktop
- Margin-top: `32px` from contact details

**Right column — Map:**

- Embedded Google Maps `<iframe>` or static map image
- `border-radius: 12px`
- `aspect-ratio: 1 / 1` on desktop, `16 / 10` on mobile
- Subtle border: `1px solid rgba(255,255,255,0.1)`
- For MVP: static placeholder image with "View on Google Maps" link overlay
- Future: real Google Maps embed

### Mobile (xs-sm): Single Column

Stacked — contact info on top, map below. Full-width map.

## 2. Social Links

Below contact details, before CTA buttons:

- Row of social media icon buttons (Instagram, Facebook, TikTok — placeholder hrefs)
- Icon buttons: white, 40px touch target, `opacity: 0.7`, hover `opacity: 1`
- Gap: `8px`

## 3. Animation

- Contact info: staggered `fadeInUp`, white text fading in against dark background
- Map: `fadeIn` (no translate — just opacity), `0.6s`
- All gated by `prefers-reduced-motion`
- Uses shared `useInView` hook

## 4. Copy Changes

Update `constants/copy.ts`:

```ts
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
  tiktok: '#',
},
```

## 5. File Structure

```
src/features/contact/
├── contact-section.tsx    # Main section: info + map
├── contact-info.tsx       # Left column: details + CTAs
├── contact-map.tsx        # Right column: map placeholder
└── index.ts
```

## 6. Component Interfaces

### ContactSection

```tsx
export function ContactSection(): JSX.Element
```

- Reads from `copy.contact` and `copy.social`
- Two-column layout on desktop, stacked on mobile
- Uses `useInView` for scroll animation

### ContactInfo

```tsx
export function ContactInfo(props: { animate: boolean }): JSX.Element
```

- Contact details, social links, CTA buttons
- Phone link: `href="tel:..."`, accessible

### ContactMap

```tsx
export function ContactMap(props: { animate: boolean }): JSX.Element
```

- Static map placeholder for MVP
- Future: Google Maps iframe

## 7. Assets

```
src/assets/
└── map-placeholder.jpg    # Static map screenshot or styled placeholder
```

## 8. Responsive Breakpoints

| Breakpoint    | Layout       | Map aspect | Title size |
| ------------- | ------------ | ---------- | ---------- |
| xs (0-599)    | Stacked      | 16:10      | 36px       |
| sm (600-899)  | Stacked      | 16:10      | 40px       |
| md (900-1199) | Side by side | 1:1        | 44px       |
| lg (1200+)    | Side by side | 1:1        | 44px       |

## 9. Accessibility

- Section: `aria-labelledby` on h2
- Phone link: visible, accessible `<a href="tel:...">`
- Map placeholder: `alt` text describing location
- CTA buttons: clear action text
- Social links: `aria-label="Instagram"` etc. on icon buttons
- Color contrast: white text on #2B2B2B exceeds WCAG AAA
- All animations respect `prefers-reduced-motion`
- Both `#contact` and `#book` scroll to this section

## 10. Integration Note

Remove both `'contact'` and `'book'` from `sectionIds` in `app.tsx`. This section handles both anchors by having `id="contact"` and a separate hidden anchor `id="book"` at the same position.

## Out of Scope

- Altegio booking widget integration (placeholder CTA)
- Contact form
- Live Google Maps embed (static placeholder for MVP)
- WhatsApp / Telegram integration
- Working hours per day detail
