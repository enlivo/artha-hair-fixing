import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Layers, Shield, RefreshCw, Wind, Heart, Star, Zap, Paperclip, GitMerge, Crown, ArrowRight } from 'lucide-react'
import { useModal } from '../../context/ModalContext'

const ICONS = { Sparkles, Layers, Shield, RefreshCw, Wind, Heart, Star, Zap, Paperclip, GitMerge, Crown }

export default function ServiceCard({ title, description, detail, icon, href, photo, photoAlt, index = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const { openModal } = useModal()
  const navigate = useNavigate()
  const Icon = ICONS[icon] || Sparkles
  const detailHref = href || null

  const handleCardClick = () => { if (detailHref) navigate(detailHref) }
  const handleArrowClick = (e) => {
    e.stopPropagation()
    if (detailHref) navigate(detailHref)
    else openModal()
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleCardClick}
      className={`bg-white rounded-2xl flex flex-col relative overflow-hidden ${detailHref ? 'cursor-pointer' : 'cursor-default'}`}
      style={{
        border: '1px solid #C5E8D4',
        borderLeft: hovered ? '3px solid #C9A96E' : '1px solid #C5E8D4',
        boxShadow: hovered ? '0 20px 50px rgba(45,106,79,0.10)' : '0 1px 4px rgba(45,106,79,0.04)',
        transition: 'border 0.25s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Photo */}
      {photo && (
        <div className="w-full" style={{ aspectRatio: '4/3' }}>
          <img
            src={photo}
            alt={photoAlt || title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-7 flex flex-col gap-5 flex-1">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300"
          style={{ background: hovered ? '#2D6A4F' : '#EEF7F2' }}
        >
          <Icon size={20} style={{ color: hovered ? '#ffffff' : '#2D6A4F', transition: 'color 0.3s' }} />
        </div>

        <div>
          <h3 className="font-display text-xl font-bold text-brand-dark mb-2">{title}</h3>
          <p className="text-brand-body text-sm leading-relaxed">{description}</p>
        </div>

        {detail && (
          <p className="text-brand-muted text-xs leading-relaxed border-t border-green-border pt-4">{detail}</p>
        )}

        {/* Arrow circle CTA */}
        <div className="mt-auto flex justify-end">
          <motion.button
            onClick={handleArrowClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-250"
            style={{
              background: hovered ? '#2D6A4F' : '#EEF7F2',
              border: hovered ? '1px solid #2D6A4F' : '1px solid #C5E8D4',
            }}
            aria-label={detailHref ? `View ${title} details` : 'Book consultation'}
          >
            <ArrowRight size={15} style={{ color: hovered ? '#ffffff' : '#2D6A4F' }} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
