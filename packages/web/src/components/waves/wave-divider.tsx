export interface WaveDividerProps {
  position?: 'top' | 'bot'
  flip?: boolean
}

export function WaveDivider({ position = 'top', flip = false }: WaveDividerProps) {
  return (
    <div className={`wave-divider wave-divider--${position}`} aria-hidden>
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', transform: flip ? 'scaleY(-1)' : 'none' }}
      >
        <path
          d="M0,40 Q 300,0 600,40 T 1200,40"
          stroke="#e8308a"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M0,50 Q 300,10 600,50 T 1200,50"
          stroke="#e8308a"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />
      </svg>
    </div>
  )
}
