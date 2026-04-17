import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { fadeInUpKeyframes } from '@/styles/animations'

export type SpecialistCardProps = {
  name: string
  specialization: string
  image: string
  index: number
  animate: boolean
}

export function SpecialistCard({
  name,
  specialization,
  image,
  index,
  animate,
}: SpecialistCardProps) {
  const delay = index * 0.1

  return (
    <Box
      sx={{
        ...fadeInUpKeyframes,
        '@media (prefers-reduced-motion: no-preference)': animate
          ? {
              animation: `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
            }
          : {},
        opacity: animate ? undefined : 0,
      }}
    >
      {/* Photo container */}
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '3 / 4',
          borderRadius: 3,
          overflow: 'hidden',
          '& img': {
            filter: 'saturate(0.85)',
            transform: 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
          },
          '&:hover img': {
            filter: 'saturate(1)',
            transform: 'scale(1.03)',
          },
        }}
      >
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Box>

      {/* Text below photo */}
      <Typography
        variant="h4"
        sx={{
          fontSize: '1.125rem',
          fontWeight: 600,
          mt: 1.5,
        }}
      >
        {name}
      </Typography>

      <Typography
        sx={{
          fontSize: '0.8125rem',
          color: 'text.primary',
          opacity: 0.6,
          mt: 0.25,
        }}
      >
        {specialization}
      </Typography>
    </Box>
  )
}
