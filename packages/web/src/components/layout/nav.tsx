import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import logoSrc from '@/assets/evo-logo.png'
import { BOOKING_URL, type Lang, type Translation } from '@/constants/i18n'
import { LANG_TO_PATH } from '@/constants/seo'

export interface NavProps {
  t: Translation
  lang: Lang
}

export function Nav({ t, lang }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#price', label: t.nav.prices },
    { href: '#about', label: t.nav.about },
    { href: '#team', label: t.nav.team },
    { href: '#contact', label: t.nav.contact },
  ]

  const langs = Object.keys(LANG_TO_PATH) as Lang[]

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`}>
      <Link to={LANG_TO_PATH[lang]} className="nav__logo" aria-label="Evo Studio">
        <img src={logoSrc} alt="Evo Studio" />
      </Link>
      <nav className="nav__menu">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="nav__right">
        <div className="lang-switch" role="tablist">
          {langs.map((code) => (
            <Link
              key={code}
              to={LANG_TO_PATH[code]}
              className={lang === code ? 'active' : ''}
              role="tab"
              aria-selected={lang === code}
            >
              {code.toUpperCase()}
            </Link>
          ))}
        </div>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-book"
          style={{ display: 'none' }}
          data-desktop-show
        >
          {t.nav.book}
        </a>
        <button
          type="button"
          className="nav__burger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
