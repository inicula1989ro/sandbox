# EVO Studio

> Premium beauty salon website — Chișinău, Moldova.

Single-page marketing site for EVO Studio: hair, nails, skincare, brows & lashes, and body treatments, presented in a calm and elegant design.

**Languages:** [English](./README.md) · [Română](./README.ro.md)

---

## Tech Stack

- **Monorepo:** [Yarn 4 workspaces](https://yarnpkg.com/features/workspaces)
- **Frontend** (`packages/web`): [Vite](https://vitejs.dev) · [React 19](https://react.dev) · [TypeScript strict](https://www.typescriptlang.org) · [MUI v9](https://mui.com) · [React Router v7](https://reactrouter.com) · [React Query v5](https://tanstack.com/query) · [Axios](https://axios-http.com)
- **Backend** (`packages/api`): Node.js placeholder, reserved for a future CRM integration layer
- **Tooling:** ESLint · Prettier · Commitlint · Husky + lint-staged

## Requirements

- **Node.js** `>= 22`
- **Yarn** `4.9.1` (enabled via `corepack`)

```bash
corepack enable
```

## Getting Started

```bash
git clone https://github.com/inicula1989ro/sandbox.git
cd sandbox
yarn install
yarn dev
```

The dev server runs at [http://localhost:5173](http://localhost:5173).

## Scripts

All scripts run from the repo root.

| Script            | Description                                     |
| ----------------- | ----------------------------------------------- |
| `yarn dev`        | Start the Vite dev server (port 5173)           |
| `yarn build`      | Production build of `@evo/web`                  |
| `yarn lint`       | Run ESLint across the monorepo                  |
| `yarn lint:fix`   | Auto-fix ESLint issues                          |
| `yarn typecheck`  | Type check all workspaces (`tsc -b`)            |
| `yarn format`     | Format all files with Prettier                  |
| `yarn format:check` | Verify formatting without writing             |

## Project Structure

```
sandbox/
├── packages/
│   ├── web/                  # Frontend (Vite + React + MUI)
│   │   └── src/
│   │       ├── app/          # App shell, providers, router
│   │       ├── assets/       # Images, fonts, SVG
│   │       ├── components/
│   │       │   ├── ui/       # Atomic components (Button, Card, Input)
│   │       │   └── layout/   # Structural (Header, Footer, Section)
│   │       ├── features/     # Business features (hero, services, booking…)
│   │       ├── hooks/        # Custom React hooks
│   │       ├── lib/          # Axios instance, query client, utilities
│   │       ├── styles/       # MUI theme, global styles
│   │       ├── types/        # Shared TypeScript types
│   │       └── constants/    # Copy (UI strings), config, query keys
│   └── api/                  # Backend placeholder (future)
├── docs/                     # Design briefs, specs, implementation plans
├── CLAUDE.md                 # Conventions for AI-assisted development
└── package.json              # Workspaces root
```

## Sections

The site is composed of the following feature sections, each under `packages/web/src/features/`:

- **Hero** — brand headline and primary CTA
- **Services** — five signature directions: hair, nails, face, brows & lashes, body
- **Pricing** — transparent starting prices in MDL
- **Specialists** — team cards
- **About** — salon story and benefits
- **Gallery** — image grid with lightbox
- **Contact** — address, phone, hours, map

All user-facing strings live in `packages/web/src/constants/copy.ts` — never hardcode text in components.

## Design System

- **Heading font:** Playfair Display (serif)
- **Body font:** Cormorant Garamond (serif)
- **UI font:** Inter (sans-serif) — buttons, captions, nav
- **Palette:**
  - Primary (accent CTA): `#E91E63`
  - Brand (hero backgrounds, large surfaces): `#E7B5C0`
  - Paper (secondary backgrounds): `#F5E6EA`
  - Text: `#2B2B2B`

Always reference `theme.palette.*` — never hardcode color values.

See [`packages/web/CLAUDE.md`](./packages/web/CLAUDE.md) for the full frontend conventions.

## Conventions

- **TypeScript:** `strict: true` · no `any` · prefer `type` imports · prefer type guards over `as`
- **Files:** kebab-case (`hero-section.tsx`)
- **Components:** PascalCase, one per file, functional only
- **Imports:** `@/` alias for paths inside `packages/web`, sorted alphabetically within groups (builtin · external · internal · relative)
- **Styling:** MUI `sx` prop or `styled()` — no raw CSS, no hardcoded hex
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org) — enforced via commitlint
- **Pre-commit:** lint-staged runs Prettier + ESLint on staged files

Full rules in [`CLAUDE.md`](./CLAUDE.md).

## Git Workflow

- Branch off `main`, open a PR — direct pushes to `main` are discouraged
- Never skip pre-commit hooks (`--no-verify`)
- Never force-push shared branches

## Documentation

- [`CLAUDE.md`](./CLAUDE.md) — coding conventions & AI-assistant guardrails
- [`EVO_Studio_premium_design_brief.md`](./EVO_Studio_premium_design_brief.md) — original design brief
- [`EVO_Studio_design_review.md`](./EVO_Studio_design_review.md) — design review notes
- [`docs/superpowers/specs/`](./docs/superpowers/specs/) — section-by-section design specs
- [`docs/superpowers/plans/`](./docs/superpowers/plans/) — implementation plans

## License

Private project — all rights reserved.
