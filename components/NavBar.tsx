'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, FileDown, Menu, X, ArrowUpRight } from 'lucide-react'

interface NavBarProps {
  onOpenCommand?: () => void
}

const navItems = [
  { label: 'Experience', href: '#experience' },
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Education', href: '#education' },
]

export default function NavBar({ onOpenCommand }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ['experience', 'research', 'projects', 'skills', 'leadership', 'education']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'glass-header border-b border-zinc-200/90 shadow-sm'
          : 'bg-white/70 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand / Name & Status */}
        <a href="#about" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded bg-safety-500 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            KT
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-zinc-900 tracking-tight flex items-center gap-2">
              Kshitiz Tyagi
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono bg-orange-50 text-orange-700 border border-orange-200">
                <span className="w-1.5 h-1.5 rounded-full bg-safety-500 animate-pulse" />
                IIT Kanpur ’27
              </span>
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-100/70 p-1 rounded-lg border border-zinc-200/60">
          {navItems.map((item) => {
            const id = item.href.slice(1)
            const isActive = activeSection === id
            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative px-3 py-1 text-xs font-medium rounded-md transition-all duration-150 ${
                  isActive
                    ? 'text-zinc-900 font-semibold bg-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/60'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-safety-500 rounded-full" />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right Desktop Actions */}
        <div className="hidden sm:flex items-center gap-2">
          {onOpenCommand && (
            <button
              onClick={onOpenCommand}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-500 text-xs font-mono transition-colors shadow-xs"
              title="Search & Quick Actions (⌘K)"
            >
              <Command className="w-3.5 h-3.5 text-zinc-400" />
              <span>Search</span>
              <kbd className="text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded border border-zinc-200">
                ⌘K
              </kbd>
            </button>
          )}

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-safety-600 text-xs font-mono font-medium shadow-xs transition-colors"
          >
            <FileDown className="w-3.5 h-3.5 text-zinc-500" />
            <span>CV.pdf</span>
          </a>

          <a
            href="mailto:ktyagi23@iitk.ac.in"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-safety-500 hover:bg-safety-600 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          {onOpenCommand && (
            <button
              onClick={onOpenCommand}
              className="p-2 text-zinc-500 hover:text-zinc-900"
              aria-label="Open search"
            >
              <Command className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-50"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="sm:hidden bg-white border-b border-zinc-200 px-4 py-3 space-y-1 shadow-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-zinc-700 hover:text-safety-600 hover:bg-orange-50/60 rounded-md"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2">
              <a
                href="mailto:ktyagi23@iitk.ac.in"
                className="w-full text-center py-2 rounded-md bg-safety-500 text-white text-xs font-semibold"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

