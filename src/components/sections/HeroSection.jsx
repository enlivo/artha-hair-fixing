import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { useModal } from '../../context/ModalContext'

const FALLBACK = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80'
const HERO_IMAGE = '/hero-poster.webp'

const headlineLines = [
  { text: 'Natural-',     color: '#1A2E22' },
  { text: 'looking',      color: '#1A2E22' },
  { text: 'hair patch',   color: '#2D6A4F' },
  { text: 'in Bangalore.', color: '#1A2E22' },
]

export default function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { openModal } = useModal()

  return (
    <section
      ref={ref}
      className="relative flex flex-col lg:flex-row overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* ───────── LEFT COLUMN ───────── */}
      <div
        className="relative flex flex-col justify-center lg:w-[45%] shrink-0"
        style={{
          background: '#F4FAF6',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Cg fill='none' stroke='%232D6A4F' stroke-width='1.5' stroke-opacity='0.1'%3E%3Cpath d='M0 300 Q150 150 300 300 Q450 450 600 300'/%3E%3Cpath d='M0 250 Q150 100 300 250 Q450 400 600 250'/%3E%3Cpath d='M0 350 Q150 200 300 350 Q450 500 600 350'/%3E%3Cpath d='M0 200 Q150 50 300 200 Q450 350 600 200'/%3E%3Cpath d='M0 400 Q150 250 300 400 Q450 550 600 400'/%3E%3Cpath d='M0 150 Q150 0 300 150 Q450 300 600 150'/%3E%3Cpath d='M0 450 Q150 300 300 450 Q450 600 600 450'/%3E%3Cpath d='M0 100 Q150 -50 300 100 Q450 250 600 100'/%3E%3Cpath d='M0 500 Q150 350 300 500 Q450 650 600 500'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100% 300px',
          backgroundRepeat: 'repeat-y',
          padding: 'clamp(80px, 10vh, 120px) clamp(24px, 5vw, 60px) clamp(48px, 6vh, 80px)',
        }}
      >
        {/* ARTHA watermark */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: '-10px',
            fontSize: '200px',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: 'rgba(45,106,79,0.04)',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          ARTHA
        </div>

        {/* Content — sits above the ARTHA watermark */}
        <div className="relative" style={{ zIndex: 1 }}>
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0 }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2 bg-white rounded-full border border-green-border font-semibold tracking-[0.15em]"
            style={{ color: '#2D6A4F', fontSize: '11px', padding: '8px 16px' }}
          >
            ✦ BANGALORE'S #1 HAIR FIXING STUDIO
          </span>
        </motion.div>

        {/* Headline — each line animates in */}
        <div className="mb-5">
          {headlineLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="block font-display font-bold"
                style={{
                  color: line.color,
                  fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                {line.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Gold italic subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="font-accent italic mb-6"
          style={{ color: '#C9A96E', fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)' }}
        >
          — non-surgical, undetectable, in just 2 hours.
        </motion.p>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="text-lg leading-relaxed mb-8"
          style={{ color: '#3D5244', maxWidth: '420px' }}
        >
          Regain your confidence with our expert non-surgical hair solutions.
          Walk in and walk out completely transformed.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-wrap items-center gap-4 mb-10"
        >
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.02, backgroundColor: '#235C43' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 font-medium rounded-full text-white text-base"
            style={{
              background: '#2D6A4F',
              padding: '14px 32px',
              transition: 'background-color 0.2s',
            }}
          >
            Book Free Consultation
          </motion.button>

          <motion.a
            href="/before-after"
            className="group inline-flex items-center gap-1.5 font-medium text-base"
            style={{ color: '#2D6A4F' }}
            whileHover={{ color: '#1A2E22' }}
            transition={{ duration: 0.15 }}
          >
            See Transformations
            <motion.span
              className="inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.05 }}
          className="flex flex-wrap items-center gap-2 text-sm"
          style={{ color: '#7A9485' }}
        >
          <span>★ 4.9 Google Rating</span>
          <span className="opacity-40">·</span>
          <span>4 Studios in Bangalore</span>
          <span className="opacity-40">·</span>
          <span>10+ Years</span>
        </motion.div>
        </div>{/* end content z-wrapper */}
      </div>

      {/* ───────── RIGHT COLUMN — full bleed image ───────── */}
      <div className="relative lg:w-[55%] overflow-hidden" style={{ minHeight: '60vw', maxHeight: '100svh' }}>
        <img
          src={HERO_IMAGE}
          alt="Man with hair loss viewed from behind — before visiting Artha Hair Fixing"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
          onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK }}
        />

        {/* Badge 1 — top right */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="absolute top-8 right-8 hidden lg:flex items-center gap-2.5 bg-white rounded-2xl shadow-lg"
          style={{ padding: '12px 16px', border: '1px solid #C5E8D4' }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="flex items-center gap-2.5"
          >
            <CheckCircle size={16} style={{ color: '#2D6A4F', flexShrink: 0 }} />
            <div>
              <p className="font-medium text-sm" style={{ color: '#1A2E22', lineHeight: 1.2 }}>4 Studios</p>
              <p style={{ color: '#7A9485', fontSize: '11px' }}>in Bangalore</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Badge 2 — bottom left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute bottom-8 left-8 hidden lg:block rounded-2xl shadow-lg"
          style={{ background: '#2D6A4F', padding: '16px 20px' }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, delay: 0.5, ease: 'easeInOut' }}
          >
            <p className="font-display font-bold text-white" style={{ fontSize: '1.75rem', lineHeight: 1 }}>2 Hours</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginTop: '4px' }}>Complete Transformation</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
