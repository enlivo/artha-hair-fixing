import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin } from 'lucide-react'

// To swap in a real photo for a studio, just set `photo` to its image path
// (e.g. '/images/studios/rr-nagar.jpg') — the card below automatically
// switches from the icon fallback to a photo background when `photo` is set.
const studios = [
  { name: 'RR Nagar', photo: null },
  { name: 'Jayanagar', photo: null },
  { name: 'Konanakunte', photo: null },
  { name: 'Rajajinagar', photo: null },
]

function StudioCard({ studio, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(45,106,79,0.12)' }}
      className="relative rounded-2xl border border-green-border shadow-sm overflow-hidden transition-shadow duration-300 cursor-default"
      style={{ aspectRatio: '4/3' }}
    >
      {studio.photo ? (
        // Photo variant: image fills the card, name sits in a gradient caption at the bottom
        <>
          <img
            src={studio.photo}
            alt={`Artha Hair Fixing — ${studio.name} studio`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,46,34,0.75) 0%, transparent 55%)' }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-display text-white text-lg font-bold">{studio.name}</h3>
          </div>
        </>
      ) : (
        // Fallback variant: branded gradient card with pin icon + name
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center"
          style={{ background: 'linear-gradient(160deg, #EEF7F2 0%, #FBF8F0 100%)' }}
        >
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-green-border">
            <MapPin size={24} className="text-green" />
          </div>
          <h3 className="font-display text-brand-dark text-lg font-bold">{studio.name}</h3>
        </div>
      )}
    </motion.div>
  )
}

export default function StudiosSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg mx-auto mb-12"
        >
          <span className="section-eyebrow">Our Locations</span>
          <h2 className="section-heading mt-3">Our Studios</h2>
          <p className="text-brand-body text-sm mt-4">
            Visit our conveniently located studios across Bangalore for professional hair solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studios.map((studio, i) => (
            <StudioCard key={studio.name} studio={studio} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
