import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { BrandButton, EvoLogo } from '@/components/ui'
import { BOOKING_URL } from '@/constants/links'
import { useScrollPosition } from '@/hooks/use-scroll-position'

const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2400&q=80'

const PARALLAX_FACTOR = 0.4

export function HeroSection() {
  const { t } = useTranslation()
  const { scrollY } = useScrollPosition()

  return (
    <Box
      component="section"
      id="top"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: '100svh', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        overflow: 'hidden',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          top: '-10%',
          height: '120%',
          backgroundImage: `linear-gradient(rgba(10,10,10,0.65), rgba(10,10,10,0.85)), url(${HERO_IMAGE_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `translate3d(0, ${scrollY * PARALLAX_FACTOR}px, 0)`,
          willChange: 'transform',
        }}
      />
      <Stack
        sx={{
          gap: 4,
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          px: 3,
        }}
      >
        <EvoLogo sx={{ width: { xs: 220, md: 320 }, height: 'auto' }} />
        <Typography
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: { xs: '2.25rem', md: '3.75rem' },
            color: 'brand.main',
            lineHeight: 1.1,
          }}
        >
          {t('hero.tagline')}
        </Typography>
        <BrandButton
          component="a"
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          size="large"
        >
          {t('hero.cta')}
        </BrandButton>
      </Stack>
    </Box>
  )
}
