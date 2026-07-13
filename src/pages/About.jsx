import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, Shield, Heart, Award, Gem } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import PageBanner from '../components/ui/PageBanner'
import CTABanner from '../components/sections/CTABanner'
import WhyUsSection from '../components/sections/WhyUsSection'
import { useModal } from '../context/ModalContext'

const values = [
  { icon: Shield, title: 'Privacy First', description: 'Private consultation rooms. Your journey is yours alone — we never compromise your confidentiality.' },
  { icon: Heart, title: 'Empathy & Care', description: 'We understand the emotional weight of hair loss. Every client is treated with compassion and deep respect.' },
  { icon: Award, title: 'Expert Quality', description: '10+ years of craft and continuous training. Only the finest human hair systems and modern techniques.' },
  { icon: Gem, title: 'Natural Results', description: "If you can tell it's a hairpiece, we haven't done our job. Undetectable is our minimum standard." },
]

const team = [
  { name: 'Larshitha S', role: 'Founder', photo: '/founder-2-pro.webp' },
  { name: 'Manjunath L', role: 'Co-Founder & Managing Director', photo: '/founder-1-pro.webp' },
]

export default function About() {
  const storyRef = useRef(null)
  const teamRef = useRef(null)
  const storyInView = useInView(storyRef, { once: true, margin: '-60px' })
  const teamInView = useInView(teamRef, { once: true, margin: '-60px' })
  const { openModal } = useModal()

  return (
    <PageTransition>
      {/* Hero */}
      <PageBanner
        breadcrumb="HOME | ABOUT US"
        headingLine1="We Understand Your Hair"
        headingAccent="Fixing Needs"
        imageSrc="https://images.unsplash.com/photo-1614859324669-927e70f7d2c8?w=800&q=90"
        imageFallback="https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80"
      />

      {/* Story */}
      <section ref={storyRef} className="py-20 bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={storyInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="flex flex-col gap-6">
              <span className="section-eyebrow">Who We Are</span>
              <h2 className="font-display text-brand-dark text-3xl font-bold leading-tight">
                Born from a Belief That
                <span className="text-green italic"> Everyone Deserves Confidence</span>
              </h2>
              <div className="flex flex-col gap-5 text-brand-body leading-relaxed">
                <p>Artha Hair Fixing Beauty was started by specialists who saw firsthand how much hair loss can affect a person's confidence — and how much of that confidence returns with the right solution.</p>
                <p>Today we run 5 studios across Bangalore — RR Nagar, Jayanagar, Konanakunte, Rajajinagar, and Whitefield — offering non-surgical hair solutions made with 100% human hair, tailored to each individual. Transparency, craftsmanship, and care at every step.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={storyInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="relative">
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80"
                alt="Artha Hair Fixing Beauty Studio interior in Bangalore"
                className="w-full rounded-3xl object-cover"
                style={{ border: '1px solid #C5E8D4', boxShadow: '0 24px 60px rgba(45,106,79,0.12)', aspectRatio: '1', objectFit: 'cover' }}
                loading="lazy"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80' }}
              />
              <div className="absolute -bottom-5 -left-5 bg-green text-white rounded-2xl px-6 py-4">
                <p className="font-display text-3xl font-bold">5</p>
                <p className="text-green-light text-xs font-medium mt-0.5">Studios Across Bangalore</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: '#EEF7F2' }}>
        <div className="container-xl">
          <div className="text-center max-w-lg mx-auto mb-14">
            <span className="section-eyebrow">What We Stand For</span>
            <h2 className="section-heading mt-3">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(45,106,79,0.1)' }}
                className="bg-white rounded-2xl p-7 flex flex-col gap-4 border border-green-border"
              >
                <div className="w-11 h-11 rounded-xl bg-green-tint flex items-center justify-center">
                  <Icon size={20} className="text-green" />
                </div>
                <h3 className="font-semibold text-brand-dark text-base">{title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WhyUsSection />

      {/* Team */}
      <section ref={teamRef} className="py-20 bg-white">
        <div className="container-xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center max-w-lg mx-auto mb-14">
            <span className="section-eyebrow">The People Behind Artha</span>
            <h2 className="section-heading mt-3">Meet Our Team</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {team.map(({ name, role, photo }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 32 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(45,106,79,0.1)' }}
                className="bg-white rounded-2xl overflow-hidden border border-green-border"
              >
                <div className="aspect-[4/5] bg-green-tint">
                  <img
                    src={photo}
                    alt={`${name} — ${role}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-brand-dark text-lg font-bold">{name}</h3>
                  <p className="text-green text-sm mt-1">{role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-20" style={{ background: '#EEF7F2' }}>
        <div className="container-xl text-center max-w-2xl mx-auto">
          <span className="text-5xl font-accent italic text-green opacity-20 block mb-4">"</span>
          <p className="font-accent italic text-brand-dark text-2xl leading-relaxed mb-8">
            We are not just fixing hair. We are restoring identity, rebuilding confidence, and returning the freedom to live life fully — one client at a time.
          </p>
          <p className="text-green font-semibold text-sm">— Larshitha S, Founder, Artha Hair Fixing Beauty</p>
          <button onClick={openModal} className="btn-primary text-sm px-8 py-4 mt-10">Book Your Free Consultation</button>
        </div>
      </section>

      <CTABanner />
    </PageTransition>
  )
}
