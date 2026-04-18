import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

export interface SectionHeaderProps {
  overline?: string
  title: string
  script?: string
  align?: 'center' | 'left'
  sx?: SxProps<Theme>
}

export function SectionHeader({ overline, title, script, align = 'center', sx }: SectionHeaderProps) {
  return (
    <Box sx={{ textAlign: align, mb: 6, ...sx }}>
      {overline ? (
        <Typography variant="overline" sx={{ color: 'brand.main', display: 'block', mb: 1 }}>
          {overline}
        </Typography>
      ) : null}
      <Typography variant="h2" sx={{ color: 'text.primary', mb: script ? 1 : 0 }}>
        {title}
      </Typography>
      {script ? (
        <Typography
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: { xs: '2rem', md: '2.75rem' },
            color: 'brand.main',
            lineHeight: 1,
          }}
        >
          {script}
        </Typography>
      ) : null}
    </Box>
  )
}
