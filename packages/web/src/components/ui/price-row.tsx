import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'

import { BulletDot } from './bullet-dot'

export interface PriceRowProps {
  service: string
  price: string
  currency: string
  last?: boolean
}

export function PriceRow({ service, price, currency, last = false }: PriceRowProps) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        py: 2,
        borderBottom: last ? 'none' : `1px solid ${alpha(theme.palette.brand.main, 0.2)}`,
      }}
    >
      <BulletDot />
      <Typography sx={{ flex: 1, color: 'text.primary', fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
        {service}
      </Typography>
      <Typography
        sx={{
          color: 'primary.main',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          fontSize: { xs: '1rem', md: '1.15rem' },
        }}
      >
        {price} {currency}
      </Typography>
    </Box>
  )
}
