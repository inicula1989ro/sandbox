import logoSrc from '@/assets/evo-logo.png'
import { Waves } from '@/components/waves/waves'
import type { Translation } from '@/constants/i18n'

export interface HeroSectionProps {
  t: Translation
}

export function HeroSection({ t }: HeroSectionProps) {
  const stats: [string, string][] = [
    [t.hero.stat_1_v, t.hero.stat_1_l],
    [t.hero.stat_2_v, t.hero.stat_2_l],
    [t.hero.stat_3_v, t.hero.stat_3_l],
  ]
  return (
    <section className="hero" id="top">
      <div className="hero__bg" />
      <Waves />
      <div className="hero__inner">
        <img className="hero__logo" src={logoSrc} alt="Evo Studio" />
        <div className="hero__tag">{t.hero.tag}</div>
        <h1 className="hero__title">
          {t.hero.title_1} <em>{t.hero.title_em}</em> {t.hero.title_2}
        </h1>
        <p className="hero__subtitle">{t.hero.subtitle}</p>
        <div className="hero__ctas">
          <a href="#price" className="btn-outline">
            {t.hero.cta_secondary}
          </a>
        </div>
        <div className="hero__stats">
          {stats.map(([v, l], i) => (
            <div key={i} className="hero__stat">
              <div className="hero__stat-value">{v}</div>
              <div className="hero__stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
