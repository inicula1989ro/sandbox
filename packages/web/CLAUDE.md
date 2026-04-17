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
├── index.ts          # barrel export
└── useHeroData.ts    # data hook if needed
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
