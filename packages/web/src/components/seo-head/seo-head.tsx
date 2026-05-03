import { useEffect } from 'react'

import type { Lang, Translation } from '@/constants/i18n'
import {
  BUSINESS_JSONLD,
  HREFLANGS,
  LANG_TO_OG_LOCALE,
  LANG_TO_PATH,
  OG_IMAGE_PATH,
  SITE_URL,
} from '@/constants/seo'

const MARKER_ATTR = 'data-seo-head'

interface TagDef {
  tag: 'title' | 'meta' | 'link' | 'script'
  attrs?: Record<string, string>
  text?: string
}

function buildTags(lang: Lang, t: Translation): TagDef[] {
  const path = LANG_TO_PATH[lang]
  const canonical = `${SITE_URL}${path}`
  const ogLocale = LANG_TO_OG_LOCALE[lang]
  const otherLocales = (Object.keys(LANG_TO_OG_LOCALE) as Lang[])
    .filter((l) => l !== lang)
    .map((l) => LANG_TO_OG_LOCALE[l])

  const ogImageAbs = `${SITE_URL}${OG_IMAGE_PATH}`

  const tags: TagDef[] = [
    { tag: 'title', text: t.seo.title },
    { tag: 'meta', attrs: { name: 'description', content: t.seo.description } },
    { tag: 'link', attrs: { rel: 'canonical', href: canonical } },
  ]

  for (const { hreflang, path: p } of HREFLANGS) {
    tags.push({
      tag: 'link',
      attrs: { rel: 'alternate', hreflang, href: `${SITE_URL}${p}` },
    })
  }

  tags.push(
    { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: 'Evo Studio' } },
    { tag: 'meta', attrs: { property: 'og:url', content: canonical } },
    { tag: 'meta', attrs: { property: 'og:title', content: t.seo.ogTitle } },
    { tag: 'meta', attrs: { property: 'og:description', content: t.seo.description } },
    { tag: 'meta', attrs: { property: 'og:image', content: ogImageAbs } },
    { tag: 'meta', attrs: { property: 'og:locale', content: ogLocale } },
  )
  for (const l of otherLocales) {
    tags.push({ tag: 'meta', attrs: { property: 'og:locale:alternate', content: l } })
  }

  tags.push(
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: t.seo.ogTitle } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: t.seo.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: ogImageAbs } },
  )

  tags.push(
    {
      tag: 'link',
      attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    },
    {
      tag: 'link',
      attrs: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    },
    {
      tag: 'link',
      attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    },
    { tag: 'link', attrs: { rel: 'manifest', href: '/site.webmanifest' } },
  )

  tags.push({
    tag: 'script',
    attrs: { type: 'application/ld+json' },
    text: JSON.stringify(BUSINESS_JSONLD),
  })

  return tags
}

export interface SeoHeadProps {
  lang: Lang
  t: Translation
}

export function SeoHead({ lang, t }: SeoHeadProps) {
  useEffect(() => {
    document.documentElement.lang = lang

    document.querySelectorAll(`[${MARKER_ATTR}]`).forEach((el) => el.remove())

    const fragment = document.createDocumentFragment()
    for (const def of buildTags(lang, t)) {
      const el = document.createElement(def.tag)
      el.setAttribute(MARKER_ATTR, '')
      if (def.attrs) {
        for (const [k, v] of Object.entries(def.attrs)) {
          el.setAttribute(k, v)
        }
      }
      if (def.text !== undefined) {
        el.textContent = def.text
      }
      fragment.appendChild(el)
    }
    document.head.appendChild(fragment)

    return () => {
      document.querySelectorAll(`[${MARKER_ATTR}]`).forEach((el) => el.remove())
    }
  }, [lang, t])

  return null
}
