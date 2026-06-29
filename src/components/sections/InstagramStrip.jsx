import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { contactInfo } from '../../data/content'

function InstagramIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none"/>
    </svg>
  )
}

const FALLBACK = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80'

const posts = [
  { id: 1, src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80', alt: 'Hair wig transformation' },
  { id: 2, src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80', alt: 'Hair patch before and after' },
  { id: 3, src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80', alt: 'Hair restoration result' },
  { id: 4, src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80', alt: 'Hair patch fitting' },
  { id: 5, src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80', alt: 'Barber studio care' },
  { id: 6, src: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=400&q=80', alt: 'Hair system treatment' },
]

export default function InstagramStrip() {
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
          <span className="section-eyebrow">Social Media</span>
          <h2 className="section-heading mt-3">Follow Our Journey</h2>
          <a
            href={contactInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green font-medium text-sm mt-2 inline-block hover:underline"
          >
            @hairfixingartha
          </a>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {posts.map((post, i) => (
            <motion.a
              key={post.id}
              href={contactInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ scale: 1.04 }}
              className="relative overflow-hidden rounded-2xl group block"
              style={{ aspectRatio: '1', border: '1px solid #C5E8D4' }}
            >
              <img
                src={post.src}
                alt={post.alt}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK }}
              />
              <div className="absolute inset-0 bg-green/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <InstagramIcon size={22} color="white" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-10"
        >
          <a
            href={contactInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 btn-ghost text-sm"
          >
            <InstagramIcon size={15} color="#2D6A4F" /> Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}
