import { useState } from 'react'

import type { PriceCategoryKey, Translation } from '@/constants/i18n'

const cats: PriceCategoryKey[] = ['nails', 'hair', 'brows_lashes', 'makeup']

export interface PricingSectionProps {
  t: Translation
}

export function PricingSection({ t }: PricingSectionProps) {
  const [active, setActive] = useState<PriceCategoryKey>('nails')
  const rows = t.price.categories[active] ?? []

  return (
    <section id="price" className="price">
      <div className="section-label">{t.price.label}</div>
      <h2 className="section-title">
        {t.price.title_1} <em>{t.price.title_em}</em>
      </h2>
      <p className="section-intro">{t.price.intro}</p>
      <div className="price__tabs" role="tablist">
        {cats.map((cat, i) => (
          <button
            type="button"
            key={cat}
            className={`price__tab ${active === cat ? 'active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {t.price.tabs[i]}
          </button>
        ))}
      </div>
      <div className="price__list">
        {rows.map((r, i) => (
          <div key={i} className="price__row">
            <span className="price__bullet" aria-hidden />
            <div className="price__name">
              {r.name}
              {r.desc ? <small>{r.desc}</small> : null}
            </div>
            <div className="price__amount">
              {r.price}
              <small>{t.price.unit}</small>
            </div>
          </div>
        ))}
      </div>
      <p className="price__footnote">{t.price.footnote}</p>
    </section>
  )
}
