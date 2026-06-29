import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import GalleryItem from '../components/ui/GalleryItem'

const CATEGORIES = ['All', 'Men', 'Women', 'Before & After']

const FALLBACK = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80'

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80', alt: 'Hair Patch Transformation', category: 'Men' },
  { id: 2, src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', alt: 'Natural Hair Wig Result', category: 'Women' },
  { id: 3, src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', alt: 'Before and After Hair Patch', category: 'Before & After' },
  { id: 4, src: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80', alt: 'Hair Consultation', category: 'Men' },
  { id: 5, src: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=600&q=80', alt: 'Hair Extension Treatment', category: 'Women' },
  { id: 6, src: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=80', alt: 'Full Hair Restoration', category: 'Before & After' },
  { id: 7, src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80', alt: 'Hair Patch Men', category: 'Men' },
  { id: 8, src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80', alt: 'Hair Care and Maintenance', category: 'Women' },
  { id: 9, src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80', alt: 'Non-surgical Hair Replacement', category: 'Before & After' },
  { id: 10, src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', alt: 'Men Hair System Result', category: 'Men' },
  { id: 11, src: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=600&q=80', alt: 'Women Hair Wig Styling', category: 'Women' },
  { id: 12, src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', alt: 'Complete Hair Transformation', category: 'Before & After' }
]

function Lightbox({ image, onClose, onPrev, onNext }) {
  if (!image) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{ position: 'relative', maxWidth: '56rem', width: '100%' }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={image.src}
            alt={image.alt}
            style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '1rem' }}
            onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK }}
          />
          <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(201,169,110,0.9)', color: '#0A0A0A', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', padding: '4px 12px', borderRadius: '9999px', textTransform: 'uppercase' }}>
            {image.category}
          </span>
          {[
            { style: { top: '1rem', right: '1rem' }, onClick: onClose, icon: <X size={18} /> },
            { style: { left: '1rem', top: '50%', transform: 'translateY(-50%)' }, onClick: onPrev, icon: <ChevronLeft size={20} /> },
            { style: { right: '1rem', top: '50%', transform: 'translateY(-50%)' }, onClick: onNext, icon: <ChevronRight size={20} /> }
          ].map((btn, i) => (
            <button
              key={i}
              onClick={btn.onClick}
              style={{
                position: 'absolute', ...btn.style,
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'rgba(10,10,10,0.8)', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#F5F0E8', transition: 'background 0.2s'
              }}
            >
              {btn.icon}
            </button>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All')
  const [lightboxImage, setLightboxImage] = useState(null)
  const counterRef = useRef(null)
  const isInView = useInView(counterRef, { once: true })

  const filtered = activeTab === 'All' ? galleryImages : galleryImages.filter((img) => img.category === activeTab)
  const currentIndex = lightboxImage ? filtered.findIndex((img) => img.id === lightboxImage.id) : -1
  const handlePrev = () => { if (currentIndex > 0) setLightboxImage(filtered[currentIndex - 1]) }
  const handleNext = () => { if (currentIndex < filtered.length - 1) setLightboxImage(filtered[currentIndex + 1]) }

  return (
    <PageTransition>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '280px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: 'radial-gradient(ellipse at center, #1A0E05 0%, #0A0A0A 80%)' }}>
        <div className="section-container" style={{ position: 'relative', zIndex: 1, paddingBottom: '3rem', paddingTop: '5rem' }}>
          <p style={{ color: '#C9A96E', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.75rem' }}>Our Work</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '1.5rem' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 7vw, 4rem)', fontWeight: 700, color: '#F5F0E8' }}>
              Our Transformations
            </h1>
            <div ref={counterRef}>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6 }}
                style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: '#C9A96E' }}
              >
                1000+ Lives Changed
              </motion.span>
            </div>
          </div>
          <div style={{ width: '5rem', height: '2px', background: '#C9A96E', marginTop: '1rem' }} />
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ background: '#111111', padding: '2.5rem 0', borderBottom: '1px solid #1F1F1F' }}>
        <div className="section-container">
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  position: 'relative', padding: '8px 20px', borderRadius: '9999px',
                  border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500,
                  background: 'transparent', transition: 'color 0.2s',
                  color: activeTab === cat ? '#0A0A0A' : '#9A9A9A',
                  zIndex: 1
                }}
              >
                {activeTab === cat && (
                  <motion.div
                    layoutId="tab-indicator"
                    style={{ position: 'absolute', inset: 0, background: '#C9A96E', borderRadius: '9999px', zIndex: -1 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section style={{ background: '#0A0A0A', padding: '3rem 0' }}>
        <div className="section-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ columns: '3 280px', gap: '16px' }}
            >
              {filtered.map((img, i) => (
                <GalleryItem
                  key={img.id}
                  src={img.src}
                  alt={img.alt}
                  category={img.category}
                  index={i}
                  onSelect={setLightboxImage}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </PageTransition>
  )
}
