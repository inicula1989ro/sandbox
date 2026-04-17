import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { copy } from '@/constants/copy'
import { useInView } from '@/hooks/use-in-view'
import { fadeInUpKeyframes } from '@/styles/animations'

import { PriceRow } from './price-row'

export function PricingSection() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <Box
      id="prices"
      component="section"
      sx={{
        scrollMarginTop: { xs: '64px', md: '72px' },
        bgcolor: 'background.paper',
        py: { xs: 10, md: 15 },
        px: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Box
        sx={{
          maxWidth: 720,
          mx: 'auto',
        }}
      >
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
            {copy.pricing.overline}
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              mb: 2,
            }}
          >
            {copy.pricing.title}
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              opacity: 0.7,
              maxWidth: 440,
              mx: 'auto',
            }}
          >
            {copy.pricing.subtitle}
          </Typography>
        </Box>

        {/* Price list */}
        <Box ref={ref} role="list" sx={{ mb: { xs: 5, md: 6 } }}>
          {copy.pricing.items.map((item, index) => (
            <PriceRow
              key={item.service}
              service={item.service}
              price={item.price}
              index={index}
              animate={inView}
            />
          ))}
        </Box>

        {/* CTA */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            ...fadeInUpKeyframes,
            '@media (prefers-reduced-motion: no-preference)': inView
              ? {
                  animation: `fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${copy.pricing.items.length * 0.08 + 0.1}s both`,
                }
              : {},
            opacity: inView ? undefined : 0,
          }}
        >
          <Button
            variant="outlined"
            href="#book"
            sx={{
              borderColor: 'text.primary',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'text.primary',
                bgcolor: 'rgba(43, 43, 43, 0.06)',
              },
            }}
          >
            {copy.pricing.cta}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
