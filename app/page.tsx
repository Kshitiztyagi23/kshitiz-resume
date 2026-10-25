'use client'

import { useCallback, useEffect, useState } from 'react'
import NavBar from '@/components/NavBar'
import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Publications from '@/components/Publications'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Positions from '@/components/Positions'
import Education from '@/components/Education'
import Footer from '@/components/Footer'
import CommandMenu from '@/components/CommandMenu'

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false)
  const closeCommand = useCallback(() => setCommandOpen(false), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
        <Education />
      </main>
      <Footer />
      <CommandMenu isOpen={commandOpen} onClose={closeCommand} />
    </>
  )
}
