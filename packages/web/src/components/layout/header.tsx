import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import { alpha, useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BrandButton, EvoLogo, LanguageSwitcher } from '@/components/ui'
import { BOOKING_URL } from '@/constants/links'

const NAV_ITEMS = ['services', 'pricing', 'specialists', 'contact'] as const

export function Header() {
  const theme = useTheme()
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function closeDrawer() {
    setDrawerOpen(false)
  }

  function handleNavClick(item: (typeof NAV_ITEMS)[number]) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      const target = document.getElementById(item)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.replaceState(null, '', `#${item}`)
      }
      closeDrawer()
    }
  }

  const navLinks = NAV_ITEMS.map((item) => (
    <Link
      key={item}
      href={`#${item}`}
      underline="none"
      onClick={handleNavClick(item)}
      sx={{
        color: 'text.primary',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.875rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontWeight: 500,
        '&:hover': { color: 'primary.main' },
      }}
    >
      {t(`nav.${item}`)}
    </Link>
  ))

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: scrolled ? alpha('#0A0A0A', 0.92) : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? `1px solid ${alpha(theme.palette.brand.main, 0.15)}` : '1px solid transparent',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, minHeight: { xs: 64, md: 80 }, justifyContent: 'space-between' }}>
        <Link href="#top" sx={{ display: 'flex', alignItems: 'center' }} aria-label="EVO Studio">
          <EvoLogo size={36} />
        </Link>

        {isDesktop ? (
          <Stack sx={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
            {navLinks}
          </Stack>
        ) : null}

        <Stack sx={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
          <LanguageSwitcher />
          {isDesktop ? (
            <BrandButton
              component="a"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
            >
              {t('nav.book')}
            </BrandButton>
          ) : (
            <IconButton
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Stack>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <Box sx={{ width: 280, height: '100%', backgroundColor: 'background.default', p: 3 }}>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <IconButton onClick={closeDrawer} aria-label="close" sx={{ color: 'text.primary' }}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack sx={{ gap: 3, mt: 4 }}>
            {navLinks}
            <BrandButton
              component="a"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              fullWidth
            >
              {t('nav.book')}
            </BrandButton>
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  )
}
