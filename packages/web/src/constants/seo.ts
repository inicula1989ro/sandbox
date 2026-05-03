import type { Lang } from '@/constants/i18n'

export const SITE_URL = 'https://evo-studio.md'

export const LANG_TO_PATH: Record<Lang, string> = {
  ro: '/',
  ru: '/ru',
  en: '/en',
}

export const LANG_TO_OG_LOCALE: Record<Lang, string> = {
  ro: 'ro_RO',
  ru: 'ru_RU',
  en: 'en_US',
}

export const HREFLANGS: Array<{ hreflang: string; path: string }> = [
  { hreflang: 'ro', path: '/' },
  { hreflang: 'ru', path: '/ru' },
  { hreflang: 'en', path: '/en' },
  { hreflang: 'x-default', path: '/' },
]

export const OG_IMAGE_PATH = '/og-image.jpg'

interface BusinessJsonLd {
  '@context': string
  '@type': string
  '@id': string
  name: string
  image: string
  url: string
  telephone: string
  email: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
  }
  openingHoursSpecification: Array<{
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string | string[]
    opens: string
    closes: string
  }>
  sameAs: string[]
  priceRange: string
  hasMap: string
}

export const BUSINESS_JSONLD: BusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  '@id': `${SITE_URL}/#business`,
  name: 'Evo Studio',
  image: `${SITE_URL}${OG_IMAGE_PATH}`,
  url: SITE_URL,
  telephone: '+37378367347',
  email: 'hello@evostudio.md',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Strada Nicolae Starostenco 25',
    addressLocality: 'Chișinău',
    postalCode: 'MD-2001',
    addressCountry: 'MD',
  },
  // geo: { '@type': 'GeoCoordinates', latitude: 47.xxx, longitude: 28.xxx },
  // ↑ Uncomment and fill from Google Business Profile before launch (spec §7 launch checklist)
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '10:00',
      closes: '18:00',
    },
  ],
  sameAs: ['https://www.instagram.com/evostudiomd', 'https://www.facebook.com/evostudio.md'],
  priceRange: '$$',
  hasMap: 'https://maps.app.goo.gl/zfQgRNsms9dBk9Xt7',
}
