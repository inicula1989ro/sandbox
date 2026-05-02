import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useEffect, useRef, useState } from 'react'

export interface ParallaxStripProps {
  image: string
  tagline?: string
  height?: { xs?: string | number; md?: string | number } | string | number
  factor?: number
  overlay?: string
  sx?: SxProps<Theme>
}

export function ParallaxStrip({
  image,
  tagline,
  height = { xs: '40vh', md: '60vh' },
  factor = 0.3,
  overlay = 'linear-gradient(rgba(10,10,10,0.55), rgba(10,10,10,0.75))',
  sx,
}: ParallaxStripProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    let ticking = false

    const update = () => {
      const rect = node.getBoundingClientRect()
      const viewportH = window.innerHeight
      const progress = (viewportH - rect.top) / (viewportH + rect.height)
      const clamped = Math.max(0, Math.min(1, progress))
      setOffset((clamped - 0.5) * rect.height * factor)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [factor])

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        ...sx,
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          top: '-15%',
          height: '130%',
          backgroundImage: `${overlay}, url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: 'transform',
        }}
      />
      {tagline ? (
        <Typography
          sx={{
            position: 'relative',
            zIndex: 1,
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: { xs: '1.75rem', md: '3rem' },
            color: 'brand.main',
            textAlign: 'center',
            px: 3,
            lineHeight: 1.2,
          }}
        >
          {tagline}
        </Typography>
      ) : null}
    </Box>
  )
}
