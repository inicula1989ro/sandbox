import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const current = (i18n.resolvedLanguage ?? i18n.language ?? 'ru').slice(0, 2) as SupportedLanguage
  const display = SUPPORTED_LANGUAGES.includes(current) ? current : 'ru'

  function handleOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleSelect(lang: SupportedLanguage) {
    void i18n.changeLanguage(lang)
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        aria-label={t('language.label')}
        size="small"
        sx={{
          color: 'text.primary',
          minWidth: 0,
          px: 1.5,
          letterSpacing: '0.12em',
          fontWeight: 600,
        }}
      >
        {t(`language.${display}`)}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <MenuItem
            key={lang}
            selected={lang === display}
            onClick={() => handleSelect(lang)}
            sx={{ minWidth: 96, letterSpacing: '0.1em' }}
          >
            {t(`language.${lang}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
