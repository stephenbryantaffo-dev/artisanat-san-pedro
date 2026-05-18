import { useEffect } from 'react'
import { lenisInstance } from './useLenis'

export function useScrollSkew(selector = '.skew-container') {
  useEffect(() => {
    const el = document.querySelector(selector) as HTMLElement
    if (!el) return

    let currentSkew = 0
    let rafId: number | null = null

    const handleScroll = ({ velocity }: { scroll: number; velocity: number }) => {
      const rawSkew = velocity * -0.008
      const clampedSkew = Math.max(-6, Math.min(6, rawSkew))
      currentSkew += (clampedSkew - currentSkew) * 0.08
      el.style.transform = `skewY(${currentSkew}deg)`
    }

    lenisInstance?.on('scroll', handleScroll)

    const tick = () => {
      currentSkew += (0 - currentSkew) * 0.08
      el.style.transform = `skewY(${currentSkew}deg)`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      lenisInstance?.off('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [selector])
}
