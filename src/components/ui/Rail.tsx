import { useEffect, useRef, ReactNode } from 'react'
import { lenisInstance } from '../../hooks/useLenis'

interface Props {
  children: ReactNode
  baseSpeed?: number
}

export function Rail({ children, baseSpeed = 0.5 }: Props) {
  const innerRef = useRef<HTMLDivElement>(null)
  const xRef = useRef(0)
  const scrollVelocityRef = useRef(0)

  useEffect(() => {
    const handleScroll = ({ velocity }: { velocity: number }) => {
      scrollVelocityRef.current = velocity
    }
    lenisInstance?.on('scroll', handleScroll)

    let rafId: number
    const tick = () => {
      const direction = parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--scroll-direction') || '1'
      )
      const boostSpeed = scrollVelocityRef.current * direction * -1.2
      xRef.current -= baseSpeed + boostSpeed
      const width = innerRef.current ? innerRef.current.scrollWidth / 2 : 0
      if (width && xRef.current <= -width) xRef.current += width
      if (width && xRef.current >= 0) xRef.current -= width

      const skew = Math.max(-8, Math.min(8, scrollVelocityRef.current * 0.05))
      if (innerRef.current) {
        innerRef.current.style.transform = `translateX(${xRef.current}px) skewX(${skew}deg)`
      }
      scrollVelocityRef.current *= 0.92
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      lenisInstance?.off('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [baseSpeed])

  return (
    <div className="s-rail">
      <div ref={innerRef} className="s-rail-inner" style={{ animation: 'none', willChange: 'transform' }}>
        <div className="s-rail-track inline-flex">{children}</div>
        <div className="s-rail-track inline-flex" aria-hidden>{children}</div>
      </div>
    </div>
  )
}
