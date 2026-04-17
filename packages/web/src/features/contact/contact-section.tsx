import Box from '@mui/material/Box'

import { useInView } from '@/hooks/use-in-view'

import { ContactInfo } from './contact-info'
import { ContactMap } from './contact-map'

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        scrollMarginTop: { xs: '64px', md: '72px' },
        bgcolor: 'text.primary',
        py: { xs: 10, md: 15 },
        px: { xs: 3, sm: 4, md: 5 },
      }}
    >
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
        ref={ref}
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
