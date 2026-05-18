import { useRef, useCallback } from 'react'

export function useTilt(intensity = 15) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      const rotateX = (y - 0.5) * -intensity
      const rotateY = (x - 0.5) * intensity
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`
      el.style.transition = 'transform 0.1s ease'

      const img = el.querySelector('img')
      if (img) {
        img.style.transform = `scale(1.08) translateX(${(x - 0.5) * -8}px) translateY(${(y - 0.5) * -8}px)`
      }
    },
    [intensity]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    el.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    const img = el.querySelector('img')
    if (img) img.style.transform = 'scale(1) translateX(0) translateY(0)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}