import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'

export interface SectionProps {
  id?: string
  children: ReactNode
  sx?: SxProps<Theme>
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false
  py?: number
}

export function Section({ id, children, sx, maxWidth = 'lg', py = 12 }: SectionProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        py: { xs: py - 4, md: py },
        backgroundColor: 'background.default',
        color: 'text.primary',
        position: 'relative',
        ...sx,
      }}
    >
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  )
}
