import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { alpha, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout'
import { BrandButton, CornerFlourish, HeartDivider, SectionHeader } from '@/components/ui'
import { BOOKING_URL } from '@/constants/links'

import { PricingAccordion } from './pricing-accordion'

type CategoryKey = 'brows' | 'hair' | 'nails' | 'face' | 'body'

export function PricingSection() {
  const theme = useTheme()
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('brows')

  return (
    <Section id="pricing" maxWidth="md">
      <Box
        sx={{
          position: 'relative',
          border: `1px solid ${alpha(theme.palette.brand.main, 0.25)}`,
          backgroundColor: alpha('#000000', 0.4),
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 10 },
          overflow: 'hidden',
        }}
      >
        <CornerFlourish corner="tl" size={140} />
        <CornerFlourish corner="tr" size={140} />
        <CornerFlourish corner="bl" size={140} />
        <CornerFlourish corner="br" size={140} />

        <Stack sx={{ gap: 1, alignItems: 'center', mb: 4, position: 'relative', zIndex: 1 }}>
          <Typography variant="overline" sx={{ color: 'brand.main' }}>
            {t('pricing.overline')}
          </Typography>
          <Typography variant="h2" sx={{ color: 'text.primary' }}>
            {t('pricing.title')}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: { xs: '2rem', md: '2.75rem' },
              color: 'brand.main',
              lineHeight: 1,
              mt: 1,
            }}
          >
            {t(`pricing.subtitleByCategory.${activeCategory}`)}
          </Typography>
        </Stack>

        <SectionHeader title="" sx={{ mb: 0, display: 'none' }} />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <PricingAccordion onCategoryChange={(key) => setActiveCategory(key as CategoryKey)} />
        </Box>

        <HeartDivider />

        <Stack sx={{ flexDirection: 'row', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <BrandButton
            component="a"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="large"
          >
            {t('pricing.cta')}
          </BrandButton>
        </Stack>
      </Box>
    </Section>
  )
}
