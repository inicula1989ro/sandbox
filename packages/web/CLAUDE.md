# @evo/web — Frontend

Vite + React 19 single-page application for Evo Studio. Pixel-perfect port of the
HTML/CSS prototype delivered via the design handoff bundle.

## Design system

- **Background:** `--bg #0a0508`, `--bg-2 #120810`, `--surface #1a0d16`
- **Foreground:** `--fg #f5ecef`, `--fg-dim #c8b5c0`, `--fg-mute #8a7580`
- **Pink scale:** `--pink #e8308a` (primary), `--pink-bright #ff3d95`, `--pink-deep #b01d6b`
- **Type scale**
  - Display: `Cormorant Garamond` (serif)
  - UI / sans: `Jost`
  - Script accents: `Great Vibes`
  - Mono / labels: `JetBrains Mono`

All tokens live in `src/styles/global.css` as CSS custom properties on `:root`.
Reference them via `var(--token)` — never hardcode hex values.

## Component conventions

- The design uses raw HTML elements + global CSS classes (no MUI, no `sx`).
- Components live under `src/components/` (shared) and `src/features/` (page sections).
- Each section receives the active `Translation` as a `t` prop from the App shell.
- One component per file, kebab-case filename, PascalCase component name, props
  type colocated and exported.

## i18n

- Three languages: RO is default at `/` (canonical home); RU at `/ru`, EN at `/en`.
- All copy lives in `src/constants/i18n.ts` keyed by `Lang`.
- Active language state is held in `App` and switched via the `lang-switch` widget
  in `Nav`.

## Assets

- Brand logo: `src/assets/evo-logo.png` (pre-cropped, transparent background).
- Service icons: `src/assets/icons/*.png` (line-art masks; coloured via CSS `mask`).
- Import images via module import, not public URL strings.
