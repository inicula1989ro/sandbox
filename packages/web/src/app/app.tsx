import { useEffect, useState } from 'react'

import { BookFab } from '@/components/book-fab/book-fab'
import { Intro } from '@/components/intro/intro'
import { Nav } from '@/components/layout/nav'
import { SeoHead } from '@/components/seo-head'
import { ScrollWaves } from '@/components/waves/scroll-waves'
import type { Lang } from '@/constants/i18n'
import { AboutSection } from '@/features/about'
import { ContactSection } from '@/features/contact'
import { HeroSection } from '@/features/hero'
import { PricingSection } from '@/features/pricing'
import { ServicesSection } from '@/features/services'
import { TeamSection } from '@/features/team'
import { I18N } from '@/locales'

import { dispatchRenderEvent, isPrerender } from './prerender-mode'

export interface AppProps {
  lang: Lang
}

export function App({ lang }: AppProps) {
  const [introDone, setIntroDone] = useState(false)
  const t = I18N[lang]

  useEffect(() => {
    if (isPrerender()) {
      dispatchRenderEvent()
    }
  }, [])

  return (
    <div className="app variant-a">
      <SeoHead lang={lang} t={t} />
      <Intro done={introDone} onDone={() => setIntroDone(true)} tagline={t.intro_tagline} />
      <ScrollWaves />
      <Nav t={t} lang={lang} />
      <main>
        <HeroSection t={t} />
        <ServicesSection t={t} />
        <PricingSection t={t} />
        <AboutSection t={t} />
        <TeamSection t={t} />
        <ContactSection t={t} />
      </main>
      <BookFab label={t.hero.cta_primary} />
    </div>
  )
}
