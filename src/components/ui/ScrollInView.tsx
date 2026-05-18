import { useEffect, useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  once?: boolean
}

export function ScrollInView({ children, delay = 0, className = '', once = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.dataset.sanScroll = ''
            el.classList.add('is-inview')
            if (once) observer.unobserve(el)
            else if (!entry.isIntersecting) el.classList.remove('is-inview')
          }
        })
      },
      { rootMargin: '-60px 0px' }
    )

    // Add data attribute for CSS
    el.setAttribute('data-san-scroll', '')
    if (delay) el.setAttribute('data-san-delay', String(delay))

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
