# EVO Studio — Project Setup & Code Quality Design

## Overview

Initialize the EVO Studio monorepo with production-grade tooling, strict code quality enforcement, and a scalable folder structure ready for frontend now and backend later.

## Decisions

- **Package manager:** yarn (v4, berry) workspaces (monorepo)
- **Bundler:** Vite
- **Language:** TypeScript strict
- **UI:** MUI v9 + custom theme from brand brief
- **Data:** React Query v5 + Axios
- **Routing:** React Router v7
- **Formatting:** Prettier
- **Linting:** ESLint 9 flat config + import-x + jsx-a11y
- **Git hooks:** Husky + lint-staged + commitlint (conventional commits)
- **Path aliases:** `@/*` -> `src/*` (configured in TS, Vite, AND ESLint resolver)
- **Node version:** pinned via `.nvmrc` and `engines`
- **Copy separation:** all user-facing strings in `constants/copy.ts`, never hardcoded in components

## 1. File Structure

```
beaty/
├── .husky/
│   ├── pre-commit          # lint-staged
│   └── commit-msg          # commitlint
├── .claude/
│   ├── launch.json         # dev server configs
│   ├── settings.json       # project permissions, hooks
│   └── settings.local.json # personal overrides (gitignored)
├── .nvmrc                  # Node version pin
├── packages/
│   ├── web/                # Vite + React + MUI
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── app/            # app.tsx, providers, router
│   │   │   ├── assets/         # images, fonts, SVG
│   │   │   ├── components/     # reusable UI components
│   │   │   │   ├── ui/         # atomic: buttons, cards, inputs
│   │   │   │   └── layout/     # Header, Footer, Section wrappers
│   │   │   ├── features/       # business features (hero, services, booking)
│   │   │   ├── hooks/          # custom hooks
│   │   │   ├── lib/            # axios instance, query client, utils
│   │   │   ├── styles/         # MUI theme, global styles
│   │   │   ├── types/          # shared TypeScript types
│   │   │   └── constants/      # colors, copy (all UI strings), config
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json       # extends ../../tsconfig.base.json
│   │   ├── CLAUDE.md           # frontend-specific coding rules
│   │   └── package.json
│   └── api/                # backend placeholder
│       ├── src/
│       │   └── .gitkeep
│       ├── tsconfig.json
│       ├── CLAUDE.md           # backend rules placeholder
│       └── package.json
├── docs/
├── package.json            # workspaces root + canonical scripts
├── CLAUDE.md               # root project instructions
├── tsconfig.base.json
├── eslint.config.js        # single flat config for all packages
├── .prettierrc
├── .prettierignore
├── .editorconfig
├── .gitignore
├── commitlint.config.js
└── lint-staged.config.js
```

## 2. Toolchain Pinning & Workspace Scripts

### Node version

`.nvmrc`:

```
22
```

### Root `package.json`

```jsonc
{
  "name": "evo-studio",
  "private": true,
  "packageManager": "yarn@4.9.1",
  "engines": {
    "node": ">=22",
  },
  "workspaces": ["packages/*"],
  "scripts": {
    "dev": "yarn workspace @evo/web dev",
    "build": "yarn workspace @evo/web build",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "typecheck": "tsc -b",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "prepare": "husky",
  },
}
```

### `packages/web/package.json`

```jsonc
{
  "name": "@evo/web",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
  },
}
```

### `packages/api/package.json`

```jsonc
{
  "name": "@evo/api",
  "scripts": {},
}
```

## 3. TypeScript Configuration

### tsconfig.base.json (root)

Shared strict config:

- `strict: true` (includes strictNullChecks, noImplicitAny, etc.)
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`
- `noUncheckedIndexedAccess: true` (array access returns T | undefined)
- `exactOptionalPropertyTypes: true`
- `forceConsistentCasingInFileNames: true`
- `target: ES2023`, `module: ESNext`, `moduleResolution: bundler`

### packages/web/tsconfig.json

Extends base, adds:

- `lib: ["ES2023", "DOM", "DOM.Iterable"]`
- `jsx: "react-jsx"`
- `types: ["vite/client"]`
- Path alias: `@/*` -> `src/*`

### packages/api/tsconfig.json

Extends base, adds:

- `lib: ["ES2023"]`
- `module: "NodeNext"`, `moduleResolution: "NodeNext"` (for Node.js)

## 4. ESLint Configuration

Single flat config at root (`eslint.config.js`). Plugins:

- `@eslint/js` recommended
- `typescript-eslint` strict
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `eslint-plugin-import-x` (import ordering, no cycles)
- `eslint-plugin-jsx-a11y` (accessibility)

### Path alias resolution for ESLint

`eslint-import-resolver-typescript` is required so that `import-x` correctly resolves `@/*` imports. Without it, `import-x/no-unresolved` and `import-x/no-cycle` produce false positives on aliased paths.

Configuration in the flat config:

```js
settings: {
  'import-x/resolver': {
    typescript: {
      project: ['packages/*/tsconfig.json'],
    },
  },
}
```

### Key custom rules

- `import-x/order` — grouped, alphabetized, newlines between groups, `@/*` mapped to `internal`
- `import-x/no-cycle` — error
- `@typescript-eslint/no-explicit-any` — error
- `@typescript-eslint/consistent-type-imports` — type-imports preferred
- `@typescript-eslint/no-unused-vars` — error, `_` prefix ignored
- `react-hooks/exhaustive-deps` — error
- `jsx-a11y/alt-text` — error
- `no-console` — warn (allow warn, error)
- `prefer-const` — error

## 5. Prettier

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always",
  "bracketSpacing": true,
  "endOfLine": "lf",
  "jsxSingleQuote": false
}
```

## 6. EditorConfig

- charset: utf-8
- end_of_line: lf
- indent: 2 spaces
- insert_final_newline: true
- trim_trailing_whitespace: true (except .md)

## 7. Git Hooks

### Husky

- `pre-commit` -> runs lint-staged
- `commit-msg` -> runs commitlint

### lint-staged

- `*.{ts,tsx}` -> `eslint --fix --max-warnings=0` then `prettier --write`
- `*.{json,md,yml,yaml,css}` -> `prettier --write`

### commitlint

- Extends `@commitlint/config-conventional`
- Format: `type: description` (feat, fix, chore, refactor, style, docs, test, ci, perf)

## 8. Vite Configuration

- Path alias: `@` -> `src/`
- Server port: 5173
- Build sourcemaps: **development only** (`mode === 'development'`). Production builds have no sourcemaps by default to avoid exposing source structure. Enable explicitly via `VITE_SOURCEMAP=true` env var when needed for error monitoring (e.g., Sentry).
- Build target: es2023

## 9. MUI Theme

Based on EVO Studio brand brief:

- Primary: `#E91E63` (accent — CTA, hover)
- Background default: `#FFFFFF`
- Background paper: `#F5E6EA` (secondary)
- Text primary: `#2B2B2B`
- Brand background (custom): `#E7B5C0` (hero, large surfaces)
- Heading font: **Playfair Display** (serif, editorial luxury)
- Default UI font: **Inter** (sans-serif — buttons, nav, captions, metadata, form elements)
- Body text font: **Cormorant Garamond** (serif, elegant, premium — applied to `body1`/`body2` variants for paragraph content). Fallback: `"Cormorant Garamond", "Georgia", serif`
- Button: no text-transform, borderRadius 24, fontWeight 600
- Shape borderRadius: 12

**Typography rationale:** Inter as the default keeps the UI clean and functional (nav, buttons, forms). Cormorant Garamond on body1/body2 adds the editorial luxury feel to content paragraphs. Playfair Display on headings provides the fashion/wellness brand presence. This three-tier system gives each font a clear role.

## 10. Lib Layer

### axios instance (`src/lib/axios.ts`)

- baseURL from `VITE_API_URL` env var, fallback `/api`
- timeout: 10s
- Content-Type: application/json

### React Query client (`src/lib/query-client.ts`)

- staleTime: 5 minutes
- retry: 1
- refetchOnWindowFocus: false

### Providers wrapper (`src/app/providers.tsx`)

Nesting order: QueryClientProvider > ThemeProvider > CssBaseline > BrowserRouter

## 11. Copy Separation (i18n-ready)

All user-facing strings live in `src/constants/copy.ts`, never hardcoded in components.

```ts
export const copy = {
  hero: {
    headline: 'Trust your beauty to professionals',
    subheadline: 'Hair, nails, skincare and beauty treatments in a calm and elegant setting.',
    cta: 'Book Now',
  },
  nav: {
    services: 'Services',
    prices: 'Prices',
    // ...
  },
  // ...
} as const
```

**Why now:** The salon is in Chisinau, Moldova — multilingual content (Romanian + Russian) is a near-certain requirement. Separating copy from day one means:

- Adding i18n later is a config change, not a rewrite
- Components stay clean and focused on layout
- Copy can be reviewed/edited without touching React code

When i18n is needed, `copy.ts` becomes the default locale file and we plug in `react-intl` or `i18next` with minimal refactoring.

## 12. Environment Variables

`.env.example`:

```
VITE_API_URL=http://localhost:3001/api
VITE_SOURCEMAP=false
```

## 13. Claude Code Configuration

### CLAUDE.md (root)

Project overview, monorepo structure, canonical commands, coding conventions:

- **Project:** EVO Studio — premium beauty salon website (Chisinau, Moldova)
- **Stack:** Vite + React 19 + TypeScript strict + MUI v9 + React Query + Axios
- **Monorepo:** yarn workspaces — `packages/web` (frontend), `packages/api` (backend, future)
- **Commands:** `yarn dev`, `yarn build`, `yarn lint`, `yarn lint:fix`, `yarn typecheck`, `yarn format`
- **Conventions:**
  - TypeScript strict, no `any`, `type` imports for types
  - Sorted imports (builtin > external > internal > relative)
  - kebab-case files, PascalCase components, camelCase functions/variables
  - All UI strings in `constants/copy.ts`, never hardcoded
  - MUI styling via `sx` prop or `styled()`, never raw CSS for MUI components
  - One component per file, props type colocated
  - Feature folders with barrel `index.ts` exports
  - Always use `@/` path alias for imports within web package
- **Git:** conventional commits, never skip hooks, never force push
- **Forbidden:** `console.log` (use `console.warn`/`console.error`), inline styles, `any` type, hardcoded colors (use theme), hardcoded strings (use copy.ts)

### packages/web/CLAUDE.md

Frontend-specific patterns:

- React: functional components only, extract logic into custom hooks
- MUI: always use theme via `sx` or `styled()`, reference `theme.palette` not hex values
- Features: each feature is a folder under `features/` with barrel export
- Components: `components/ui/` for atomic, `components/layout/` for structural
- Data: React Query hooks in `hooks/`, query keys in `constants/query-keys.ts`
- Assets: images in `assets/`, reference via import (not public URL strings)
- Theme: custom brand color `#E7B5C0` accessible via `theme.palette.brand.main`

### packages/api/CLAUDE.md

Placeholder noting the package is reserved for future backend (Node.js). No code yet.

### .claude/settings.json

```json
{
  "permissions": {
    "allow": [
      "Bash(yarn:*)",
      "Bash(git:*)",
      "Bash(npx:*)",
      "Bash(cd:*)",
      "Bash(ls:*)",
      "Bash(mkdir:*)",
      "Read",
      "Glob",
      "Grep"
    ],
    "deny": ["Bash(rm -rf:*)", "Bash(git push --force:*)", "Bash(git reset --hard:*)"]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_response.filePath // .tool_input.file_path' | { read -r f; prettier --write \"$f\" --ignore-unknown; } 2>/dev/null || true",
            "timeout": 10
          }
        ]
      }
    ]
  }
}
```

### .claude/settings.local.json

Gitignored. For personal overrides (model preferences, extra permissions during debugging, etc.)

## Out of Scope (for now)

- Testing (Vitest + Testing Library) — add when components exist
- CI/CD — add when hosting is decided
- Storybook — overkill for landing page
- Full i18n runtime — copy separation is in place; plug in `react-intl`/`i18next` when needed
