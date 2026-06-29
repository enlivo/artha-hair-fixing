import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { contactInfo } from '../../data/content'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)
  const url = `https://wa.me/${contactInfo.whatsapp}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.9 }}
            className="bg-white text-brand-dark text-xs font-medium px-4 py-2 rounded-full border border-green-border shadow-lg whitespace-nowrap"
          >
            Chat on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping" style={{ animationDuration: '2s' }} />
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={{ y: [0, -7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          whileHover={{ scale: 1.1 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
          style={{ background: '#25D366' }}
        >
          <MessageCircle size={26} color="white" fill="white" />
        </motion.a>
      </div>
    </div>
  )
}
