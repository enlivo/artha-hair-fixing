import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FALLBACK = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80'

const steps = [
  {
    num: '01',
    title: 'Free Consultation',
    description: 'Private one-on-one session to assess your hair loss pattern and discuss your goals. No commitment, just possibilities.',
    img: '/consultation-step.webp',
    alt: 'Hair specialist consulting with a client at Artha Hair Fixing Beauty',
  },
  {
    num: '02',
    title: 'Fitting & Installation',
    description: 'Your hair patch is custom-measured and fitted precisely to your scalp for a perfectly natural, undetectable result.',
    img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80',
    alt: 'Hair patch fitting and installation',
  },
  {
    num: '03',
    title: 'Hair Styling & Finish',
    description: 'Cut, styled, and blended to match your exact look. Our specialists craft every detail so the result is completely seamless.',
    img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80',
    alt: 'Hair styling after patch fitting',
  },
  {
    num: '04',
    title: 'Care & Maintenance',
    description: 'We guide you on after-care and schedule regular maintenance visits to keep your hair system looking perfect for months.',
    img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80',
    alt: 'Hair care and maintenance wash',
  },
]

export default function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24"
      style={{
        background: '#F4FAF6',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='600' viewBox='0 0 1000 600'%3E%3Cg fill='none' stroke='%232D6A4F' stroke-width='1.5' stroke-opacity='0.1'%3E%3Cpath d='M-100 300 Q150 100 400 300 Q650 500 900 300 Q1050 200 1100 250'/%3E%3Cpath d='M-100 250 Q150 50 400 250 Q650 450 900 250 Q1050 150 1100 200'/%3E%3Cpath d='M-100 350 Q150 150 400 350 Q650 550 900 350 Q1050 250 1100 300'/%3E%3Cpath d='M-100 200 Q150 0 400 200 Q650 400 900 200 Q1050 100 1100 150'/%3E%3Cpath d='M-100 400 Q150 200 400 400 Q650 600 900 400 Q1050 300 1100 350'/%3E%3Cpath d='M-100 150 Q150 -50 400 150 Q650 350 900 150 Q1050 50 1100 100'/%3E%3Cpath d='M-100 450 Q150 250 400 450 Q650 650 900 450 Q1050 350 1100 400'/%3E%3Cpath d='M-100 100 Q150 -100 400 100 Q650 300 900 100 Q1050 0 1100 50'/%3E%3Cpath d='M-100 500 Q150 300 400 500 Q650 700 900 500 Q1050 400 1100 450'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '100% auto',
        backgroundRepeat: 'repeat-y',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <span className="section-eyebrow">Our Process</span>
          <h2 className="section-heading mt-4">
            From Consultation<br />
            <span className="text-green">to Transformation</span>
          </h2>
          <p className="text-brand-body text-lg leading-relaxed mt-5">
            Simple, transparent, and comfortable every step of the way.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(45,106,79,0.12)' }}
              className="bg-white rounded-2xl overflow-hidden"
              style={{ border: '1px solid #E8D5A3' }}
            >
              {/* Image */}
              <div className="w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <motion.img
                  src={step.img}
                  alt={step.alt}
                  className="w-full h-full object-cover object-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  loading="lazy"
                  onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK }}
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: '#C9A96E' }}
                >
                  <span className="text-white font-bold text-xs">{step.num}</span>
                </div>
                <h3 className="font-semibold leading-snug" style={{ color: '#1A2E22', fontSize: '1.05rem' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#3D5244' }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
