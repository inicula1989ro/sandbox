import { useEffect, useRef } from 'react'

export function ScrollWaves() {
  const w1 = useRef<SVGSVGElement>(null)
  const w2 = useRef<SVGSVGElement>(null)
  const w3 = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (w1.current)
        w1.current.style.transform = `translateY(${y * 0.1}px) translateX(${y * 0.05}px)`
      if (w2.current)
        w2.current.style.transform = `translateY(${-y * 0.08}px) translateX(${-y * 0.04}px)`
      if (w3.current)
        w3.current.style.transform = `translateY(${y * 0.12}px) translateX(${y * 0.03}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-waves" aria-hidden>
      <svg className="w1" ref={w1} viewBox="0 0 1400 200" preserveAspectRatio="none">
        <path
          d="M0,100 Q 350,20 700,100 T 1400,100"
          stroke="#e8308a"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M0,120 Q 350,40 700,120 T 1400,120"
          stroke="#e8308a"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
      </svg>
      <svg className="w2" ref={w2} viewBox="0 0 1400 200" preserveAspectRatio="none">
        <path
          d="M0,100 Q 350,180 700,100 T 1400,100"
          stroke="#e8308a"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      <svg className="w3" ref={w3} viewBox="0 0 1400 200" preserveAspectRatio="none">
        <path d="M0,100 Q 350,20 700,100 T 1400,100" stroke="#e8308a" strokeWidth="1" fill="none" />
      </svg>
    </div>
  )
}
