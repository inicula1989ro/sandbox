import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Box from '@mui/material/Box'
import { useEffect, useRef, useState } from 'react'

export function ScrollIndicator() {
  const [visible, setVisible] = useState(true)
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const hero = document.getElementById('hero')
    heroRef.current = hero

    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setVisible(entry.isIntersecting)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const handleClick = () => {
    const firstSection = document.getElementById('services')
    firstSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  if (!visible) return null

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-label="Scroll to content"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      sx={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
        color: '#2B2B2B',
        opacity: 0.6,
        transition: 'opacity 0.2s',
        '&:hover': { opacity: 1 },
        '@keyframes pulse': {
          '0%, 100%': {
            opacity: 0.4,
            transform: 'translateY(0)',
          },
          '50%': {
            opacity: 1,
            transform: 'translateY(8px)',
          },
        },
        '@media (prefers-reduced-motion: no-preference)': {
          animation: 'pulse 2s ease-in-out infinite',
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: 4,
          borderRadius: 1,
        },
      }}
    >
      <KeyboardArrowDownIcon sx={{ fontSize: 32 }} />
    </Box>
  )
}
