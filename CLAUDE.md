# Evo Studio

Salon de frumusețe website — Chișinău, Moldova. Pixel-perfect port of the
Claude Design HTML/CSS/JS prototype, with prerendered per-language HTML for SEO.

## Stack

- **Monorepo:** Yarn 4 workspaces (`packages/*`)
- **Frontend (`packages/web`):** Vite + React 19 + TypeScript strict + react-router-dom v7
- **Styling:** plain CSS with custom properties (no MUI, no CSS-in-JS)
- **SEO build:** Puppeteer prerender of `/`, `/ru`, `/en` after Vite build; favicons + OG image generated with `sharp`
- **Tooling:** ESLint, Prettier, commitlint, husky + lint-staged

## Commands

All commands run from project root:

- `yarn dev` — start the Vite dev server (port 5173)
- `yarn build` — `tsc -b` → `vite build` → Puppeteer prerender (writes per-language HTML into `dist/`)
- `yarn lint` / `yarn lint:fix` — ESLint
- `yarn typecheck` — `tsc -b` across workspaces
- `yarn format` / `yarn format:check` — Prettier
- `yarn workspace @evo/web build:assets` — regenerate favicons + OG image (run after brand asset changes)

## Project Structure

```
packages/web/
├── public/                 # static assets served as-is (favicons, og-image, sitemap.xml, robots.txt, manifest)
├── scripts/                # node scripts: prerender, generate-favicons, generate-og-image
└── src/
    ├── app/                # App shell, providers, router, prerender-mode signal
    ├── assets/             # logo + service icon PNGs (imported as modules)
    ├── components/
    │   ├── book-fab/       # floating booking pill
    │   ├── icons/          # inline SVG icon components
    │   ├── intro/          # logo intro overlay
    │   ├── layout/         # Nav header
    │   ├── seo-head/       # <head> tags driven by `constants/seo.ts`
    │   └── waves/          # decorative wave SVG components
    ├── constants/          # `i18n.ts` (RO/RU/EN dictionary + `Lang` type), `seo.ts` (titles/descriptions/JSON-LD)
    ├── features/           # page sections: hero, services, pricing, about, team, contact
    ├── locales/            # per-language modules consumed by the i18n dictionary
    └── styles/             # `global.css` — design tokens + ported prototype styles
```

## Routing & i18n

- RO is the canonical home at `/`; `/ru` and `/en` are sibling routes.
- All copy lives in `src/constants/i18n.ts` keyed by `Lang` (`'ru' | 'ro' | 'en'`).
- Active language is owned by `App` and switched via the `lang-switch` widget in `Nav`.
- `SeoHead` writes title/description/og/canonical/hreflang and JSON-LD per language.

## Coding Conventions

### TypeScript

- `strict: true` — never weaken
- No `any` — use `unknown` + type guards
- Use `type` imports: `import type { X } from 'y'`
- Type assertions (`as`) only where required (e.g. typing CSS custom properties)

### Imports

- Always use `@/` alias for paths within `packages/web`
- Import order: builtin > external > internal (`@/`) > relative
- Sorted alphabetically within groups

### Naming

- **Files:** kebab-case (`hero-section.tsx`)
- **Components:** PascalCase (`HeroSection`)
- **Functions/variables:** camelCase (`handleBooking`)
- **Types/interfaces:** PascalCase (`Translation`)
- **Constants:** camelCase for objects, UPPER_SNAKE for primitive values

### Components

- Functional components only
- One component per file
- Props type defined and exported in same file
- Sections receive the active `Translation` as a `t` prop

### Styling

- Plain HTML elements + global CSS classes from `src/styles/global.css`
- Reference design tokens via `var(--token)` — never hardcode hex values
- Brand pink: `var(--pink)` (`#e8308a`)

### Content

- All user-facing strings live in `src/constants/i18n.ts` keyed by `Lang`
- Never hardcode text in components

### Git

- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`
- Never skip pre-commit hooks
- Never force push

## Forbidden

- `console.log` (use `console.warn` / `console.error`)
- `any` type
- Hardcoded color values (use CSS custom properties)
- Hardcoded UI strings (use the i18n module)
- `// @ts-ignore` or `// @ts-expect-error` without explanation
- `eslint-disable` without explanation
