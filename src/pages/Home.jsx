import PageTransition from '../components/layout/PageTransition'
import HeroSection from '../components/sections/HeroSection'
import StatsBar from '../components/sections/StatsBar'
import ServicesPreview from '../components/sections/ServicesPreview'
import BeforeAfterSection from '../components/sections/BeforeAfterSection'
import VideoShowcaseSection from '../components/sections/VideoShowcaseSection'
import StudioLocations from '../components/sections/StudioLocations'
import WhyUsSection from '../components/sections/WhyUsSection'
import ProcessSection from '../components/sections/ProcessSection'
import FreedomSection from '../components/sections/FreedomSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import InstagramStrip from '../components/sections/InstagramStrip'
import CTABanner from '../components/sections/CTABanner'

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <StatsBar />
      <ServicesPreview />
      <BeforeAfterSection />
      <VideoShowcaseSection />
      <StudioLocations />
      <WhyUsSection />
      <ProcessSection />
      <FreedomSection />
      <TestimonialsSection />
      <InstagramStrip />
      <CTABanner />
    </PageTransition>
  )
}
