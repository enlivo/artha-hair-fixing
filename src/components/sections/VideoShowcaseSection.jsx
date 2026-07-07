import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, AlertTriangle } from 'lucide-react'
import useYoutubeChannelVideos from '../../hooks/useYoutubeChannelVideos'

const reels = [
  { id: 1, src: '/videos/reel-1-instagram.mp4', label: 'Instagram Reel 1' },
  { id: 2, src: '/videos/reel-2-instagram.mp4', label: 'Instagram Reel 2' },
  { id: 3, src: '/videos/reel-3-instagram-square.mp4', label: 'Instagram Reel 3' },
]

function YoutubeCard({ video, isPlaying, onPlay }) {
  return (
    <div className="card-base shadow-sm overflow-hidden w-[280px] sm:w-[320px] shrink-0">
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={onPlay}
            aria-label={`Play ${video.title}`}
            className="absolute inset-0 w-full h-full group cursor-pointer"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/30 transition-colors duration-300 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <Play size={22} className="text-green ml-0.5" fill="currentColor" />
              </div>
            </div>
          </button>
        )}
      </div>
      <div className="p-4">
        <p className="text-brand-dark font-medium text-sm line-clamp-2">{video.title}</p>
      </div>
    </div>
  )
}

function YoutubeSkeleton() {
  return (
    <div className="card-base shadow-sm overflow-hidden animate-pulse w-[280px] sm:w-[320px] shrink-0">
      <div className="w-full bg-green-tint" style={{ aspectRatio: '16/9' }} />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3.5 bg-green-tint rounded-full w-3/4" />
        <div className="h-3.5 bg-green-tint rounded-full w-1/2" />
      </div>
    </div>
  )
}

function YoutubeMarquee({ videos }) {
  const [activeKey, setActiveKey] = useState(null)
  const [interacting, setInteracting] = useState(false)
  const isPaused = interacting || activeKey !== null

  const doubled = [...videos, ...videos]
  const duration = Math.max(videos.length * 4, 20)

  return (
    <div
      className="overflow-x-auto no-scrollbar"
      style={{ WebkitOverflowScrolling: 'touch' }}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onTouchStart={() => setInteracting(true)}
      onTouchEnd={() => setInteracting(false)}
    >
      <div
        className="flex gap-8 w-max"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {doubled.map((video, i) => {
          const key = `${video.id}::${i}`
          return (
            <YoutubeCard
              key={key}
              video={video}
              isPlaying={activeKey === key}
              onPlay={() => setActiveKey(key)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function VideoShowcaseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const { videos, loading, error } = useYoutubeChannelVideos()

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg mx-auto mb-12"
        >
          <span className="section-eyebrow">See It Yourself</span>
          <h2 className="section-heading mt-3">Watch the Process</h2>
        </motion.div>

        {/* YouTube channel carousel */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {loading && (
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-1">
              {Array.from({ length: 4 }).map((_, i) => <YoutubeSkeleton key={i} />)}
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-12">
              <AlertTriangle size={28} className="mx-auto mb-3 text-gold" />
              <p className="text-brand-body text-sm max-w-sm mx-auto">
                We couldn't load videos from our YouTube channel right now. Please check back shortly.
              </p>
            </div>
          )}

          {!loading && !error && videos?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-brand-muted text-sm">No videos found yet — check back soon.</p>
            </div>
          )}

          {!loading && !error && videos?.length > 0 && <YoutubeMarquee videos={videos} />}
        </motion.div>

        {/* Instagram reels row */}
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-brand-dark text-2xl font-bold text-center mb-8"
          >
            From Our Instagram
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {reels.map((reel, i) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1 }}
                className="card-base shadow-sm overflow-hidden bg-brand-dark h-[420px] sm:h-[460px]"
              >
                <video
                  src={reel.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={reel.label}
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
