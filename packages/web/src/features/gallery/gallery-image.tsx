import Box from '@mui/material/Box'

import { fadeInUpKeyframes } from '@/styles/animations'

export interface GalleryImageProps {
  readonly src: string
  readonly alt: string
  readonly aspectRatio?: string
  readonly index: number
  readonly animate: boolean
  readonly onClick?: () => void
}

export function GalleryImage({
  src,
  alt,
  aspectRatio,
  index,
  animate,
  onClick,
}: GalleryImageProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        ...fadeInUpKeyframes,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        flexShrink: 0,
        height: '100%',
        ...(aspectRatio ? { aspectRatio } : {}),
        ...(onClick ? { cursor: 'pointer' } : {}),

        '@media (prefers-reduced-motion: no-preference)': animate
          ? {
              animation: `fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${String(index * 0.08)}s both`,
            }
          : {},
        opacity: animate ? undefined : 0,

        '&:hover .gallery-overlay': {
          opacity: 1,
        },
        '&:hover img': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}
      />

      <Box
        className="gallery-overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(231, 181, 192, 0.15)',
          opacity: 0,
          transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  )
}
