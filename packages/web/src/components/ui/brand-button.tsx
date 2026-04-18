import Button, { type ButtonProps } from '@mui/material/Button'
import { forwardRef } from 'react'

export interface BrandButtonProps extends Omit<ButtonProps, 'color' | 'variant'> {
  variant?: 'primary' | 'outlined'
}

export const BrandButton = forwardRef<HTMLButtonElement, BrandButtonProps>(function BrandButton(
  { variant = 'primary', sx, children, ...rest },
  ref,
) {
  if (variant === 'outlined') {
    return (
      <Button
        ref={ref}
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
      ref={ref}
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
})
