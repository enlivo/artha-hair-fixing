import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import BeforeAfterSlider from '../ui/BeforeAfterSlider'
import { fadeUp, slideLeft, slideRight } from '../../utils/animations'

// Add more entries here as transformation-2-before.webp / transformation-2-after.webp
// etc. arrive — the section currently features transformations[0], so a rotating
// or multi-slider layout can be built on top of this array later without
// restructuring the data.
const transformations = [
  {
    id: 1,
    before: '/transformation-1-before-face.webp',
    after: '/transformation-1-after-face.webp',
    beforeAlt: 'Hair patch transformation at Artha Hair Fixing Beauty — before',
    afterAlt: 'Hair patch transformation at Artha Hair Fixing Beauty — after',
  },
]

export default function BeforeAfterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const featured = transformations[0]

  return (
    <section ref={ref} className="py-20 bg-white overflow-hidden">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <BeforeAfterSlider
              beforeImage={featured.before}
              afterImage={featured.after}
              beforeAlt={featured.beforeAlt}
              afterAlt={featured.afterAlt}
            />
            <p className="text-center text-brand-muted text-xs mt-4">Drag the slider to reveal the transformation</p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
          >
            <motion.span variants={fadeUp} className="section-eyebrow">Real Transformations</motion.span>
            <motion.h2 variants={fadeUp} className="section-heading">
              See What's Possible<br />
              <span className="text-green">for You</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-brand-body text-lg leading-relaxed">
              Every transformation you see is a real person who walked into Artha Hair Fixing Beauty and left with renewed confidence. Our non-surgical solutions are natural, undetectable, and last for months.
            </motion.p>

            <motion.ul variants={fadeUp} className="flex flex-col gap-3 mt-2">
              {[
                'Natural human hair — looks and feels real',
                'Completely undetectable in any lighting',
                'Swim, sweat, shower with confidence',
                'Customized to your exact hairline and density',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-body">
                  <span className="w-5 h-5 rounded-full bg-green-tint border border-green-border flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp}>
              <Link to="/before-after" className="inline-flex items-center gap-2 text-green font-semibold text-sm hover:gap-3 transition-all duration-200">
                View All Transformations <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
