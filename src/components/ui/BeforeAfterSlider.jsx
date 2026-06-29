import { useState, useRef, useCallback } from 'react'

export default function BeforeAfterSlider({ beforeLabel = 'BEFORE', afterLabel = 'AFTER' }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const update = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPosition(Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98))
  }, [])

  const onMouseDown = (e) => {
    dragging.current = true
    update(e.clientX)
    const move = (e) => { if (dragging.current) update(e.clientX) }
    const up = () => { dragging.current = false; window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  const onTouchStart = (e) => {
    dragging.current = true
    update(e.touches[0].clientX)
    const move = (e) => { if (dragging.current) update(e.touches[0].clientX) }
    const end = () => { dragging.current = false; window.removeEventListener('touchmove', move); window.removeEventListener('touchend', end) }
    window.addEventListener('touchmove', move, { passive: true })
    window.addEventListener('touchend', end)
  }

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className="relative w-full rounded-2xl overflow-hidden select-none cursor-ew-resize"
      style={{ aspectRatio: '4/3', border: '1px solid #C5E8D4' }}
    >
      {/* AFTER — base layer */}
      <div className="absolute inset-0 bg-green-tint flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-full bg-green-border flex items-center justify-center">
          <svg viewBox="0 0 40 40" width="36" height="36">
            <circle cx="20" cy="14" r="8" fill="#2D6A4F" opacity="0.6"/>
            <ellipse cx="20" cy="34" rx="14" ry="8" fill="#2D6A4F" opacity="0.3"/>
            <path d="M12 10 Q14 4 20 4 Q26 4 28 10" stroke="#2D6A4F" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="text-green font-semibold text-sm">Full Restoration</p>
          <p className="text-brand-muted text-xs mt-1">Natural · Undetectable · Confident</p>
        </div>
      </div>

      {/* BEFORE — clipped */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <div className="absolute inset-0 bg-gold-tint flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gold-border flex items-center justify-center">
            <svg viewBox="0 0 40 40" width="36" height="36">
              <circle cx="20" cy="14" r="8" fill="#C9A96E" opacity="0.4"/>
              <ellipse cx="20" cy="34" rx="14" ry="8" fill="#C9A96E" opacity="0.2"/>
              <path d="M16 10 Q18 6 20 6" stroke="#C9A96E" strokeWidth="1.5" fill="none" opacity="0.7"/>
              <path d="M24 10 Q22 6 20 6" stroke="#C9A96E" strokeWidth="1.5" fill="none" opacity="0.5"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-gold font-semibold text-sm">Hair Thinning</p>
            <p className="text-brand-muted text-xs mt-1">Patchy · Thinning · Loss of confidence</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-green z-10 pointer-events-none" style={{ left: `${position}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-green shadow-lg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 8H1M1 8L2.5 6M1 8L2.5 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H15M15 8L13.5 6M15 8L13.5 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 z-20 bg-white/90 text-brand-dark text-xs font-bold tracking-widest px-3 py-1 rounded-full backdrop-blur-sm border border-green-border">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 z-20 bg-green/90 text-white text-xs font-bold tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
        {afterLabel}
      </span>
    </div>
  )
}
