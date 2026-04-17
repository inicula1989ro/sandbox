# EVO Studio

Premium beauty salon website — Chisinau, Moldova.

Single-page frontend on Vite + React 19 + TypeScript + MUI v9.

## Getting Started

### Option A — Docker (recommended)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/). Everything runs in a Node 22 container — no local Node/Yarn needed.

```bash
git clone https://github.com/inicula1989ro/sandbox.git
cd sandbox
docker compose up
```

The dev server is available at **[http://localhost:5174](http://localhost:5174)** (host port `5174` → container port `5173`). Hot-reload works via file polling.

Useful commands:

```bash
docker compose up -d          # start in background
docker compose logs -f web    # tail logs
docker compose down           # stop (keeps volumes — next install is instant)
docker compose down -v        # stop and reset volumes (forces a fresh install)
```

### Option B — Local Node

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
