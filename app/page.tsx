'use client'

import { useState } from 'react'
import NavBar from '@/components/NavBar'
import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Publications from '@/components/Publications'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Positions from '@/components/Positions'
import Achievements from '@/components/Achievements'
import Education from '@/components/Education'
import Courses from '@/components/Courses'
import ExtraCurricular from '@/components/ExtraCurricular'
import Footer from '@/components/Footer'
import CommandMenu from '@/components/CommandMenu'

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <>
      <NavBar onOpenCommand={() => setCommandOpen(true)} />
      <main>
        <Hero />
        <Experience />
        <Publications />
        <Projects />
        <Skills />
        <Positions />
        <Achievements />
        <Education />
        <Courses />
        <ExtraCurricular />
      </main>
      <Footer />
      <CommandMenu isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  )
}

