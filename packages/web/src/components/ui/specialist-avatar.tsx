import Box from '@mui/material/Box'

export interface SpecialistAvatarProps {
  name: string
  size?: number
}

export function SpecialistAvatar({ name, size = 160 }: SpecialistAvatarProps) {
  const initials = name
    .split(' ')
    .map((w) => w.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #E7B5C0, #E91E63)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0A0A0A',
        fontFamily: '"Playfair Display", serif',
        fontSize: size * 0.32,
        fontWeight: 700,
        letterSpacing: '0.04em',
        boxShadow: '0 0 40px rgba(233,30,99,0.2)',
      }}
    >
      {initials}
    </Box>
  )
}
