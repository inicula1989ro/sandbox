import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect } from 'react'

interface LightboxImage {
  readonly src: string
  readonly alt: string
}

export interface GalleryLightboxProps {
  readonly images: ReadonlyArray<LightboxImage>
  readonly open: boolean
  readonly currentIndex: number
  readonly onClose: () => void
  readonly onNavigate: (index: number) => void
}

export function GalleryLightbox({
  images,
  open,
  currentIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const total = images.length

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + total) % total)
  }, [currentIndex, total, onNavigate])

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % total)
  }, [currentIndex, total, onNavigate])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrev()
      } else if (event.key === 'ArrowRight') {
        handleNext()
      }
    },
    [handlePrev, handleNext],
  )

  useEffect(() => {
    if (!open) return

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, handleKeyDown])

  const currentImage = images[currentIndex]

  if (!currentImage) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      slotProps={{
        backdrop: {
          sx: { bgcolor: 'rgba(0, 0, 0, 0.92)' },
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
        }}
      >
        {/* Close button */}
        <IconButton
          aria-label="Close lightbox"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'common.white',
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Previous button */}
        <IconButton
          aria-label="Previous image"
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            left: { xs: 8, md: 24 },
            color: 'common.white',
            zIndex: 1,
          }}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>

        {/* Image */}
        <Box
          component="img"
          src={currentImage.src}
          alt={currentImage.alt}
          sx={{
            maxWidth: '90vw',
            maxHeight: '85vh',
            objectFit: 'contain',
            borderRadius: 2,
            userSelect: 'none',
          }}
        />

        {/* Next button */}
        <IconButton
          aria-label="Next image"
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: { xs: 8, md: 24 },
            color: 'common.white',
            zIndex: 1,
          }}
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>

        {/* Counter */}
        <Typography
          sx={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'common.white',
            fontSize: '0.875rem',
            userSelect: 'none',
          }}
        >
          {currentIndex + 1} / {total}
        </Typography>
      </Box>
    </Modal>
  )
}
