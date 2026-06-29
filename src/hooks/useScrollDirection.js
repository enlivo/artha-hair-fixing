import { useState, useEffect } from 'react'

export default function useScrollDirection() {
  const [direction, setDirection] = useState('up')
  const [prevY, setPrevY] = useState(0)

  useEffect(() => {
    const threshold = 10
    const onScroll = () => {
      const currentY = window.scrollY
      if (Math.abs(currentY - prevY) < threshold) return
      setDirection(currentY > prevY ? 'down' : 'up')
      setPrevY(currentY)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [prevY])

  return direction
}
