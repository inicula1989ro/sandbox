import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import logo from '@/assets/logo.png'
import { MobileMenu } from '@/components/layout/mobile-menu'
import { copy } from '@/constants/copy'
import { useScrollPosition } from '@/hooks/use-scroll-position'

const navItems = Object.entries(copy.nav).map(([key, label]) => ({
  key,
  label,
  href: `#${key}`,
}))

export function Header() {
  const { isScrolled } = useScrollPosition()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          boxShadow: isScrolled ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.3s ease',
          color: isScrolled ? 'text.primary' : '#FFFFFF',
        }}
      >
        <Toolbar
          sx={{
            height: { xs: 64, md: 72 },
            px: { xs: 2, md: 4 },
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Box
            component="a"
            href="#"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src={logo}
              alt={copy.brand.name}
              sx={{
                height: { xs: 44, md: 52 },
                width: 'auto',
                filter: isScrolled ? 'none' : 'brightness(0) invert(1)',
                transition: 'all 0.3s ease',
              }}
            />
          </Box>

          <Box
            component="nav"
            aria-label="Main navigation"
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 3,
              alignItems: 'center',
            }}
          >
            {navItems.map(({ key, label, href }) => (
              <Typography
                key={key}
                component="a"
                href={href}
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  opacity: 0.9,
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 1 },
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              href="#book"
              size="small"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                px: 3,
                py: 1,
                fontSize: '0.8125rem',
              }}
            >
              {copy.hero.cta}
            </Button>

            <IconButton
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { md: 'none' },
                color: 'inherit',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
