const CIRCLE_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Cg fill='none' stroke='%232D6A4F' stroke-width='1' stroke-opacity='0.06'%3E%3Ccircle cx='150' cy='150' r='60'/%3E%3Ccircle cx='150' cy='150' r='90'/%3E%3Ccircle cx='150' cy='150' r='120'/%3E%3Ccircle cx='150' cy='150' r='150'/%3E%3C/g%3E%3C/svg%3E")`

export default function PageBanner({
  breadcrumb,
  headingLine1,
  headingAccent,
  subtext,
  imageSrc,
  imageFallback,
  minHeight = '300px',
  imageStyle,
}) {
  return (
    <section style={{
      backgroundColor: '#F4F2EE',
      backgroundImage: CIRCLE_PATTERN,
      backgroundSize: '280px 280px',
      minHeight,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
      paddingTop: '80px',
    }}>
      {/* Gold dot accent strip */}
      <div style={{
        position: 'absolute',
        left: '40px', top: 0, bottom: 0,
        width: '60px',
        backgroundImage: 'radial-gradient(#C9A96E 1.5px, transparent 1.5px)',
        backgroundSize: '14px 14px',
        opacity: 0.4,
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: 'clamp(40px, 6vw, 60px) clamp(24px, 5vw, 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        gap: '40px',
      }}>
        {/* Left: text */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '0.15em',
            color: '#7A9485',
            textTransform: 'uppercase',
            marginBottom: '20px',
            fontFamily: 'Inter, sans-serif',
          }}>
            {breadcrumb}
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            color: '#1A2E22',
            lineHeight: 1.2,
            margin: 0,
          }}>
            {headingLine1}<br />
            <span style={{ color: '#C9A96E' }}>{headingAccent}</span>
          </h1>
          {subtext && (
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              color: '#3D5244',
              marginTop: '12px',
              maxWidth: '400px',
              lineHeight: 1.7,
            }}>
              {subtext}
            </p>
          )}
        </div>

        {/* Right: image — hidden on mobile */}
        <div
          className="hidden md:block"
          style={{ flexShrink: 0, width: 'clamp(240px, 28vw, 380px)', height: 'clamp(180px, 20vw, 260px)' }}
        >
          <img
            src={imageSrc}
            alt={headingAccent}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              borderRadius: '16px',
              ...imageStyle,
            }}
            loading="eager"
            onError={(e) => { e.target.onerror = null; e.target.src = imageFallback }}
          />
        </div>
      </div>
    </section>
  )
}
