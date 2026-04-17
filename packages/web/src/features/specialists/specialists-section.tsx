import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import specialist1 from '@/assets/specialist-1.jpg'
import specialist2 from '@/assets/specialist-2.jpg'
import specialist3 from '@/assets/specialist-3.jpg'
import specialist4 from '@/assets/specialist-4.jpg'
import { copy } from '@/constants/copy'
import { useInView } from '@/hooks/use-in-view'
import { fadeInUpKeyframes } from '@/styles/animations'

import { SpecialistCard } from './specialist-card'

const specialistImages = [specialist1, specialist2, specialist3, specialist4]

export function SpecialistsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <Box
      id="specialists"
      component="section"
      sx={{
        scrollMarginTop: { xs: '64px', md: '72px' },
        bgcolor: 'common.white',
        py: { xs: 10, md: 15 },
        px: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Section header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
            ...fadeInUpKeyframes,
            '@media (prefers-reduced-motion: no-preference)': inView
              ? {
                  animation: 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) both',
                }
              : {},
            opacity: inView ? undefined : 0,
          }}
        >
          <Typography variant="overline" sx={{ color: 'primary.main', display: 'block', mb: 1.5 }}>
            {copy.specialists.overline}
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              mb: 2,
            }}
          >
            {copy.specialists.title}
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              opacity: 0.7,
              maxWidth: 480,
              mx: 'auto',
            }}
          >
            {copy.specialists.subtitle}
          </Typography>
        </Box>

        {/* Specialists grid */}
        <Box
          ref={ref}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          {copy.specialists.items.map((item, index) => (
            <SpecialistCard
              key={item.name}
              name={item.name}
              specialization={item.specialization}
              image={specialistImages[index] ?? ''}
              index={index}
              animate={inView}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
