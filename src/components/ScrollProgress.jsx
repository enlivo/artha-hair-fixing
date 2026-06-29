import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-[9999] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #2D6A4F, #C9A96E)',
        transformOrigin: 'left'
      }}
    />
  )
}
