import { useRef } from 'react'
import { useInView } from 'framer-motion'
import useCountUp from '../../hooks/useCountUp'
import { stats } from '../../data/content'

function BigStat({ value, suffix, label, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const count = useCountUp(value, 2000, isInView)

  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-2 relative z-10">
      <div
        className="font-display font-bold text-brand-dark"
        style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1, letterSpacing: '-0.03em' }}
      >
        {count}
        <span style={{ color: '#C9A96E' }}>{suffix}</span>
      </div>
      <p
        className="text-brand-muted font-medium uppercase"
        style={{ fontSize: '11px', letterSpacing: '0.2em' }}
      >
        {label}
      </p>
    </div>
  )
}

export default function StatsBar() {
  return (
    <section
      className="relative overflow-hidden border-y border-green-border"
      style={{
        background: '#FBF8F0',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='200' viewBox='0 0 800 200'%3E%3Cg fill='none' stroke='%23C9A96E' stroke-width='1.5' stroke-opacity='0.15'%3E%3Cpath d='M0 100 Q200 30 400 100 Q600 170 800 100'/%3E%3Cpath d='M0 70 Q200 0 400 70 Q600 140 800 70'/%3E%3Cpath d='M0 130 Q200 60 400 130 Q600 200 800 130'/%3E%3Cpath d='M0 40 Q200 -30 400 40 Q600 110 800 40'/%3E%3Cpath d='M0 160 Q200 90 400 160 Q600 230 800 160'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Gold threading line */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #C9A96E 20%, #C9A96E 80%, transparent 100%)',
          opacity: 0.3,
        }}
      />

      <div className="container-xl py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4">
          {stats.map((stat, i) => (
            <BigStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
