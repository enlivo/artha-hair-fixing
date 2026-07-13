import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, X } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import PageBanner from '../components/ui/PageBanner'
import ServiceCard from '../components/ui/ServiceCard'
import ProcessSection from '../components/sections/ProcessSection'
import CTABanner from '../components/sections/CTABanner'
import { services, faqs } from '../data/content'
import { useModal } from '../context/ModalContext'

const serviceGalleries = [
  {
    slug: 'hair-patch-service',
    title: 'Hair Patch Service',
    images: [
      { src: '/services/wig-07-base-type-01.webp', alt: 'Hair patch base type 1' },
      { src: '/services/wig-08-base-type-02.webp', alt: 'Hair patch base type 2' },
      { src: '/services/wig-09-base-type-03.webp', alt: 'Hair patch base type 3' },
      { src: '/services/wig-10-base-type-04.webp', alt: 'Hair patch base type 4' },
      { src: '/services/wig-11-base-type-05.webp', alt: 'Hair patch base type 5' },
      { src: '/services/wig-12-base-type-06.webp', alt: 'Hair patch base type 6' },
      { src: '/services/wig-13-base-type-07.webp', alt: 'Hair patch base type 7' },
    ],
  },
  {
    slug: 'hair-bonding',
    title: 'Hair Bonding',
    images: [
      { src: '/services/wig-03-lace-front-closeup.webp', alt: 'Lace front closeup detail' },
      { src: '/services/wig-09-base-type-03.webp', alt: 'Hair patch base type 3' },
    ],
  },
  {
    slug: 'hair-clipping',
    title: 'Hair Clipping',
    images: [
      { src: '/services/wig-02-back-view.webp', alt: 'Hair system back view' },
      { src: '/services/wig-10-base-type-04.webp', alt: 'Hair patch base type 4' },
    ],
  },
  {
    slug: 'ladies-hair-toppers',
    title: 'Ladies Hair Toppers',
    images: [
      { src: '/services/wig-04-cap-flat.webp', alt: 'Hair topper cap laid flat' },
    ],
  },
]

function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [image, onClose])

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
            className="relative max-w-3xl w-full"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: index * 0.06 }}
      className="border-b"
      style={{ borderColor: '#C5E8D4' }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-brand-dark text-sm leading-relaxed">{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 mt-0.5"
          style={{ color: open ? '#2D6A4F' : '#7A9485' }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-brand-body text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const { openModal } = useModal()
  const [lightboxImage, setLightboxImage] = useState(null)

  return (
    <PageTransition>

      {/* ── HERO BANNER ── */}
      <PageBanner
        breadcrumb="HOME | SERVICES"
        headingLine1="Everything You Need for"
        headingAccent="Hair Confidence"
        imageSrc="https://images.unsplash.com/photo-1595163153849-71a26fe04766?w=800&q=90"
        imageFallback="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
      />

      {/* ── SERVICE CARDS ── */}
      <section ref={ref} className="py-20 bg-white">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="section-eyebrow">What We Offer</span>
            <h2 className="section-heading mt-4">Signature Solutions</h2>
            <p className="text-brand-muted text-sm mt-3">Our most popular, most transformative services</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section className="py-20" style={{ background: '#EEF7F2' }}>
        <div className="container-xl">
          <div className="text-center max-w-lg mx-auto mb-14">
            <span className="section-eyebrow">Up Close</span>
            <h2 className="section-heading mt-3">Photo Gallery</h2>
          </div>
          <div className="flex flex-col gap-12">
            {serviceGalleries.map((gallery) => (
              <div key={gallery.slug}>
                <h3 className="font-display text-brand-dark text-xl font-bold mb-5">{gallery.title}</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {gallery.images.map((img) => (
                    <motion.button
                      key={img.src}
                      type="button"
                      onClick={() => setLightboxImage(img)}
                      whileHover={{ scale: 1.03 }}
                      aria-label={`View ${img.alt}`}
                      className="relative rounded-xl border border-green-border overflow-hidden group cursor-pointer bg-white"
                      style={{ aspectRatio: '4/3' }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />

      {/* ── COMPARISON: HAIR PATCH vs TRANSPLANT ── */}
      <section className="hair-pattern-white" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 60px)' }}>

          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{
              fontSize: '11px', letterSpacing: '0.15em',
              color: '#2D6A4F', textTransform: 'uppercase',
              background: '#EEF7F2', padding: '6px 16px',
              borderRadius: '20px', fontFamily: 'Inter, sans-serif',
              display: 'inline-block',
            }}>WHY NON-SURGICAL</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#1A2E22', marginTop: '16px', marginBottom: 0,
            }}>
              Hair Patch vs Hair Transplant
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {/* Hair Patch */}
            <div style={{
              background: '#EEF7F2', border: '2px solid #2D6A4F',
              borderRadius: '20px', padding: '32px',
            }}>
              <div style={{
                background: '#2D6A4F', color: 'white',
                borderRadius: '10px', padding: '8px 20px',
                display: 'inline-block', fontSize: '13px',
                fontWeight: 600, marginBottom: '24px',
                fontFamily: 'Inter, sans-serif',
              }}>✦ Hair Patch (Artha)</div>
              {[
                '✓ Results in 2 hours',
                '✓ Zero pain, zero surgery',
                '✓ No downtime or recovery',
                '✓ 100% natural hair look',
                '✓ Reversible anytime',
                '✓ Fraction of the cost',
                '✓ Works for all hair loss types',
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '10px 0', borderBottom: i < 6 ? '1px solid #C5E8D4' : 'none',
                  color: '#1A2E22', fontSize: '15px', fontFamily: 'Inter, sans-serif',
                }}>{item}</div>
              ))}
            </div>

            {/* Hair Transplant */}
            <div style={{
              background: '#FAFAFA', border: '1px solid #E5E5E5',
              borderRadius: '20px', padding: '32px',
            }}>
              <div style={{
                background: '#9A9A9A', color: 'white',
                borderRadius: '10px', padding: '8px 20px',
                display: 'inline-block', fontSize: '13px',
                fontWeight: 600, marginBottom: '24px',
                fontFamily: 'Inter, sans-serif',
              }}>Hair Transplant</div>
              {[
                '✗ Results take 6–12 months',
                '✗ Surgical procedure with pain',
                '✗ Weeks of recovery needed',
                '✗ Results vary by person',
                '✗ Permanent — no going back',
                '✗ Costs ₹1–5 Lakhs or more',
                '✗ Not suitable for all cases',
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '10px 0', borderBottom: i < 6 ? '1px solid #E5E5E5' : 'none',
                  color: '#7A9485', fontSize: '15px', fontFamily: 'Inter, sans-serif',
                }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <ProcessSection />

      {/* ── FAQ ── */}
      <section className="py-20 hair-pattern-gold">
        <div className="container-xl">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-eyebrow">Common Questions</span>
              <h2 className="section-heading mt-4">Have Questions?</h2>
            </div>
            <div>
              {faqs.slice(0, 5).map((faq, i) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
              ))}
            </div>
            <div className="text-center mt-10">
              <a href="/faq" className="btn-ghost text-sm">View All FAQs →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner />

    </PageTransition>
  )
}
