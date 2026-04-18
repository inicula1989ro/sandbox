import BrushIcon from '@mui/icons-material/Brush'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural'
import SpaIcon from '@mui/icons-material/Spa'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { alpha, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout'
import { Reveal, SectionHeader } from '@/components/ui'

const CATEGORIES: { key: string; icon: ReactNode }[] = [
  { key: 'hair', icon: <ContentCutIcon fontSize="large" /> },
  { key: 'nails', icon: <BrushIcon fontSize="large" /> },
  { key: 'face', icon: <FaceRetouchingNaturalIcon fontSize="large" /> },
  { key: 'brows', icon: <VisibilityIcon fontSize="large" /> },
  { key: 'body', icon: <SpaIcon fontSize="large" /> },
]

export function ServicesSection() {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Section id="services">
      <SectionHeader overline={t('services.overline')} title={t('services.title')} />
      <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 6, maxWidth: 640, mx: 'auto' }}>
        {t('services.subtitle')}
      </Typography>
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        {CATEGORIES.map(({ key, icon }, index) => (
          <Grid key={key} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <Reveal delay={index * 120} sx={{ height: '100%' }}>
              <Box
                sx={{
                  p: 4,
                  height: '100%',
                  backgroundColor: 'background.paper',
                  border: `1px solid ${alpha(theme.palette.brand.main, 0.3)}`,
                  borderRadius: 1,
                  transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    borderColor: alpha(theme.palette.brand.main, 0.8),
                    transform: 'translateY(-4px)',
                    boxShadow: `0 0 32px ${alpha(theme.palette.primary.main, 0.15)}`,
                  },
                }}
              >
                <Stack sx={{ gap: 2, alignItems: 'center', textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main' }}>{icon}</Box>
                  <Typography variant="h5" sx={{ color: 'text.primary' }}>
                    {t(`services.items.${key}.title`)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {t(`services.items.${key}.description`)}
                  </Typography>
                </Stack>
              </Box>
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}
