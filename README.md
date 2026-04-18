# EVO Studio

Premium beauty salon website — Chisinau, Moldova.

Single-page frontend on Vite + React 19 + TypeScript + MUI v9.

## Requirements

- Node.js **22+**
- Yarn **4** (enabled via Corepack, no manual install needed)

## Quick start

```sh
corepack enable
yarn install
yarn dev
```

Open [http://localhost:5173](http://localhost:5173).

## Commands

Run everything from the project root:

| Command             | Description                       |
| ------------------- | --------------------------------- |
| `yarn dev`          | Start the dev server on port 5173 |
| `yarn build`        | Production build                  |
| `yarn lint`         | Run ESLint                        |
| `yarn lint:fix`     | Auto-fix ESLint issues            |
| `yarn typecheck`    | TypeScript type check             |
| `yarn format`       | Format all files with Prettier    |
| `yarn format:check` | Check formatting without writing  |

## Project structure

```
packages/web/src/
├── app/          # App shell, providers, router
├── assets/       # Images, fonts, SVG
├── components/   # UI and layout components
├── features/     # Business features (hero, services, gallery, …)
├── hooks/        # Custom React hooks
├── lib/          # Utilities
├── styles/       # MUI theme, global styles
├── types/        # Shared TypeScript types
└── constants/    # Copy (UI strings), config
```
