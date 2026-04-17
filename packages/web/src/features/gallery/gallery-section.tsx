import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useCallback, useState } from 'react'

import gallery1 from '@/assets/gallery/gallery-1.jpg'
import gallery2 from '@/assets/gallery/gallery-2.jpg'
import gallery3 from '@/assets/gallery/gallery-3.jpg'
import gallery4 from '@/assets/gallery/gallery-4.jpg'
import gallery5 from '@/assets/gallery/gallery-5.jpg'
import gallery6 from '@/assets/gallery/gallery-6.jpg'
import gallery7 from '@/assets/gallery/gallery-7.jpg'
import gallery8 from '@/assets/gallery/gallery-8.jpg'
import { copy } from '@/constants/copy'
import { useInView } from '@/hooks/use-in-view'
import { fadeInUpKeyframes } from '@/styles/animations'

import { GalleryGrid } from './gallery-grid'
import { GalleryLightbox } from './gallery-lightbox'
import { GalleryStrip } from './gallery-strip'

const galleryImages = [
  { src: gallery1, alt: 'Hair styling result' },
  { src: gallery2, alt: 'Nail art close-up' },
  { src: gallery3, alt: 'Facial treatment' },
  { src: gallery4, alt: 'Salon interior' },
  { src: gallery5, alt: 'Brow shaping result' },
  { src: gallery6, alt: 'Hair coloring result' },
  { src: gallery7, alt: 'Manicure detail' },
  { src: gallery8, alt: 'Relaxation ambiance' },
] as const

export function GallerySection() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const { ref, inView } = useInView({ threshold: 0.1 })

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const handleNavigate = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  return (
    <Box
      id="gallery"
      component="section"
      ref={ref}
      sx={{
        scrollMarginTop: { xs: '64px', md: '72px' },
        bgcolor: 'background.default',
        py: { xs: 10, md: 15 },
      }}
    >
      {/* Section header */}
      <Box sx={{ textAlign: 'center', px: { xs: 3, sm: 4, md: 5 }, mb: { xs: 5, md: 7 } }}>
        <Typography
          variant="overline"
          sx={{
            ...fadeInUpKeyframes,
            color: 'primary.main',
            display: 'block',
            mb: 1.5,
            '@media (prefers-reduced-motion: no-preference)': inView
              ? { animation: 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) both' }
              : {},
            opacity: inView ? undefined : 0,
          }}
        >
          {copy.gallery.overline}
        </Typography>

        <Typography
          variant="h2"
          sx={{
            ...fadeInUpKeyframes,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            mb: 2,
            '@media (prefers-reduced-motion: no-preference)': inView
              ? { animation: 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both' }
              : {},
            opacity: inView ? undefined : 0,
          }}
        >
          {copy.gallery.title}
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            ...fadeInUpKeyframes,
            color: 'text.primary',
            opacity: inView ? 0.7 : 0,
            maxWidth: 520,
            mx: 'auto',
            '@media (prefers-reduced-motion: no-preference)': inView
              ? { animation: 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both' }
              : {},
          }}
        >
          {copy.gallery.subtitle}
        </Typography>
      </Box>

      {isDesktop ? (
        <GalleryStrip images={galleryImages} animate={inView} onImageClick={handleImageClick} />
      ) : (
        <GalleryGrid images={galleryImages} animate={inView} onImageClick={handleImageClick} />
      )}

      <GalleryLightbox
        images={galleryImages}
        open={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={handleLightboxClose}
        onNavigate={handleNavigate}
      />
    </Box>
  )
}
