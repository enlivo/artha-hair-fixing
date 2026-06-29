import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../../data/content'

function StarRow({ count = 5, size = 14 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} className="fill-gold text-gold" />
      ))}
    </div>
  )
}

function FeaturedTestimonial({ t, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="flex flex-col gap-6 pr-0 lg:pr-12"
    >
      {/* Giant decorative quote */}
      <div
        aria-hidden
        className="font-display text-brand-dark select-none leading-none"
        style={{ fontSize: 'clamp(80px, 14vw, 140px)', opacity: 0.06, lineHeight: 0.7, marginBottom: '-12px' }}
      >
        "
      </div>

      <StarRow count={t.rating} size={16} />

      <blockquote
        className="font-accent italic text-brand-dark leading-snug"
        style={{ fontSize: 'clamp(1.35rem, 2.8vw, 2rem)' }}
      >
        "{t.text}"
      </blockquote>

      <div className="flex items-center gap-4 pt-2 border-t border-green-border">
        <div className="w-11 h-11 rounded-full bg-green flex items-center justify-center text-white font-bold text-sm shrink-0">
          {t.initials}
        </div>
        <div>
          <p className="text-brand-dark font-semibold text-sm">{t.name}</p>
          <p className="text-brand-muted text-xs">{t.location}</p>
        </div>
        <span className="ml-auto bg-green-tint text-green text-xs font-medium px-3 py-1 rounded-full">{t.service}</span>
      </div>
    </motion.div>
  )
}

function SideTestimonial({ t, delay, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-2xl p-6 border border-green-border flex flex-col gap-4"
    >
      <StarRow count={t.rating} size={12} />
      <p className="font-accent italic text-brand-body text-base leading-relaxed">"{t.text}"</p>
      <div className="flex items-center gap-3 pt-3 border-t border-green-border">
        <div className="w-8 h-8 rounded-full bg-green-tint flex items-center justify-center text-green font-bold text-xs shrink-0">
          {t.initials}
        </div>
        <div>
          <p className="text-brand-dark text-xs font-semibold">{t.name}</p>
          <p className="text-brand-muted" style={{ fontSize: '10px' }}>{t.service}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [featured, setFeatured] = useState(0)

  const sideItems = testimonials.filter((_, i) => i !== featured)

  return (
    <section ref={ref} className="py-24 hair-pattern-gold">
      <div className="container-xl">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-6 mb-14"
        >
          <div>
            {/* Google rating badge */}
            <div className="inline-flex items-center gap-2 mb-4 bg-green-tint border border-green-border rounded-full px-4 py-2">
              <StarRow count={5} size={11} />
              <span className="text-brand-dark font-bold text-xs">4.9</span>
              <span className="text-brand-muted text-xs">rating on Google</span>
            </div>
            <div>
              <span className="section-eyebrow block">Testimonials</span>
              <h2 className="section-heading mt-3">
                Words from<br />
                <span className="text-green">Our Clients</span>
              </h2>
            </div>
          </div>

          {/* Desktop nav arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setFeatured((p) => (p === 0 ? testimonials.length - 1 : p - 1))}
              className="w-10 h-10 rounded-full border border-green-border flex items-center justify-center text-green hover:bg-green-tint transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setFeatured((p) => (p === testimonials.length - 1 ? 0 : p + 1))}
              className="w-10 h-10 rounded-full border border-green-border flex items-center justify-center text-green hover:bg-green-tint transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Editorial layout: 60/40 */}
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 lg:gap-14">
          {/* Featured */}
          <AnimatePresence mode="wait">
            <FeaturedTestimonial key={featured} t={testimonials[featured]} isInView={isInView} />
          </AnimatePresence>

          {/* Stacked side cards */}
          <div className="flex flex-col gap-5">
            {sideItems.map((t, i) => (
              <SideTestimonial key={t.name} t={t} delay={0.1 + i * 0.1} isInView={isInView} />
            ))}

            {/* Dot indicators */}
            <div className="flex gap-2 pt-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFeatured(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === featured ? 'bg-green w-6' : 'bg-green-border w-2'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
