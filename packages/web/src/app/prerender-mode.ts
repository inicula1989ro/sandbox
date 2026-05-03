declare global {
  interface Window {
    __PRERENDER__?: boolean
  }
}

export function isPrerender(): boolean {
  if (typeof window === 'undefined') return false
  if (window.__PRERENDER__ === true) return true
  if (typeof navigator !== 'undefined' && navigator.webdriver === true) return true
  if (typeof window.location !== 'undefined' && window.location.search.includes('prerender=1')) {
    return true
  }
  return false
}

export function dispatchRenderEvent(): void {
  if (typeof document === 'undefined') return
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.dispatchEvent(new Event('render-event'))
    })
  })
}
