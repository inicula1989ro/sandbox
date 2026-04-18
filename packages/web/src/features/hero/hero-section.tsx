import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { BrandButton, CornerFlourish, EvoLogo } from '@/components/ui'
import { BOOKING_URL } from '@/constants/links'

const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2400&q=80'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      id="top"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(rgba(10,10,10,0.65), rgba(10,10,10,0.85)), url(${HERO_IMAGE_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <CornerFlourish corner="tl" size={220} />
      <CornerFlourish corner="tr" size={220} />
      <CornerFlourish corner="bl" size={220} />
      <CornerFlourish corner="br" size={220} />

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
