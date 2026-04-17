import { useCallback, useRef, useState } from 'react'

interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean
}

export function useInView(options: UseInViewOptions = {}) {
  const { triggerOnce = true, threshold = 0.15, root, rootMargin } = options
  const [inView, setInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const ref = useCallback(
    (node: Element | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }

      if (!node) return

      const observerInit: IntersectionObserverInit = { threshold }
      if (root !== undefined) observerInit.root = root
      if (rootMargin !== undefined) observerInit.rootMargin = rootMargin

      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce) {
            observer.disconnect()
          }
        } else if (!triggerOnce) {
          setInView(false)
        }
      }, observerInit)

      observer.observe(node)
      observerRef.current = observer
    },
    [triggerOnce, threshold, root, rootMargin],
  )

  return { ref, inView }
}
