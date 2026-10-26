'use client'

import { useCallback, useEffect, useState } from 'react'
import NavBar from '@/components/NavBar'
import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Research from '@/components/Research'
import About from '@/components/About'
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
        <Projects />
        <Research />
        <About />
      </main>
      <Footer />
      <CommandMenu isOpen={commandOpen} onClose={closeCommand} />
    </>
  )
}
