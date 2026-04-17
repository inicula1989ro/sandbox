import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import logo from '@/assets/logo.png'
import { copy } from '@/constants/copy'

const navItems = Object.entries(copy.nav)

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'text.primary',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        py: { xs: 6, md: 8 },
        px: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' },
          gap: { xs: 4, md: 6 },
          alignItems: 'center',
        }}
      >
        {/* Left column: Logo + tagline */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Box
            component="img"
            src={logo}
            alt={copy.brand.name}
            sx={{
              height: 36,
              filter: 'brightness(0) invert(1)',
              display: 'block',
              mx: { xs: 'auto', md: 0 },
            }}
          />
          <Typography sx={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', mt: 0.75 }}>
            {copy.brand.tagline}
          </Typography>
        </Box>

        {/* Center column: Navigation */}
        <Box component="nav" aria-label="Footer navigation">
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: { xs: 2, md: 3 },
            }}
          >
            {navItems.map(([key, label]) => (
              <Typography
                key={key}
                component="a"
                href={`#${key}`}
                sx={{
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  '&:hover': { color: 'common.white' },
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Right column: Social + copyright */}
        <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
              gap: 1,
            }}
          >
            <IconButton
              component="a"
              href={copy.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              size="small"
              sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: 'common.white' } }}
            >
              <InstagramIcon fontSize="small" />
            </IconButton>
            <IconButton
              component="a"
              href={copy.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              size="small"
              sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: 'common.white' } }}
            >
              <FacebookIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', mt: 1 }}>
            {copy.footer.copyright}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
