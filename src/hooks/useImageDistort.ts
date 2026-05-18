import { useEffect, useRef } from 'react'
import { lenisInstance } from './useLenis'

export function useImageDistort() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = ({ velocity }: { velocity: number }) => {
      const scaleY = 1 + Math.abs(velocity) * 0.0005
      const scaleX = 1 - Math.abs(velocity) * 0.0002
      el.style.transform = `scaleY(${scaleY}) scaleX(${scaleX})`
      el.style.transition = 'transform 0.1s ease'
    }

    lenisInstance?.on('scroll', handleScroll)
    return () => { lenisInstance?.off('scroll', handleScroll) }
  }, [])

  return ref
}
