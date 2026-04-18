import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'

import { useInView } from '@/hooks/use-in-view'

export type RevealDirection = 'up' | 'down' | 'left' | 'right'

export interface RevealProps {
  children: ReactNode
  delay?: number
  distance?: number
  duration?: number
  direction?: RevealDirection
  sx?: SxProps<Theme>
}

const OFFSETS: Record<RevealDirection, (d: number) => string> = {
  up: (d) => `translate3d(0, ${d}px, 0)`,
  down: (d) => `translate3d(0, ${-d}px, 0)`,
  left: (d) => `translate3d(${-d}px, 0, 0)`,
  right: (d) => `translate3d(${d}px, 0, 0)`,
}

export function Reveal({
  children,
  delay = 0,
  distance = 32,
  duration = 700,
  direction = 'up',
  sx,
}: RevealProps) {
  const { ref, inView } = useInView({ threshold: 0.15 })
  const hiddenTransform = OFFSETS[direction](distance)

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : hiddenTransform,
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms`,
        willChange: 'transform, opacity',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
