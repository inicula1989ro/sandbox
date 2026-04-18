import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'

export function HeartDivider() {
  const theme = useTheme()
  const line = alpha(theme.palette.brand.main, 0.4)

  return (
    <Box
      aria-hidden
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        my: 2,
      }}
    >
      <Box sx={{ flex: 1, height: '1px', background: line }} />
      <Box
        component="svg"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        sx={{ width: 20, height: 20 }}
      >
        <path
          d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.65 12 21 12 21z"
          fill="none"
          stroke="#E91E63"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </Box>
      <Box sx={{ flex: 1, height: '1px', background: line }} />
    </Box>
  )
}
