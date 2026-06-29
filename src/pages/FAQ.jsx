import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import PageBanner from '../components/ui/PageBanner'
import CTABanner from '../components/sections/CTABanner'
import { faqs } from '../data/content'
import { useModal } from '../context/ModalContext'

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: (index % 5) * 0.06 }}
      className="border border-green-border rounded-2xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full text-left flex items-start justify-between gap-4 px-6 py-5"
      >
        <span className="font-semibold text-brand-dark text-sm leading-relaxed">{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 mt-0.5 text-green"
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-brand-body text-sm leading-relaxed border-t border-green-border pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))]

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeCategory, setActiveCategory] = useState('All')
  const { openModal } = useModal()

  const filtered = activeCategory === 'All' ? faqs : faqs.filter((f) => f.category === activeCategory)

  return (
    <PageTransition>
      <PageBanner
        breadcrumb="HOME | FAQ"
        headingLine1="Still Have"
        headingAccent="Questions?"
        subtext="Everything you need to know about hair patch, bonding & non-surgical hair restoration."
        imageSrc="/faq-hero.png"
        imageFallback="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=90"
        minHeight="360px"
        imageStyle={{
          objectFit: 'contain',
          objectPosition: 'center bottom',
          borderRadius: '12px',
          mixBlendMode: 'multiply',
        }}
      />

      {/* FAQ */}
      <section ref={ref} className="py-20 hair-pattern-gold">
        <div className="container-xl">
          {/* Category filter */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-green text-white'
                    : 'border border-green-border text-brand-muted hover:border-green hover:text-green'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 gap-3">
            <AnimatePresence>
              {filtered.map((faq, i) => (
                <FAQItem key={faq.question} {...faq} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center bg-green-tint rounded-3xl p-10 border border-green-border"
          >
            <h3 className="font-display text-brand-dark text-2xl font-bold mb-3">Still Have Questions?</h3>
            <p className="text-brand-body max-w-md mx-auto mb-6">
              Our specialists are happy to answer any question — big or small. Book a free, private consultation and get clarity.
            </p>
            <button onClick={openModal} className="btn-primary text-sm px-8 py-4">Talk to a Specialist</button>
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </PageTransition>
  )
}
