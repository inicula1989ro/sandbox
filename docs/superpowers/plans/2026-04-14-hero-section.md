# Hero Section + Sticky Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first visible section of the EVO Studio website — a sticky header with scroll-aware state transitions, and a full-viewport hero with centered content over a tinted background image.

**Architecture:** Header is a layout component (used on every page). Hero is a feature component. Both read copy from `constants/copy.ts`. Header uses a custom `useScrollPosition` hook for transparent-to-solid transition. Hero uses CSS keyframe animations with `prefers-reduced-motion` gate. Placeholder sections provide scroll targets for navigation anchors.

**Tech Stack:** React 19, MUI v9 (Box, Typography, Button, AppBar, Drawer, IconButton), CSS keyframes, IntersectionObserver.

---

## File Map

### Create

- `packages/web/src/hooks/use-scroll-position.ts` — scroll position hook
- `packages/web/src/components/layout/header.tsx` — sticky header
- `packages/web/src/components/layout/mobile-menu.tsx` — mobile nav drawer
- `packages/web/src/components/layout/section-placeholder.tsx` — anchor placeholder
- `packages/web/src/components/layout/index.ts` — barrel exports
- `packages/web/src/features/hero/hero-section.tsx` — hero component
- `packages/web/src/features/hero/scroll-indicator.tsx` — animated scroll hint
- `packages/web/src/features/hero/index.ts` — barrel exports
- `packages/web/src/assets/hero-bg.jpg` — placeholder background image

### Modify

- `packages/web/src/app/app.tsx` — replace placeholder with Header + Hero + section anchors
- `packages/web/src/constants/copy.ts` — add `header` section for wordmark text

---

## Task 1: useScrollPosition hook

**Files:**

- Create: `packages/web/src/hooks/use-scroll-position.ts`

- [ ] **Step 1: Create the hook**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/hooks/use-scroll-position.ts`:

```ts
import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD = 80

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return {
    scrollY,
    isScrolled: scrollY > SCROLL_THRESHOLD,
  }
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
cd packages/web && npx tsc --noEmit src/hooks/use-scroll-position.ts 2>&1 || true
```

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/hooks/use-scroll-position.ts
git commit -m "feat: add useScrollPosition hook with rAF throttling"
```

---

## Task 2: MobileMenu component

**Files:**

- Create: `packages/web/src/components/layout/mobile-menu.tsx`

- [ ] **Step 1: Create MobileMenu**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/components/layout/mobile-menu.tsx`:

```tsx
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import { copy } from '@/constants/copy'

export interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

const navItems = Object.entries(copy.nav).map(([key, label]) => ({
  key,
  label,
  href: `#${key}`,
}))

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      aria-label="Main navigation"
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.default',
          pt: 10,
          px: 2,
        },
      }}
    >
      <nav>
        <List>
          {navItems.map(({ key, label, href }) => (
            <ListItemButton
              key={key}
              component="a"
              href={href}
              onClick={onClose}
              sx={{
                borderRadius: 2,
                mb: 0.5,
              }}
            >
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </nav>
      <Box sx={{ px: 2, mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          href="#book"
          onClick={onClose}
          sx={{ py: 1.5 }}
        >
          {copy.hero.cta}
        </Button>
      </Box>
    </Drawer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/web/src/components/layout/mobile-menu.tsx
git commit -m "feat: add MobileMenu drawer component with nav links"
```

---

## Task 3: Sticky Header component

**Files:**

- Create: `packages/web/src/components/layout/header.tsx`

- [ ] **Step 1: Create Header**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/components/layout/header.tsx`:

```tsx
import { useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { MobileMenu } from '@/components/layout/mobile-menu'
import { copy } from '@/constants/copy'
import { useScrollPosition } from '@/hooks/use-scroll-position'

const navItems = Object.entries(copy.nav).map(([key, label]) => ({
  key,
  label,
  href: `#${key}`,
}))

export function Header() {
  const { isScrolled } = useScrollPosition()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          boxShadow: isScrolled ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.3s ease',
          color: isScrolled ? 'text.primary' : '#FFFFFF',
        }}
      >
        <Toolbar
          sx={{
            height: { xs: 64, md: 72 },
            px: { xs: 2, md: 4 },
            justifyContent: 'space-between',
          }}
        >
          {/* Logo wordmark */}
          <Typography
            component="a"
            href="#"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              color: 'inherit',
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
            {copy.brand.name}
          </Typography>

          {/* Desktop navigation */}
          <Box
            component="nav"
            aria-label="Main navigation"
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 3,
              alignItems: 'center',
            }}
          >
            {navItems.map(({ key, label, href }) => (
              <Typography
                key={key}
                component="a"
                href={href}
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  opacity: 0.9,
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 1 },
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>

          {/* Right side: Book Now + hamburger */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              href="#book"
              size="small"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                px: 3,
                py: 1,
                fontSize: '0.8125rem',
              }}
            >
              {copy.hero.cta}
            </Button>

            <IconButton
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { md: 'none' },
                color: 'inherit',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/web/src/components/layout/header.tsx
git commit -m "feat: add sticky Header with scroll-aware transparency"
```

---

## Task 4: SectionPlaceholder component + layout barrel export

**Files:**

- Create: `packages/web/src/components/layout/section-placeholder.tsx`
- Create: `packages/web/src/components/layout/index.ts`

- [ ] **Step 1: Create SectionPlaceholder**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/components/layout/section-placeholder.tsx`:

```tsx
import Box from '@mui/material/Box'

export interface SectionPlaceholderProps {
  id: string
}

export function SectionPlaceholder({ id }: SectionPlaceholderProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        scrollMarginTop: { xs: '64px', md: '72px' },
      }}
    />
  )
}
```

- [ ] **Step 2: Create barrel export**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/components/layout/index.ts`:

```ts
export { Header } from './header'
export { MobileMenu } from './mobile-menu'
export type { MobileMenuProps } from './mobile-menu'
export { SectionPlaceholder } from './section-placeholder'
export type { SectionPlaceholderProps } from './section-placeholder'
```

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/components/layout/section-placeholder.tsx packages/web/src/components/layout/index.ts
git commit -m "feat: add SectionPlaceholder and layout barrel exports"
```

---

## Task 5: ScrollIndicator component

**Files:**

- Create: `packages/web/src/features/hero/scroll-indicator.tsx`

- [ ] **Step 1: Create ScrollIndicator**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/hero/scroll-indicator.tsx`:

```tsx
import { useEffect, useRef, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Box from '@mui/material/Box'

export function ScrollIndicator() {
  const [visible, setVisible] = useState(true)
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const hero = document.getElementById('hero')
    heroRef.current = hero

    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setVisible(entry.isIntersecting)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const handleClick = () => {
    const firstSection = document.getElementById('services')
    firstSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  if (!visible) return null

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-label="Scroll to content"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      sx={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
        color: '#2B2B2B',
        opacity: 0.6,
        transition: 'opacity 0.2s',
        '&:hover': { opacity: 1 },
        '@keyframes pulse': {
          '0%, 100%': {
            opacity: 0.4,
            transform: 'translateY(0)',
          },
          '50%': {
            opacity: 1,
            transform: 'translateY(8px)',
          },
        },
        '@media (prefers-reduced-motion: no-preference)': {
          animation: 'pulse 2s ease-in-out infinite',
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: 4,
          borderRadius: 1,
        },
      }}
    >
      <KeyboardArrowDownIcon sx={{ fontSize: 32 }} />
    </Box>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/web/src/features/hero/scroll-indicator.tsx
git commit -m "feat: add ScrollIndicator with pulse animation and a11y"
```

---

## Task 6: Download hero background image

**Files:**

- Create: `packages/web/src/assets/hero-bg.jpg`

- [ ] **Step 1: Download a placeholder hero image from Unsplash**

```bash
curl -L "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80&fit=crop" -o packages/web/src/assets/hero-bg.jpg
```

This is a beauty salon image with soft lighting — works well with the pink tint overlay.

- [ ] **Step 2: Verify file exists and has reasonable size**

```bash
ls -lh packages/web/src/assets/hero-bg.jpg
```

Expected: file exists, 100KB-500KB range.

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/assets/hero-bg.jpg
git commit -m "chore: add placeholder hero background image"
```

---

## Task 7: HeroSection component

**Files:**

- Create: `packages/web/src/features/hero/hero-section.tsx`
- Create: `packages/web/src/features/hero/index.ts`

- [ ] **Step 1: Create HeroSection**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/hero/hero-section.tsx`:

```tsx
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { copy } from '@/constants/copy'
import { ScrollIndicator } from '@/features/hero/scroll-indicator'

import heroBg from '@/assets/hero-bg.jpg'

const fadeInBase = {
  '@media (prefers-reduced-motion: no-preference)': {
    animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both',
  },
}

export function HeroSection() {
  return (
    <Box
      id="hero"
      component="section"
      sx={{
        position: 'relative',
        height: { xs: '100svh', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',

        // Background image
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        },

        // Brand tint overlay
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(231, 181, 192, 0.75)',
          zIndex: 1,
        },

        // Keyframes
        '@keyframes fadeInUp': {
          from: {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      {/* Dark top gradient for header readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 140,
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          maxWidth: 600,
          px: 3,
          pt: { xs: '64px', md: '72px' },
        }}
      >
        {/* Overline */}
        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'primary.main',
            mb: 2,
            ...fadeInBase,
          }}
        >
          {copy.brand.name}
        </Typography>

        {/* Headline */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
            fontWeight: 700,
            color: 'text.primary',
            mb: 1.75,
            lineHeight: 1.15,
            ...fadeInBase,
            '@media (prefers-reduced-motion: no-preference)': {
              animationDelay: '0.1s',
              animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both',
            },
          }}
        >
          {copy.hero.headline}
        </Typography>

        {/* Subheadline — Inter (sans-serif) per brand system */}
        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: { xs: '1rem', md: '1.125rem' },
            color: 'text.primary',
            opacity: 0.8,
            maxWidth: 460,
            mx: 'auto',
            mb: 3.5,
            lineHeight: 1.6,
            ...fadeInBase,
            '@media (prefers-reduced-motion: no-preference)': {
              animationDelay: '0.2s',
              animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both',
            },
          }}
        >
          {copy.hero.subheadline}
        </Typography>

        {/* CTA buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1.5,
            justifyContent: 'center',
            alignItems: 'center',
            ...fadeInBase,
            '@media (prefers-reduced-motion: no-preference)': {
              animationDelay: '0.3s',
              animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both',
            },
          }}
        >
          <Button variant="contained" color="primary" href="#book" size="large">
            {copy.hero.cta}
          </Button>
          <Button
            variant="outlined"
            href="#services"
            size="large"
            sx={{
              borderColor: 'text.primary',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'text.primary',
                bgcolor: 'rgba(43, 43, 43, 0.08)',
              },
            }}
          >
            {copy.hero.ctaSecondary}
          </Button>
        </Box>
      </Box>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </Box>
  )
}
```

- [ ] **Step 2: Create barrel export**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/hero/index.ts`:

```ts
export { HeroSection } from './hero-section'
export { ScrollIndicator } from './scroll-indicator'
```

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/features/hero/
git commit -m "feat: add HeroSection with centered layout, tint overlay, and animations"
```

---

## Task 8: Update App shell to render Header + Hero + placeholders

**Files:**

- Modify: `packages/web/src/app/app.tsx`

- [ ] **Step 1: Rewrite app.tsx**

Replace `/Users/alekseyborisko/Projects/beaty/packages/web/src/app/app.tsx`:

```tsx
import { Header, SectionPlaceholder } from '@/components/layout'
import { HeroSection } from '@/features/hero'

const sectionIds = ['services', 'prices', 'specialists', 'about', 'gallery', 'contact', 'book']

export function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        {sectionIds.map((id) => (
          <SectionPlaceholder key={id} id={id} />
        ))}
      </main>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/web/src/app/app.tsx
git commit -m "feat: integrate Header, HeroSection, and section placeholders"
```

---

## Task 9: Verify build + visual check

- [ ] **Step 1: Run TypeScript check**

```bash
yarn typecheck
```

Expected: no errors.

- [ ] **Step 2: Run ESLint**

```bash
yarn lint
```

Expected: no errors.

- [ ] **Step 3: Run build**

```bash
yarn build
```

Expected: build succeeds.

- [ ] **Step 4: Start dev server and visual check**

Start the dev server via `preview_start("evo-studio-dev")`. Take a screenshot. Verify:

- Header visible at top with "EVO Studio" wordmark + nav + "Book Now"
- Hero fills viewport with tinted background image
- Headline, subheadline, and CTA buttons centered
- Scroll indicator at bottom
- Scrolling changes header to white/solid

- [ ] **Step 5: Check mobile view**

Resize to mobile (375px). Verify:

- Hamburger icon visible, nav hidden
- CTAs stacked vertically
- Headline readable at smaller size
- Drawer opens on hamburger click

- [ ] **Step 6: Fix any issues found and commit**

```bash
git add -A
git commit -m "fix: address visual review issues in hero section"
```

(Only if there are changes to commit.)

---

## Summary

After all 9 tasks, the site will have:

| Component            | What it does                                              |
| -------------------- | --------------------------------------------------------- |
| `useScrollPosition`  | rAF-throttled scroll tracking hook                        |
| `MobileMenu`         | Full-width drawer with nav links + Book Now               |
| `Header`             | Sticky, transparent→solid on scroll, wordmark logo        |
| `SectionPlaceholder` | Invisible anchor targets for nav links                    |
| `ScrollIndicator`    | Animated chevron, hides on scroll, accessible             |
| `HeroSection`        | Full-viewport, tinted bg image, centered content, fade-in |
| `App`                | Integrates all components with placeholder sections       |
