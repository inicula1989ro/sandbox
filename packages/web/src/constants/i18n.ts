export type Lang = 'ru' | 'ro' | 'en'

export interface PriceRow {
  name: string
  desc: string
  price: string
}

export type PriceCategoryKey = 'nails' | 'hair' | 'brows_lashes' | 'makeup'

export interface Translation {
  seo: {
    title: string
    description: string
    ogTitle: string
  }
  nav: {
    services: string
    prices: string
    about: string
    team: string
    contact: string
    book: string
  }
  hero: {
    tag: string
    title_1: string
    title_em: string
    title_2: string
    subtitle: string
    cta_primary: string
    cta_secondary: string
    stat_1_v: string
    stat_1_l: string
    stat_2_v: string
    stat_2_l: string
    stat_3_v: string
    stat_3_l: string
  }
  services: {
    label: string
    title_1: string
    title_em: string
    intro: string
    items: { num: string; title: string; desc: string }[]
    more: string
  }
  price: {
    label: string
    title_1: string
    title_em: string
    intro: string
    tabs: string[]
    categories: Record<PriceCategoryKey, PriceRow[]>
    footnote: string
    unit: string
  }
  about: {
    label: string
    title_1: string
    title_em: string
    title_2: string
    p1: string
    p2: string
    values: { h: string; p: string }[]
  }
  team: {
    label: string
    title_1: string
    title_em: string
    title_2: string
    intro: string
    members: { name: string; role: string; bio: string; tags: string[] }[]
  }
  booking: {
    info_title: string
    hours_h: string
    hours: string
    address_h: string
    address: string
    phone_h: string
    phone_v: string
    email_h: string
    email_v: string
  }
  contact: {
    title: string
    sub: string
    map_label: string
    rights: string
  }
  intro_tagline: string
}

export const BOOKING_URL =
  'https://n736120.alteg.io/company/139070/personal/menu?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcARQUB1leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAaeZtJTKE0IqHIJuMNDmrDesldwE8yHsilw-0mFcYNS6LNt1gffszdMWRutu9g_aem_F651As61eVvNmPvwhcUoaw&utm_id=97760_v0_s00_e0_tv3_a1dennhb2qzpb9&o='
