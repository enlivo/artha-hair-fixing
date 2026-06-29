import { useRef } from 'react'
import { useInView } from 'framer-motion'
import useCountUp from '../../hooks/useCountUp'

export default function CounterStat({ value, suffix, label, index = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const count = useCountUp(value, 2000, isInView)

  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-1">
      <div className="font-display text-4xl md:text-5xl font-bold text-green">
        {count}<span className="text-gold">{suffix}</span>
      </div>
      <p className="text-brand-muted text-xs uppercase tracking-widest font-medium">{label}</p>
    </div>
  )
}
