import { motion } from 'framer-motion'

export default function GalleryItem({ src, alt, category, index = 0, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      className="relative overflow-hidden rounded-2xl cursor-pointer group mb-4"
      onClick={() => onSelect?.({ src, alt, category })}
    >
      <img
        src={src}
        alt={alt}
        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80' }}
      />
      <div className="absolute inset-0 bg-green/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="2" width="28" height="28" rx="7" stroke="white" strokeWidth="2"/>
          <circle cx="16" cy="16" r="5" stroke="white" strokeWidth="2"/>
          <circle cx="23" cy="9" r="1.5" fill="white"/>
        </svg>
        <span className="text-white text-xs font-semibold tracking-widest uppercase">{category}</span>
      </div>
    </motion.div>
  )
}
