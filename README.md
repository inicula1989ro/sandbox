# EVO Studio

Premium beauty salon website — Chișinău, Moldova.

Single-page frontend on Vite + React 19 + TypeScript, with Puppeteer prerender producing static per-language HTML (RO / RU / EN) for SEO.

**Languages:** [English](./README.md) · [Română](./README.ro.md)

## Tech stack

- **Monorepo:** [Yarn 4 workspaces](https://yarnpkg.com/features/workspaces)
- **Frontend** (`packages/web`): [Vite](https://vitejs.dev) · [React 19](https://react.dev) · [TypeScript strict](https://www.typescriptlang.org) · [react-router-dom v7](https://reactrouter.com)
- **Styling:** plain CSS with custom properties (no MUI, no CSS-in-JS)
- **SEO build:** Puppeteer prerender, [`sharp`](https://sharp.pixelplumbing.com)-generated favicons + OG image, sitemap and `robots.txt`
- **Tooling:** ESLint · Prettier · commitlint · husky + lint-staged

## Getting started

Requirements:

- **Node.js** `>= 22` (Node 25+ is not compatible with Yarn's default linker)
- **Yarn** `4.9.1` (enabled via `corepack`)

```sh
corepack enable
git clone https://github.com/inicula1989ro/sandbox.git
cd sandbox
yarn install
yarn dev
```

Open [http://localhost:5173](http://localhost:5173).

## Commands

Run from the project root:

| Command                                   | Description                                                       |
| ----------------------------------------- | ----------------------------------------------------------------- |
| `yarn dev`                                | Start the Vite dev server on port 5173                            |
| `yarn build`                              | `tsc -b` → `vite build` → Puppeteer prerender (per-language HTML) |
| `yarn lint` / `yarn lint:fix`             | ESLint                                                            |
| `yarn typecheck`                          | `tsc -b` across workspaces                                        |
| `yarn format` / `yarn format:check`       | Prettier                                                          |
| `yarn workspace @evo/web build:assets`    | Regenerate favicons + OG image (run after brand asset changes)    |

## Project structure

```
sandbox/
├── packages/web/
│   ├── public/                 # static assets (favicons, og-image, sitemap.xml, robots.txt, manifest)
│   ├── scripts/                # prerender + favicon/OG generation
│   └── src/
│       ├── app/                # App shell, providers, router, prerender-mode signal
│       ├── assets/             # logo + service icon PNGs
│       ├── components/         # book-fab, icons, intro, layout/nav, seo-head, waves
│       ├── constants/          # i18n dictionary + SEO config
│       ├── features/           # hero, services, pricing, about, team, contact
│       ├── locales/            # per-language translation modules
│       └── styles/             # global.css — design tokens + ported prototype styles
├── docs/                       # design briefs, specs, plans
├── CLAUDE.md                   # AI-assisted development conventions
└── package.json                # workspace root
```

## Sections

The site is composed of these sections, each in `packages/web/src/features/`:

- **Hero** — brand statement and primary CTA
- **Services** — five signature directions: hair, nails, face, brows & lashes, body
- **Pricing** — transparent starting prices in MDL
- **About** — salon story and benefits
- **Team** — specialist cards
- **Contact** — address, phone, schedule, map

All user-facing strings live in `packages/web/src/constants/i18n.ts` — never hardcode text in components.

## Languages & SEO

- RO is the canonical home at `/`; `/ru` and `/en` are sibling routes
- `SeoHead` manages `<title>`, description, OG, canonical, hreflang, and `BeautySalon` JSON-LD per language
- `yarn build` runs Puppeteer to prerender static HTML for every language so crawlers see fully-rendered content

## Conventions

- **TypeScript:** `strict: true`, no `any`, prefer `type` imports, use type guards over `as`
- **Files:** kebab-case (`hero-section.tsx`)
- **Components:** PascalCase, one per file, functional only
- **Imports:** `@/` alias within `packages/web`, sorted alphabetically per group (builtin · external · internal · relative)
- **Styling:** plain CSS classes from `src/styles/global.css`, reference tokens via `var(--token)` (brand pink `#e8308a`) — no hardcoded hex
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org), enforced by commitlint
- **Pre-commit:** lint-staged runs Prettier + ESLint on staged files

Full rules in [`CLAUDE.md`](./CLAUDE.md) and [`packages/web/CLAUDE.md`](./packages/web/CLAUDE.md).

## Git workflow

- Branch from `main` and open a PR — direct pushes to `main` are discouraged
- Never skip pre-commit hooks (`--no-verify`)
- Never force-push shared branches

## Documentation

- [`CLAUDE.md`](./CLAUDE.md) — coding conventions and AI-assistant rules
- [`packages/web/CLAUDE.md`](./packages/web/CLAUDE.md) — frontend-specific design system notes
- [`EVO_Studio_premium_design_brief.md`](./EVO_Studio_premium_design_brief.md) — original design brief
- [`EVO_Studio_design_review.md`](./EVO_Studio_design_review.md) — design review notes
- [`docs/superpowers/specs/`](./docs/superpowers/specs/) — per-section design specs
- [`docs/superpowers/plans/`](./docs/superpowers/plans/) — implementation plans

## License

Private project — all rights reserved.
