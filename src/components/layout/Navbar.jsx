import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import useScrollDirection from '../../hooks/useScrollDirection'
import { useModal } from '../../context/ModalContext'
import Logo from '../ui/Logo'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/before-after', label: 'Before & After' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.35, delay: i * 0.06 } }),
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dir = useScrollDirection()
  const { openModal } = useModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHidden = dir === 'down' && scrolled && !mobileOpen

  return (
    <>
      <motion.nav
        animate={{ y: isHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-green-border transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}
      >
        <div className="container-xl py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <Logo size="md" theme="light" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative text-sm font-medium pb-1 transition-colors duration-200 ${isActive ? 'text-green font-semibold' : 'text-brand-body hover:text-green'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-green rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-xs"
            >
              Book Free Consultation
            </motion.button>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen((v) => !v)} className="lg:hidden text-brand-dark p-1" aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map(({ to, label }, i) => (
              <motion.div key={to} custom={i} variants={mobileLinkVariants} initial="hidden" animate="visible" exit="exit">
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `font-display text-4xl font-bold ${isActive ? 'text-green' : 'text-brand-dark hover:text-green'} transition-colors`
                  }
                >
                  {label}
                </NavLink>
              </motion.div>
            ))}
            <motion.div custom={navLinks.length} variants={mobileLinkVariants} initial="hidden" animate="visible" exit="exit" className="mt-4">
              <button onClick={() => { setMobileOpen(false); openModal() }} className="btn-primary text-base px-8 py-4">
                Book Free Consultation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
