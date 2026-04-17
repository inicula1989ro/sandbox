import Box from '@mui/material/Box'

import { GalleryImage } from './gallery-image'

interface GalleryGridImage {
  readonly src: string
  readonly alt: string
}

export interface GalleryGridProps {
  readonly images: ReadonlyArray<GalleryGridImage>
  readonly animate: boolean
  readonly onImageClick: (index: number) => void
}

export function GalleryGrid({ images, animate, onImageClick }: GalleryGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 1,
        px: { xs: 3, sm: 4 },
      }}
    >
      {images.map((image, index) => (
        <GalleryImage
          key={image.alt}
          src={image.src}
          alt={image.alt}
          aspectRatio={index % 2 === 0 ? '3 / 4' : '1 / 1'}
          index={index}
          animate={animate}
          onClick={() => onImageClick(index)}
        />
      ))}
    </Box>
  )
}
