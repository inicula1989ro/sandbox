import { useEffect } from 'react'

import { isPrerender } from '@/app/prerender-mode'
import logoSrc from '@/assets/evo-logo.png'

export interface IntroProps {
  done: boolean
  onDone: () => void
  tagline: string
}

export function Intro({ done, onDone, tagline }: IntroProps) {
  useEffect(() => {
    if (done) return
    const t = setTimeout(onDone, 2800)
    return () => clearTimeout(t)
  }, [done, onDone])

  if (isPrerender()) return null

  return (
    <div className={`intro ${done ? 'done' : ''}`}>
      <div className="intro__ring">
        <svg viewBox="0 0 520 520">
          <circle
            cx="260"
            cy="260"
            r="255"
            fill="none"
            stroke="#e8308a"
            strokeWidth="1"
            opacity="0.6"
          />
          <circle
            className="ring-2"
            cx="260"
            cy="260"
            r="230"
            fill="none"
            stroke="#e8308a"
            strokeWidth="0.5"
            opacity="0.4"
          />
        </svg>
        <img className="intro__logo" src={logoSrc} alt="Evo Studio" />
        <div className="intro__tagline">{tagline}</div>
      </div>
    </div>
  )
}
