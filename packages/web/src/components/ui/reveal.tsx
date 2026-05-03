import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'

import { useInView } from '@/hooks/use-in-view'

export interface RevealProps {
  children: ReactNode
  delay?: number
  distance?: number
  duration?: number
  sx?: SxProps<Theme>
}

export function Reveal({
  children,
  delay = 0,
  distance = 32,
  duration = 700,
  sx,
}: RevealProps) {
  const { ref, inView } = useInView({ threshold: 0.15 })

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : `translateY(${distance}px)`,
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
