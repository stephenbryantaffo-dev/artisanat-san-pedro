import { useEffect, useRef } from 'react'

export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    document.documentElement.style.cursor = 'none'
    const dot = dotRef.current!
    const ring = ringRef.current!

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseEnterMagnetic = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      ring.style.width = `${rect.width + 20}px`
      ring.style.height = `${rect.height + 20}px`
      ring.style.borderRadius = `${rect.height}px`
      ring.style.opacity = '0.6'

      targetRef.current = { x: cx, y: cy }
    }

    const onMouseLeaveMagnetic = () => {
      ring.style.width = '40px'
      ring.style.height = '40px'
      ring.style.borderRadius = '50%'
      ring.style.opacity = '0.4'
    }

    let rafId: number
    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.12
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.12
      dot.style.transform = `translate(${targetRef.current.x - 4}px, ${targetRef.current.y - 4}px)`
      ring.style.transform = `translate(${posRef.current.x - 20}px, ${posRef.current.y - 20}px)`
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    const magneticEls = document.querySelectorAll('button, a, [data-magnetic]')
    magneticEls.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterMagnetic)
      el.addEventListener('mouseleave', onMouseLeaveMagnetic)
    })

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      document.documentElement.style.cursor = ''
      magneticEls.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterMagnetic)
        el.removeEventListener('mouseleave', onMouseLeaveMagnetic)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-primary rounded-full pointer-events-none z-[9998] transition-[width,height,border-radius] duration-300"
        style={{
          opacity: 0.4,
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
    </>
  )
}