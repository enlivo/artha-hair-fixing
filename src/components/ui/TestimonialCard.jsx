import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function TestimonialCard({ name, location, rating, text, service, initials }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(45,106,79,0.1)' }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-green-border rounded-2xl p-7 flex flex-col gap-5 min-w-[320px] max-w-[400px] select-none"
    >
      {/* Decorative quote */}
      <span className="font-display text-5xl text-green leading-none opacity-25 -mb-3">"</span>

      <p className="font-accent italic text-brand-body text-lg leading-relaxed">{text}</p>

      <div className="flex gap-1 mt-auto">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-gold text-gold" />
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-green-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-tint flex items-center justify-center text-green font-bold text-sm">
            {initials}
          </div>
          <div>
            <p className="text-brand-dark font-semibold text-sm">{name}</p>
            <p className="text-brand-muted text-xs">{location}</p>
          </div>
        </div>
        <span className="bg-green-tint text-green text-xs font-medium px-3 py-1 rounded-full">{service}</span>
      </div>
    </motion.div>
  )
}
