import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import App from './App.jsx'

const letters = ['A', 'R', 'T', 'H', 'A']

function LoadingScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
    >
      {/* Letters */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '3.5rem', color: '#1A2E22' }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Gold underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ width: '120px', height: '2px', background: 'linear-gradient(90deg, #2D6A4F, #C9A96E)', transformOrigin: 'left' }}
      />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.0 }}
        style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: '#2D6A4F', fontSize: '0.9rem', letterSpacing: '0.2em' }}
      >
        Hair Fixing Studio
      </motion.p>

      {/* Green progress bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, delay: 0.1, ease: 'linear' }}
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #2D6A4F, #C9A96E)', transformOrigin: 'left' }}
      />
    </motion.div>
  )
}

function Root() {
  const [loading, setLoading] = useState(true)
  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && <App />}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
