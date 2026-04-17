# EVO Studio

Premium beauty salon website — Chisinau, Moldova.

## Stack

- **Monorepo:** yarn workspaces (`packages/web`, `packages/api`)
- **Frontend:** Vite + React 19 + TypeScript strict + MUI v9
- **Data:** React Query v5 + Axios
- **Routing:** React Router v7

## Commands

All commands run from project root:

- `yarn dev` — start dev server (port 5173)
- `yarn build` — production build
- `yarn lint` — run ESLint
- `yarn lint:fix` — auto-fix ESLint issues
- `yarn typecheck` — TypeScript type check
- `yarn format` — format all files with Prettier
- `yarn format:check` — check formatting without writing

## Project Structure

```
packages/web/src/
├── app/          # App shell, providers, router
├── assets/       # Images, fonts, SVG
├── components/
│   ├── ui/       # Atomic components (Button, Card, Input)
│   └── layout/   # Structural (Header, Footer, Section)
├── features/     # Business features (hero, services, booking)
├── hooks/        # Custom React hooks
├── lib/          # Axios instance, query client, utilities
├── styles/       # MUI theme, global styles
├── types/        # Shared TypeScript types
└── constants/    # Copy (UI strings), config, query keys
```

## Coding Conventions

### TypeScript

- `strict: true` — never weaken
- No `any` — use `unknown` + type guards
- Use `type` imports: `import type { X } from 'y'`
- No type assertions (`as`) unless absolutely necessary — prefer type guards

### Imports

- Always use `@/` alias for paths within `packages/web`
- Import order: builtin > external > internal (`@/`) > relative
- Sorted alphabetically within groups

### Naming

- **Files:** kebab-case (`hero-section.tsx`)
- **Components:** PascalCase (`HeroSection`)
- **Functions/variables:** camelCase (`handleBooking`)
- **Types/interfaces:** PascalCase (`ServiceCategory`)
- **Constants:** camelCase for objects, UPPER_SNAKE for primitive values

### Components

- Functional components only
- One component per file
- Props type defined and exported in same file
- Extract logic into custom hooks

### Styling

- Use MUI `sx` prop or `styled()` — never raw CSS for MUI components
- Reference `theme.palette`, never hardcode hex colors
- Brand color: `theme.palette.brand.main` (`#E7B5C0`)

### Content

- All user-facing strings in `constants/copy.ts`
- Never hardcode text in components

### Git

- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`
- Never skip pre-commit hooks
- Never force push

## Forbidden

- `console.log` (use `console.warn` / `console.error`)
- `any` type
- Inline styles on MUI components
- Hardcoded color values
- Hardcoded UI strings
- `// @ts-ignore` or `// @ts-expect-error` without explanation
- `eslint-disable` without explanation
