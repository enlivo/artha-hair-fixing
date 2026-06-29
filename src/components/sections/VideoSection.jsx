import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play } from 'lucide-react'

const videos = [
  { id: 1, src: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Hair Patch Transformation', duration: '2:34' },
  { id: 2, src: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Hair Bonding Process', duration: '1:58' },
  { id: 3, src: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Wig Fitting Session', duration: '3:12' },
]

function VideoCard({ video, index, isInView }) {
  const videoRef = useRef(null)
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group border border-green-border"
      style={{ aspectRatio: '9/16', maxHeight: '420px', background: '#EEF7F2' }}
      onMouseEnter={() => { if (videoRef.current) videoRef.current.muted = false }}
      onMouseLeave={() => { if (videoRef.current) videoRef.current.muted = true }}
    >
      <video ref={videoRef} src={video.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,46,34,0.8) 0%, transparent 50%)' }} />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Play size={20} fill="white" color="white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-white font-medium text-sm mb-1">{video.title}</p>
        <div className="flex items-center justify-between">
          <span className="text-gold text-xs">{video.duration}</span>
          <span className="text-white/50 text-xs">Hover to unmute</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function VideoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20" style={{ background: '#F4FAF6' }}>
      <div className="container-xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center max-w-lg mx-auto mb-12">
          <span className="section-eyebrow">Behind the Scenes</span>
          <h2 className="section-heading mt-3">Watch Real Transformations</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {videos.map((v, i) => <VideoCard key={v.id} video={v} index={i} isInView={isInView} />)}
        </div>
      </div>
    </section>
  )
}
