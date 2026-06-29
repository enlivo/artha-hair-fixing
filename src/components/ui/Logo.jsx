export default function Logo({ size = 'md', theme = 'light' }) {
  const sizes = {
    sm: { circle: 32, scale: 0.55 },
    md: { circle: 44, scale: 0.75 },
    lg: { circle: 64, scale: 1.1 },
    xl: { circle: 90, scale: 1.6 },
  }
  const s = sizes[size]
  const darkBg = theme === 'dark'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Icon mark */}
      <svg
        width={s.circle}
        height={s.circle}
        viewBox="-65 -75 130 140"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer filled circle */}
        <circle cx="0" cy="8" r="62" fill={darkBg ? '#C9A96E' : '#1A2E22'} />
        {/* Dashed ring */}
        <circle cx="0" cy="8" r="54" fill="none"
          stroke={darkBg ? '#1A2E22' : '#C9A96E'}
          strokeWidth="1.5"
          strokeDasharray="4,3" />

        {/* Hair wig body */}
        <path d="M0,-28 C-4,-28 -9,-26 -13,-21
          C-19,-13 -21,-3 -21,6
          C-21,15 -17,24 -10,30
          C-6,33 -3,34 0,34
          C3,34 6,33 10,30
          C17,24 21,15 21,6
          C21,-3 19,-13 13,-21
          C9,-26 4,-28 0,-28Z"
          fill="#0A0A0A" stroke="#1A1A1A" strokeWidth="0.5" />
        {/* Hair strand lines */}
        <path d="M0,-28 Q0,-12 0,16" fill="none" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M-7,-26 Q-10,-10 -9,14" fill="none" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" />
        <path d="M7,-26 Q10,-10 9,14" fill="none" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" />
        <path d="M-14,-22 Q-18,-8 -17,12" fill="none" stroke="#111111" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M14,-22 Q18,-8 17,12" fill="none" stroke="#111111" strokeWidth="0.8" strokeLinecap="round" />
        {/* Shine highlight */}
        <ellipse cx="-6" cy="-16" rx="4" ry="8" fill="#2A2A2A" opacity="0.5" transform="rotate(-15,-6,-16)" />
        {/* Wig base edge */}
        <path d="M-21,26 Q-10,34 0,36 Q10,34 21,26" fill="none" stroke="#050505" strokeWidth="2.5" strokeLinecap="round" />

        {/* Gold crown */}
        <g transform="translate(0,-36)">
          {/* Crown base band */}
          <rect x="-18" y="12" width="36" height="8" rx="2.5" fill="#C9A96E" />
          {/* Band shine */}
          <rect x="-18" y="12" width="36" height="3" rx="2" fill="#E8C97A" opacity="0.5" />
          {/* Left & right peaks */}
          <path d="M-18,12 L-14,-1 L-9,8 L-4,-6 L1,12" fill="#C9A96E" />
          <path d="M18,12 L14,-1 L9,8 L4,-6 L-1,12" fill="#C9A96E" />
          {/* Peak shine lines */}
          <path d="M-14,-1 L-13,4" stroke="#F0D878" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
          <path d="M0,-8 L1,-2" stroke="#F0D878" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
          <path d="M14,-1 L13,4" stroke="#F0D878" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
          {/* Gem dots on peaks */}
          <circle cx="-14" cy="-1" r="2.5" fill="#FFFFFF" stroke="#D4A830" strokeWidth="0.5" />
          <circle cx="0" cy="-8" r="3" fill="#FFFFFF" stroke="#D4A830" strokeWidth="0.8" />
          <circle cx="14" cy="-1" r="2.5" fill="#FFFFFF" stroke="#D4A830" strokeWidth="0.5" />
          {/* Diamond accents on band */}
          <rect x="-11" y="14" width="4" height="4" rx="0.5" fill="#E8C97A" transform="rotate(45,-9,16)" />
          <rect x="-2" y="14" width="4" height="4" rx="0.5" fill="#E8C97A" transform="rotate(45,0,16)" />
          <rect x="7" y="14" width="4" height="4" rx="0.5" fill="#E8C97A" transform="rotate(45,9,16)" />
        </g>

        {/* ARTHA text inside circle */}
        <text
          x="0" y="56"
          fontFamily="Georgia, serif"
          fontSize="12"
          fontWeight="700"
          fill={darkBg ? '#1A2E22' : '#FFFFFF'}
          textAnchor="middle"
          letterSpacing="2"
        >
          ARTHA
        </text>
      </svg>

      {/* Wordmark beside icon — hidden at sm size */}
      {size !== 'sm' && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: size === 'xl' ? '38px' : size === 'lg' ? '28px' : '22px',
            fontWeight: 700,
            color: darkBg ? '#FFFFFF' : '#1A2E22',
            letterSpacing: '-0.5px',
          }}>
            ARTHA
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: size === 'lg' ? '13px' : '11px',
            color: '#C9A96E',
            letterSpacing: '1px',
          }}>
            Hair Fixing
          </span>
        </div>
      )}
    </div>
  )
}
