export function Waves() {
  return (
    <div className="hero__waves" aria-hidden>
      <svg viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#e8308a" stopOpacity="0" />
            <stop offset="50%" stopColor="#e8308a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e8308a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-100,100 Q 300,0 600,150 T 1300,80"
          stroke="url(#waveGrad)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M-100,200 Q 300,100 600,250 T 1300,180"
          stroke="url(#waveGrad)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M-100,300 Q 300,200 600,350 T 1300,280"
          stroke="url(#waveGrad)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M-100,600 Q 300,500 600,650 T 1300,580"
          stroke="url(#waveGrad)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M-100,700 Q 300,600 600,750 T 1300,680"
          stroke="url(#waveGrad)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  )
}
