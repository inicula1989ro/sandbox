import Box from '@mui/material/Box'

export interface BulletDotProps {
  size?: number
}

export function BulletDot({ size = 10 }: BulletDotProps) {
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '1.5px solid',
        borderColor: 'primary.main',
        flexShrink: 0,
      }}
    />
  )
}
