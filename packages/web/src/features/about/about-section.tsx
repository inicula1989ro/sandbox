import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import aboutSalon from '@/assets/about-salon.jpg'
import { copy } from '@/constants/copy'
import { useInView } from '@/hooks/use-in-view'
import { fadeInUpKeyframes } from '@/styles/animations'

import { BenefitItem } from './benefit-item'

export function AboutSection() {
  const { ref: storyRef, inView: storyInView } = useInView({ threshold: 0.1 })
  const { ref: benefitsRef, inView: benefitsInView } = useInView({ threshold: 0.1 })

  return (
    <Box
      id="about"
      component="section"
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
          {/* Left: Salon image */}
          <Box
            sx={{
              ...fadeInUpKeyframes,
              '@media (prefers-reduced-motion: no-preference)': storyInView
                ? {
                    animation: 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) both',
                  }
                : {},
              opacity: storyInView ? undefined : 0,
            }}
          >
            <Box
              component="img"
              src={aboutSalon}
              alt={copy.about.title}
              sx={{
                width: '100%',
                display: 'block',
                aspectRatio: { xs: '16 / 10', md: '4 / 5' },
                objectFit: 'cover',
                borderRadius: 3,
                boxShadow: '0 24px 48px rgba(0,0,0,0.08)',
              }}
            />
          </Box>

          {/* Right: Story text */}
          <Box
            sx={{
              ...fadeInUpKeyframes,
              '@media (prefers-reduced-motion: no-preference)': storyInView
                ? {
                    animation: 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s both',
                  }
                : {},
              opacity: storyInView ? undefined : 0,
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: 'primary.main', display: 'block', mb: 1.5 }}
            >
              {copy.about.overline}
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                mb: 3,
              }}
            >
              {copy.about.title}
            </Typography>

            <Typography
              sx={{
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
                fontStyle: 'italic',
                color: 'text.primary',
                opacity: 0.7,
                borderLeft: 3,
                borderColor: 'brand.main',
                pl: 3,
                mb: 1.5,
              }}
            >
              <Typography sx={{ fontSize: '1rem', lineHeight: 1.7 }}>{copy.about.quote}</Typography>
            </Box>

            <Typography
              sx={{
                fontSize: '0.875rem',
                color: 'text.primary',
                opacity: 0.6,
                pl: 3,
              }}
            >
              {copy.about.quoteAttribution}
            </Typography>
          </Box>
        </Box>

        {/* Part B: Why EVO — Benefits Grid */}
        <Box ref={benefitsRef} sx={{ mt: { xs: 7, md: 9 } }}>
          <Typography
            variant="h3"
            sx={{
              ...fadeInUpKeyframes,
              '@media (prefers-reduced-motion: no-preference)': benefitsInView
                ? {
                    animation: 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) both',
                  }
                : {},
              opacity: benefitsInView ? undefined : 0,
              textAlign: 'center',
              fontSize: { xs: '1.5rem', md: '2rem' },
              mb: { xs: 4, md: 5 },
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
