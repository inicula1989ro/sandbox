import type { Translation } from '@/constants/i18n'

export interface AboutSectionProps {
  t: Translation
}

export function AboutSection({ t }: AboutSectionProps) {
  return (
    <section id="about" className="about">
      <div className="about__grid">
        <div className="about__visual">
          <div className="ph pink-glow">Interior studio · 4:5</div>
        </div>
        <div className="about__text">
          <div className="section-label">{t.about.label}</div>
          <h2 className="section-title">
            {t.about.title_1} <em>{t.about.title_em}</em> {t.about.title_2}
          </h2>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <div className="about__values">
            {t.about.values.map((v, i) => (
              <div key={i} className="about__value">
                <h4>{v.h}</h4>
                <p>{v.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
