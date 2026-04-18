# EVO Studio Dark Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a full dark-themed redesign of the EVO Studio single-page site per the approved spec (`docs/superpowers/specs/2026-04-18-dark-redesign-design.md`).

**Architecture:** Single-page Vite + React 19 + MUI v9 + react-i18next. Dark MUI theme with pink accents, serif + script typography, fontsource-provided web fonts. Sections: Hero → Services → Pricing (accordion) → Specialists → Contacts. All booking CTAs open alteg.io in a new tab.

**Tech Stack:** Vite, React 19, TypeScript strict, MUI v9 (Emotion), react-i18next, i18next-browser-languagedetector, @fontsource (Playfair Display, Cormorant Garamond, Inter), React Router v7.

**Verification model:** This project has no test runner configured. Each task ends with `yarn typecheck` + `yarn lint` run from the repo root. Final verification uses Preview (`mcp__Claude_Preview__preview_start`) + `preview_screenshot` + browser smoke tests.

---

## File Structure

Files created / rewritten under `packages/web/src/`:

```
lib/
  i18n.ts                          # i18next init
locales/
  ru.json                          # full copy tree
  ro.json                          # full copy tree
  en.json                          # full copy tree
constants/
  links.ts                         # BOOKING_URL, PHONE, WHATSAPP, INSTAGRAM, FACEBOOK
styles/
  theme.ts                         # rewritten: dark palette + overrides
app/
  app.tsx                          # simplified section list
  providers.tsx                    # adds I18nextProvider
components/
  ui/
    brand-button.tsx               # primary + outlined variants
    corner-flourish.tsx            # SVG ornament
    bullet-dot.tsx
    heart-divider.tsx
    language-switcher.tsx
    price-row.tsx                  # moved out of features/pricing
    section-header.tsx
    specialist-avatar.tsx
    evo-logo.tsx                   # centralized logo component
    index.ts
  layout/
    header.tsx                     # rewritten dark + i18n + lang switcher
    footer.tsx                     # rewritten minimal dark
    section.tsx                    # new dark wrapper
    index.ts
features/
  hero/
    hero-section.tsx               # rewritten: fullscreen photo, logo, tagline, CTA
    index.ts
  services/
    services-section.tsx           # rewritten dark 5-card grid
    index.ts
  pricing/
    pricing-section.tsx            # rewritten with accordion
    pricing-accordion.tsx
    index.ts
  specialists/
    specialists-section.tsx        # rewritten dark
    index.ts
  contact/
    contact-section.tsx            # rewritten dark 2-column
    index.ts
main.tsx                           # imports @fontsource/* CSS
```

Removed:
- `features/about/` (directory)
- `features/gallery/` (directory)
- `components/layout/mobile-menu.tsx` (replaced — new mobile menu lives inside `header.tsx`)
- `components/layout/section-placeholder.tsx`
- `features/hero/scroll-indicator.tsx`
- `features/pricing/price-row.tsx` (moved to `components/ui/price-row.tsx`)
- `constants/copy.ts`
- `styles/animations.ts` (not needed; MUI `sx` transitions are sufficient)

---

## Task 1: Install dependencies and wire font imports

**Files:**
- Modify: `packages/web/package.json`
- Modify: `packages/web/src/main.tsx`

- [ ] **Step 1: Install runtime deps**

Run from repo root:
```bash
yarn workspace @evo/web add i18next react-i18next i18next-browser-languagedetector @fontsource/playfair-display @fontsource/cormorant-garamond @fontsource/inter
```

- [ ] **Step 2: Import font CSS in main.tsx**

Replace the contents of `packages/web/src/main.tsx` with:

```tsx
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/cormorant-garamond/400-italic.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from '@/app/app'
import { Providers } from '@/app/providers'
import '@/lib/i18n'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found')
}

createRoot(root).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
)
```

Note: `@/lib/i18n` is referenced now but created in Task 3. Typecheck will pass only after Task 3 completes.

- [ ] **Step 3: Commit**

```bash
git add packages/web/package.json package.json yarn.lock packages/web/src/main.tsx
git commit -m "chore: add i18n + fontsource dependencies"
```

---

## Task 2: Dark MUI theme

**Files:**
- Rewrite: `packages/web/src/styles/theme.ts`

- [ ] **Step 1: Rewrite theme**

Replace the full contents of `packages/web/src/styles/theme.ts` with:

```ts
import { createTheme, alpha } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    brand: Palette['primary']
  }
  interface PaletteOptions {
    brand?: PaletteOptions['primary']
  }
}

const PINK = '#E91E63'
const BRAND = '#E7B5C0'
const BG_DEFAULT = '#0A0A0A'
const BG_PAPER = '#141414'
const TEXT_PRIMARY = '#F5F5F5'
const TEXT_SECONDARY = '#A0A0A0'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: PINK, contrastText: '#FFFFFF' },
    background: { default: BG_DEFAULT, paper: BG_PAPER },
    text: { primary: TEXT_PRIMARY, secondary: TEXT_SECONDARY },
    divider: alpha(BRAND, 0.2),
    brand: {
      main: BRAND,
      light: '#F5E6EA',
      dark: '#D4919F',
      contrastText: '#2B2B2B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      letterSpacing: '0.04em',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      letterSpacing: '0.04em',
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      fontSize: '0.9375rem',
      lineHeight: 1.6,
    },
    overline: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '3px',
      textTransform: 'uppercase' as const,
      lineHeight: 1.5,
    },
    button: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        body: { backgroundColor: BG_DEFAULT, color: TEXT_PRIMARY },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          padding: '12px 32px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiAccordion: {
      defaultProps: { elevation: 0, disableGutters: true, square: true },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderBottom: `1px solid ${alpha(BRAND, 0.2)}`,
          '&:before': { display: 'none' },
          '&.Mui-expanded': { margin: 0 },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '16px 0',
          minHeight: 'unset',
          '&.Mui-expanded': { minHeight: 'unset' },
        },
        content: {
          margin: 0,
          '&.Mui-expanded': { margin: 0 },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: { padding: '8px 0 24px 0' },
      },
    },
  },
})
```

- [ ] **Step 2: Typecheck**

Run from repo root: `yarn typecheck`

Expected: existing errors caused by Task 1 references (missing `@/lib/i18n`) remain; no new errors from the theme.

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/styles/theme.ts
git commit -m "feat(theme): switch to dark mode with pink accents"
```

---

## Task 3: i18n infrastructure

**Files:**
- Create: `packages/web/src/lib/i18n.ts`
- Create: `packages/web/src/locales/ru.json`
- Create: `packages/web/src/locales/ro.json`
- Create: `packages/web/src/locales/en.json`
- Modify: `packages/web/src/app/providers.tsx`

- [ ] **Step 1: Create `src/lib/i18n.ts`**

```ts
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from '@/locales/en.json'
import ro from '@/locales/ro.json'
import ru from '@/locales/ru.json'

export const SUPPORTED_LANGUAGES = ['ru', 'ro', 'en'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: { common: ru },
      ro: { common: ro },
      en: { common: en },
    },
    defaultNS: 'common',
    ns: ['common'],
    fallbackLng: 'ru',
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'evo-studio-lang',
      caches: ['localStorage'],
    },
  })

export default i18n
```

- [ ] **Step 2: Create `src/locales/ru.json`**

```json
{
  "brand": {
    "name": "EVO Studio",
    "tagline": "Красота в деталях"
  },
  "nav": {
    "services": "Услуги",
    "pricing": "Прайс",
    "specialists": "Специалисты",
    "contact": "Контакты",
    "book": "Записаться"
  },
  "hero": {
    "tagline": "Красота в деталях",
    "cta": "Записаться онлайн"
  },
  "services": {
    "overline": "EVO Studio",
    "title": "Услуги",
    "subtitle": "Пять направлений красоты и ухода под руководством опытных мастеров.",
    "items": {
      "hair": { "title": "Волосы", "description": "Стрижки, окрашивание, укладки и уход" },
      "nails": { "title": "Ногти", "description": "Маникюр, педикюр, гель и дизайн" },
      "face": { "title": "Лицо", "description": "Чистки, пилинги, ритуалы ухода" },
      "brows": { "title": "Брови и ресницы", "description": "Коррекция, окрашивание, ламинирование" },
      "body": { "title": "Тело", "description": "Массаж, обёртывания, уход за телом" }
    }
  },
  "pricing": {
    "overline": "Прозрачные цены",
    "title": "ПРАЙС",
    "subtitleByCategory": {
      "brows": "брови",
      "hair": "волосы",
      "nails": "ногти",
      "face": "лицо",
      "body": "тело"
    },
    "currency": "леев",
    "cta": "Записаться онлайн",
    "categories": {
      "brows": {
        "title": "Брови и ресницы",
        "items": [
          { "service": "Окрашивание (краска/хна + коррекция бровей)", "price": "300" },
          { "service": "Ламинирование + коррекция + окрашивание", "price": "400" },
          { "service": "Ламинирование + коррекция", "price": "350" },
          { "service": "Коррекция (пинцет/воск)", "price": "150" },
          { "service": "SPA-уход / ботокс для бровей", "price": "100" },
          { "service": "Удаление нежелательных волосков на лице (одна зона)", "price": "50" }
        ]
      },
      "hair": {
        "title": "Волосы",
        "items": [
          { "service": "Стрижка", "price": "от 250" },
          { "service": "Окрашивание", "price": "от 600" },
          { "service": "Укладка", "price": "от 200" },
          { "service": "Уход и восстановление", "price": "от 400" }
        ]
      },
      "nails": {
        "title": "Ногти",
        "items": [
          { "service": "Маникюр классический", "price": "от 300" },
          { "service": "Маникюр + покрытие гель-лаком", "price": "от 450" },
          { "service": "Педикюр", "price": "от 400" },
          { "service": "Дизайн (за ноготь)", "price": "от 30" }
        ]
      },
      "face": {
        "title": "Лицо",
        "items": [
          { "service": "Чистка лица", "price": "от 450" },
          { "service": "Пилинг", "price": "от 500" },
          { "service": "Уходовый ритуал", "price": "от 600" }
        ]
      },
      "body": {
        "title": "Тело",
        "items": [
          { "service": "Массаж классический (60 мин)", "price": "от 500" },
          { "service": "Обёртывание", "price": "от 450" }
        ]
      }
    }
  },
  "specialists": {
    "overline": "Наша команда",
    "title": "Специалисты",
    "subtitle": "Профессионалы, которые делают каждый визит особенным.",
    "cta": "Записаться",
    "items": [
      { "name": "Ана М.", "role": "Парикмахер-стилист" },
      { "name": "Елена Р.", "role": "Мастер маникюра" },
      { "name": "Виктория П.", "role": "Косметолог" },
      { "name": "Кристина Д.", "role": "Мастер бровей и ресниц" }
    ]
  },
  "contact": {
    "overline": "Свяжитесь с нами",
    "title": "Контакты",
    "addressLabel": "Адрес",
    "address": "str. Nicolae Starostenco 25, Chisinau",
    "hoursLabel": "Часы работы",
    "hours": "Пн — Сб: 9:00 — 20:00",
    "phoneLabel": "Телефон",
    "phone": "+373 000 000 000",
    "socialLabel": "Соцсети",
    "cta": "Записаться онлайн"
  },
  "footer": {
    "copyright": "© 2026 EVO Studio. Все права защищены."
  },
  "language": {
    "ru": "RU",
    "ro": "RO",
    "en": "EN",
    "label": "Язык"
  }
}
```

- [ ] **Step 3: Create `src/locales/ro.json`**

```json
{
  "brand": {
    "name": "EVO Studio",
    "tagline": "Frumusețea în detalii"
  },
  "nav": {
    "services": "Servicii",
    "pricing": "Prețuri",
    "specialists": "Specialiști",
    "contact": "Contact",
    "book": "Programare"
  },
  "hero": {
    "tagline": "Frumusețea în detalii",
    "cta": "Programare online"
  },
  "services": {
    "overline": "EVO Studio",
    "title": "Servicii",
    "subtitle": "Cinci direcții de frumusețe și îngrijire, conduse de profesioniști cu experiență.",
    "items": {
      "hair": { "title": "Păr", "description": "Tunsori, vopsit, coafuri și tratamente" },
      "nails": { "title": "Unghii", "description": "Manichiură, pedichiură, gel și design" },
      "face": { "title": "Ten", "description": "Curățare, peeling, ritualuri de îngrijire" },
      "brows": { "title": "Sprâncene și gene", "description": "Corectare, vopsit, laminare" },
      "body": { "title": "Corp", "description": "Masaj, împachetări, îngrijire corporală" }
    }
  },
  "pricing": {
    "overline": "Prețuri transparente",
    "title": "PREȚURI",
    "subtitleByCategory": {
      "brows": "sprâncene",
      "hair": "păr",
      "nails": "unghii",
      "face": "ten",
      "body": "corp"
    },
    "currency": "lei",
    "cta": "Programare online",
    "categories": {
      "brows": {
        "title": "Sprâncene și gene",
        "items": [
          { "service": "Vopsit (vopsea/henna + corectare)", "price": "300" },
          { "service": "Laminare + corectare + vopsit", "price": "400" },
          { "service": "Laminare + corectare", "price": "350" },
          { "service": "Corectare (pensetă/ceară)", "price": "150" },
          { "service": "SPA / botox pentru sprâncene", "price": "100" },
          { "service": "Epilare facială (o zonă)", "price": "50" }
        ]
      },
      "hair": {
        "title": "Păr",
        "items": [
          { "service": "Tuns", "price": "de la 250" },
          { "service": "Vopsit", "price": "de la 600" },
          { "service": "Coafat", "price": "de la 200" },
          { "service": "Tratament de întreținere", "price": "de la 400" }
        ]
      },
      "nails": {
        "title": "Unghii",
        "items": [
          { "service": "Manichiură clasică", "price": "de la 300" },
          { "service": "Manichiură + gel lac", "price": "de la 450" },
          { "service": "Pedichiură", "price": "de la 400" },
          { "service": "Design (pe unghie)", "price": "de la 30" }
        ]
      },
      "face": {
        "title": "Ten",
        "items": [
          { "service": "Curățare facială", "price": "de la 450" },
          { "service": "Peeling", "price": "de la 500" },
          { "service": "Ritual de îngrijire", "price": "de la 600" }
        ]
      },
      "body": {
        "title": "Corp",
        "items": [
          { "service": "Masaj clasic (60 min)", "price": "de la 500" },
          { "service": "Împachetare", "price": "de la 450" }
        ]
      }
    }
  },
  "specialists": {
    "overline": "Echipa noastră",
    "title": "Specialiști",
    "subtitle": "Profesioniști care fac fiecare vizită specială.",
    "cta": "Programare",
    "items": [
      { "name": "Ana M.", "role": "Stilist păr" },
      { "name": "Elena R.", "role": "Manichiuristă" },
      { "name": "Victoria P.", "role": "Cosmetolog" },
      { "name": "Cristina D.", "role": "Specialist sprâncene și gene" }
    ]
  },
  "contact": {
    "overline": "Ia legătura",
    "title": "Contact",
    "addressLabel": "Adresă",
    "address": "str. Nicolae Starostenco 25, Chișinău",
    "hoursLabel": "Program",
    "hours": "Lun — Sâm: 9:00 — 20:00",
    "phoneLabel": "Telefon",
    "phone": "+373 000 000 000",
    "socialLabel": "Rețele",
    "cta": "Programare online"
  },
  "footer": {
    "copyright": "© 2026 EVO Studio. Toate drepturile rezervate."
  },
  "language": {
    "ru": "RU",
    "ro": "RO",
    "en": "EN",
    "label": "Limbă"
  }
}
```

- [ ] **Step 4: Create `src/locales/en.json`**

```json
{
  "brand": {
    "name": "EVO Studio",
    "tagline": "Beauty in the details"
  },
  "nav": {
    "services": "Services",
    "pricing": "Prices",
    "specialists": "Specialists",
    "contact": "Contact",
    "book": "Book"
  },
  "hero": {
    "tagline": "Beauty in the details",
    "cta": "Book online"
  },
  "services": {
    "overline": "EVO Studio",
    "title": "Services",
    "subtitle": "Five directions of beauty and care, each guided by experienced professionals.",
    "items": {
      "hair": { "title": "Hair", "description": "Cuts, coloring, styling and treatments" },
      "nails": { "title": "Nails", "description": "Manicure, pedicure, gel and nail art" },
      "face": { "title": "Face", "description": "Facials, peels, skincare rituals" },
      "brows": { "title": "Brows & Lashes", "description": "Shaping, tinting, lamination" },
      "body": { "title": "Body", "description": "Massage, wraps, body treatments" }
    }
  },
  "pricing": {
    "overline": "Transparent Pricing",
    "title": "PRICES",
    "subtitleByCategory": {
      "brows": "brows",
      "hair": "hair",
      "nails": "nails",
      "face": "face",
      "body": "body"
    },
    "currency": "MDL",
    "cta": "Book online",
    "categories": {
      "brows": {
        "title": "Brows & Lashes",
        "items": [
          { "service": "Tinting (dye/henna + shaping)", "price": "300" },
          { "service": "Lamination + shaping + tinting", "price": "400" },
          { "service": "Lamination + shaping", "price": "350" },
          { "service": "Shaping (tweezer/wax)", "price": "150" },
          { "service": "SPA / brow botox", "price": "100" },
          { "service": "Facial hair removal (one zone)", "price": "50" }
        ]
      },
      "hair": {
        "title": "Hair",
        "items": [
          { "service": "Haircut", "price": "from 250" },
          { "service": "Coloring", "price": "from 600" },
          { "service": "Styling", "price": "from 200" },
          { "service": "Treatment", "price": "from 400" }
        ]
      },
      "nails": {
        "title": "Nails",
        "items": [
          { "service": "Classic manicure", "price": "from 300" },
          { "service": "Manicure + gel polish", "price": "from 450" },
          { "service": "Pedicure", "price": "from 400" },
          { "service": "Nail art (per nail)", "price": "from 30" }
        ]
      },
      "face": {
        "title": "Face",
        "items": [
          { "service": "Facial cleansing", "price": "from 450" },
          { "service": "Peel", "price": "from 500" },
          { "service": "Care ritual", "price": "from 600" }
        ]
      },
      "body": {
        "title": "Body",
        "items": [
          { "service": "Classic massage (60 min)", "price": "from 500" },
          { "service": "Body wrap", "price": "from 450" }
        ]
      }
    }
  },
  "specialists": {
    "overline": "Our Team",
    "title": "Specialists",
    "subtitle": "Professionals who make every visit exceptional.",
    "cta": "Book",
    "items": [
      { "name": "Ana M.", "role": "Hair Stylist" },
      { "name": "Elena R.", "role": "Nail Artist" },
      { "name": "Victoria P.", "role": "Aesthetician" },
      { "name": "Cristina D.", "role": "Brow & Lash Specialist" }
    ]
  },
  "contact": {
    "overline": "Get in Touch",
    "title": "Contact",
    "addressLabel": "Address",
    "address": "str. Nicolae Starostenco 25, Chisinau",
    "hoursLabel": "Hours",
    "hours": "Mon — Sat: 9:00 — 20:00",
    "phoneLabel": "Phone",
    "phone": "+373 000 000 000",
    "socialLabel": "Social",
    "cta": "Book online"
  },
  "footer": {
    "copyright": "© 2026 EVO Studio. All rights reserved."
  },
  "language": {
    "ru": "RU",
    "ro": "RO",
    "en": "EN",
    "label": "Language"
  }
}
```

- [ ] **Step 5: Update `src/app/providers.tsx` to wrap with I18nextProvider**

Replace the full contents with:

```tsx
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'

import i18n from '@/lib/i18n'
import { theme } from '@/styles/theme'

export interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  )
}
```

- [ ] **Step 6: Enable JSON resolution in tsconfig (if not already)**

Check `packages/web/tsconfig.json`. If `resolveJsonModule` is not set to `true` in the compilerOptions, add it. If `tsconfig.json` extends a base, inspect the base; add `"resolveJsonModule": true` either in the web package config or in the relevant base.

- [ ] **Step 7: Typecheck**

Run from repo root: `yarn typecheck`

Expected: passes. (App.tsx still imports removed `about` / `gallery` — that's cleaned up in Task 10. If typecheck fails only on those imports, proceed.)

- [ ] **Step 8: Commit**

```bash
git add packages/web/src/lib/ packages/web/src/locales/ packages/web/src/app/providers.tsx packages/web/tsconfig.json
git commit -m "feat(i18n): set up react-i18next with RU/RO/EN"
```

---

## Task 4: Links constants

**Files:**
- Create: `packages/web/src/constants/links.ts`

- [ ] **Step 1: Create the file**

```ts
export const BOOKING_URL =
  'https://n736120.alteg.io/company/139070/personal/menu?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcARQUB1leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAaeZtJTKE0IqHIJuMNDmrDesldwE8yHsilw-0mFcYNS6LNt1gffszdMWRutu9g_aem_F651As61eVvNmPvwhcUoaw&utm_id=97760_v0_s00_e0_tv3_a1dennhb2qzpb9&o='

export const PHONE_URL = '#'
export const WHATSAPP_URL = '#'
export const INSTAGRAM_URL = '#'
export const FACEBOOK_URL = '#'

export const MAP_EMBED_SRC =
  'https://www.google.com/maps?q=str.+Nicolae+Starostenco+25,+Chisinau&output=embed'
```

- [ ] **Step 2: Commit**

```bash
git add packages/web/src/constants/links.ts
git commit -m "feat(constants): add external links placeholders"
```

---

## Task 5: UI primitives

**Files (all under `packages/web/src/components/ui/`):**
- Create: `evo-logo.tsx`
- Create: `corner-flourish.tsx`
- Create: `bullet-dot.tsx`
- Create: `heart-divider.tsx`
- Create: `brand-button.tsx`
- Create: `section-header.tsx`
- Create: `language-switcher.tsx`
- Create: `price-row.tsx`
- Create: `specialist-avatar.tsx`
- Create: `index.ts`

- [ ] **Step 1: `evo-logo.tsx`**

```tsx
import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'

export interface EvoLogoProps {
  size?: number
  sx?: SxProps<Theme>
}

export function EvoLogo({ size = 64, sx }: EvoLogoProps) {
  return (
    <Box
      component="svg"
      viewBox="0 0 160 80"
      sx={{ width: size * 2, height: size, display: 'block', ...sx }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="10"
        y="52"
        fontFamily="Playfair Display, serif"
        fontSize="52"
        fontWeight="700"
        fill="#F5F5F5"
        letterSpacing="2"
      >
        EV
      </text>
      <text
        x="98"
        y="52"
        fontFamily="Playfair Display, serif"
        fontSize="52"
        fontWeight="700"
        fill="#F5F5F5"
        letterSpacing="2"
      >
        O
      </text>
      <path
        d="M 78 8 Q 92 10 102 22 Q 112 34 104 44 Q 96 52 86 44"
        stroke="#E91E63"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <text
        x="46"
        y="72"
        fontFamily="Inter, sans-serif"
        fontSize="11"
        fontWeight="400"
        fill="#F5F5F5"
        letterSpacing="6"
      >
        STUDIO
      </text>
    </Box>
  )
}
```

- [ ] **Step 2: `corner-flourish.tsx`**

```tsx
import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'

export type FlourishCorner = 'tl' | 'tr' | 'bl' | 'br'

export interface CornerFlourishProps {
  corner: FlourishCorner
  size?: number
  sx?: SxProps<Theme>
}

const ROTATIONS: Record<FlourishCorner, string> = {
  tl: 'rotate(0deg)',
  tr: 'rotate(90deg)',
  br: 'rotate(180deg)',
  bl: 'rotate(270deg)',
}

const POSITIONS: Record<FlourishCorner, { top?: number; bottom?: number; left?: number; right?: number }> = {
  tl: { top: 0, left: 0 },
  tr: { top: 0, right: 0 },
  bl: { bottom: 0, left: 0 },
  br: { bottom: 0, right: 0 },
}

export function CornerFlourish({ corner, size = 160, sx }: CornerFlourishProps) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        pointerEvents: 'none',
        width: size,
        height: size,
        transform: ROTATIONS[corner],
        ...POSITIONS[corner],
        ...sx,
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 160 160"
        sx={{ width: '100%', height: '100%', display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="#E91E63" strokeWidth="1.1" strokeLinecap="round" opacity="0.85">
          <path d="M 0 20 Q 40 20 80 45 Q 120 70 158 72" />
          <path d="M 0 40 Q 35 40 70 60 Q 105 80 150 82" />
          <path d="M 0 60 Q 30 60 60 75 Q 90 90 140 92" />
          <path d="M 0 80 Q 25 80 50 90 Q 80 100 128 102" />
        </g>
      </Box>
    </Box>
  )
}
```

- [ ] **Step 3: `bullet-dot.tsx`**

```tsx
import Box from '@mui/material/Box'

export interface BulletDotProps {
  size?: number
}

export function BulletDot({ size = 10 }: BulletDotProps) {
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '1.5px solid',
        borderColor: 'primary.main',
        flexShrink: 0,
      }}
    />
  )
}
```

- [ ] **Step 4: `heart-divider.tsx`**

```tsx
import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'

export function HeartDivider() {
  const theme = useTheme()
  const line = alpha(theme.palette.brand.main, 0.4)

  return (
    <Box
      aria-hidden
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        my: 2,
      }}
    >
      <Box sx={{ flex: 1, height: '1px', background: line }} />
      <Box
        component="svg"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        sx={{ width: 20, height: 20 }}
      >
        <path
          d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.65 12 21 12 21z"
          fill="none"
          stroke="#E91E63"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </Box>
      <Box sx={{ flex: 1, height: '1px', background: line }} />
    </Box>
  )
}
```

- [ ] **Step 5: `brand-button.tsx`**

```tsx
import Button, { type ButtonProps } from '@mui/material/Button'
import { forwardRef } from 'react'

export interface BrandButtonProps extends Omit<ButtonProps, 'color' | 'variant'> {
  variant?: 'primary' | 'outlined'
}

export const BrandButton = forwardRef<HTMLButtonElement, BrandButtonProps>(function BrandButton(
  { variant = 'primary', sx, children, ...rest },
  ref,
) {
  if (variant === 'outlined') {
    return (
      <Button
        ref={ref}
        variant="outlined"
        color="primary"
        sx={{
          borderColor: 'primary.main',
          color: 'primary.main',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'rgba(233, 30, 99, 0.08)',
          },
          ...sx,
        }}
        {...rest}
      >
        {children}
      </Button>
    )
  }

  return (
    <Button
      ref={ref}
      variant="contained"
      color="primary"
      sx={{
        color: '#FFFFFF',
        boxShadow: 'none',
        '&:hover': { boxShadow: '0 0 24px rgba(233,30,99,0.35)' },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  )
})
```

- [ ] **Step 6: `section-header.tsx`**

```tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'

export interface SectionHeaderProps {
  overline?: string
  title: string
  script?: string
  align?: 'center' | 'left'
  sx?: SxProps<Theme>
}

export function SectionHeader({ overline, title, script, align = 'center', sx }: SectionHeaderProps) {
  return (
    <Box sx={{ textAlign: align, mb: 6, ...sx }}>
      {overline ? (
        <Typography variant="overline" sx={{ color: 'brand.main', display: 'block', mb: 1 }}>
          {overline}
        </Typography>
      ) : null}
      <Typography variant="h2" sx={{ color: 'text.primary', mb: script ? 1 : 0 }}>
        {title}
      </Typography>
      {script ? (
        <Typography
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: { xs: '2rem', md: '2.75rem' },
            color: 'brand.main',
            lineHeight: 1,
          }}
        >
          {script}
        </Typography>
      ) : null}
    </Box>
  )
}
```

- [ ] **Step 7: `language-switcher.tsx`**

```tsx
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const current = (i18n.resolvedLanguage ?? i18n.language ?? 'ru').slice(0, 2) as SupportedLanguage
  const display = SUPPORTED_LANGUAGES.includes(current) ? current : 'ru'

  function handleOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleSelect(lang: SupportedLanguage) {
    void i18n.changeLanguage(lang)
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        aria-label={t('language.label')}
        size="small"
        sx={{
          color: 'text.primary',
          minWidth: 0,
          px: 1.5,
          letterSpacing: '0.12em',
          fontWeight: 600,
        }}
      >
        {t(`language.${display}`)}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <MenuItem
            key={lang}
            selected={lang === display}
            onClick={() => handleSelect(lang)}
            sx={{ minWidth: 96, letterSpacing: '0.1em' }}
          >
            {t(`language.${lang}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
```

- [ ] **Step 8: `price-row.tsx`**

```tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'

import { BulletDot } from './bullet-dot'

export interface PriceRowProps {
  service: string
  price: string
  currency: string
  last?: boolean
}

export function PriceRow({ service, price, currency, last = false }: PriceRowProps) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        py: 2,
        borderBottom: last ? 'none' : `1px solid ${alpha(theme.palette.brand.main, 0.2)}`,
      }}
    >
      <BulletDot />
      <Typography sx={{ flex: 1, color: 'text.primary', fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
        {service}
      </Typography>
      <Typography
        sx={{
          color: 'primary.main',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          fontSize: { xs: '1rem', md: '1.15rem' },
        }}
      >
        {price} {currency}
      </Typography>
    </Box>
  )
}
```

- [ ] **Step 9: `specialist-avatar.tsx`**

```tsx
import Box from '@mui/material/Box'

export interface SpecialistAvatarProps {
  name: string
  size?: number
}

export function SpecialistAvatar({ name, size = 160 }: SpecialistAvatarProps) {
  const initials = name
    .split(' ')
    .map((w) => w.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #E7B5C0, #E91E63)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0A0A0A',
        fontFamily: '"Playfair Display", serif',
        fontSize: size * 0.32,
        fontWeight: 700,
        letterSpacing: '0.04em',
        boxShadow: '0 0 40px rgba(233,30,99,0.2)',
      }}
    >
      {initials}
    </Box>
  )
}
```

- [ ] **Step 10: `index.ts` barrel**

```ts
export { BrandButton } from './brand-button'
export type { BrandButtonProps } from './brand-button'
export { BulletDot } from './bullet-dot'
export { CornerFlourish } from './corner-flourish'
export type { FlourishCorner } from './corner-flourish'
export { EvoLogo } from './evo-logo'
export { HeartDivider } from './heart-divider'
export { LanguageSwitcher } from './language-switcher'
export { PriceRow } from './price-row'
export type { PriceRowProps } from './price-row'
export { SectionHeader } from './section-header'
export { SpecialistAvatar } from './specialist-avatar'
```

- [ ] **Step 11: Typecheck**

Run: `yarn typecheck`
Expected: passes for new UI files. App.tsx errors about about/gallery remain (fixed in Task 10).

- [ ] **Step 12: Commit**

```bash
git add packages/web/src/components/ui
git commit -m "feat(ui): add dark redesign primitives"
```

---

## Task 6: Layout — Header, Footer, Section

**Files:**
- Rewrite: `packages/web/src/components/layout/header.tsx`
- Rewrite: `packages/web/src/components/layout/footer.tsx`
- Create: `packages/web/src/components/layout/section.tsx`
- Rewrite: `packages/web/src/components/layout/index.ts`
- Delete: `packages/web/src/components/layout/mobile-menu.tsx`
- Delete: `packages/web/src/components/layout/section-placeholder.tsx`

- [ ] **Step 1: Delete obsolete files**

```bash
rm packages/web/src/components/layout/mobile-menu.tsx packages/web/src/components/layout/section-placeholder.tsx
```

- [ ] **Step 2: `section.tsx`**

```tsx
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export interface SectionProps {
  id?: string
  children: ReactNode
  sx?: SxProps<Theme>
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false
  py?: number
}

export function Section({ id, children, sx, maxWidth = 'lg', py = 12 }: SectionProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        py: { xs: py - 4, md: py },
        backgroundColor: 'background.default',
        color: 'text.primary',
        position: 'relative',
        ...sx,
      }}
    >
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  )
}
```

- [ ] **Step 3: `header.tsx`**

```tsx
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import { alpha, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BrandButton, EvoLogo, LanguageSwitcher } from '@/components/ui'
import { BOOKING_URL } from '@/constants/links'

const NAV_ITEMS = ['services', 'pricing', 'specialists', 'contact'] as const

export function Header() {
  const theme = useTheme()
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function closeDrawer() {
    setDrawerOpen(false)
  }

  const navLinks = NAV_ITEMS.map((item) => (
    <Link
      key={item}
      href={`#${item}`}
      underline="none"
      onClick={closeDrawer}
      sx={{
        color: 'text.primary',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.875rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontWeight: 500,
        '&:hover': { color: 'primary.main' },
      }}
    >
      {t(`nav.${item}`)}
    </Link>
  ))

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: scrolled ? alpha('#0A0A0A', 0.92) : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? `1px solid ${alpha(theme.palette.brand.main, 0.15)}` : '1px solid transparent',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, minHeight: { xs: 64, md: 80 }, justifyContent: 'space-between' }}>
        <Link href="#top" sx={{ display: 'flex', alignItems: 'center' }} aria-label="EVO Studio">
          <EvoLogo size={36} />
        </Link>

        {isDesktop ? (
          <Stack direction="row" spacing={4} alignItems="center">
            {navLinks}
          </Stack>
        ) : null}

        <Stack direction="row" spacing={1} alignItems="center">
          <LanguageSwitcher />
          {isDesktop ? (
            <BrandButton
              component="a"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
            >
              {t('nav.book')}
            </BrandButton>
          ) : (
            <IconButton
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Stack>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <Box sx={{ width: 280, height: '100%', backgroundColor: 'background.default', p: 3 }}>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton onClick={closeDrawer} aria-label="close" sx={{ color: 'text.primary' }}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack spacing={3} sx={{ mt: 4 }}>
            {navLinks}
            <BrandButton
              component="a"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              fullWidth
            >
              {t('nav.book')}
            </BrandButton>
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  )
}
```

- [ ] **Step 4: `footer.tsx`**

```tsx
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

import { EvoLogo } from '@/components/ui'
import { FACEBOOK_URL, INSTAGRAM_URL } from '@/constants/links'

export function Footer() {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: 'background.default',
        borderTop: `1px solid ${alpha(theme.palette.brand.main, 0.15)}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center">
          <EvoLogo size={32} />
          <Stack direction="row" spacing={1}>
            <IconButton
              component="a"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              sx={{ color: 'brand.main', '&:hover': { color: 'primary.main' } }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              sx={{ color: 'brand.main', '&:hover': { color: 'primary.main' } }}
            >
              <FacebookIcon />
            </IconButton>
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            {t('footer.copyright')}
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
```

- [ ] **Step 5: `index.ts`**

```ts
export { Footer } from './footer'
export { Header } from './header'
export { Section } from './section'
export type { SectionProps } from './section'
```

- [ ] **Step 6: Typecheck**

Run: `yarn typecheck`

Expected: passes for layout files. App.tsx errors about old features remain.

- [ ] **Step 7: Commit**

```bash
git add packages/web/src/components/layout
git commit -m "feat(layout): rewrite header, footer, add section wrapper"
```

---

## Task 7: Hero section

**Files:**
- Rewrite: `packages/web/src/features/hero/hero-section.tsx`
- Rewrite: `packages/web/src/features/hero/index.ts`
- Delete: `packages/web/src/features/hero/scroll-indicator.tsx`

- [ ] **Step 1: Delete obsolete file**

```bash
rm packages/web/src/features/hero/scroll-indicator.tsx
```

- [ ] **Step 2: `hero-section.tsx`**

```tsx
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { BrandButton, CornerFlourish, EvoLogo } from '@/components/ui'
import { BOOKING_URL } from '@/constants/links'

const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2400&q=80'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      id="top"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(rgba(10,10,10,0.65), rgba(10,10,10,0.85)), url(${HERO_IMAGE_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <CornerFlourish corner="tl" size={220} />
      <CornerFlourish corner="tr" size={220} />
      <CornerFlourish corner="bl" size={220} />
      <CornerFlourish corner="br" size={220} />

      <Stack spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 3 }}>
        <EvoLogo size={{ xs: 72, md: 110 } as unknown as number} sx={{ width: { xs: 220, md: 320 }, height: 'auto' }} />
        <Typography
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: { xs: '2.25rem', md: '3.75rem' },
            color: 'brand.main',
            lineHeight: 1.1,
          }}
        >
          {t('hero.tagline')}
        </Typography>
        <BrandButton
          component="a"
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          size="large"
        >
          {t('hero.cta')}
        </BrandButton>
      </Stack>
    </Box>
  )
}
```

- [ ] **Step 3: `index.ts`**

```ts
export { HeroSection } from './hero-section'
```

- [ ] **Step 4: Typecheck**

Run: `yarn typecheck`. Expected: passes for hero. App-level errors remain.

- [ ] **Step 5: Commit**

```bash
git add packages/web/src/features/hero
git commit -m "feat(hero): rewrite hero with dark photo, logo, tagline"
```

---

## Task 8: Services section

**Files:**
- Rewrite: `packages/web/src/features/services/services-section.tsx`
- Rewrite: `packages/web/src/features/services/index.ts`

Inspect current files first with Read to preserve anything still useful; then overwrite.

- [ ] **Step 1: `services-section.tsx`**

```tsx
import BrushIcon from '@mui/icons-material/Brush'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural'
import SpaIcon from '@mui/icons-material/Spa'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout'
import { SectionHeader } from '@/components/ui'

const CATEGORIES: { key: string; icon: ReactNode }[] = [
  { key: 'hair', icon: <ContentCutIcon fontSize="large" /> },
  { key: 'nails', icon: <BrushIcon fontSize="large" /> },
  { key: 'face', icon: <FaceRetouchingNaturalIcon fontSize="large" /> },
  { key: 'brows', icon: <VisibilityIcon fontSize="large" /> },
  { key: 'body', icon: <SpaIcon fontSize="large" /> },
]

export function ServicesSection() {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Section id="services">
      <SectionHeader overline={t('services.overline')} title={t('services.title')} />
      <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 6, maxWidth: 640, mx: 'auto' }}>
        {t('services.subtitle')}
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {CATEGORIES.map(({ key, icon }) => (
          <Grid key={key} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <Box
              sx={{
                p: 4,
                height: '100%',
                backgroundColor: 'background.paper',
                border: `1px solid ${alpha(theme.palette.brand.main, 0.3)}`,
                borderRadius: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: alpha(theme.palette.brand.main, 0.8),
                  transform: 'translateY(-4px)',
                  boxShadow: `0 0 32px ${alpha(theme.palette.primary.main, 0.15)}`,
                },
              }}
            >
              <Stack spacing={2} alignItems="center" textAlign="center">
                <Box sx={{ color: 'primary.main' }}>{icon}</Box>
                <Typography variant="h5" sx={{ color: 'text.primary' }}>
                  {t(`services.items.${key}.title`)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {t(`services.items.${key}.description`)}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}
```

- [ ] **Step 2: `index.ts`**

```ts
export { ServicesSection } from './services-section'
```

- [ ] **Step 3: Typecheck**

Run: `yarn typecheck`. Expected: services compiles; app-level errors remain.

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/features/services
git commit -m "feat(services): rewrite services section for dark theme"
```

---

## Task 9: Pricing section with accordion

**Files:**
- Rewrite: `packages/web/src/features/pricing/pricing-section.tsx`
- Create: `packages/web/src/features/pricing/pricing-accordion.tsx`
- Rewrite: `packages/web/src/features/pricing/index.ts`
- Delete: `packages/web/src/features/pricing/price-row.tsx` (moved to ui)

- [ ] **Step 1: Delete old price-row**

```bash
rm packages/web/src/features/pricing/price-row.tsx
```

- [ ] **Step 2: `pricing-accordion.tsx`**

```tsx
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PriceRow } from '@/components/ui'

const CATEGORY_KEYS = ['brows', 'hair', 'nails', 'face', 'body'] as const
type CategoryKey = (typeof CATEGORY_KEYS)[number]

interface PriceItem {
  service: string
  price: string
}

export interface PricingAccordionProps {
  onCategoryChange?: (key: CategoryKey) => void
}

export function PricingAccordion({ onCategoryChange }: PricingAccordionProps) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState<CategoryKey>('brows')
  const currency = t('pricing.currency')

  function handleChange(key: CategoryKey) {
    return (_: React.SyntheticEvent, isExpanded: boolean) => {
      if (isExpanded) {
        setExpanded(key)
        onCategoryChange?.(key)
      }
    }
  }

  return (
    <Box>
      {CATEGORY_KEYS.map((key) => {
        const items = t(`pricing.categories.${key}.items`, { returnObjects: true }) as PriceItem[]
        const title = t(`pricing.categories.${key}.title`)
        const isOpen = expanded === key
        return (
          <Accordion key={key} expanded={isOpen} onChange={handleChange(key)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}>
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isOpen ? 'primary.main' : 'text.primary',
                  transition: 'color 0.2s',
                }}
              >
                {title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {items.map((item, idx) => (
                <PriceRow
                  key={`${key}-${idx}`}
                  service={item.service}
                  price={item.price}
                  currency={currency}
                  last={idx === items.length - 1}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Box>
  )
}
```

- [ ] **Step 3: `pricing-section.tsx`**

```tsx
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout'
import { BrandButton, CornerFlourish, HeartDivider, SectionHeader } from '@/components/ui'
import { BOOKING_URL } from '@/constants/links'

import { PricingAccordion } from './pricing-accordion'

type CategoryKey = 'brows' | 'hair' | 'nails' | 'face' | 'body'

export function PricingSection() {
  const theme = useTheme()
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('brows')

  return (
    <Section id="pricing" maxWidth="md">
      <Box
        sx={{
          position: 'relative',
          border: `1px solid ${alpha(theme.palette.brand.main, 0.25)}`,
          backgroundColor: alpha('#000000', 0.4),
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 10 },
          overflow: 'hidden',
        }}
      >
        <CornerFlourish corner="tl" size={140} />
        <CornerFlourish corner="tr" size={140} />
        <CornerFlourish corner="bl" size={140} />
        <CornerFlourish corner="br" size={140} />

        <Stack spacing={1} alignItems="center" sx={{ mb: 4, position: 'relative', zIndex: 1 }}>
          <Typography variant="overline" sx={{ color: 'brand.main' }}>
            {t('pricing.overline')}
          </Typography>
          <Typography variant="h2" sx={{ color: 'text.primary' }}>
            {t('pricing.title')}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: { xs: '2rem', md: '2.75rem' },
              color: 'brand.main',
              lineHeight: 1,
              mt: 1,
            }}
          >
            {t(`pricing.subtitleByCategory.${activeCategory}`)}
          </Typography>
        </Stack>

        <SectionHeader title="" sx={{ mb: 0, display: 'none' }} />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <PricingAccordion onCategoryChange={(key) => setActiveCategory(key as CategoryKey)} />
        </Box>

        <HeartDivider />

        <Stack direction="row" justifyContent="center" sx={{ position: 'relative', zIndex: 1 }}>
          <BrandButton
            component="a"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="large"
          >
            {t('pricing.cta')}
          </BrandButton>
        </Stack>
      </Box>
    </Section>
  )
}
```

- [ ] **Step 4: `index.ts`**

```ts
export { PricingSection } from './pricing-section'
```

- [ ] **Step 5: Typecheck**

Run: `yarn typecheck`.

- [ ] **Step 6: Commit**

```bash
git add packages/web/src/features/pricing
git commit -m "feat(pricing): accordion pricing card with ornate style"
```

---

## Task 10: Specialists and Contact sections

**Files:**
- Rewrite: `packages/web/src/features/specialists/specialists-section.tsx`
- Rewrite: `packages/web/src/features/specialists/index.ts`
- Rewrite: `packages/web/src/features/contact/contact-section.tsx`
- Rewrite: `packages/web/src/features/contact/index.ts`

- [ ] **Step 1: `specialists-section.tsx`**

```tsx
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout'
import { BrandButton, SectionHeader, SpecialistAvatar } from '@/components/ui'
import { BOOKING_URL } from '@/constants/links'

interface SpecialistItem {
  name: string
  role: string
}

export function SpecialistsSection() {
  const theme = useTheme()
  const { t } = useTranslation()
  const items = t('specialists.items', { returnObjects: true }) as SpecialistItem[]

  return (
    <Section id="specialists">
      <SectionHeader overline={t('specialists.overline')} title={t('specialists.title')} />
      <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 6, maxWidth: 640, mx: 'auto' }}>
        {t('specialists.subtitle')}
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {items.map((item) => (
          <Grid key={item.name} size={{ xs: 12, sm: 6, md: 3 }}>
            <Box
              sx={{
                p: 4,
                height: '100%',
                textAlign: 'center',
                border: `1px solid ${alpha(theme.palette.brand.main, 0.2)}`,
                backgroundColor: 'background.paper',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: alpha(theme.palette.brand.main, 0.6),
                },
              }}
            >
              <Stack spacing={2} alignItems="center">
                <SpecialistAvatar name={item.name} size={140} />
                <Typography variant="h5" sx={{ color: 'text.primary' }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.role}
                </Typography>
                <BrandButton
                  component="a"
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="small"
                >
                  {t('specialists.cta')}
                </BrandButton>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}
```

- [ ] **Step 2: Specialists `index.ts`**

```ts
export { SpecialistsSection } from './specialists-section'
```

- [ ] **Step 3: `contact-section.tsx`**

```tsx
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import PhoneIcon from '@mui/icons-material/Phone'
import PlaceIcon from '@mui/icons-material/Place'
import ScheduleIcon from '@mui/icons-material/Schedule'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout'
import { BrandButton, SectionHeader } from '@/components/ui'
import {
  BOOKING_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  MAP_EMBED_SRC,
  PHONE_URL,
} from '@/constants/links'

export function ContactSection() {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Section id="contact">
      <SectionHeader overline={t('contact.overline')} title={t('contact.title')} />
      <Grid container spacing={6} alignItems="stretch">
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={4} sx={{ height: '100%', justifyContent: 'center' }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <PlaceIcon sx={{ color: 'primary.main' }} />
              <Box>
                <Typography variant="overline" sx={{ color: 'brand.main' }}>
                  {t('contact.addressLabel')}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>{t('contact.address')}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <ScheduleIcon sx={{ color: 'primary.main' }} />
              <Box>
                <Typography variant="overline" sx={{ color: 'brand.main' }}>
                  {t('contact.hoursLabel')}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>{t('contact.hours')}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <PhoneIcon sx={{ color: 'primary.main' }} />
              <Box>
                <Typography variant="overline" sx={{ color: 'brand.main' }}>
                  {t('contact.phoneLabel')}
                </Typography>
                <Link href={PHONE_URL} underline="none" sx={{ color: 'text.primary' }}>
                  {t('contact.phone')}
                </Link>
              </Box>
            </Stack>
            <Box>
              <Typography variant="overline" sx={{ color: 'brand.main', display: 'block', mb: 1 }}>
                {t('contact.socialLabel')}
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton
                  component="a"
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  sx={{ color: 'brand.main', '&:hover': { color: 'primary.main' } }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  sx={{ color: 'brand.main', '&:hover': { color: 'primary.main' } }}
                >
                  <FacebookIcon />
                </IconButton>
              </Stack>
            </Box>
            <BrandButton
              component="a"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              sx={{ alignSelf: 'flex-start' }}
            >
              {t('contact.cta')}
            </BrandButton>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="iframe"
            title="map"
            src={MAP_EMBED_SRC}
            sx={{
              width: '100%',
              height: { xs: 320, md: '100%' },
              minHeight: 320,
              border: `1px solid ${alpha(theme.palette.brand.main, 0.2)}`,
              filter: 'grayscale(0.6) invert(0.88) hue-rotate(180deg)',
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Grid>
      </Grid>
    </Section>
  )
}
```

- [ ] **Step 4: Contact `index.ts`**

```ts
export { ContactSection } from './contact-section'
```

- [ ] **Step 5: Typecheck**

Run: `yarn typecheck`.

- [ ] **Step 6: Commit**

```bash
git add packages/web/src/features/specialists packages/web/src/features/contact
git commit -m "feat: rewrite specialists and contact sections"
```

---

## Task 11: App wiring + cleanup old code

**Files:**
- Rewrite: `packages/web/src/app/app.tsx`
- Delete: `packages/web/src/features/about/` (directory)
- Delete: `packages/web/src/features/gallery/` (directory)
- Delete: `packages/web/src/constants/copy.ts`
- Delete: `packages/web/src/styles/animations.ts`
- Delete any leftover import in `main.tsx` / theme referencing these

- [ ] **Step 1: Rewrite `app.tsx`**

```tsx
import { Footer, Header } from '@/components/layout'
import { ContactSection } from '@/features/contact'
import { HeroSection } from '@/features/hero'
import { PricingSection } from '@/features/pricing'
import { ServicesSection } from '@/features/services'
import { SpecialistsSection } from '@/features/specialists'

export function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <SpecialistsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Delete removed modules**

```bash
rm -rf packages/web/src/features/about packages/web/src/features/gallery
rm -f packages/web/src/constants/copy.ts packages/web/src/styles/animations.ts
```

- [ ] **Step 3: Grep for any lingering references**

Use Grep with pattern `from '@/constants/copy'` or `from '@/styles/animations'` across `packages/web/src`. Remove / replace any hits (there should be none — if there are, adjust the importing file to use locale JSON via `useTranslation`).

- [ ] **Step 4: Typecheck + lint**

Run from repo root:
```bash
yarn typecheck
yarn lint
```

Fix any remaining issues. The site should now compile cleanly.

- [ ] **Step 5: Commit**

```bash
git add packages/web/src
git commit -m "feat: wire up new landing and remove obsolete modules"
```

---

## Task 12: Build + browser smoke test

- [ ] **Step 1: Production build**

Run: `yarn build`
Expected: completes without errors.

- [ ] **Step 2: Restart Preview**

Use tool `mcp__Claude_Preview__preview_start` with `name: "web"`.

- [ ] **Step 3: Screenshot full page**

Use `mcp__Claude_Preview__preview_screenshot` at URL `http://localhost:5173/` full-page to verify:
- Hero shows logo + tagline + CTA over dark photo with corner flourishes
- Services grid renders 5 dark cards
- Pricing card shows "ПРАЙС" uppercase + script subtitle `брови`, accordion with 6 brow rows
- Specialists shows 4 gradient avatar cards
- Contact shows two-column layout with dark-filtered map

- [ ] **Step 4: Language switching**

Use `preview_click` / `preview_eval` to change language to `ro` then `en`, screenshot between changes. Verify copy updates and persists via localStorage.

- [ ] **Step 5: Pricing accordion interaction**

Click each accordion category, confirm script subtitle updates (`брови`, `волосы`, etc.) and correct rows render.

- [ ] **Step 6: Mobile viewport**

`preview_resize` to 390×844, screenshot hero + pricing + contact. Verify layouts collapse correctly, mobile drawer menu opens/closes.

- [ ] **Step 7: Console cleanliness**

Use `preview_console_logs` — confirm no errors. Warnings about translation keys should be zero.

- [ ] **Step 8: Final commit if any fixes landed**

If any bug fixes were needed:
```bash
git add -A
git commit -m "fix: polish dark redesign"
```

---

## Self-Review Notes

- Spec coverage verified: Header + lang switcher (T6), Hero (T7), Services (T8), Pricing + accordion (T9), Specialists + Contact (T10), i18n (T3), theme (T2), links (T4), fonts (T1), cleanup (T11).
- All CTAs route to `BOOKING_URL` in Tasks 6/7/9/10.
- Content for pricing sourced directly from the reference image (T3).
- Placeholder scan: no TBD / TODO left in code-bearing steps.
