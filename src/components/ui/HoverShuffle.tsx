import { useState, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

interface Props {
  text: string
  className?: string
}

export function HoverShuffle({ text, className = '' }: Props) {
  const [display, setDisplay] = useState(text)

  const shuffle = useCallback(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iteration) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      iteration += 0.5
      if (iteration >= text.length) clearInterval(interval)
    }, 40)
  }, [text])

  return (
    <span
      className={className}
      onMouseEnter={shuffle}
      style={{ fontFamily: 'inherit' }}
    >
      {display}
    </span>
  )
}
