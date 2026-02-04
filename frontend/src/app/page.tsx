import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Properties from '@/components/Properties'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Properties />
      <FAQ />
      <Footer />
    </main>
  )
}