import NavBar from '@/components/NavBar'
import Hero from '@/components/Hero'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Positions from '@/components/Positions'
import Courses from '@/components/Courses'
import ExtraCurricular from '@/components/ExtraCurricular'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Positions />
        <Courses />
        <ExtraCurricular />
      </main>
      <Footer />
    </>
  )
}
