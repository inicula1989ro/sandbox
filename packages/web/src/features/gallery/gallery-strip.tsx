import Box from '@mui/material/Box'

import { GalleryImage } from './gallery-image'

interface GalleryStripImage {
  readonly src: string
  readonly alt: string
}

export interface GalleryStripProps {
  readonly images: ReadonlyArray<GalleryStripImage>
  readonly animate: boolean
  readonly onImageClick: (index: number) => void
}

const MARQUEE_KEYFRAMES = {
  '@keyframes marquee': {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(-50%)' },
  },
}

export function GalleryStrip({ images, animate, onImageClick }: GalleryStripProps) {
  const duration = images.length * 5

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          ...MARQUEE_KEYFRAMES,
          display: 'flex',
          gap: 2,
          width: 'max-content',
          animation: `marquee ${String(duration)}s linear infinite`,
          '&:hover': {
            animationPlayState: 'paused',
          },
        }}
      >
        {/* First set of images */}
        {images.map((image, index) => (
          <Box
            key={`a-${image.alt}`}
            sx={{
              flexShrink: 0,
              height: { md: 380, lg: 420 },
              '& img': {
                height: '100%',
                width: 'auto',
              },
            }}
          >
            <GalleryImage
              src={image.src}
              alt={image.alt}
              index={index}
              animate={animate}
              onClick={() => onImageClick(index)}
            />
          </Box>
        ))}

        {/* Duplicate set for seamless loop */}
        {images.map((image, index) => (
          <Box
            key={`b-${image.alt}`}
            sx={{
              flexShrink: 0,
              height: { md: 380, lg: 420 },
              '& img': {
                height: '100%',
                width: 'auto',
              },
            }}
          >
            <GalleryImage
              src={image.src}
              alt={image.alt}
              index={index}
              animate={animate}
              onClick={() => onImageClick(index)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
