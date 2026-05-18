import { useEffect, useRef } from 'react'
import { lenisInstance } from '../../hooks/useLenis'

interface Props {
  text: string
  className?: string
  baseColor?: string   // starting color (faded)
  targetColor?: string // ending color (revealed)
}

export function FadeInText({
  text,
  className = '',
  baseColor = 'rgba(153, 66, 13, 0.25)',   // terracotta faded
  targetColor = 'rgb(28, 28, 25)',           // on-surface
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const words = text.split(' ')
    el.innerHTML = words.map(word =>
      `<span class="fade-word" style="display:inline-block; margin-right:0.3em;
       background: ${baseColor}; -webkit-background-clip:text; background-clip:text;
       -webkit-text-fill-color:transparent; transition: background 0.1s linear;">${word}</span>`
    ).join('')

    const wordEls = Array.from(el.querySelectorAll('.fade-word')) as HTMLElement[]

    const handleScroll = ({ scroll }: { scroll: number }) => {
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight

      const start = rect.top + scroll + windowH * 0.9
      const end = rect.top + scroll + windowH * 0.3
      const rawProgress = (scroll - start) / (end - start)
      const progress = Math.max(0, Math.min(1, rawProgress))

      wordEls.forEach((wordEl, i) => {
        const from = i / wordEls.length
        const to = from + (1 / wordEls.length)
        const wordProgress = Math.max(0, Math.min(1, (progress - from) / (to - from)))

        const bg = wordProgress > 0.5 ? targetColor : baseColor
        wordEl.style.background = bg
        wordEl.style.webkitBackgroundClip = 'text'
        wordEl.style.backgroundClip = 'text'
      })
    }

    lenisInstance?.on('scroll', handleScroll)
    handleScroll({ scroll: window.scrollY })
    return () => { lenisInstance?.off('scroll', handleScroll) }
  }, [text, baseColor, targetColor])

  return <div ref={ref} className={`font-body ${className}`} />
}
