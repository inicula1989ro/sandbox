import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'

export interface EvoLogoProps {
  size?: number
  sx?: SxProps<Theme>
}

export function EvoLogo({ size = 64, sx }: EvoLogoProps) {
  return (
    <Box
      component="svg"
      viewBox="0 0 200 96"
      sx={{ width: size * 2.5, height: size, display: 'block', ...sx }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="100"
        y="60"
        fontFamily="'Playfair Display', serif"
        fontSize="58"
        fontWeight="700"
        fill="#F5F5F5"
        textAnchor="middle"
        letterSpacing="0"
      >
        EVO
      </text>
      <path
        d="M 108 14 Q 128 14 138 32 Q 146 50 130 58 Q 118 62 110 54"
        stroke="#E91E63"
        strokeWidth="3.2"
        fill="none"
        strokeLinecap="round"
      />
      <text
        x="100"
        y="86"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="400"
        fill="#F5F5F5"
        textAnchor="middle"
        letterSpacing="7"
      >
        STUDIO
      </text>
    </Box>
  )
}
