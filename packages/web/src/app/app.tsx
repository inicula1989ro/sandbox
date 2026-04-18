import { useTranslation } from 'react-i18next'

import { Footer, Header } from '@/components/layout'
import { ParallaxStrip } from '@/components/ui'
import { ContactSection } from '@/features/contact'
import { HeroSection } from '@/features/hero'
import { PricingSection } from '@/features/pricing'
import { ServicesSection } from '@/features/services'
import { SpecialistsSection } from '@/features/specialists'

const PARALLAX_IMAGE =
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=2400&q=80'

export function App() {
  const { t } = useTranslation()
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ParallaxStrip image={PARALLAX_IMAGE} tagline={t('parallax.tagline')} />
        <PricingSection />
        <SpecialistsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
