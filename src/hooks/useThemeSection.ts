import { useEffect, useRef } from 'react'

export function useThemeSection<T extends HTMLElement = HTMLElement>(theme: string) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.setAttribute('data-theme', theme)
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [theme])
  return ref
}
