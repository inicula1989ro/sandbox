import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { alpha, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { EvoLogo } from '@/components/ui'
import { FACEBOOK_URL, INSTAGRAM_URL } from '@/constants/links'

export function Footer() {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: 'background.default',
        borderTop: `1px solid ${alpha(theme.palette.brand.main, 0.15)}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack sx={{ gap: 3, alignItems: 'center' }}>
          <EvoLogo size={32} />
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
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            {t('footer.copyright')}
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
