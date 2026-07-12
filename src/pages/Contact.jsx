import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, Mail, Clock, CheckCircle } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import PageBanner from '../components/ui/PageBanner'
import StudioLocations from '../components/sections/StudioLocations'
import CTABanner from '../components/sections/CTABanner'
import { services, contactInfo } from '../data/content'

const initialForm = { name: '', phone: '', email: '', service: '', date: '', source: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
  }

  return (
    <PageTransition>
      <PageBanner
        breadcrumb="HOME | CONTACT"
        headingLine1="Get in Touch"
        headingAccent="With Us"
        imageSrc="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80"
        imageFallback="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
      />

      {/* Main */}
      <section className="py-20 bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

            {/* Form */}
            <div>
              <h2 className="font-display text-brand-dark text-2xl font-bold mb-2">Book Your Free Consultation</h2>
              <p className="text-brand-muted text-sm mb-8">Fill in your details and we'll confirm your appointment within a few hours.</p>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-brand-muted text-xs uppercase tracking-wide font-medium block mb-1.5">Full Name</label>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Rajesh Kumar" required className="input-base" />
                      </div>
                      <div>
                        <label className="text-brand-muted text-xs uppercase tracking-wide font-medium block mb-1.5">Phone</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98450 00000" required className="input-base" />
                      </div>
                    </div>
                    <div>
                      <label className="text-brand-muted text-xs uppercase tracking-wide font-medium block mb-1.5">Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-base" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-brand-muted text-xs uppercase tracking-wide font-medium block mb-1.5">Service</label>
                        <select name="service" value={form.service} onChange={handleChange} required className="input-base">
                          <option value="">Select…</option>
                          {services.map((s) => <option key={s.id} value={s.slug}>{s.title}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-brand-muted text-xs uppercase tracking-wide font-medium block mb-1.5">Preferred Date</label>
                        <input type="date" name="date" value={form.date} onChange={handleChange} className="input-base" />
                      </div>
                    </div>
                    <div>
                      <label className="text-brand-muted text-xs uppercase tracking-wide font-medium block mb-1.5">How did you hear about us?</label>
                      <select name="source" value={form.source} onChange={handleChange} className="input-base">
                        <option value="">Select…</option>
                        {['Instagram', 'Google', 'Friend / Referral', 'Other'].map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-brand-muted text-xs uppercase tracking-wide font-medium block mb-1.5">Message (Optional)</label>
                      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your concern…" rows={4} className="input-base resize-none" />
                    </div>
                    <motion.button type="submit" disabled={loading} whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="w-full bg-green text-white font-semibold py-4 rounded-xl hover:bg-green-hover transition-colors text-sm disabled:opacity-60"
                    >
                      {loading ? 'Sending…' : 'Book Free Consultation'}
                    </motion.button>
                    <p className="text-brand-light text-xs text-center">Your details are private and never shared.</p>
                  </motion.form>
                ) : (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center gap-5 py-16">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 14, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-green-tint border-2 border-green flex items-center justify-center"
                    >
                      <CheckCircle size={38} className="text-green" />
                    </motion.div>
                    <div>
                      <h4 className="font-display text-brand-dark text-2xl font-bold mb-2">Request Received!</h4>
                      <p className="text-brand-body text-sm leading-relaxed max-w-xs">
                        Thank you, {form.name || 'there'}! We'll call you shortly to confirm your free consultation.
                      </p>
                    </div>
                    <button onClick={() => { setSubmitted(false); setForm(initialForm) }} className="text-green text-sm underline">Submit another request</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6 h-full">
              <h3 className="font-display text-brand-dark text-xl font-bold">Find Us</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Phone, label: 'Phone', value: contactInfo.phone, href: contactInfo.phoneHref },
                  { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
                  {
                    icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us',
                    href: `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(contactInfo.whatsappMessage)}`,
                    span: true,
                  },
                ].map(({ icon: Icon, label, value, href, span }) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className={`flex gap-4 items-start p-5 rounded-2xl border border-green-border bg-green-tint/50 hover:bg-green-tint transition-colors no-underline ${span ? 'sm:col-span-2' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-tint flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-green" />
                    </div>
                    <div>
                      <p className="text-brand-muted text-xs uppercase tracking-wide font-medium mb-0.5">{label}</p>
                      <p className="text-brand-dark text-sm font-medium leading-snug">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Hours */}
              <div className="rounded-2xl border border-green-border p-8 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-5">
                  <Clock size={16} className="text-green" />
                  <h4 className="text-brand-dark font-semibold text-sm">Working Hours</h4>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    ['Monday – Saturday', contactInfo.hours.weekdays],
                    ['Sunday', contactInfo.hours.sunday],
                  ].map(([day, time]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-brand-muted">{day}</span>
                      <span className="text-brand-dark font-medium">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StudioLocations
        eyebrow="Our Locations"
        heading="Visit Our Studios"
        subtext="Multiple convenient locations across Bangalore — tap a card for directions"
        sectionClassName="py-20 hair-pattern-green"
      />

      <CTABanner />
    </PageTransition>
  )
}
