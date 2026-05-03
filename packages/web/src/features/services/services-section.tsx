import type { CSSProperties } from 'react'

import browsIcon from '@/assets/icons/brows.png'
import hairIcon from '@/assets/icons/hair.png'
import makeupIcon from '@/assets/icons/makeup.png'
import nailsIcon from '@/assets/icons/nails.png'
import { WaveDivider } from '@/components/waves/wave-divider'
import type { Translation } from '@/constants/i18n'

const slugs = ['nails', 'hair', 'brows', 'makeup'] as const
const iconUrls = [nailsIcon, hairIcon, browsIcon, makeupIcon]

export interface ServicesSectionProps {
  t: Translation
}

export function ServicesSection({ t }: ServicesSectionProps) {
  return (
    <section id="services" className="services">
      <WaveDivider position="top" />
      <div className="section-label">{t.services.label}</div>
      <h2 className="section-title">
        {t.services.title_1} <em>{t.services.title_em}</em>
      </h2>
      <p className="section-intro">{t.services.intro}</p>
      <div className="services__grid">
        {t.services.items.map((item, i) => {
          const slug = slugs[i]
          const iconUrl = iconUrls[i]
          const iconStyle = { '--ico-url': `url(${iconUrl})` } as CSSProperties
          return (
            <a href="#price" key={i} className={`service-card service-card--${slug} ico-set-IMG`}>
              <div className="service-card__num">/ {item.num}</div>
              <div className="service-card__icon">
                <span className="img-icon" style={iconStyle} />
              </div>
              <h3 className="service-card__title">{item.title}</h3>
              <p className="service-card__desc">{item.desc}</p>
              <span className="service-card__link">{t.services.more}</span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
