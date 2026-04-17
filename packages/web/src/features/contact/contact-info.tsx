import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { copy } from '@/constants/copy'
import { fadeInUpKeyframes } from '@/styles/animations'

export interface ContactInfoProps {
  animate: boolean
}

export function ContactInfo({ animate }: ContactInfoProps) {
  return (
    <Box
      sx={{
        ...fadeInUpKeyframes,
        '@media (prefers-reduced-motion: no-preference)': animate
          ? {
              animation: 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) both',
            }
          : {},
        opacity: animate ? undefined : 0,
      }}
    >
      <Typography variant="overline" sx={{ color: 'brand.main', display: 'block', mb: 1.5 }}>
        {copy.contact.overline}
      </Typography>

      <Typography
        variant="h2"
        sx={{
          color: 'common.white',
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          mb: 4,
        }}
      >
        {copy.contact.title}
      </Typography>

      {/* Contact details */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <PlaceOutlinedIcon sx={{ color: 'brand.main', fontSize: 20 }} />
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9375rem' }}>
            {copy.contact.address}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <PhoneOutlinedIcon sx={{ color: 'brand.main', fontSize: 20 }} />
          <Typography
            component="a"
            href={`tel:${copy.contact.phone.replace(/\s/g, '')}`}
            sx={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.9375rem',
              textDecoration: 'none',
              '&:hover': { color: 'common.white' },
            }}
          >
            {copy.contact.phone}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AccessTimeOutlinedIcon sx={{ color: 'brand.main', fontSize: 20 }} />
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9375rem' }}>
            {copy.contact.hours}
          </Typography>
        </Box>
      </Box>

      {/* Social links */}
      <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
        <IconButton
          component="a"
          href={copy.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'common.white' } }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component="a"
          href={copy.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'common.white' } }}
        >
          <FacebookIcon />
        </IconButton>
      </Box>

      {/* CTA buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1.5,
        }}
      >
        <Button variant="contained" color="primary" href="#book">
          {copy.contact.ctaBook}
        </Button>
        <Button
          variant="outlined"
          component="a"
          href={`tel:${copy.contact.phone.replace(/\s/g, '')}`}
          sx={{
            borderColor: 'rgba(255,255,255,0.5)',
            color: 'common.white',
            '&:hover': {
              borderColor: 'common.white',
            },
          }}
        >
          {copy.contact.ctaCall}
        </Button>
        <Button
          variant="text"
          component="a"
          href="https://maps.google.com/?q=str.+Nicolae+Starostenco+25+Chisinau"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'rgba(255,255,255,0.7)' }}
        >
          {copy.contact.ctaDirections}
        </Button>
      </Box>
    </Box>
  )
}
