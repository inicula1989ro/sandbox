import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import servicesBody from '@/assets/services-body.jpg'
import servicesBrows from '@/assets/services-brows.jpg'
import servicesFace from '@/assets/services-face.jpg'
import servicesHair from '@/assets/services-hair.jpg'
import servicesNails from '@/assets/services-nails.jpg'
import { copy } from '@/constants/copy'
import { useInView } from '@/hooks/use-in-view'

import { ServiceCard } from './service-card'

const categories = [
  { key: 'hair', image: servicesHair, ...copy.services.categories.hair },
  { key: 'nails', image: servicesNails, ...copy.services.categories.nails },
  { key: 'face', image: servicesFace, ...copy.services.categories.face },
  { key: 'brows', image: servicesBrows, ...copy.services.categories.browsLashes },
  { key: 'body', image: servicesBody, ...copy.services.categories.body },
]

export function ServicesSection() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <Box
      id="services"
      component="section"
      sx={{
        scrollMarginTop: { xs: '64px', md: '72px' },
        bgcolor: 'common.white',
        py: { xs: 10, md: 15 },
        px: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" sx={{ color: 'primary.main', display: 'block', mb: 1.5 }}>
            {copy.services.overline}
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              mb: 2,
            }}
          >
            {copy.services.title}
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              opacity: 0.7,
              maxWidth: 520,
              mx: 'auto',
            }}
          >
            {copy.services.subtitle}
          </Typography>
        </Box>

        {/* Card grid */}
        <Box
          ref={ref}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          {categories.map((category, index) => (
            <ServiceCard
              key={category.key}
              title={category.title}
              description={category.description}
              image={category.image}
              index={index}
              animate={inView}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
