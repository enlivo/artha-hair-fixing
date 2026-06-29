import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Button({ variant = 'primary', size = 'md', children, onClick, className = '', href, to, type = 'button', disabled }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 cursor-pointer'
  const variants = {
    primary: 'bg-green text-white hover:bg-green-hover',
    ghost: 'text-green border border-green-border hover:bg-green-tint',
    gold: 'bg-gold text-brand-dark hover:bg-gold-hover',
    white: 'bg-white text-brand-dark hover:bg-gray-50 border border-green-border',
  }
  const sizes = { sm: 'text-xs px-4 py-2', md: 'text-sm px-6 py-3', lg: 'text-sm px-8 py-4' }
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
      <Link to={to} className={cls}>{children}</Link>
    </motion.div>
  )
  if (href) return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>
    </motion.div>
  )
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} className={cls} whileHover={{ scale: disabled ? 1 : 1.02 }} whileTap={{ scale: disabled ? 1 : 0.97 }}>
      {children}
    </motion.button>
  )
}
