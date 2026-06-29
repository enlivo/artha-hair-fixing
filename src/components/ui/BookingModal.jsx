import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'
import { useModal } from '../../context/ModalContext'
import { services } from '../../data/content'

const initialForm = { name: '', phone: '', email: '', service: '', date: '', message: '' }

export default function BookingModal() {
  const { isOpen, closeModal } = useModal()
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1200)
  }
  const handleClose = () => { closeModal(); setTimeout(() => { setDone(false); setForm(initialForm) }, 400) }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(26,46,34,0.5)', backdropFilter: 'blur(6px)' }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green px-8 py-5 flex items-center justify-between">
              <div>
                <p className="text-green-tint text-xs font-semibold uppercase tracking-widest">Free Consultation</p>
                <h3 className="font-display text-white text-xl font-bold mt-0.5">Book Your Appointment</h3>
              </div>
              <button onClick={handleClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {!done ? (
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
                          {services.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-brand-muted text-xs uppercase tracking-wide font-medium block mb-1.5">Preferred Date</label>
                        <input type="date" name="date" value={form.date} onChange={handleChange} className="input-base" />
                      </div>
                    </div>
                    <div>
                      <label className="text-brand-muted text-xs uppercase tracking-wide font-medium block mb-1.5">Message (Optional)</label>
                      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your concern…" rows={3} className="input-base resize-none" />
                    </div>
                    <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }}
                      className="w-full bg-green text-white font-semibold py-3.5 rounded-xl hover:bg-green-hover transition-colors text-sm disabled:opacity-60"
                    >
                      {loading ? 'Sending…' : 'Confirm Consultation'}
                    </motion.button>
                    <p className="text-brand-light text-xs text-center">Free consultation · No commitment · Private & confidential</p>
                  </motion.form>
                ) : (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center gap-5 py-8">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 14, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-green-tint border-2 border-green flex items-center justify-center"
                    >
                      <CheckCircle size={38} className="text-green" />
                    </motion.div>
                    <div>
                      <h4 className="font-display text-brand-dark text-2xl font-bold mb-2">All Set!</h4>
                      <p className="text-brand-body text-sm leading-relaxed max-w-xs">
                        Thanks {form.name || 'there'}! We'll confirm your free consultation at Artha Hair Fixing very soon.
                      </p>
                    </div>
                    <button onClick={handleClose} className="btn-primary">Close</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
