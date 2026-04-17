# About Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the About section — a two-part layout combining a cinematic split (image + story text with blockquote) and a "Why EVO Studio" benefits grid with MUI icons.

**Architecture:** Feature folder `features/about/` with two components: `AboutSection` (full layout) and `BenefitItem` (icon + title). Uses `useInView` for scroll animation. MUI icons mapped from string keys in copy data.

**Tech Stack:** React 19, MUI v9 (Box, Typography, Icons), CSS Grid, `useInView` hook.

**Depends on:** `shared-infrastructure` plan (useInView hook, updated copy.ts with restructured whyEvo).

---

## File Map

### Create

- `packages/web/src/assets/about-salon.jpg` — placeholder salon interior image
- `packages/web/src/features/about/benefit-item.tsx` — single benefit with icon
- `packages/web/src/features/about/about-section.tsx` — full section layout
- `packages/web/src/features/about/index.ts` — barrel export

### Modify

- `packages/web/src/app/app.tsx` — replace about placeholder with AboutSection

---

## Task 1: Download Placeholder Image

**Files:**

- Create: `packages/web/src/assets/about-salon.jpg`

- [ ] **Step 1: Download salon interior image**

```bash
cd /Users/alekseyborisko/Projects/beaty/packages/web/src/assets
curl -L -o about-salon.jpg "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&q=80"
```

If URL fails, find a replacement Unsplash image (beauty salon interior, warm lighting, elegant decor).

- [ ] **Step 2: Verify file exists**

```bash
ls -la /Users/alekseyborisko/Projects/beaty/packages/web/src/assets/about-salon.jpg
```

Expected: 1 file, 50-400KB.

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/assets/about-salon.jpg
git commit -m "chore: add placeholder salon interior image for about section"
```

---

## Task 2: BenefitItem Component

**Files:**

- Create: `packages/web/src/features/about/benefit-item.tsx`

- [ ] **Step 1: Create BenefitItem component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/about/benefit-item.tsx`:

```tsx
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import type { SvgIconComponent } from '@mui/icons-material'

const iconMap: Record<string, SvgIconComponent> = {
  people: PeopleOutlinedIcon,
  favorite: FavoriteBorderOutlinedIcon,
  star: StarBorderOutlinedIcon,
  spa: SpaOutlinedIcon,
  verified: VerifiedOutlinedIcon,
  autoAwesome: AutoAwesomeOutlinedIcon,
}

export interface BenefitItemProps {
  icon: string
  title: string
  index: number
  animate: boolean
}

const fadeInUp = {
  '@keyframes fadeInUp': {
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}

export function BenefitItem({ icon, title, index, animate }: BenefitItemProps) {
  const IconComponent = iconMap[icon] ?? StarBorderOutlinedIcon

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        pt: 2,
        borderTop: '1px solid',
        borderColor: 'brand.main',
        ...fadeInUp,
        opacity: animate ? 1 : 0,
        '@media (prefers-reduced-motion: no-preference)': {
          animation: animate
            ? `fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s both`
            : 'none',
        },
        '@media (prefers-reduced-motion: reduce)': {
          opacity: 1,
        },
      }}
    >
      <IconComponent aria-hidden="true" sx={{ color: 'brand.dark', fontSize: 32 }} />
      <Typography
        sx={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: 'text.primary',
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes. If `SvgIconComponent` import path is wrong, try `import type { SvgIconComponent } from '@mui/icons-material'` — this is the correct MUI v9 import.

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/features/about/benefit-item.tsx
git commit -m "feat: add BenefitItem component with MUI icon mapping"
```

---

## Task 3: AboutSection Component

**Files:**

- Create: `packages/web/src/features/about/about-section.tsx`
- Create: `packages/web/src/features/about/index.ts`

- [ ] **Step 1: Create AboutSection component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/about/about-section.tsx`:

```tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import aboutSalon from '@/assets/about-salon.jpg'
import { copy } from '@/constants/copy'
import { BenefitItem } from '@/features/about/benefit-item'
import { useInView } from '@/hooks/use-in-view'

const fadeInUp = {
  '@keyframes fadeInUp': {
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}

export function AboutSection() {
  const { ref: storyRef, inView: storyInView } = useInView({ threshold: 0.15 })
  const { ref: benefitsRef, inView: benefitsInView } = useInView({ threshold: 0.15 })

  return (
    <Box
      component="section"
      id="about"
      sx={{
        scrollMarginTop: { xs: '64px', md: '72px' },
        bgcolor: 'background.paper',
        py: { xs: 10, md: 15 },
        px: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Part A: Salon Story — Split Layout */}
        <Box
          ref={storyRef}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'center',
          }}
        >
          {/* Left — Image */}
          <Box
            sx={{
              ...fadeInUp,
              opacity: storyInView ? 1 : 0,
              '@media (prefers-reduced-motion: no-preference)': {
                animation: storyInView ? 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both' : 'none',
              },
              '@media (prefers-reduced-motion: reduce)': {
                opacity: 1,
              },
            }}
          >
            <Box
              component="img"
              src={aboutSalon}
              alt="EVO Studio salon interior"
              sx={{
                width: '100%',
                aspectRatio: { xs: '16 / 10', md: '4 / 5' },
                objectFit: 'cover',
                borderRadius: 3,
                display: 'block',
                boxShadow: '0 24px 48px rgba(0,0,0,0.08)',
              }}
            />
          </Box>

          {/* Right — Text */}
          <Box
            sx={{
              ...fadeInUp,
              opacity: storyInView ? 1 : 0,
              '@media (prefers-reduced-motion: no-preference)': {
                animation: storyInView
                  ? 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s both'
                  : 'none',
              },
              '@media (prefers-reduced-motion: reduce)': {
                opacity: 1,
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'primary.main',
                mb: 1.5,
              }}
            >
              {copy.about.overline}
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.25rem', md: '2.75rem' },
                color: 'text.primary',
                mb: 2.5,
              }}
            >
              {copy.about.title}
            </Typography>

            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '1rem',
                color: 'text.primary',
                opacity: 0.85,
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              {copy.about.description}
            </Typography>

            <Box
              component="blockquote"
              sx={{
                m: 0,
                pl: 3,
                borderLeft: '3px solid',
                borderColor: 'brand.main',
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: 'text.primary',
                  opacity: 0.7,
                  lineHeight: 1.7,
                }}
              >
                {copy.about.quote}
              </Typography>
              <Typography
                component="footer"
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.875rem',
                  color: 'text.primary',
                  opacity: 0.6,
                  mt: 1,
                }}
              >
                {copy.about.quoteAttribution}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Part B: Why EVO — Benefits Grid */}
        <Box ref={benefitsRef} sx={{ mt: { xs: 7, md: 9 } }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              color: 'text.primary',
              textAlign: 'center',
              mb: { xs: 4, md: 5 },
              ...fadeInUp,
              opacity: benefitsInView ? 1 : 0,
              '@media (prefers-reduced-motion: no-preference)': {
                animation: benefitsInView
                  ? 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) both'
                  : 'none',
              },
              '@media (prefers-reduced-motion: reduce)': {
                opacity: 1,
              },
            }}
          >
            {copy.whyEvo.title}
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 4,
            }}
          >
            {copy.whyEvo.points.map((point, index) => (
              <BenefitItem
                key={point.title}
                icon={point.icon}
                title={point.title}
                index={index}
                animate={benefitsInView}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
```

- [ ] **Step 2: Create barrel export**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/about/index.ts`:

```ts
export { AboutSection } from '@/features/about/about-section'
```

- [ ] **Step 3: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/features/about/
git commit -m "feat: add AboutSection with story split layout and benefits grid"
```

---

## Task 4: Integrate Into App Shell

**Files:**

- Modify: `packages/web/src/app/app.tsx`

- [ ] **Step 1: Update app.tsx**

Add `AboutSection` import and replace placeholder. The file should look like:

```tsx
import { Header, SectionPlaceholder } from '@/components/layout'
import { AboutSection } from '@/features/about'
import { HeroSection } from '@/features/hero'
import { PricingSection } from '@/features/pricing'
import { ServicesSection } from '@/features/services'
import { SpecialistsSection } from '@/features/specialists'

const sectionIds = ['gallery', 'contact', 'book']

export function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <SpecialistsSection />
        <AboutSection />
        {sectionIds.map((id) => (
          <SectionPlaceholder key={id} id={id} />
        ))}
      </main>
    </>
  )
}
```

- [ ] **Step 2: Verify typecheck, lint, build**

```bash
yarn typecheck && yarn lint && yarn build
```

Expected: all pass.

- [ ] **Step 3: Visual verification**

Start dev server, scroll to about section. Verify:

- Pink background (#F5E6EA) alternates from white specialists above
- Desktop: image left, text right side by side
- Mobile: image on top, text below
- Overline + title + description + blockquote with left border
- Benefits grid below: 6 items with MUI icons, 2 cols mobile, 3 cols desktop
- Thin top border on each benefit item
- All elements animate in on scroll

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/app/app.tsx
git commit -m "feat: integrate AboutSection into app shell"
```
