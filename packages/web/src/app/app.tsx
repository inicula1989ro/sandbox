import { Footer, Header } from '@/components/layout'
import { ContactSection } from '@/features/contact'
import { HeroSection } from '@/features/hero'
import { PricingSection } from '@/features/pricing'
import { ServicesSection } from '@/features/services'
import { SpecialistsSection } from '@/features/specialists'

export function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <SpecialistsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
