import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'
import { staggerContainer, fadeUp } from '../../utils/animations'
import { useModal } from '../../context/ModalContext'
import { contactInfo } from '../../data/content'

export default function CTABanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const { openModal } = useModal()

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        /* dot pattern layered ON TOP of the gradient — comma-separated */
        backgroundImage: [
          'radial-gradient(rgba(255,255,255,0.08) 1.5px, transparent 1.5px)',
          'linear-gradient(135deg, #2D6A4F 0%, #1A2E22 100%)',
        ].join(', '),
        backgroundSize: '22px 22px, cover',
        backgroundRepeat: 'repeat, no-repeat',
        backgroundPosition: '0 0, center',
        padding: '100px 0',
        textAlign: 'center',
      }}
    >
      {/* Gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(201,169,110,0.14) 0%, transparent 65%)' }}
      />

      {/* Gold top accent line */}
      <div
        className="absolute top-0 left-1/4 right-1/4 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
      />

      {/* ARTHA watermark */}
      <div
        className="absolute select-none pointer-events-none hidden lg:block"
        aria-hidden
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: '240px',
          lineHeight: 1,
          color: 'rgba(255,255,255,0.025)',
          right: '-40px',
          bottom: '-40px',
          letterSpacing: '-0.04em',
          userSelect: 'none',
        }}
      >
        ARTHA
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="container-xl relative z-10 max-w-2xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.span
          variants={fadeUp}
          style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#C9A96E',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '16px',
            display: 'block',
            fontWeight: 600,
          }}
        >
          Take the First Step
        </motion.span>

        {/* Heading */}
        <motion.h2 variants={fadeUp} style={{ margin: '0 0 8px' }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
            display: 'block',
          }}>
            Ready to
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 600,
            color: '#C9A96E',
            lineHeight: 1.1,
            display: 'block',
          }}>
            Transform?
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: '1.1rem',
            fontFamily: 'Inter, sans-serif',
            maxWidth: '520px',
            margin: '20px auto 40px',
            lineHeight: 1.7,
          }}
        >
          Book your free private consultation today. No commitment, no pressure
          — just a conversation about what's possible for you.
        </motion.p>

        {/* Buttons */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(201,169,110,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: '#C9A96E',
              color: '#1A2E22',
              border: 'none',
              borderRadius: '50px',
              padding: '16px 36px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Book Free Consultation <ArrowRight size={16} />
          </motion.button>

          <motion.a
            href={`tel:${contactInfo.phone}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'transparent',
              color: '#FFFFFF',
              border: '1.5px solid rgba(255,255,255,0.4)',
              borderRadius: '50px',
              padding: '16px 36px',
              fontSize: '15px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
            }}
          >
            <Phone size={15} /> Call Us Now
          </motion.a>
        </motion.div>

        {/* Trust tagline */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-xs font-medium"
          style={{ color: 'rgba(168,189,180,0.55)', letterSpacing: '0.1em' }}
        >
          Free · Private · No Obligation · Same-Day Appointments Available
        </motion.p>
      </motion.div>
    </section>
  )
}
