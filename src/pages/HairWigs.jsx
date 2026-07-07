import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import CTABanner from '../components/sections/CTABanner'

const images = [
  { id: 1, src: '/images/services/hair-wigs/wig-01-side-profile.jpg', alt: 'Hair wig — side profile' },
  { id: 2, src: '/images/services/hair-wigs/wig-02-back-view.jpg', alt: 'Hair wig — back view' },
  { id: 3, src: '/images/services/hair-wigs/wig-03-lace-front-closeup.jpg', alt: 'Hair wig — lace front closeup' },
  { id: 4, src: '/images/services/hair-wigs/wig-04-cap-flat.jpg', alt: 'Hair wig — cap, flat lay' },
  { id: 5, src: '/images/services/hair-wigs/wig-05-full-lace-topview.jpg', alt: 'Hair wig — full lace, top view' },
  { id: 6, src: '/images/services/hair-wigs/wig-06-hairline-detail.jpg', alt: 'Hair wig — hairline detail' },
  { id: 7, src: '/images/services/hair-wigs/wig-07-base-type-01.jpg', alt: 'Hair wig — base type 1' },
  { id: 8, src: '/images/services/hair-wigs/wig-08-base-type-02.jpg', alt: 'Hair wig — base type 2' },
  { id: 9, src: '/images/services/hair-wigs/wig-09-base-type-03.jpg', alt: 'Hair wig — base type 3' },
  { id: 10, src: '/images/services/hair-wigs/wig-10-base-type-04.jpg', alt: 'Hair wig — base type 4' },
  { id: 11, src: '/images/services/hair-wigs/wig-11-base-type-05.jpg', alt: 'Hair wig — base type 5' },
  { id: 12, src: '/images/services/hair-wigs/wig-12-base-type-06.jpg', alt: 'Hair wig — base type 6' },
  { id: 13, src: '/images/services/hair-wigs/wig-13-base-type-07.jpg', alt: 'Hair wig — base type 7' },
]

function Lightbox({ image, onClose, onPrev, onNext, hasPrev, hasNext }) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(26,46,34,0.92)', backdropFilter: 'blur(12px)' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full rounded-2xl"
              style={{ maxHeight: '80vh', objectFit: 'contain' }}
            />
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg text-brand-dark hover:bg-green-tint transition-colors"
            >
              <X size={18} />
            </button>
            {hasPrev && (
              <button
                onClick={onPrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg text-brand-dark hover:bg-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {hasNext && (
              <button
                onClick={onNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg text-brand-dark hover:bg-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function HairWigs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const activeImage = lightboxIndex !== null ? images[lightboxIndex] : null
  const handlePrev = () => setLightboxIndex((i) => (i > 0 ? i - 1 : i))
  const handleNext = () => setLightboxIndex((i) => (i < images.length - 1 ? i + 1 : i))

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #EEF7F2 0%, #ffffff 100%)' }}>
        <div className="container-xl">
          <span className="section-eyebrow">Our Services</span>
          <h1 className="section-heading mt-3">Hair Wigs</h1>
          <p className="text-brand-body text-lg leading-relaxed max-w-xl mt-5">
            Premium natural and synthetic wigs crafted for an undetectable, confident look for men and women.
          </p>
          <p className="text-brand-muted text-sm leading-relaxed max-w-xl mt-3">
            Custom-fitted to your scalp shape using 100% human hair. Available in all textures, lengths, and colors.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section ref={ref} className="py-20 bg-white">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-lg mx-auto mb-12"
          >
            <span className="section-eyebrow">Gallery</span>
            <h2 className="section-heading mt-3">See the Detail</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, i) => (
              <motion.button
                key={image.id}
                type="button"
                onClick={() => setLightboxIndex(i)}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                aria-label={`View ${image.alt}`}
                className="card-base shadow-sm overflow-hidden relative group cursor-pointer"
                style={{ aspectRatio: '1' }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/25 transition-colors duration-300 flex items-center justify-center">
                  <Expand size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        image={activeImage}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={lightboxIndex > 0}
        hasNext={lightboxIndex !== null && lightboxIndex < images.length - 1}
      />

      <CTABanner />
    </PageTransition>
  )
}
