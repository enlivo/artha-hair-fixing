import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FALLBACK = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80'

const cards = [
  {
    title: 'Swim',
    description: 'Feel confident in the water with a secure, natural-looking hair system.',
    img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80',
    alt: 'Person swimming confidently',
  },
  {
    title: 'Shower',
    description: 'Shampoo, rinse and go. No extra care or restrictions needed.',
    img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80',
    alt: 'Man in shower with hair system',
  },
  {
    title: 'Exercise',
    description: 'Stay active with a system designed to move and breathe with you.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    alt: 'Man exercising at the gym',
  },
  {
    title: 'Sleep',
    description: 'Sleep comfortably without any irritation or movement.',
    img: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=400&q=80',
    alt: 'Man sleeping comfortably',
  },
]

export default function FreedomSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-24 hair-pattern-green">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="section-eyebrow">Freedom to Live</span>
          <h2
            className="font-display font-bold text-brand-dark mt-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            Live Freely. Look Naturally.
          </h2>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: '#3D5244' }}>
            The Artha Hair System gives you the freedom to live confidently
            with a natural look and feel, just like your real hair.
          </p>
        </motion.div>

        {/* 2×2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -3, borderColor: '#2D6A4F', boxShadow: '0 8px 28px rgba(45,106,79,0.12)' }}
              className="flex flex-row items-center bg-white rounded-2xl shadow-sm p-5"
              style={{
                border: '1px solid #E8D5A3',
                transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
              }}
            >
              {/* Image */}
              <img
                src={card.img}
                alt={card.alt}
                className="rounded-xl object-cover flex-shrink-0"
                style={{ width: '160px', height: '120px', objectFit: 'cover', objectPosition: 'center' }}
                loading="lazy"
                onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK }}
              />

              {/* Text */}
              <div className="pl-5">
                <h3
                  className="font-display font-semibold"
                  style={{ color: '#1A2E22', fontSize: '1.15rem' }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed mt-1" style={{ color: '#3D5244' }}>
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
