import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden"
          style={{ background: '#2D6A4F', zIndex: 60, position: 'relative' }}
        >
          <div className="container-xl py-2.5 flex items-center justify-between gap-4">
            <div className="flex-1 text-center">
              <p className="text-white text-xs sm:text-sm font-medium">
                ✦ Walk in today — Hair transformation in just 2 hours.{' '}
                <span className="font-semibold underline underline-offset-2 cursor-pointer">Book your FREE consultation now!</span>
              </p>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="shrink-0 text-white/70 hover:text-white transition-colors p-1 rounded"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
