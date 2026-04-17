import Box from '@mui/material/Box'

export interface SectionPlaceholderProps {
  id: string
}

export function SectionPlaceholder({ id }: SectionPlaceholderProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        scrollMarginTop: { xs: '64px', md: '72px' },
      }}
    />
  )
}
