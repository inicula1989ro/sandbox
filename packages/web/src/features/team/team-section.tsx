import type { Translation } from '@/constants/i18n'

export interface TeamSectionProps {
  t: Translation
}

export function TeamSection({ t }: TeamSectionProps) {
  return (
    <section id="team" className="team">
      <div className="section-label">{t.team.label}</div>
      <h2 className="section-title">
        {t.team.title_1} <em>{t.team.title_em}</em> {t.team.title_2}
      </h2>
      <p className="section-intro">{t.team.intro}</p>
      <div className="team__grid">
        {t.team.members.map((m, i) => (
          <article key={i} className="master">
            <div className="master__photo">
              <div className="ph">Photo {m.name}</div>
            </div>
            <div className="master__info">
              <h3 className="master__name">{m.name}</h3>
              <div className="master__role">{m.role}</div>
              <p className="master__bio">{m.bio}</p>
              <div className="master__specialties">
                {m.tags.map((tag, k) => (
                  <span key={k} className="master__specialty">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
