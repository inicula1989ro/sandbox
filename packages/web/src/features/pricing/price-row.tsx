import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { fadeInUpKeyframes } from '@/styles/animations'

export type PriceRowProps = {
  service: string
  price: string
  index: number
  animate: boolean
}

export function PriceRow({ service, price, index, animate }: PriceRowProps) {
  const delay = index * 0.08

  return (
    <Box
      role="listitem"
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 2,
        borderBottom: '1px solid rgba(231,181,192,0.2)',
        '&:last-of-type': {
          borderBottom: 'none',
        },

        ...fadeInUpKeyframes,

        '@media (prefers-reduced-motion: no-preference)': animate
          ? {
              animation: `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
            }
          : {},

        opacity: animate ? undefined : 0,
      }}
    >
      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 500,
          color: 'text.primary',
          whiteSpace: 'nowrap',
        }}
      >
        {service}
      </Typography>

      <Box
        aria-hidden="true"
        sx={{
          flex: 1,
          mx: 2,
          borderBottom: '1px dotted rgba(212,145,159,0.4)',
          alignSelf: 'flex-end',
          mb: '6px',
        }}
      />

      <Typography
        sx={{
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: 'text.primary',
          whiteSpace: 'nowrap',
        }}
      >
        {price}
      </Typography>
    </Box>
  )
}
