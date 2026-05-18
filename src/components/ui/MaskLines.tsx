import { useEffect, useRef } from 'react'

interface Props {
  text: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p'
  stagger?: number
}

export function MaskLines({ text, className = '', tag = 'p', stagger = 0.09 }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Split into lines by words (3 words per line max on mobile)
    const words = text.split(' ')
    const linesWords: string[][] = []
    let current: string[] = []
    words.forEach((w, i) => {
      current.push(w)
      if (current.length >= 4 || i === words.length - 1) {
        linesWords.push([...current])
        current = []
      }
    })

    // Build DOM like Locomotive's mask-lines
    el.innerHTML = linesWords.map((lineWords, i) => `
      <span class="s-mask-line">
        <span 
          class="s-mask-line-inner" 
          style="transition-delay: ${i * stagger}s"
        >
          ${lineWords.join(' ')}
        </span>
      </span>
    `).join('')

    // Intersection Observer — like Locomotive's data-scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.querySelectorAll('.s-mask-line-inner').forEach(inner => {
              inner.classList.add('is-visible')
            })
            observer.unobserve(el)
          }
        })
      },
      { rootMargin: '-60px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [text, stagger])

  const Tag = tag
  return <Tag ref={ref as any} className={className} />
}
