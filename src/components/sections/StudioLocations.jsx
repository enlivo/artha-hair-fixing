import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin } from 'lucide-react'

// Builds a Google Maps search URL for the business's Google Business Profile
// name ("Artha Hair Fixing Beauty") plus the given area, e.g. for Jayanagar:
// https://www.google.com/maps/search/?api=1&query=Artha%20Hair%20Fixing%20Beauty%20Jayanagar%20Bangalore
const buildMapsUrl = (area) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Artha Hair Fixing Beauty ${area} Bangalore`)}`

// No-API-key embeddable mini-preview for the card's map region.
const buildMapsEmbedUrl = (area) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(`Artha Hair Fixing Beauty ${area} Bangalore`)}&z=15&output=embed`

// To swap in a real photo for a studio, just set `photo` to its image path
// (e.g. '/images/studios/rr-nagar.jpg') — the card below automatically
// switches from the map+icon fallback to a photo background when `photo` is set.
// `mapsUrl` / `mapsEmbedUrl` can be swapped per-branch to exact Google share-links later.
const studios = [
  { name: 'RR Nagar', photo: null, mapsUrl: buildMapsUrl('RR Nagar'), mapsEmbedUrl: buildMapsEmbedUrl('RR Nagar') },
  { name: 'Jayanagar', photo: null, mapsUrl: buildMapsUrl('Jayanagar'), mapsEmbedUrl: buildMapsEmbedUrl('Jayanagar') },
  { name: 'Konanakunte', photo: null, mapsUrl: buildMapsUrl('Konanakunte'), mapsEmbedUrl: buildMapsEmbedUrl('Konanakunte') },
  { name: 'Rajajinagar', photo: null, mapsUrl: buildMapsUrl('Rajajinagar'), mapsEmbedUrl: buildMapsEmbedUrl('Rajajinagar') },
  { name: 'Whitefield', photo: null, mapsUrl: buildMapsUrl('Whitefield'), mapsEmbedUrl: buildMapsEmbedUrl('Whitefield') },
]

function StudioCard({ studio, index, isInView }) {
  return (
    <motion.a
      href={studio.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${studio.name} studio location in Google Maps`}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(45,106,79,0.12)' }}
      className="relative rounded-2xl border border-green-border shadow-sm overflow-hidden transition-shadow duration-300 cursor-pointer flex flex-col"
      style={{ aspectRatio: '4/3' }}
    >
      {studio.photo ? (
        // Photo variant: image fills the card, name sits in a gradient caption at the bottom
        <>
          <img
            src={studio.photo}
            alt={`Artha Hair Fixing Beauty — ${studio.name} studio`}
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
        // Fallback variant: map mini-preview on top, pin icon + name below
        <>
          <div className="relative" style={{ flex: '0 0 60%' }}>
            <iframe
              src={studio.mapsEmbedUrl}
              title={`${studio.name} studio map`}
              loading="lazy"
              frameBorder="0"
              tabIndex={-1}
              className="absolute inset-0 w-full h-full"
            />
            {/* Transparent click-shield: keeps the map from intercepting drag/scroll/
                click, so the whole card still behaves as one link to Google Maps. */}
            <div className="absolute inset-0 z-10" aria-hidden="true" />
          </div>
          <div
            className="relative flex flex-1 flex-col items-center justify-center gap-1.5 p-2 text-center"
            style={{ background: 'linear-gradient(160deg, #EEF7F2 0%, #FBF8F0 100%)' }}
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-green-border">
              <MapPin size={16} className="text-green" />
            </div>
            <h3 className="font-display text-brand-dark text-sm font-bold">{studio.name}</h3>
          </div>
        </>
      )}
    </motion.a>
  )
}

export default function StudioLocations({
  eyebrow = 'Our Locations',
  heading = 'Our Studios',
  subtext = 'Visit our conveniently located studios across Bangalore for professional hair solutions',
  sectionClassName = 'py-20 bg-white',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className={sectionClassName}>
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg mx-auto mb-12"
        >
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 className="section-heading mt-3">{heading}</h2>
          <p className="text-brand-body text-sm mt-4">
            {subtext}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {studios.map((studio, i) => (
            <StudioCard key={studio.name} studio={studio} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
