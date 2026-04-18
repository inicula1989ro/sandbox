import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import PhoneIcon from '@mui/icons-material/Phone'
import PlaceIcon from '@mui/icons-material/Place'
import ScheduleIcon from '@mui/icons-material/Schedule'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import { alpha, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout'
import { BrandButton, SectionHeader } from '@/components/ui'
import {
  BOOKING_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  MAP_EMBED_SRC,
  PHONE_URL,
} from '@/constants/links'

export function ContactSection() {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Section id="contact">
      <SectionHeader overline={t('contact.overline')} title={t('contact.title')} />
      <Grid container spacing={6} sx={{ alignItems: 'stretch' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack sx={{ gap: 4, height: '100%', justifyContent: 'center' }}>
            <Stack sx={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
              <PlaceIcon sx={{ color: 'primary.main' }} />
              <Box>
                <Typography variant="overline" sx={{ color: 'brand.main' }}>
                  {t('contact.addressLabel')}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>{t('contact.address')}</Typography>
              </Box>
            </Stack>
            <Stack sx={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
              <ScheduleIcon sx={{ color: 'primary.main' }} />
              <Box>
                <Typography variant="overline" sx={{ color: 'brand.main' }}>
                  {t('contact.hoursLabel')}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>{t('contact.hours')}</Typography>
              </Box>
            </Stack>
            <Stack sx={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
              <PhoneIcon sx={{ color: 'primary.main' }} />
              <Box>
                <Typography variant="overline" sx={{ color: 'brand.main' }}>
                  {t('contact.phoneLabel')}
                </Typography>
                <Link href={PHONE_URL} underline="none" sx={{ color: 'text.primary', display: 'block' }}>
                  {t('contact.phone')}
                </Link>
              </Box>
            </Stack>
            <Box>
              <Typography variant="overline" sx={{ color: 'brand.main', display: 'block', mb: 1 }}>
                {t('contact.socialLabel')}
              </Typography>
              <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                <IconButton
                  component="a"
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  sx={{ color: 'brand.main', '&:hover': { color: 'primary.main' } }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  sx={{ color: 'brand.main', '&:hover': { color: 'primary.main' } }}
                >
                  <FacebookIcon />
                </IconButton>
              </Stack>
            </Box>
            <BrandButton
              component="a"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              sx={{ alignSelf: 'flex-start' }}
            >
              {t('contact.cta')}
            </BrandButton>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="iframe"
            title="map"
            src={MAP_EMBED_SRC}
            sx={{
              width: '100%',
              height: { xs: 320, md: '100%' },
              minHeight: 320,
              border: `1px solid ${alpha(theme.palette.brand.main, 0.2)}`,
              filter: 'grayscale(0.6) invert(0.88) hue-rotate(180deg)',
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Grid>
      </Grid>
    </Section>
  )
}
