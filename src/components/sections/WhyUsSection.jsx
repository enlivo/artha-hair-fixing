import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  CheckCircle, Layers, ShieldCheck, Sparkles, Clock, HeartHandshake,
  Leaf, FlaskConical, BadgeCheck, Heart, Stethoscope,
} from 'lucide-react'
import { fadeUp, staggerContainer } from '../../utils/animations'
import { whyUs } from '../../data/content'

const ICONS = {
  CheckCircle, Layers, ShieldCheck, Sparkles, Clock, HeartHandshake,
  Leaf, FlaskConical, BadgeCheck, Heart, Stethoscope,
}

function WideCard({ item, delay = 0, isInView }) {
  const Icon = ICONS[item.icon] || CheckCircle
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(45,106,79,0.09)' }}
      className="bg-white rounded-2xl p-8 flex gap-6 items-start border border-green-border lg:col-span-2 transition-shadow duration-300"
    >
      <div className="shrink-0 w-14 h-14 rounded-2xl bg-green-tint flex items-center justify-center">
        <Icon size={26} className="text-green" />
      </div>
      <div>
        <h3 className="font-display text-xl font-bold text-brand-dark mb-2">{item.title}</h3>
        <p className="text-brand-body text-sm leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  )
}

function NormalCard({ item, delay = 0, isInView }) {
  const Icon = ICONS[item.icon] || CheckCircle
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(45,106,79,0.09)' }}
      className="bg-white rounded-2xl p-7 flex flex-col gap-4 border border-green-border lg:col-span-1 transition-shadow duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-green-tint flex items-center justify-center">
        <Icon size={22} className="text-green" />
      </div>
      <div>
        <h3 className="font-semibold text-brand-dark text-base mb-1.5">{item.title}</h3>
        <p className="text-brand-muted text-sm leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  )
}

export default function WhyUsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-24 hair-pattern-green">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="section-eyebrow">Why Choose Artha</span>
          <h2 className="section-heading mt-4 max-w-lg">
            The Artha<br /><span className="text-green italic font-accent" style={{ fontWeight: 400 }}>Difference</span>
          </h2>
        </motion.div>

        {/* Editorial asymmetric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Row 1: wide + normal */}
          <WideCard item={whyUs[0]} delay={0.05} isInView={isInView} />
          <NormalCard item={whyUs[1]} delay={0.12} isInView={isInView} />

          {/* Row 2: normal + wide */}
          <NormalCard item={whyUs[2]} delay={0.18} isInView={isInView} />
          <WideCard item={whyUs[3]} delay={0.24} isInView={isInView} />

          {/* Row 3: three equal */}
          {[whyUs[4], whyUs[5], whyUs[6]].filter(Boolean).map((item, i) => (
            <NormalCard key={item.title} item={item} delay={0.3 + i * 0.07} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
