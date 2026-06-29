import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ServiceCard from '../ui/ServiceCard'
import { services } from '../../data/content'

export default function ServicesPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container-xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-eyebrow">What We Do</span>
            <h2 className="section-heading mt-3">Our Services</h2>
          </div>
          <Link to="/services" className="inline-flex items-center gap-2 text-green font-semibold text-sm hover:gap-3 transition-all duration-200">
            View All Services <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service, i) => (
            <ServiceCard key={service.id} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
