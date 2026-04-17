import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { fadeInUpKeyframes } from '@/styles/animations'

export type ServiceCardProps = {
  title: string
  description: string
  image: string
  index: number
  animate: boolean
}

export function ServiceCard({ title, description, image, index, animate }: ServiceCardProps) {
  const delay = index * 0.1

  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '3 / 4',
        borderRadius: 3,
        overflow: 'hidden',

        ...fadeInUpKeyframes,

        '@media (prefers-reduced-motion: no-preference)': animate
          ? {
              animation: `fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
            }
          : {},

        opacity: animate ? undefined : 0,

        '&:hover .card-bg': {
          transform: 'scale(1.05)',
        },
        '&:hover .card-overlay': {
          opacity: 0.65,
        },
      }}
    >
      {/* Background image */}
      <Box
        className="card-bg"
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
          zIndex: 0,
        }}
      />

      {/* Brand overlay */}
      <Box
        className="card-overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(231, 181, 192, 0.55)',
          opacity: 0.55,
          transition: 'opacity 0.4s ease',
          zIndex: 1,
        }}
      />

      {/* Bottom gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)',
          zIndex: 2,
        }}
      />

      {/* Text content */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2.5,
          zIndex: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'common.white',
            mb: 0.75,
            fontSize: { xs: '1.25rem', md: '1.375rem' },
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.875rem',
            color: 'common.white',
            opacity: 0.9,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  )
}
