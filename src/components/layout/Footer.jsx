import { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, Clock } from 'lucide-react'
import { contactInfo } from '../../data/content'
import Logo from '../ui/Logo'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/before-after', label: 'Before & After' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

const serviceLinks = ['Hair Bonding', 'Hair Clipping', 'Hair Weaving', 'Hair Patch Service', 'Ladies Hair Toppers']

function YtIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42C1 8.15 1 12 1 12s0 3.85.46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96C23 15.85 23 12 23 12s0-3.85-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={color} stroke="none"/>
    </svg>
  )
}
function FbIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}
function InstagramIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none"/>
    </svg>
  )
}

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer
      ref={ref}
      style={{
        background: '#1A2E22',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='600' viewBox='0 0 1000 600'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' stroke-opacity='0.05'%3E%3Cpath d='M-100 300 Q150 100 400 300 Q650 500 900 300 Q1050 200 1100 250'/%3E%3Cpath d='M-100 250 Q150 50 400 250 Q650 450 900 250 Q1050 150 1100 200'/%3E%3Cpath d='M-100 350 Q150 150 400 350 Q650 550 900 350 Q1050 250 1100 300'/%3E%3Cpath d='M-100 200 Q150 0 400 200 Q650 400 900 200 Q1050 100 1100 150'/%3E%3Cpath d='M-100 400 Q150 200 400 400 Q650 600 900 400 Q1050 300 1100 350'/%3E%3Cpath d='M-100 150 Q150 -50 400 150 Q650 350 900 150 Q1050 50 1100 100'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '100% auto',
        backgroundRepeat: 'repeat-y',
        borderTop: '2px solid #C9A96E',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle leaf pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none" aria-hidden>
        {Array.from({ length: 8 }).map((_, i) => (
          <svg key={i} width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', top: `${(i % 3) * 33}%`, left: `${Math.floor(i / 3) * 25 + 5}%` }}>
            <path d="M60 10 Q90 40 60 110 Q30 40 60 10Z" fill="white"/>
          </svg>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="container-xl py-16 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div>
              <Logo size="md" theme="dark" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#7A9485' }}>
              Bangalore's trusted hair restoration specialists. Reclaim your confidence with our expert non-surgical solutions.
            </p>
            <div className="flex gap-3 mt-2">
              {[
                { icon: <InstagramIcon size={17} />, href: contactInfo.instagram, label: 'Instagram' },
                { icon: <YtIcon size={17} />, href: 'https://www.youtube.com/@arthahairfixingnonsurgical1071', label: 'YouTube' },
                { icon: <FbIcon size={17} />, href: 'https://www.facebook.com/people/Artha-Hair-Fixing/100063714079154/', label: 'Facebook' },
              ].map(({ icon, href, label }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={`Artha Hair Fixing Beauty on ${label}`}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#A8BDB4' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A96E'; e.currentTarget.style.borderColor = '#C9A96E' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#A8BDB4'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} end={to === '/'}
                    className={({ isActive }) => `text-sm transition-colors duration-200 ${isActive ? '' : ''}`}
                    style={({ isActive }) => ({ color: isActive ? '#C9A96E' : '#A8BDB4' })}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A96E' }}
                    onMouseLeave={(e) => { }}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-6">Services</h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <span className="text-sm" style={{ color: '#A8BDB4' }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              {[
                { icon: <Phone size={14} />, text: contactInfo.phone, href: contactInfo.phoneHref },
                { icon: <Mail size={14} />, text: contactInfo.email, href: `mailto:${contactInfo.email}` },
                { icon: <Clock size={14} />, text: contactInfo.hours.display },
              ].map(({ icon, text, href }, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="mt-0.5 shrink-0" style={{ color: '#C9A96E' }}>{icon}</span>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className="text-xs leading-relaxed transition-colors duration-200 hover:text-gold"
                      style={{ color: '#A8BDB4' }}
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-xs leading-relaxed" style={{ color: '#A8BDB4' }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ color: '#3D5244' }}>
          <p>© {new Date().getFullYear()} Artha Hair Fixing Beauty. All rights reserved.</p>
          <p>Made with care for Bangalore</p>
        </div>
      </motion.div>
    </footer>
  )
}
