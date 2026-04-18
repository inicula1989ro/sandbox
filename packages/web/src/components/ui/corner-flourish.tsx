import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'

export type FlourishCorner = 'tl' | 'tr' | 'bl' | 'br'

export interface CornerFlourishProps {
  corner: FlourishCorner
  size?: number
  sx?: SxProps<Theme>
}

const ROTATIONS: Record<FlourishCorner, string> = {
  tl: 'rotate(0deg)',
  tr: 'rotate(90deg)',
  br: 'rotate(180deg)',
  bl: 'rotate(270deg)',
}

const POSITIONS: Record<FlourishCorner, { top?: number; bottom?: number; left?: number; right?: number }> = {
  tl: { top: 0, left: 0 },
  tr: { top: 0, right: 0 },
  bl: { bottom: 0, left: 0 },
  br: { bottom: 0, right: 0 },
}

export function CornerFlourish({ corner, size = 160, sx }: CornerFlourishProps) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        pointerEvents: 'none',
        width: size,
        height: size,
        transform: ROTATIONS[corner],
        ...POSITIONS[corner],
        ...sx,
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 160 160"
        sx={{ width: '100%', height: '100%', display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="#E91E63" strokeWidth="1.1" strokeLinecap="round" opacity="0.85">
          <path d="M 0 20 Q 40 20 80 45 Q 120 70 158 72" />
          <path d="M 0 40 Q 35 40 70 60 Q 105 80 150 82" />
          <path d="M 0 60 Q 30 60 60 75 Q 90 90 140 92" />
          <path d="M 0 80 Q 25 80 50 90 Q 80 100 128 102" />
        </g>
      </Box>
    </Box>
  )
}
