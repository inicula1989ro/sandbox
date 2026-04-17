import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import heroBg from '@/assets/hero-bg.jpg'
import { copy } from '@/constants/copy'
import { ScrollIndicator } from '@/features/hero/scroll-indicator'

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

        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(231, 181, 192, 0.75)',
          zIndex: 1,
        },

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
      {/* Background image — real img for GPU compositing */}
      <Box
        component="img"
        src={heroBg}
        alt=""
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
      />

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

      <ScrollIndicator />
    </Box>
  )
}
