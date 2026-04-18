# EVO Studio — Dark Redesign Spec

**Date:** 2026-04-18
**Status:** Approved (pending user spec review)

## Goal

Redesign the EVO Studio single-page site in the visual language of the reference images provided by the client: dark premium aesthetic, pink brand accents, serif + script typography, and multilingual (RU / RO / EN). All booking CTAs point to the existing alteg.io online booking URL.

## Reference Material

Two client-provided images set the visual direction:

1. **Vertical pricing card** — black background, ornate corner flourishes, uppercase serif `ПРАЙС` header with italic script subtitle (`брови`), list of services with pink bullet dots, pink prices (`300 леев`), thin pink divider lines between rows, heart ornament at the bottom.
2. **Promotional banner** — black background, EVO logo top-left, large uppercase serif headline, pink pill badge (`НОВАЯ УСЛУГА`), four feature icons with short labels (`ИДЕАЛЬНАЯ ФОРМА`, etc.), italic script tagline (`Красота в деталях!`), circular photo on the right.

## Decisions Summary

| Area | Decision |
|---|---|
| Scope | Full site redesign |
| Languages | RU + RO + EN, auto-detect via browser, fallback `ru`, persisted in localStorage |
| Pricing content | Keep current placeholder services/prices from existing copy, translate into all three languages |
| Theme | Dark only (no light-mode toggle) |
| Hero | Minimalist — fullscreen dark Unsplash photo + EVO logo + `Красота в деталях` script tagline + primary CTA |
| Pricing layout | Accordion by category (Hair / Nails / Face / Brows / Body), styled like the reference card |
| Booking CTAs | External link to alteg.io online booking |
| Site structure | Simplified single-page: Hero → Services → Pricing → Specialists → Contacts |
| Photos | Unsplash for hero; placeholder avatars for specialists |
| Social / phone | Placeholder `#` links, to be filled later by client |
| i18n library | `react-i18next` + `i18next-browser-languagedetector` |

## External Links

- **Booking URL** (real, provided by client):
  `https://n736120.alteg.io/company/139070/personal/menu?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcARQUB1leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAaeZtJTKE0IqHIJuMNDmrDesldwE8yHsilw-0mFcYNS6LNt1gffszdMWRutu9g_aem_F651As61eVvNmPvwhcUoaw&utm_id=97760_v0_s00_e0_tv3_a1dennhb2qzpb9&o=`
- Instagram, Facebook, phone, WhatsApp — placeholder `#`, to be provided later.

## Visual System

### Palette

```
bg.default      #0A0A0A   page background
bg.paper        #141414   cards, elevated surfaces
primary.main    #E91E63   CTAs, prices, key accents
brand.main      #E7B5C0   script subtitles, soft accents
text.primary    #F5F5F5
text.secondary  #A0A0A0
divider         rgba(231,181,192,0.2)
```

### Typography

- **Playfair Display** — `h1`, `h2`, section headers. Uppercase with letter-spacing for banner-style titles.
- **Cormorant Garamond (italic)** — script subtitles such as `брови`, `Красота в деталях`.
- **Inter** — body copy, navigation, buttons, labels.

Fonts delivered via `@fontsource/*` packages (no external CDN).

### Decorative Elements

- `<CornerFlourish />` — SVG component rendering the curved-line ornament visible in the corners of the reference images. Placed in the 4 corners of the hero and the pricing card.
- `<BulletDot />` — small pink circle used before each price row.
- Heart divider — used once at the bottom of the pricing card, matching the reference image.

## Sections

### Header
Sticky, transparent at top, fades to solid `#0A0A0A` with subtle border on scroll.
- Left: EVO logo (linked to `#top`).
- Center (desktop) / hamburger drawer (mobile): nav links — `Услуги`, `Прайс`, `Специалисты`, `Контакты` (translated per locale).
- Right: `LanguageSwitcher` (RU/RO/EN dropdown) + `Записаться` button (primary fill, opens `BOOKING_URL` in new tab).

### Hero
Full-viewport height (`100vh`).
- Background: dark Unsplash photo (neutral salon / hands / texture) with `rgba(0,0,0,0.6)` overlay.
- Corner flourishes in all 4 corners.
- Center content:
  - Large EVO logo SVG.
  - Script tagline `Красота в деталях` (Cormorant italic, brand color).
  - Primary CTA `Записаться онлайн` → `BOOKING_URL`.

### Services
Section titled via `SectionHeader` (uppercase serif + script subtitle).
- Grid of 5 cards: Волосы, Ногти, Лицо, Брови, Тело.
- Card style: `bg.paper` background, 1px `brand.main` border at 30% opacity, pink outline icon on top, title (Playfair), short description (Inter, `text.secondary`).
- Hover: border brightens to 80% opacity, card translates `-4px`.

### Pricing
The visual centerpiece — mirrors the reference pricing card.
- Section wrapped in a large card with `CornerFlourish` in all 4 corners.
- `SectionHeader`: `ПРАЙС` uppercase + italic script shows the currently open category (`брови`, etc.).
- `Accordion` with 5 entries (one per category). Only one open at a time; Brows open by default.
- Each expanded panel renders a list of `PriceRow`s:
  - Pink bullet dot, service name (Inter), thin pink divider below, price in `primary.main` (`300 леев`).
- Below the accordion: thin heart ornament divider, then CTA `Записаться онлайн` centered.

### Specialists
Section header + 4 cards.
- Circular avatar placeholder: radial gradient `brand.main → primary.main` with EVO monogram.
- Name (Playfair), role (Inter, `text.secondary`).
- Small outlined button `Записаться` → `BOOKING_URL`.

### Contacts
Two-column layout (stacks on mobile).
- Left column:
  - Address `str. Nicolae Starostenco 25` (from existing copy).
  - Hours `Пн — Сб: 9:00 — 20:00`.
  - Phone link (placeholder `#`).
  - Social row: IG, FB (placeholder `#`).
  - Large primary CTA `Записаться онлайн` → `BOOKING_URL`.
- Right column: Google Maps iframe embed centered on the address.

### Footer
Minimal. Centered EVO logo, copyright `© 2026 EVO Studio`, social icons row. Thin top divider.

## Component Inventory

New or rewritten components under `packages/web/src`:

```
components/
├── ui/
│   ├── BrandButton.tsx        # primary + outlined variants, wraps MUI Button
│   ├── CornerFlourish.tsx     # SVG ornament
│   ├── BulletDot.tsx
│   ├── HeartDivider.tsx
│   ├── LanguageSwitcher.tsx   # RU/RO/EN dropdown
│   ├── PriceRow.tsx           # bullet + name + divider + price
│   ├── SectionHeader.tsx      # uppercase title + script subtitle
│   └── SpecialistAvatar.tsx   # gradient circle with monogram
└── layout/
    ├── Header.tsx             # rewritten for dark theme + i18n + language switch
    ├── Footer.tsx             # rewritten minimal dark
    └── Section.tsx            # dark-themed wrapper

features/
├── hero/HeroSection.tsx
├── services/ServicesSection.tsx
├── pricing/PricingSection.tsx            # wraps accordion
├── pricing/PricingAccordion.tsx
├── specialists/SpecialistsSection.tsx
└── contact/ContactSection.tsx

# Removed
features/about/    (deleted)
features/gallery/  (deleted)
# whyEvo copy block removed from the landing page
```

## Technical Architecture

### i18n

- Dependencies: `i18next`, `react-i18next`, `i18next-browser-languagedetector`.
- Single namespace `common`. Translations in `src/locales/{ru,ro,en}.json`.
- Initialization in `src/lib/i18n.ts`; `I18nextProvider` wraps the app in `src/app/App.tsx`.
- Browser language detection with `lookupLocalStorage` → `navigator.language` → fallback `ru`.
- Selection persisted under `localStorage.evo-studio-lang`.
- `src/constants/copy.ts` is removed; all strings migrate to the JSON files.
- `src/constants/links.ts` holds `BOOKING_URL`, `PHONE`, `WHATSAPP`, `INSTAGRAM`, `FACEBOOK`.

### Theme

- `src/styles/theme.ts`:
  - `mode: 'dark'`.
  - Custom palette per the table above.
  - Module augmentation adds `palette.brand` (TypeScript-safe).
  - `typography` references the three font families.
  - `components` overrides for `MuiButton`, `MuiAccordion`, `MuiAccordionSummary`, `MuiContainer`, `MuiAppBar` to match the dark design.
- Fonts imported in `src/main.tsx` via `@fontsource` packages.

### Routing

- Single route `/` renders the landing page.
- In-page navigation uses anchor IDs (`#services`, `#pricing`, `#specialists`, `#contacts`).
- React Router kept for future routes (privacy, terms) without scaffolding them now.

### Dependencies to Add

```
react-i18next
i18next
i18next-browser-languagedetector
@fontsource/playfair-display
@fontsource/cormorant-garamond
@fontsource/inter
```

## Content Model

Pricing content lives in the locale JSON files under the `pricing` key:

```
pricing:
  title: "ПРАЙС" (and locale-appropriate equivalents)
  currency: "леев" / "lei" / "MDL"
  categories:
    brows:     { title, items: [ { service, price } ... ] }
    hair:      { title, items: [ ... ] }
    nails:     { title, items: [ ... ] }
    face:      { title, items: [ ... ] }
    body:      { title, items: [ ... ] }
```

Brow items come directly from the reference card:

- Окрашивание (краска/хна + коррекция бровей) — 300
- Ламинирование + коррекция + окрашивание — 400
- Ламинирование + коррекция — 350
- Коррекция (пинцет/воск) — 150
- SPA-уход / ботокс для бровей — 100
- Удаление нежелательных волосков на лице (одна зона) — 50

Other categories use the placeholder services from the existing `constants/copy.ts` at current-looking prices (to be replaced by the client later).

## Success Criteria

- Site visually matches the reference images: dark background, pink accents, serif + script typography, corner flourishes, accordion pricing card.
- Language switches between RU / RO / EN with immediate text updates and persisted preference.
- All `Записаться` CTAs open the alteg.io booking URL in a new tab.
- Lighthouse Performance ≥ 85, Accessibility ≥ 95 on desktop.
- `yarn lint`, `yarn typecheck`, `yarn build` all pass.
- Responsive: mobile (≤ 600px), tablet (≤ 900px), desktop (≥ 1200px) all render cleanly.

## Out of Scope

- Real photography (client will supply).
- Real specialist names / bios.
- Real phone / social URLs.
- Real pricing for non-brow categories.
- Booking form / CMS — the alteg.io link is the booking surface.
- Blog, privacy / terms pages.
- Analytics, SEO optimization beyond basic meta tags.
