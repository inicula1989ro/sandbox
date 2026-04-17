# Contact Section & Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Contact & Booking section (dark background, split layout with contact info + map placeholder, dual anchor #contact/#book) and a minimal Footer that seamlessly continues the dark theme.

**Architecture:** Contact lives in `features/contact/` (three components: section, info, map). Footer lives in `components/layout/` (single component). Both read from `copy.ts`. Dark section uses white/light text. Footer shares the same dark background with a subtle top border.

**Tech Stack:** React 19, MUI v9 (Box, Typography, Button, IconButton, Icons), CSS Grid, `useInView` hook.

**Depends on:** `shared-infrastructure` plan (useInView hook, updated copy.ts with contact/social/footer fields).

---

## File Map

### Create

- `packages/web/src/assets/map-placeholder.jpg` — static map screenshot
- `packages/web/src/features/contact/contact-info.tsx` — left column: details + CTAs
- `packages/web/src/features/contact/contact-map.tsx` — right column: map placeholder
- `packages/web/src/features/contact/contact-section.tsx` — full section layout
- `packages/web/src/features/contact/index.ts` — barrel export
- `packages/web/src/components/layout/footer.tsx` — site footer

### Modify

- `packages/web/src/components/layout/index.ts` — add Footer export
- `packages/web/src/app/app.tsx` — replace contact/book placeholders, add Footer

---

## Task 1: Download Map Placeholder

**Files:**

- Create: `packages/web/src/assets/map-placeholder.jpg`

- [ ] **Step 1: Download a static map placeholder image**

```bash
cd /Users/alekseyborisko/Projects/beaty/packages/web/src/assets
curl -L -o map-placeholder.jpg "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
```

If URL fails, find any Unsplash image of a city map or aerial view.

- [ ] **Step 2: Verify file exists**

```bash
ls -la /Users/alekseyborisko/Projects/beaty/packages/web/src/assets/map-placeholder.jpg
```

Expected: 1 file, 50-300KB.

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/assets/map-placeholder.jpg
git commit -m "chore: add placeholder map image for contact section"
```

---

## Task 2: ContactInfo Component

**Files:**

- Create: `packages/web/src/features/contact/contact-info.tsx`

- [ ] **Step 1: Create ContactInfo component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/contact/contact-info.tsx`:

```tsx
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { copy } from '@/constants/copy'

const fadeInUp = {
  '@keyframes fadeInUp': {
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}

export interface ContactInfoProps {
  animate: boolean
}

export function ContactInfo({ animate }: ContactInfoProps) {
  return (
    <Box
      sx={{
        ...fadeInUp,
        opacity: animate ? 1 : 0,
        '@media (prefers-reduced-motion: no-preference)': {
          animation: animate ? 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both' : 'none',
        },
        '@media (prefers-reduced-motion: reduce)': {
          opacity: 1,
        },
      }}
    >
      {/* Overline */}
      <Typography
        sx={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.75rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'brand.main',
          mb: 1.5,
        }}
      >
        {copy.contact.overline}
      </Typography>

      {/* Title */}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2.25rem', md: '2.75rem' },
          color: '#FFFFFF',
          mb: 4,
        }}
      >
        {copy.contact.title}
      </Typography>

      {/* Contact Details */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <PlaceOutlinedIcon sx={{ color: 'brand.main', fontSize: 20 }} />
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.9375rem',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            {copy.contact.address}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <PhoneOutlinedIcon sx={{ color: 'brand.main', fontSize: 20 }} />
          <Typography
            component="a"
            href={`tel:${copy.contact.phone.replace(/\s/g, '')}`}
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.9375rem',
              color: 'rgba(255, 255, 255, 0.8)',
              textDecoration: 'none',
              '&:hover': { color: '#FFFFFF' },
            }}
          >
            {copy.contact.phone}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AccessTimeOutlinedIcon sx={{ color: 'brand.main', fontSize: 20 }} />
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.9375rem',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            {copy.contact.hours}
          </Typography>
        </Box>
      </Box>

      {/* Social Links */}
      <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
        <IconButton
          component="a"
          href={copy.social.instagram}
          aria-label="Instagram"
          sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#FFFFFF' } }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component="a"
          href={copy.social.facebook}
          aria-label="Facebook"
          sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#FFFFFF' } }}
        >
          <FacebookOutlinedIcon />
        </IconButton>
      </Box>

      {/* CTA Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1.5,
        }}
      >
        <Button variant="contained" color="primary" href="#book" size="large">
          {copy.contact.ctaBook}
        </Button>
        <Button
          variant="outlined"
          href={`tel:${copy.contact.phone.replace(/\s/g, '')}`}
          size="large"
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.5)',
            color: '#FFFFFF',
            '&:hover': {
              borderColor: '#FFFFFF',
              bgcolor: 'rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          {copy.contact.ctaCall}
        </Button>
        <Button
          variant="text"
          href="https://maps.google.com/?q=str.+Nicolae+Starostenco+25+Chisinau"
          target="_blank"
          rel="noopener noreferrer"
          size="large"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': { color: '#FFFFFF' },
          }}
        >
          {copy.contact.ctaDirections}
        </Button>
      </Box>
    </Box>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/features/contact/contact-info.tsx
git commit -m "feat: add ContactInfo with details, social links, and CTAs"
```

---

## Task 3: ContactMap Component

**Files:**

- Create: `packages/web/src/features/contact/contact-map.tsx`

- [ ] **Step 1: Create ContactMap component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/contact/contact-map.tsx`:

```tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import mapPlaceholder from '@/assets/map-placeholder.jpg'
import { copy } from '@/constants/copy'

const fadeInUp = {
  '@keyframes fadeInUp': {
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}

export interface ContactMapProps {
  animate: boolean
}

export function ContactMap({ animate }: ContactMapProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        aspectRatio: { xs: '16 / 10', md: '1 / 1' },
        border: '1px solid rgba(255, 255, 255, 0.1)',
        ...fadeInUp,
        opacity: animate ? 1 : 0,
        '@media (prefers-reduced-motion: no-preference)': {
          animation: animate ? 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s both' : 'none',
        },
        '@media (prefers-reduced-motion: reduce)': {
          opacity: 1,
        },
      }}
    >
      <Box
        component="img"
        src={mapPlaceholder}
        alt="EVO Studio location — str. Nicolae Starostenco 25, Chisinau"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Overlay with link */}
      <Box
        component="a"
        href="https://maps.google.com/?q=str.+Nicolae+Starostenco+25+Chisinau"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.3)',
          textDecoration: 'none',
          transition: 'background-color 0.3s',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: '#FFFFFF',
            px: 3,
            py: 1.5,
            borderRadius: 6,
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {copy.contact.mapPlaceholder}
        </Typography>
      </Box>
    </Box>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add packages/web/src/features/contact/contact-map.tsx
git commit -m "feat: add ContactMap placeholder with Google Maps link overlay"
```

---

## Task 4: ContactSection Component

**Files:**

- Create: `packages/web/src/features/contact/contact-section.tsx`
- Create: `packages/web/src/features/contact/index.ts`

- [ ] **Step 1: Create ContactSection component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/contact/contact-section.tsx`:

```tsx
import Box from '@mui/material/Box'

import { ContactInfo } from '@/features/contact/contact-info'
import { ContactMap } from '@/features/contact/contact-map'
import { useInView } from '@/hooks/use-in-view'

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <Box
      component="section"
      id="contact"
      ref={ref}
      sx={{
        scrollMarginTop: { xs: '64px', md: '72px' },
        bgcolor: 'text.primary',
        py: { xs: 10, md: 15 },
        px: { xs: 3, sm: 4, md: 5 },
      }}
    >
      {/* In-flow anchor for #book — both #contact and #book scroll here */}
      <Box
        component="span"
        id="book"
        sx={{
          display: 'block',
          height: 0,
          overflow: 'hidden',
          scrollMarginTop: { xs: '64px', md: '72px' },
        }}
      />

      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 5, md: 8 },
          alignItems: 'center',
        }}
      >
        <ContactInfo animate={inView} />
        <ContactMap animate={inView} />
      </Box>
    </Box>
  )
}
```

- [ ] **Step 2: Create barrel export**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/features/contact/index.ts`:

```ts
export { ContactSection } from '@/features/contact/contact-section'
```

- [ ] **Step 3: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/features/contact/
git commit -m "feat: add ContactSection with info, map, and dual anchor support"
```

---

## Task 5: Footer Component

**Files:**

- Create: `packages/web/src/components/layout/footer.tsx`
- Modify: `packages/web/src/components/layout/index.ts`
- Uses: `packages/web/src/assets/logo.png` (existing asset — same file the Header already imports)

- [ ] **Step 1: Create Footer component**

Create `/Users/alekseyborisko/Projects/beaty/packages/web/src/components/layout/footer.tsx`:

```tsx
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import logo from '@/assets/logo.png'
import { copy } from '@/constants/copy'

const navItems = Object.entries(copy.nav).map(([key, label]) => ({
  key,
  label,
  href: `#${key}`,
}))

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'text.primary',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        py: { xs: 6, md: 8 },
        px: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' },
          gap: { xs: 4, md: 6 },
          alignItems: 'center',
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        {/* Left — Brand */}
        <Box>
          <Box
            component="img"
            src={logo}
            alt={copy.brand.name}
            sx={{
              height: 36,
              width: 'auto',
              filter: 'brightness(0) invert(1)',
              mx: { xs: 'auto', md: 0 },
              display: 'block',
            }}
          />
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.8125rem',
              color: 'rgba(255, 255, 255, 0.5)',
              mt: 0.75,
            }}
          >
            {copy.brand.tagline}
          </Typography>
        </Box>

        {/* Center — Navigation */}
        <Box
          component="nav"
          aria-label="Footer navigation"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 2, md: 3 },
          }}
        >
          {navItems.map(({ key, label, href }) => (
            <Typography
              key={key}
              component="a"
              href={href}
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.8125rem',
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                '&:hover': { color: '#FFFFFF' },
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>

        {/* Right — Social + Copyright */}
        <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
              gap: 1,
              mb: 1,
            }}
          >
            <IconButton
              component="a"
              href={copy.social.instagram}
              aria-label="Instagram"
              size="small"
              sx={{ color: 'rgba(255, 255, 255, 0.6)', '&:hover': { color: '#FFFFFF' } }}
            >
              <InstagramIcon fontSize="small" />
            </IconButton>
            <IconButton
              component="a"
              href={copy.social.facebook}
              aria-label="Facebook"
              size="small"
              sx={{ color: 'rgba(255, 255, 255, 0.6)', '&:hover': { color: '#FFFFFF' } }}
            >
              <FacebookOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.4)',
            }}
          >
            {copy.footer.copyright}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
```

- [ ] **Step 2: Update barrel export**

Read current `/Users/alekseyborisko/Projects/beaty/packages/web/src/components/layout/index.ts` and add `Footer` export. The file should export all layout components:

```ts
export { Footer } from '@/components/layout/footer'
export { Header } from '@/components/layout/header'
export { MobileMenu } from '@/components/layout/mobile-menu'
export { SectionPlaceholder } from '@/components/layout/section-placeholder'

export type { SectionPlaceholderProps } from '@/components/layout/section-placeholder'
```

- [ ] **Step 3: Verify typecheck**

```bash
yarn typecheck
```

Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/components/layout/footer.tsx packages/web/src/components/layout/index.ts
git commit -m "feat: add Footer component with nav echo, social links, and copyright"
```

---

## Task 6: Integrate Into App Shell

**Files:**

- Modify: `packages/web/src/app/app.tsx`

- [ ] **Step 1: Update app.tsx — final version**

Replace contents of `/Users/alekseyborisko/Projects/beaty/packages/web/src/app/app.tsx`:

```tsx
import { Footer, Header } from '@/components/layout'
import { AboutSection } from '@/features/about'
import { ContactSection } from '@/features/contact'
import { GallerySection } from '@/features/gallery'
import { HeroSection } from '@/features/hero'
import { PricingSection } from '@/features/pricing'
import { ServicesSection } from '@/features/services'
import { SpecialistsSection } from '@/features/specialists'

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
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
```

Note: `SectionPlaceholder` import is no longer needed — all sections are now real components. The `sectionIds` array is removed.

- [ ] **Step 2: Verify typecheck, lint, build**

```bash
yarn typecheck && yarn lint && yarn build
```

Expected: all pass.

- [ ] **Step 3: Visual verification**

Start dev server, scroll to contact section and footer. Verify:

- Dark background (#2B2B2B) with strong contrast from white gallery above
- Desktop: contact info left, map placeholder right, side by side
- Mobile: stacked — info on top, map below
- Overline in brand pink, title in white, details in white at 80% opacity
- Phone number is a clickable `tel:` link
- Social icon buttons (Instagram, Facebook)
- Three CTA buttons: "Book an appointment" (primary), "Call now" (outlined white), "Get directions" (text white)
- Map placeholder: click opens Google Maps in new tab
- Footer seamlessly continues dark background with subtle top border
- Footer: logo (white via filter), tagline, nav links, social icons, copyright
- Desktop footer: 3-column layout. Mobile: stacked centered.
- All nav links in header and footer work (smooth scroll to sections)
- Both `#contact` and `#book` anchors scroll to the contact section

- [ ] **Step 4: Commit**

```bash
git add packages/web/src/app/app.tsx
git commit -m "feat: integrate ContactSection and Footer — complete page layout"
```
