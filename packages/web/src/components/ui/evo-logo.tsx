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
      viewBox="0 0 160 80"
      sx={{ width: size * 2, height: size, display: 'block', ...sx }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="10"
        y="52"
        fontFamily="Playfair Display, serif"
        fontSize="52"
        fontWeight="700"
        fill="#F5F5F5"
        letterSpacing="2"
      >
        EV
      </text>
      <text
        x="98"
        y="52"
        fontFamily="Playfair Display, serif"
        fontSize="52"
        fontWeight="700"
        fill="#F5F5F5"
        letterSpacing="2"
      >
        O
      </text>
      <path
        d="M 78 8 Q 92 10 102 22 Q 112 34 104 44 Q 96 52 86 44"
        stroke="#E91E63"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <text
        x="46"
        y="72"
        fontFamily="Inter, sans-serif"
        fontSize="11"
        fontWeight="400"
        fill="#F5F5F5"
        letterSpacing="6"
      >
        STUDIO
      </text>
    </Box>
  )
}
