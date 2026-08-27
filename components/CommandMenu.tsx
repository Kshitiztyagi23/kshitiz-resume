'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  X, 
  Briefcase, 
  BookOpen, 
  FolderGit2, 
  Wrench, 
  Users, 
  GraduationCap, 
  Mail, 
  Copy, 
  Check, 
  FileDown, 
  ArrowRight 
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/Icons'
import { resumeData } from '@/lib/data'

interface CommandMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          // handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const navigationItems = [
    { label: 'Work Experience (Battery Smart & Skaeo)', href: '#experience', icon: Briefcase, category: 'Navigation' },
    { label: 'Research Publications (CogSci 2026)', href: '#research', icon: BookOpen, category: 'Navigation' },
    { label: 'Featured Projects (Adaptive Learning, CineScope, Spikeverse)', href: '#projects', icon: FolderGit2, category: 'Navigation' },
    { label: 'Technical Skills Matrix', href: '#skills', icon: Wrench, category: 'Navigation' },
    { label: 'Leadership & Responsibilities (BioSoc, BCS, AnC)', href: '#leadership', icon: Users, category: 'Navigation' },
    { label: 'Academic Qualifications & Honors', href: '#education', icon: GraduationCap, category: 'Navigation' },
  ]

  const actions = [
    {
      label: 'Download Resume (PDF)',
      icon: FileDown,
      category: 'Actions',
      action: () => {
        window.open('/resume.pdf', '_blank')
        onClose()
      },
    },
    {
      label: 'Copy Email (ktyagi23@iitk.ac.in)',
      icon: Mail,
      category: 'Actions',
      action: () => {
        navigator.clipboard.writeText(resumeData.personal.email)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
    },
    {
      label: 'Open GitHub Profile',
      icon: GithubIcon,
      category: 'Social',
      action: () => {
        window.open(resumeData.personal.githubUrl, '_blank')
        onClose()
      },
    },
    {
      label: 'Open LinkedIn Profile',
      icon: LinkedinIcon,
      category: 'Social',
      action: () => {
        window.open(resumeData.personal.linkedinUrl, '_blank')
        onClose()
      },
    },
  ]

  const filteredNav = navigationItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  const filteredActions = actions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative w-full max-w-xl bg-white rounded-xl border border-zinc-200 shadow-2xl overflow-hidden z-10"
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-200 bg-zinc-50/50">
            <Search className="w-4 h-4 text-safety-500 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sections, projects, or actions..."
              className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden font-sans"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-zinc-400 hover:text-zinc-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex text-[10px] bg-white text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-200 font-mono">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredNav.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                  Navigation
                </div>
                {filteredNav.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-zinc-800 hover:bg-orange-50 hover:text-safety-600 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-zinc-400 group-hover:text-safety-500" />
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-safety-500" />
                    </a>
                  )
                })}
              </div>
            )}

            {filteredActions.length > 0 && (
              <div className="pt-2 border-t border-zinc-100 mt-2">
                <div className="px-3 py-1.5 text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                  Quick Actions
                </div>
                {filteredActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={action.label}
                      onClick={action.action}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-zinc-800 hover:bg-orange-50 hover:text-safety-600 transition-colors group text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-zinc-400 group-hover:text-safety-500" />
                        <span>{action.label}</span>
                      </div>
                      {action.category === 'Actions' && copied ? (
                        <span className="text-[10px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Copied
                        </span>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            )}

            {filteredNav.length === 0 && filteredActions.length === 0 && (
              <div className="p-6 text-center text-xs text-zinc-500 font-mono">
                No matching results found for &ldquo;{query}&rdquo;
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
