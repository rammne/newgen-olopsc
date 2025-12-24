import {motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import type {ReactNode} from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  duration?: number
  distance?: number
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.8,
  distance = 60,
}: ScrollRevealProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const getInitialProps = () => {
    if (prefersReducedMotion) {
      return {opacity: 1, y: 0, x: 0}
    }

    switch (direction) {
      case 'up':
        return {opacity: 0, y: distance}
      case 'down':
        return {opacity: 0, y: -distance}
      case 'left':
        return {opacity: 0, x: distance}
      case 'right':
        return {opacity: 0, x: -distance}
      case 'fade':
        return {opacity: 0}
      default:
        return {opacity: 0, y: distance}
    }
  }

  const getAnimateProps = () => {
    if (prefersReducedMotion) {
      return {opacity: 1, y: 0, x: 0}
    }

    return {opacity: 1, y: 0, x: 0}
  }

  return (
    <motion.div
      initial={getInitialProps()}
      whileInView={getAnimateProps()}
      viewport={{once: true, margin: '0px 0px -20% 0px'}}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

