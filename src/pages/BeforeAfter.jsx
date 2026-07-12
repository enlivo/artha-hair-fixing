import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider'
import CTABanner from '../components/sections/CTABanner'

const cases = [
  {
    label: 'Male Pattern Baldness — Stage IV', sub: 'Non-surgical hair patch, human hair', span: 2,
    beforeImage: '/images/before-after/malepatternbaldness-before.jpg',
    afterImage: '/images/before-after/malepatternbaldness-after.jpg',
  },
  {
    label: 'Frontal Baldness', sub: 'Non-surgical hair patch, human hair',
    beforeImage: '/transformation-2-before.webp',
    afterImage: '/transformation-2-after.webp',
    beforeAlt: 'Hair patch transformation at Artha Hair Fixing — before',
    afterAlt: 'Hair patch transformation at Artha Hair Fixing — after',
  },
  {
    label: 'Receding Hairline', sub: 'Non-surgical hair patch, human hair',
    beforeImage: '/transformation-3-before.webp',
    afterImage: '/transformation-3-after.webp',
    beforeAlt: 'Hair patch transformation at Artha Hair Fixing — before',
    afterAlt: 'Hair patch transformation at Artha Hair Fixing — after',
  },
  {
    label: 'Frontal Hair Loss', sub: 'Non-surgical hair patch, human hair',
    beforeImage: '/transformation-4-before.webp',
    afterImage: '/transformation-4-after.webp',
    beforeAlt: 'Hair patch transformation at Artha Hair Fixing — before',
    afterAlt: 'Hair patch transformation at Artha Hair Fixing — after',
  },
  {
    label: 'Age-Related Thinning', sub: 'Non-surgical hair patch, human hair',
    beforeImage: '/transformation-5-before.webp',
    afterImage: '/transformation-5-after.webp',
    beforeAlt: 'Hair patch transformation at Artha Hair Fixing — before',
    afterAlt: 'Hair patch transformation at Artha Hair Fixing — after',
  },
]

export default function BeforeAfter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #EEF7F2 0%, #ffffff 100%)' }}>
        <div className="container-xl">
          <span className="section-eyebrow">Real Transformations</span>
          <h1 className="section-heading mt-3">Before & After</h1>
          <p className="text-brand-body text-lg leading-relaxed max-w-xl mt-5">
            Real clients, real results. Drag the sliders below to see the transformations — every single one happened right here in Bangalore.
          </p>
        </div>
      </section>

      {/* Featured slider */}
      <section ref={ref} className="py-20 bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
              <BeforeAfterSlider
                beforeLabel="BEFORE"
                afterLabel="AFTER"
                beforeImage="/images/before-after/malepatternbaldness-before.jpg"
                afterImage="/images/before-after/malepatternbaldness-after.jpg"
              />
              <p className="text-center text-brand-muted text-xs mt-4">Drag slider to reveal</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="flex flex-col gap-6">
              <span className="section-eyebrow">Featured Case</span>
              <h2 className="font-display text-brand-dark text-3xl font-bold">Complete Hair Restoration in 3 Hours</h2>
              <p className="text-brand-body leading-relaxed">
                This client came in with stage IV male pattern baldness and left the same day with a full head of natural-looking hair using our premium hair patch system.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Duration', value: '3 hrs' },
                  { label: 'Method', value: 'Hair Patch' },
                  { label: 'Hair Type', value: 'Indian Human Hair' },
                  { label: 'Maintenance', value: 'Monthly' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-green-tint rounded-xl p-4 border border-green-border">
                    <p className="text-brand-muted text-xs mb-1">{label}</p>
                    <p className="text-brand-dark font-semibold text-sm">{value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-brand-muted text-xs uppercase tracking-wide font-medium mb-3">Detail Shots</p>
                <div className="grid grid-cols-2 gap-3">
                  <img
                    src="/images/before-after/malepatternbaldness-detail-hairline.jpg"
                    alt="Hairline detail — Male Pattern Baldness Stage IV"
                    className="w-full h-32 object-cover rounded-xl border border-green-border"
                  />
                  <img
                    src="/images/before-after/malepatternbaldness-detail-topview.jpg"
                    alt="Top view detail — Male Pattern Baldness Stage IV"
                    className="w-full h-32 object-cover rounded-xl border border-green-border"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Multiple cases */}
      <section className="py-20" style={{ background: '#EEF7F2' }}>
        <div className="container-xl">
          <div className="text-center mb-14">
            <span className="section-eyebrow">Case Gallery</span>
            <h2 className="section-heading mt-3">More Transformations</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="flex flex-col gap-4"
                style={c.span ? { gridColumn: `span ${c.span}` } : {}}
              >
                <BeforeAfterSlider
                  beforeImage={c.beforeImage}
                  afterImage={c.afterImage}
                  beforeAlt={c.beforeAlt}
                  afterAlt={c.afterAlt}
                />
                <div>
                  <p className="text-brand-dark font-semibold text-sm">{c.label}</p>
                  <p className="text-brand-muted text-xs mt-0.5">{c.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-16 bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: '4 Studios', desc: 'Transformations across Bangalore' },
              { title: 'Zero Compromise', desc: 'We show you real client results, not stock photos' },
              { title: 'Undetectable', desc: 'Results that pass the closest inspection' },
            ].map(({ title, desc }) => (
              <div key={title} className="text-center p-8 rounded-2xl border border-green-border">
                <h3 className="font-display text-green text-xl font-bold mb-2">{title}</h3>
                <p className="text-brand-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </PageTransition>
  )
}
