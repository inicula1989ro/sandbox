import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from '@/locales/en.json'
import ro from '@/locales/ro.json'
import ru from '@/locales/ru.json'

export const SUPPORTED_LANGUAGES = ['ru', 'ro', 'en'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: { common: ru },
      ro: { common: ro },
      en: { common: en },
    },
    defaultNS: 'common',
    ns: ['common'],
    fallbackLng: 'ru',
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'evo-studio-lang',
      caches: ['localStorage'],
    },
  })

export default i18n
