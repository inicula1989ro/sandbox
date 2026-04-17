# EVO Studio

> Site web pentru un salon de frumusețe premium — Chișinău, Moldova.

Site de prezentare single-page pentru EVO Studio: păr, unghii, îngrijirea feței, sprâncene & gene și tratamente corporale, într-un design calm și elegant.

**Limbi:** [English](./README.md) · [Română](./README.ro.md)

---

## Stivă tehnologică

- **Monorepo:** [Yarn 4 workspaces](https://yarnpkg.com/features/workspaces)
- **Frontend** (`packages/web`): [Vite](https://vitejs.dev) · [React 19](https://react.dev) · [TypeScript strict](https://www.typescriptlang.org) · [MUI v9](https://mui.com) · [React Router v7](https://reactrouter.com) · [React Query v5](https://tanstack.com/query) · [Axios](https://axios-http.com)
- **Backend** (`packages/api`): placeholder Node.js, rezervat pentru o viitoare integrare cu CRM
- **Tooling:** ESLint · Prettier · Commitlint · Husky + lint-staged

## Pornire rapidă

### Varianta A — Docker (recomandat)

Necesită [Docker Desktop](https://www.docker.com/products/docker-desktop/). Totul rulează într-un container Node 22 — nu este nevoie de Node/Yarn pe sistemul local.

```bash
git clone https://github.com/inicula1989ro/sandbox.git
cd sandbox
docker compose up
```

Serverul de dezvoltare este disponibil la **[http://localhost:5174](http://localhost:5174)** (portul `5174` pe host → portul `5173` în container). Hot-reload funcționează prin polling.

Comenzi utile:

```bash
docker compose up -d          # pornește în fundal
docker compose logs -f web    # afișează log-urile
docker compose down           # oprește (păstrează volumele — install-ul următor e instant)
docker compose down -v        # oprește și resetează volumele (forțează un install curat)
```

### Varianta B — Node local

Cerințe:

- **Node.js** `>= 22` (Node 25+ este incompatibil cu linker-ul implicit al Yarn)
- **Yarn** `4.9.1` (activat prin `corepack`)

```bash
corepack enable
git clone https://github.com/inicula1989ro/sandbox.git
cd sandbox
yarn install
yarn dev
```

Serverul de dezvoltare rulează la [http://localhost:5173](http://localhost:5173).

## Comenzi

Toate comenzile se execută din rădăcina repo-ului.

| Comandă             | Descriere                                           |
| ------------------- | --------------------------------------------------- |
| `yarn dev`          | Pornește serverul Vite de dezvoltare (port 5173)    |
| `yarn build`        | Build de producție pentru `@evo/web`                |
| `yarn lint`         | Rulează ESLint pe tot monorepo-ul                   |
| `yarn lint:fix`     | Corectează automat problemele ESLint                |
| `yarn typecheck`    | Verifică tipurile în toate workspace-urile (`tsc -b`) |
| `yarn format`       | Formatează toate fișierele cu Prettier              |
| `yarn format:check` | Verifică formatarea fără a scrie                    |

## Structura proiectului

```
sandbox/
├── packages/
│   ├── web/                  # Frontend (Vite + React + MUI)
│   │   └── src/
│   │       ├── app/          # App shell, providers, router
│   │       ├── assets/       # Imagini, fonturi, SVG
│   │       ├── components/
│   │       │   ├── ui/       # Componente atomice (Button, Card, Input)
│   │       │   └── layout/   # Structurale (Header, Footer, Section)
│   │       ├── features/     # Funcționalități (hero, services, booking…)
│   │       ├── hooks/        # Hook-uri React personalizate
│   │       ├── lib/          # Instanță Axios, query client, utilitare
│   │       ├── styles/       # Tema MUI, stiluri globale
│   │       ├── types/        # Tipuri TypeScript partajate
│   │       └── constants/    # Texte UI, configurare, query keys
│   └── api/                  # Placeholder backend (viitor)
├── docs/                     # Brief de design, specificații, planuri
├── CLAUDE.md                 # Convenții pentru dezvoltare asistată de AI
└── package.json              # Rădăcina workspace-urilor
```

## Secțiuni

Site-ul este format din următoarele secțiuni, fiecare în `packages/web/src/features/`:

- **Hero** — titlu de brand și CTA principal
- **Services** — cinci direcții signature: păr, unghii, față, sprâncene & gene, corp
- **Pricing** — prețuri de pornire transparente, în MDL
- **Specialists** — carduri pentru echipă
- **About** — povestea salonului și beneficii
- **Gallery** — grilă de imagini cu lightbox
- **Contact** — adresă, telefon, program, hartă

Toate textele vizibile pentru utilizator se află în `packages/web/src/constants/copy.ts` — nu introduceți text direct în componente.

## Sistem de design

- **Font pentru titluri:** Playfair Display (serif)
- **Font pentru text:** Cormorant Garamond (serif)
- **Font UI:** Inter (sans-serif) — butoane, subtitrări, navigare
- **Paletă:**
  - Primar (CTA accent): `#E91E63`
  - Brand (fundal hero, suprafețe mari): `#E7B5C0`
  - Paper (fundaluri secundare): `#F5E6EA`
  - Text: `#2B2B2B`

Folosiți întotdeauna `theme.palette.*` — nu codificați direct valori hex.

Vedeți [`packages/web/CLAUDE.md`](./packages/web/CLAUDE.md) pentru convențiile frontend complete.

## Convenții

- **TypeScript:** `strict: true` · fără `any` · preferați `type` imports · preferați type guards în locul `as`
- **Fișiere:** kebab-case (`hero-section.tsx`)
- **Componente:** PascalCase, una per fișier, doar funcționale
- **Importuri:** alias `@/` pentru căi din `packages/web`, sortate alfabetic în grupuri (builtin · extern · intern · relativ)
- **Stilizare:** `sx` prop sau `styled()` din MUI — fără CSS brut, fără hex hardcodat
- **Commit-uri:** [Conventional Commits](https://www.conventionalcommits.org) — aplicate prin commitlint
- **Pre-commit:** lint-staged rulează Prettier + ESLint pe fișierele adăugate

Regulile complete în [`CLAUDE.md`](./CLAUDE.md).

## Flux Git

- Creați o ramură din `main` și deschideți un PR — push-urile directe în `main` sunt descurajate
- Nu săriți peste pre-commit hooks (`--no-verify`)
- Nu faceți force-push pe ramuri partajate

## Documentație

- [`CLAUDE.md`](./CLAUDE.md) — convenții de cod și reguli pentru asistentul AI
- [`EVO_Studio_premium_design_brief.md`](./EVO_Studio_premium_design_brief.md) — brief-ul original de design
- [`EVO_Studio_design_review.md`](./EVO_Studio_design_review.md) — note de design review
- [`docs/superpowers/specs/`](./docs/superpowers/specs/) — specificații de design pe secțiuni
- [`docs/superpowers/plans/`](./docs/superpowers/plans/) — planuri de implementare

## Licență

Proiect privat — toate drepturile rezervate.
