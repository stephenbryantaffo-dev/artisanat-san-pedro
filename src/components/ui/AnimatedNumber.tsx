import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Props {
  value: number
  duration?: number
  locale?: string
}

export function AnimatedNumber({ value, duration = 1800, locale = 'fr-FR' }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration, bounce: 0 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      setDisplay(Math.floor(v).toLocaleString(locale))
    })
    return () => unsub()
  }, [spring, locale])

  return <span ref={ref}>{display}</span>
}