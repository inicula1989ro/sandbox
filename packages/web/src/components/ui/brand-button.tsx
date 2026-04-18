import Button, { type ButtonProps } from '@mui/material/Button'
import type { ElementType, ReactNode } from 'react'

export type BrandButtonProps = Omit<ButtonProps, 'color' | 'variant'> & {
  variant?: 'primary' | 'outlined'
  component?: ElementType
  href?: string
  target?: string
  rel?: string
  children?: ReactNode
}

export function BrandButton({ variant = 'primary', sx, children, ...rest }: BrandButtonProps) {
  if (variant === 'outlined') {
    return (
      <Button
        variant="outlined"
        color="primary"
        sx={{
          borderColor: 'primary.main',
          color: 'primary.main',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'rgba(233, 30, 99, 0.08)',
          },
          ...sx,
        }}
        {...rest}
      >
        {children}
      </Button>
    )
  }
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        color: '#FFFFFF',
        boxShadow: 'none',
        '&:hover': { boxShadow: '0 0 24px rgba(233,30,99,0.35)' },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}
