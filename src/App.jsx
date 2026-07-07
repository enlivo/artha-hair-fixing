import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ModalProvider } from './context/ModalContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AnnouncementBar from './components/sections/AnnouncementBar'
import WhatsAppButton from './components/ui/WhatsAppButton'
import BookingModal from './components/ui/BookingModal'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import Services from './pages/Services'
import HairWigs from './pages/HairWigs'
import BeforeAfter from './pages/BeforeAfter'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/hair-wigs" element={<HairWigs />} />
        <Route path="/before-after" element={<BeforeAfter />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <ScrollProgress />
        <AnnouncementBar />
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
        <WhatsAppButton />
        <BookingModal />
      </ModalProvider>
    </BrowserRouter>
  )
}
