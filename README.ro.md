# EVO Studio

> Site web pentru un salon de frumusețe premium — Chișinău, Moldova.

Site de prezentare single-page pentru EVO Studio: păr, unghii, îngrijirea feței, sprâncene & gene și tratamente corporale, într-un design calm și elegant. Build-ul rulează prerender Puppeteer și produce HTML static per limbă (RO / RU / EN) pentru SEO.

**Limbi:** [English](./README.md) · [Română](./README.ro.md)

---

## Stivă tehnologică

- **Monorepo:** [Yarn 4 workspaces](https://yarnpkg.com/features/workspaces)
- **Frontend** (`packages/web`): [Vite](https://vitejs.dev) · [React 19](https://react.dev) · [TypeScript strict](https://www.typescriptlang.org) · [react-router-dom v7](https://reactrouter.com)
- **Stilizare:** CSS simplu cu custom properties (fără MUI, fără CSS-in-JS)
- **Build SEO:** prerender Puppeteer, favicon-uri și OG image generate cu [`sharp`](https://sharp.pixelplumbing.com), `sitemap.xml` și `robots.txt`
- **Tooling:** ESLint · Prettier · commitlint · husky + lint-staged

## Pornire rapidă

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

| Comandă                                   | Descriere                                                          |
| ----------------------------------------- | ------------------------------------------------------------------ |
| `yarn dev`                                | Pornește serverul Vite de dezvoltare (port 5173)                   |
| `yarn build`                              | `tsc -b` → `vite build` → prerender Puppeteer (HTML per limbă)     |
| `yarn lint` / `yarn lint:fix`             | ESLint                                                             |
| `yarn typecheck`                          | `tsc -b` pe toate workspace-urile                                  |
| `yarn format` / `yarn format:check`       | Prettier                                                           |
| `yarn workspace @evo/web build:assets`    | Regenerează favicon-urile și OG image (după modificări de brand)   |

## Structura proiectului

```
sandbox/
├── packages/web/
│   ├── public/                 # active statice (favicon-uri, og-image, sitemap.xml, robots.txt, manifest)
│   ├── scripts/                # prerender + generare favicon/OG
│   └── src/
│       ├── app/                # App shell, providers, router, semnal prerender-mode
│       ├── assets/             # logo + iconițe servicii (PNG)
│       ├── components/         # book-fab, icons, intro, layout/nav, seo-head, waves
│       ├── constants/          # dicționar i18n + configurare SEO
│       ├── features/           # hero, services, pricing, about, team, contact
│       ├── locales/            # module de traducere per limbă
│       └── styles/             # global.css — tokens de design + stiluri portate din prototip
├── docs/                       # brief-uri de design, specificații, planuri
├── CLAUDE.md                   # convenții pentru dezvoltare asistată de AI
└── package.json                # rădăcina workspace-urilor
```

## Secțiuni

Site-ul este format din următoarele secțiuni, fiecare în `packages/web/src/features/`:

- **Hero** — titlu de brand și CTA principal
- **Services** — cinci direcții signature: păr, unghii, față, sprâncene & gene, corp
- **Pricing** — prețuri de pornire transparente, în MDL
- **About** — povestea salonului și beneficii
- **Team** — carduri pentru echipă
- **Contact** — adresă, telefon, program, hartă

Toate textele vizibile pentru utilizator se află în `packages/web/src/constants/i18n.ts` — nu introduceți text direct în componente.

## Limbi & SEO

- RO este pagina canonică la `/`; `/ru` și `/en` sunt rute frate
- `SeoHead` gestionează `<title>`, descrierea, OG, canonical, hreflang și JSON-LD `BeautySalon` per limbă
- `yarn build` rulează Puppeteer pentru a prerenda HTML static pentru fiecare limbă, astfel încât crawler-ele să vadă conținut complet randat

## Convenții

- **TypeScript:** `strict: true` · fără `any` · preferați `type` imports · preferați type guards în locul `as`
- **Fișiere:** kebab-case (`hero-section.tsx`)
- **Componente:** PascalCase, una per fișier, doar funcționale
- **Importuri:** alias `@/` pentru căi din `packages/web`, sortate alfabetic în grupuri (builtin · extern · intern · relativ)
- **Stilizare:** clase CSS din `src/styles/global.css`, referințe la tokens prin `var(--token)` (roz brand `#e8308a`) — fără hex hardcodat
- **Commit-uri:** [Conventional Commits](https://www.conventionalcommits.org) — aplicate prin commitlint
- **Pre-commit:** lint-staged rulează Prettier + ESLint pe fișierele adăugate

Reguli complete în [`CLAUDE.md`](./CLAUDE.md) și [`packages/web/CLAUDE.md`](./packages/web/CLAUDE.md).

## Flux Git

- Creați o ramură din `main` și deschideți un PR — push-urile directe în `main` sunt descurajate
- Nu săriți peste pre-commit hooks (`--no-verify`)
- Nu faceți force-push pe ramuri partajate

## Documentație

- [`CLAUDE.md`](./CLAUDE.md) — convenții de cod și reguli pentru asistentul AI
- [`packages/web/CLAUDE.md`](./packages/web/CLAUDE.md) — note despre sistemul de design al frontend-ului
- [`EVO_Studio_premium_design_brief.md`](./EVO_Studio_premium_design_brief.md) — brief-ul original de design
- [`EVO_Studio_design_review.md`](./EVO_Studio_design_review.md) — note de design review
- [`docs/superpowers/specs/`](./docs/superpowers/specs/) — specificații de design pe secțiuni
- [`docs/superpowers/plans/`](./docs/superpowers/plans/) — planuri de implementare

## Licență

Proiect privat — toate drepturile rezervate.
