import { useEffect, useRef, useState, ReactNode } from 'react'
import { lenisInstance } from '../../hooks/useLenis'

interface CascadeItem {
  id: string | number
  content: ReactNode
}

interface Props {
  items: CascadeItem[]
  title: ReactNode
  label: string
  className?: string
}

export function ForcedCascade({ items, title, label, className = '' }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [phase, setPhase] = useState<'before' | 'active' | 'after'>('before')

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const scrollHeight = window.innerHeight * (items.length + 0.8)

    const handleScroll = ({ scroll }: { scroll: number }) => {
      const rect = section.getBoundingClientRect()
      const sectionTop = scroll + rect.top

      if (scroll < sectionTop - window.innerHeight * 0.1) {
        setPhase('before')
        setActiveIndex(0)
        return
      }
      if (scroll > sectionTop + scrollHeight) {
        setPhase('after')
        setActiveIndex(items.length - 1)
        return
      }
      setPhase('active')
      const progress = (scroll - sectionTop + window.innerHeight * 0.1) / scrollHeight
      const rawIndex = Math.floor(progress * items.length)
      const clampedIndex = Math.max(0, Math.min(items.length - 1, rawIndex))
      setActiveIndex(clampedIndex)
    }

    lenisInstance?.on('scroll', handleScroll)
    return () => { lenisInstance?.off('scroll', handleScroll) }
  }, [items.length])

  const sectionHeight = `${(items.length + 0.8) * 100}vh`

  return (
    <section
      ref={sectionRef}
      className={`relative ${className}`}
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="px-6 pt-24 pb-6 flex justify-between items-end flex-shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-sans">
              {label}
            </p>
            <h2 className="font-serif text-3xl italic text-inverse-surface">{title}</h2>
          </div>
          <div className="text-right">
            <p className="font-serif text-5xl text-primary/20 italic tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')}
            </p>
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-sans">
              / {String(items.length).padStart(2, '0')}
            </p>
          </div>
        </div>

        <div className="px-6 flex gap-2 mb-6 flex-shrink-0">
          {items.map((_, i) => (
            <div
              key={i}
              className="h-0.5 flex-1 rounded-full overflow-hidden bg-border/30"
            >
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: i < activeIndex ? '100%' : i === activeIndex ? '50%' : '0%',
                  background: 'linear-gradient(90deg, #99420d, #b95925)'
                }}
              />
            </div>
          ))}
        </div>

        <div className="relative flex-1 px-6 pb-8 overflow-hidden">
          {items.map((item, i) => {
            const isActive = i === activeIndex
            const isPast = i < activeIndex
            return (
              <div
                key={item.id}
                className="absolute inset-x-6 top-0"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? 'translateY(0) scale(1)'
                    : isPast
                    ? 'translateY(-60px) scale(0.95)'
                    : 'translateY(80px) scale(0.97)',
                  transition:
                    'opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
                  zIndex: isActive ? 10 : 1,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {item.content}
              </div>
            )
          })}
        </div>

        <div
          className="px-6 pb-6 flex items-center gap-3 flex-shrink-0"
          style={{
            opacity: phase === 'active' ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div className="w-8 h-px bg-border/40" />
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-sans">
            Continuez à défiler
          </p>
          <div
            className="w-3 h-3 border-b border-r border-muted-foreground/40"
            style={{ transform: 'rotate(45deg)' }}
          />
        </div>
      </div>
    </section>
  )
}
