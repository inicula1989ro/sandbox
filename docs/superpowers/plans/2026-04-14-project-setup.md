# Project Setup & Code Quality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the scaffolded Vite project into a production-grade yarn monorepo with strict TypeScript, ESLint, Prettier, git hooks, MUI theme, and Claude Code configuration.

**Architecture:** Flat yarn workspaces monorepo with `packages/web` (Vite + React + MUI) and `packages/api` (empty placeholder). Shared tooling configs at root. All code quality enforcement automated via pre-commit hooks.

**Tech Stack:** Vite 8, React 19, TypeScript strict, MUI v9, React Query v5, Axios, ESLint 9 flat config, Prettier, Husky, lint-staged, commitlint.

**Current state:** Node v25.8.1 installed. Yarn NOT installed (use Corepack to enable). Vite scaffold exists at `evo-studio/` with npm. Must migrate to `packages/web/` under yarn workspaces.

---

## File Map

### Root (create)

- `package.json` — workspaces root, canonical scripts, engines
- `.nvmrc` — Node version pin
- `tsconfig.base.json` — shared strict TS config
- `eslint.config.js` — single flat config for all packages
- `.prettierrc` — formatting rules
- `.prettierignore` — files to skip
- `.editorconfig` — editor settings
- `.gitignore` — comprehensive ignores
- `commitlint.config.js` — conventional commits
- `lint-staged.config.js` — pre-commit checks
- `CLAUDE.md` — root project instructions
- `.husky/pre-commit` — lint-staged hook
- `.husky/commit-msg` — commitlint hook

### Root (modify)

- `.claude/launch.json` — update paths from `evo-studio/` to `packages/web/`
- `.claude/settings.json` — create with permissions and hooks

### packages/web/ (move from evo-studio/, then modify)

- `package.json` — rename to `@evo/web`, clean scripts
- `tsconfig.json` — rewrite to extend base, add path aliases
- `vite.config.ts` — add path alias, sourcemap config
- `index.html` — update title, add Google Fonts
- `CLAUDE.md` — frontend-specific rules

### packages/web/src/ (create)

- `app/app.tsx` — clean app shell
- `app/providers.tsx` — QueryClient + Theme + Router providers
- `styles/theme.ts` — MUI theme from brand brief
- `lib/axios.ts` — configured axios instance
- `lib/query-client.ts` — React Query client
- `constants/copy.ts` — all UI strings
- `constants/query-keys.ts` — React Query key factory
- `types/index.ts` — shared types
- `main.tsx` — clean entry point

### packages/web/src/ (delete)

- `App.css` — replaced by MUI theme
- `index.css` — replaced by CssBaseline
- `assets/react.svg` — Vite scaffold artifact
- `assets/vite.svg` — Vite scaffold artifact
- `assets/hero.png` — Vite scaffold artifact

### packages/api/ (create)

- `package.json` — `@evo/api` placeholder
- `tsconfig.json` — extends base for Node
- `src/.gitkeep` — keep directory
- `CLAUDE.md` — placeholder instructions

### .env files (create)

- `packages/web/.env.example` — template

---

## Task 1: Install yarn and initialize monorepo root

**Files:**

- Create: `package.json`
- Create: `.nvmrc`
- Create: `.gitignore`

- [ ] **Step 1: Enable Corepack and activate Yarn**

```bash
corepack enable
corepack prepare yarn@4.9.1 --activate
yarn --version
```

Expected: `4.9.1`. Corepack ships with Node 22+ and pins the package manager version per-project via the `packageManager` field in package.json. This ensures every contributor uses the exact same Yarn version without global installs.

If `corepack enable` fails (permission denied), run: `sudo corepack enable`
If `corepack` is not found, install it: `npm install -g corepack && corepack enable`

- [ ] **Step 2: Create root `.gitignore`**

Create `/Users/alekseyborisko/Projects/beaty/.gitignore`:

```gitignore
# Dependencies
node_modules/

# Build
dist/
dist-ssr/

# Environment
.env
.env.local
.env.*.local

# Editor
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.DS_Store

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Coverage
coverage/

# Claude local settings
.claude/settings.local.json
```

- [ ] **Step 3: Create `.nvmrc`**

Create `/Users/alekseyborisko/Projects/beaty/.nvmrc`:

```
22
```

- [ ] **Step 4: Create root `package.json`**

Create `/Users/alekseyborisko/Projects/beaty/package.json`:

```json
{
  "name": "evo-studio",
  "private": true,
  "packageManager": "yarn@4.9.1",
  "engines": {
    "node": ">=22"
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
    "prepare": "husky"
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add package.json .nvmrc .gitignore
git commit -m "chore: initialize monorepo root with yarn workspaces"
```

---

## Task 2: Migrate evo-studio/ to packages/web/

**Files:**

- Move: `evo-studio/` -> `packages/web/`
- Modify: `packages/web/package.json`
- Delete: `packages/web/node_modules/`

- [ ] **Step 1: Create packages directory and move**

```bash
mkdir -p packages
# Move the entire evo-studio directory
mv evo-studio packages/web
# Remove old node_modules (will reinstall under workspaces)
rm -rf packages/web/node_modules
```

- [ ] **Step 2: Update packages/web/package.json**

Replace `/Users/alekseyborisko/Projects/beaty/packages/web/package.json`:

```json
{
  "name": "@evo/web",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/icons-material": "^9.0.0",
    "@mui/material": "^9.0.0",
    "@tanstack/react-query": "^5.99.0",
    "axios": "^1.15.0",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "^7.14.1"
  },
  "devDependencies": {
    "@types/node": "^24.12.2",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "typescript": "~6.0.2",
    "vite": "^8.0.4"
  }
}
```

Note: ESLint plugins moved to root. Only build-time devDependencies remain here.

- [ ] **Step 3: Delete scaffold artifacts**

```bash
rm -f packages/web/src/App.css
rm -f packages/web/src/index.css
rm -f packages/web/src/assets/react.svg
rm -f packages/web/src/assets/vite.svg
rm -f packages/web/src/assets/hero.png
rm -f packages/web/public/favicon.svg
rm -f packages/web/public/icons.svg
rm -f packages/web/README.md
rm -f packages/web/eslint.config.js
rm -f packages/web/tsconfig.node.json
```

- [ ] **Step 4: Update .claude/launch.json paths**

Replace `/Users/alekseyborisko/Projects/beaty/.claude/launch.json`:

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "evo-studio-dev",
      "runtimeExecutable": "yarn",
      "runtimeArgs": ["workspace", "@evo/web", "dev"],
      "port": 5173
    }
  ]
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: migrate evo-studio to packages/web workspace"
```

---

## Task 3: Create packages/api/ placeholder

**Files:**

- Create: `packages/api/package.json`
- Create: `packages/api/src/.gitkeep`

- [ ] **Step 1: Create api package structure**

```bash
mkdir -p packages/api/src
touch packages/api/src/.gitkeep
```

- [ ] **Step 2: Create packages/api/package.json**

Create `/Users/alekseyborisko/Projects/beaty/packages/api/package.json`:

```json
{
  "name": "@evo/api",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {}
}
```

- [ ] **Step 3: Commit**

```bash
git add packages/api/
git commit -m "chore: add api package placeholder"
```

---

## Task 4: TypeScript configuration

**Files:**

- Create: `tsconfig.base.json`
- Rewrite: `packages/web/tsconfig.json`
- Delete: `packages/web/tsconfig.app.json`
- Create: `packages/api/tsconfig.json`

- [ ] **Step 1: Create tsconfig.base.json**

Create `/Users/alekseyborisko/Projects/beaty/tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.base.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "verbatimModuleSyntax": true,
    "skipLibCheck": true,
    "noEmit": true,
    "moduleDetection": "force",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "erasableSyntaxOnly": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

- [ ] **Step 2: Delete old tsconfig files**

```bash
rm -f packages/web/tsconfig.app.json
```

- [ ] **Step 3: Rewrite packages/web/tsconfig.json**

Replace `/Users/alekseyborisko/Projects/beaty/packages/web/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.web.tsbuildinfo",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

Note: `composite: true` is required because the root tsconfig.json uses project references (`tsc -b`). Without it, `yarn typecheck` fails.

- [ ] **Step 4: Create packages/api/tsconfig.json**

Create `/Users/alekseyborisko/Projects/beaty/packages/api/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.api.tsbuildinfo",
    "lib": ["ES2023"],
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  },
  "include": ["src"]
}
```

- [ ] **Step 5: Create root tsconfig.json for project references**

Create `/Users/alekseyborisko/Projects/beaty/tsconfig.json`:

```json
{
  "files": [],
  "references": [{ "path": "packages/web" }, { "path": "packages/api" }]
}
```

- [ ] **Step 6: Commit**

```bash
git add tsconfig.base.json tsconfig.json packages/web/tsconfig.json packages/api/tsconfig.json
git rm --cached packages/web/tsconfig.app.json 2>/dev/null || true
git commit -m "chore: configure TypeScript strict with project references"
```

---

## Task 5: Prettier + EditorConfig

**Files:**

- Create: `.prettierrc`
- Create: `.prettierignore`
- Create: `.editorconfig`

- [ ] **Step 1: Create .prettierrc**

Create `/Users/alekseyborisko/Projects/beaty/.prettierrc`:

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

- [ ] **Step 2: Create .prettierignore**

Create `/Users/alekseyborisko/Projects/beaty/.prettierignore`:

```
node_modules
dist
coverage
*.min.js
yarn.lock
.yarn
```

- [ ] **Step 3: Create .editorconfig**

Create `/Users/alekseyborisko/Projects/beaty/.editorconfig`:

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

- [ ] **Step 4: Commit**

```bash
git add .prettierrc .prettierignore .editorconfig
git commit -m "chore: add Prettier and EditorConfig"
```

---

## Task 6: ESLint configuration

**Files:**

- Create: `eslint.config.js`
- Modify: `package.json` (add devDependencies)

- [ ] **Step 1: Install ESLint dependencies at root**

```bash
yarn add -D -W eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-import-x eslint-import-resolver-typescript eslint-plugin-jsx-a11y globals
```

- [ ] **Step 2: Create eslint.config.js**

Create `/Users/alekseyborisko/Projects/beaty/eslint.config.js`:

```js
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importX from 'eslint-plugin-import-x'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import { defineConfig, globalIgnores } from 'eslint/config'

const sharedRules = {
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'prefer-const': 'error',
}

export default defineConfig([
  globalIgnores(['**/dist', '**/node_modules', '**/.yarn']),

  // Browser app code (React)
  {
    files: ['packages/web/src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strict,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    plugins: {
      'import-x': importX,
    },
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          project: ['packages/*/tsconfig.json'],
        },
      },
    },
    rules: {
      ...sharedRules,
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [{ pattern: '@/**', group: 'internal', position: 'before' }],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import-x/no-cycle': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },

  // Node-side config/tooling files (vite.config, eslint.config, etc.)
  {
    files: ['*.config.{js,ts,mjs}', 'packages/*/vite.config.ts', 'commitlint.config.js'],
    extends: [js.configs.recommended, tseslint.configs.strict],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.node,
    },
    rules: {
      ...sharedRules,
    },
  },
])
```

- [ ] **Step 3: Verify ESLint runs**

```bash
yarn lint
```

Expected: exits with 0 or reports fixable warnings (not config errors)

- [ ] **Step 4: Commit**

```bash
git add eslint.config.js package.json yarn.lock
git commit -m "chore: configure ESLint 9 flat config with import-x and jsx-a11y"
```

---

## Task 7: Git hooks — Husky + lint-staged + commitlint

**Files:**

- Create: `commitlint.config.js`
- Create: `lint-staged.config.js`
- Create: `.husky/pre-commit`
- Create: `.husky/commit-msg`

- [ ] **Step 1: Install dependencies**

```bash
yarn add -D -W husky lint-staged @commitlint/cli @commitlint/config-conventional
```

- [ ] **Step 2: Initialize Husky**

```bash
npx husky init
```

- [ ] **Step 3: Create .husky/pre-commit**

Replace `/Users/alekseyborisko/Projects/beaty/.husky/pre-commit`:

```bash
#!/usr/bin/env sh
npx lint-staged
```

Make executable: `chmod +x .husky/pre-commit`

- [ ] **Step 4: Create .husky/commit-msg**

Create `/Users/alekseyborisko/Projects/beaty/.husky/commit-msg`:

```bash
#!/usr/bin/env sh
npx --no -- commitlint --edit $1
```

Make executable: `chmod +x .husky/commit-msg`

- [ ] **Step 5: Create commitlint.config.js**

Create `/Users/alekseyborisko/Projects/beaty/commitlint.config.js`:

```js
export default {
  extends: ['@commitlint/config-conventional'],
}
```

- [ ] **Step 6: Create lint-staged.config.js**

Create `/Users/alekseyborisko/Projects/beaty/lint-staged.config.js`:

```js
export default {
  '*.{ts,tsx}': ['eslint --fix --max-warnings=0', 'prettier --write'],
  '*.{js,mjs,cjs}': ['eslint --fix --max-warnings=0', 'prettier --write'],
  '*.{json,md,yml,yaml,css,html}': ['prettier --write'],
}
```

- [ ] **Step 7: Test the hook works**

```bash
echo "bad commit message" | npx commitlint
```

Expected: error about invalid format

```bash
echo "feat: test message" | npx commitlint
```

Expected: passes

- [ ] **Step 8: Commit**

```bash
git add .husky/ commitlint.config.js lint-staged.config.js package.json yarn.lock
git commit -m "chore: add Husky pre-commit hooks with lint-staged and commitlint"
```

---

## Task 8: Vite configuration + path alias

**Files:**

- Rewrite: `packages/web/vite.config.ts`

- [ ] **Step 1: Rewrite vite.config.ts**

Replace `/Users/alekseyborisko/Projects/beaty/packages/web/vite.config.ts`:

```ts
import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig, type UserConfig } from 'vite'

export default defineConfig(({ mode }): UserConfig => {
  const enableSourcemap = mode === 'development' || process.env.VITE_SOURCEMAP === 'true'

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      open: false,
    },
    build: {
      sourcemap: enableSourcemap,
      target: 'es2023',
    },
  }
})
```

- [ ] **Step 2: Create .env.example**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/.env.example`:

```
VITE_API_URL=http://localhost:3001/api
VITE_SOURCEMAP=false
```

- [ ] **Step 3: Commit**

```bash
git add packages/web/vite.config.ts packages/web/.env.example
git commit -m "chore: configure Vite with path alias and env-dependent sourcemaps"
```

---

## Task 9: MUI theme + lib layer + providers

**Files:**

- Create: `packages/web/src/styles/theme.ts`
- Create: `packages/web/src/lib/axios.ts`
- Create: `packages/web/src/lib/query-client.ts`
- Create: `packages/web/src/app/providers.tsx`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p packages/web/src/{app,styles,lib,constants,types,components/ui,components/layout,features,hooks,assets}
```

- [ ] **Step 2: Create theme**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/styles/theme.ts`:

```ts
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    brand: Palette['primary']
  }
  interface PaletteOptions {
    brand?: PaletteOptions['primary']
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#E91E63',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5E6EA',
    },
    text: {
      primary: '#2B2B2B',
    },
    brand: {
      main: '#E7B5C0',
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
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
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
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontSize: '1.125rem',
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: '12px 32px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
      },
    },
  },
})
```

- [ ] **Step 3: Create axios instance**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/lib/axios.ts`:

```ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})
```

- [ ] **Step 4: Create query client**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/lib/query-client.ts`:

```ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
```

- [ ] **Step 5: Create providers**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/app/providers.tsx`:

```tsx
import type { ReactNode } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

import { queryClient } from '@/lib/query-client'
import { theme } from '@/styles/theme'

export interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add packages/web/src/styles/ packages/web/src/lib/ packages/web/src/app/providers.tsx
git commit -m "feat: add MUI theme, axios instance, query client, and providers"
```

---

## Task 10: Constants — copy + query keys + types

**Files:**

- Create: `packages/web/src/constants/copy.ts`
- Create: `packages/web/src/constants/query-keys.ts`
- Create: `packages/web/src/types/index.ts`

- [ ] **Step 1: Create copy.ts**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/constants/copy.ts`:

```ts
export const copy = {
  brand: {
    name: 'EVO Studio',
    tagline: 'Beauty, care and confidence in one refined space.',
  },
  nav: {
    services: 'Services',
    prices: 'Prices',
    specialists: 'Specialists',
    about: 'About',
    gallery: 'Gallery',
    contact: 'Contact',
  },
  hero: {
    headline: 'Trust your beauty to professionals',
    subheadline: 'Hair, nails, skincare and beauty treatments in a calm and elegant setting.',
    cta: 'Book Now',
    ctaSecondary: 'View Services',
  },
  services: {
    title: 'Our Services',
    categories: {
      hair: { title: 'Hair', description: 'Cuts, coloring, styling and treatments' },
      nails: { title: 'Nails', description: 'Manicure, pedicure, gel and nail art' },
      face: { title: 'Face', description: 'Facials, peels, skincare rituals' },
      browsLashes: {
        title: 'Brows & Lashes',
        description: 'Shaping, tinting, lamination and extensions',
      },
      body: { title: 'Body', description: 'Massage, wraps and body treatments' },
    },
  },
  pricing: {
    title: 'Selected Prices',
    cta: 'View full price list',
    items: [
      { service: 'Manicure', price: 'from 300 MDL' },
      { service: 'Haircut', price: 'from 250 MDL' },
      { service: 'Coloring', price: 'from 600 MDL' },
      { service: 'Facial care', price: 'from 450 MDL' },
    ],
  },
  whyEvo: {
    title: 'Why EVO Studio',
    points: [
      'Experienced specialists',
      'Personalized care',
      'Premium products',
      'Elegant atmosphere',
      'Hygiene and comfort',
      'Attention to detail',
    ],
  },
  about: {
    title: 'About Us',
    description:
      'EVO Studio is a space of beauty, care and relaxation, where every detail is designed to make you feel comfortable, confident and well looked after.',
  },
  contact: {
    title: 'Contact & Booking',
    address: 'str. Nicolae Starostenco 25',
    phone: '+373 783 67 347',
    ctaBook: 'Book an appointment',
    ctaCall: 'Call now',
    ctaDirections: 'Get directions',
  },
  gallery: {
    title: 'Gallery',
  },
  specialists: {
    title: 'Our Specialists',
    cta: 'Book',
  },
} as const
```

- [ ] **Step 2: Create query-keys.ts**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/constants/query-keys.ts`:

```ts
export const queryKeys = {
  services: {
    all: ['services'] as const,
    byCategory: (category: string) => ['services', category] as const,
  },
  specialists: {
    all: ['specialists'] as const,
    byId: (id: string) => ['specialists', id] as const,
  },
  gallery: {
    all: ['gallery'] as const,
  },
} as const
```

- [ ] **Step 3: Create types/index.ts**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/types/index.ts`:

```ts
export interface Specialist {
  id: string
  name: string
  specialization: string
  photoUrl: string
  description?: string
}

export interface ServiceCategory {
  id: string
  title: string
  description: string
  iconUrl?: string
  imageUrl?: string
}

export interface PriceItem {
  service: string
  price: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
}
```

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/constants/ packages/web/src/types/
git commit -m "feat: add copy constants, query keys, and shared types"
```

---

## Task 11: Clean app shell — app.tsx + main.tsx + index.html

**Files:**

- Rewrite: `packages/web/src/main.tsx`
- Rewrite: `packages/web/src/App.tsx`
- Rewrite: `packages/web/index.html`
- Create: `packages/web/src/app/app.tsx`

- [ ] **Step 1: Create clean app.tsx**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/app/app.tsx`:

```tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { copy } from '@/constants/copy'

export function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'brand.main',
      }}
    >
      <Typography variant="h2" color="text.primary">
        {copy.brand.name}
      </Typography>
    </Box>
  )
}
```

- [ ] **Step 2: Rewrite main.tsx**

Replace `/Users/alekseyborisko/Projects/beaty/packages/web/src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from '@/app/app'
import { Providers } from '@/app/providers'

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

- [ ] **Step 3: Delete old App.tsx**

```bash
rm -f packages/web/src/App.tsx
```

- [ ] **Step 4: Rewrite index.html with Google Fonts**

Replace `/Users/alekseyborisko/Projects/beaty/packages/web/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="EVO Studio — premium beauty salon in Chisinau. Hair, nails, skincare and beauty treatments."
    />
    <title>EVO Studio — Beauty, Care & Confidence</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Commit**

```bash
git add packages/web/src/app/app.tsx packages/web/src/main.tsx packages/web/index.html
git rm --cached packages/web/src/App.tsx 2>/dev/null || true
git commit -m "feat: create clean app shell with MUI theme and Google Fonts"
```

---

## Task 12: Install all dependencies and verify build

- [ ] **Step 1: Install all workspace dependencies**

```bash
cd /Users/alekseyborisko/Projects/beaty && yarn install
```

Expected: all packages installed, no errors

- [ ] **Step 2: Verify TypeScript compiles**

```bash
yarn typecheck
```

Expected: no errors

- [ ] **Step 3: Verify ESLint passes**

```bash
yarn lint
```

Expected: no errors (warnings ok)

- [ ] **Step 4: Verify Prettier**

```bash
yarn format:check
```

Expected: all files formatted (or run `yarn format` to fix)

- [ ] **Step 5: Verify dev server starts**

Start via Claude Preview `preview_start("evo-studio-dev")` and verify the page shows "EVO Studio" with brand pink background.

- [ ] **Step 6: Verify build succeeds**

```bash
yarn build
```

Expected: build completes, output in `packages/web/dist/`

- [ ] **Step 7: Commit any final fixes**

```bash
git add -A
git commit -m "chore: verify full build pipeline — typecheck, lint, format, build"
```

---

## Task 13: Claude Code configuration

**Files:**

- Create: `CLAUDE.md`
- Create: `packages/web/CLAUDE.md`
- Create: `packages/api/CLAUDE.md`
- Create: `.claude/settings.json`

- [ ] **Step 1: Create root CLAUDE.md**

Create `/Users/alekseyborisko/Projects/beaty/CLAUDE.md`:

```markdown
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
├── app/ # App shell, providers, router
├── assets/ # Images, fonts, SVG
├── components/
│ ├── ui/ # Atomic components (Button, Card, Input)
│ └── layout/ # Structural (Header, Footer, Section)
├── features/ # Business features (hero, services, booking)
├── hooks/ # Custom React hooks
├── lib/ # Axios instance, query client, utilities
├── styles/ # MUI theme, global styles
├── types/ # Shared TypeScript types
└── constants/ # Copy (UI strings), config, query keys

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
```

- [ ] **Step 2: Create packages/web/CLAUDE.md**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/CLAUDE.md`:

```markdown
# @evo/web — Frontend

Vite + React 19 + MUI v9 single-page application for EVO Studio.

## MUI Theme

- Heading font: Playfair Display (serif)
- Body font: Cormorant Garamond (serif)
- UI font: Inter (sans-serif) — buttons, captions, nav
- Primary: `#E91E63` (accent CTA)
- Brand: `#E7B5C0` (hero backgrounds, large surfaces)
- Paper: `#F5E6EA` (secondary backgrounds)
- Text: `#2B2B2B`

Always use `theme.palette.brand.main`, not hex values directly.

## Component Patterns

### Feature folders

Each feature under `src/features/` has:
```

features/hero/
├── HeroSection.tsx
├── index.ts # barrel export
└── useHeroData.ts # data hook if needed

```

### UI components
Atomic components in `src/components/ui/`:
- Wrap MUI components with brand-specific defaults
- Export from barrel `index.ts`

### Layout components
`src/components/layout/` — Header, Footer, Section wrappers.

## Data Layer

- Axios instance: `src/lib/axios.ts` — pre-configured with base URL
- Query client: `src/lib/query-client.ts` — 5min stale time
- Query hooks: `src/hooks/use*.ts`
- Query keys: `src/constants/query-keys.ts`

## Assets

- Place images in `src/assets/`
- Import via module import, not public URL string
- Brand images from design brief available in project root
```

- [ ] **Step 3: Create packages/api/CLAUDE.md**

Create `/Users/alekseyborisko/Projects/beaty/packages/api/CLAUDE.md`:

```markdown
# @evo/api — Backend (placeholder)

Reserved for future backend service. No code yet.

When implemented:

- Node.js with TypeScript strict
- Extends `tsconfig.base.json` with NodeNext module resolution
- Will serve CRM integration endpoints
```

- [ ] **Step 4: Create .claude/settings.json**

Replace `/Users/alekseyborisko/Projects/beaty/.claude/settings.json`:

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

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md packages/web/CLAUDE.md packages/api/CLAUDE.md .claude/settings.json
git commit -m "docs: add CLAUDE.md project instructions and Claude Code settings"
```

---

## Task 14: Format entire codebase and final commit

- [ ] **Step 1: Run Prettier on everything**

```bash
yarn format
```

- [ ] **Step 2: Run lint fix**

```bash
yarn lint:fix
```

- [ ] **Step 3: Final verification**

```bash
yarn typecheck && yarn lint && yarn format:check && yarn build
```

Expected: all pass with zero errors

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "style: format entire codebase with Prettier"
```

---

## Summary

After all 14 tasks, the project will have:

| What                           | Status                               |
| ------------------------------ | ------------------------------------ |
| Yarn workspaces monorepo       | Configured                           |
| Node version pinned            | `.nvmrc` + `engines`                 |
| TypeScript strict              | Base + web + api configs             |
| ESLint 9 + import-x + jsx-a11y | With TS resolver for `@/*`           |
| Prettier                       | Semi-free, single-quote, 100 width   |
| EditorConfig                   | Consistent across editors            |
| Husky + lint-staged            | Pre-commit enforcement               |
| Commitlint                     | Conventional commits                 |
| MUI theme                      | Brand colors + dual-serif typography |
| Axios + React Query            | Pre-configured lib layer             |
| Copy separation                | All strings in `constants/copy.ts`   |
| Claude Code config             | CLAUDE.md + settings.json            |
| Clean app shell                | "EVO Studio" on brand background     |
