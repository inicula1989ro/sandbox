import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { alpha, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout'
import { BrandButton, SectionHeader, SpecialistAvatar } from '@/components/ui'
import { BOOKING_URL } from '@/constants/links'

interface SpecialistItem {
  name: string
  role: string
}

export function SpecialistsSection() {
  const theme = useTheme()
  const { t } = useTranslation()
  const items = t('specialists.items', { returnObjects: true }) as SpecialistItem[]

  return (
    <Section id="specialists">
      <SectionHeader overline={t('specialists.overline')} title={t('specialists.title')} />
      <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 6, maxWidth: 640, mx: 'auto' }}>
        {t('specialists.subtitle')}
      </Typography>
      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        {items.map((item) => (
          <Grid key={item.name} size={{ xs: 12, sm: 6, md: 3 }}>
            <Box
              sx={{
                p: 4,
                height: '100%',
                textAlign: 'center',
                border: `1px solid ${alpha(theme.palette.brand.main, 0.2)}`,
                backgroundColor: 'background.paper',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: alpha(theme.palette.brand.main, 0.6),
                },
              }}
            >
              <Stack sx={{ gap: 2, alignItems: 'center' }}>
                <SpecialistAvatar name={item.name} size={140} />
                <Typography variant="h5" sx={{ color: 'text.primary' }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.role}
                </Typography>
                <BrandButton
                  component="a"
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="small"
                >
                  {t('specialists.cta')}
                </BrandButton>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}
