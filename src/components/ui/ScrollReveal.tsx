import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { fadeUp } from '../../lib/motionVariants'

interface Props {
  children: ReactNode
  variants?: Variants
  delay?: number
  className?: string
}

export function ScrollReveal({
  children,
  variants = fadeUp,
  delay = 0,
  className = ''
}: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}