import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PriceRow } from '@/components/ui'

const CATEGORY_KEYS = ['brows', 'hair', 'nails', 'face', 'body'] as const
type CategoryKey = (typeof CATEGORY_KEYS)[number]

interface PriceItem {
  service: string
  price: string
}

export interface PricingAccordionProps {
  onCategoryChange?: (key: CategoryKey) => void
}

export function PricingAccordion({ onCategoryChange }: PricingAccordionProps) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState<CategoryKey>('brows')
  const currency = t('pricing.currency')

  function handleChange(key: CategoryKey) {
    return (_: React.SyntheticEvent, isExpanded: boolean) => {
      if (isExpanded) {
        setExpanded(key)
        onCategoryChange?.(key)
      }
    }
  }

  return (
    <Box>
      {CATEGORY_KEYS.map((key) => {
        const items = t(`pricing.categories.${key}.items`, { returnObjects: true }) as PriceItem[]
        const title = t(`pricing.categories.${key}.title`)
        const isOpen = expanded === key
        return (
          <Accordion key={key} expanded={isOpen} onChange={handleChange(key)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}>
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isOpen ? 'primary.main' : 'text.primary',
                  transition: 'color 0.2s',
                }}
              >
                {title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {items.map((item, idx) => (
                <PriceRow
                  key={`${key}-${idx}`}
                  service={item.service}
                  price={item.price}
                  currency={currency}
                  last={idx === items.length - 1}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Box>
  )
}
