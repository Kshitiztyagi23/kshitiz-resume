'use client'

import { useEffect, useState } from 'react'
import { resumeHref, sections } from '@/lib/site'

interface NavBarProps {
  onOpenCommand: () => void
}

export default function NavBar({ onOpenCommand }: NavBarProps) {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      let current = ''
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && window.scrollY >= el.offsetTop - 120) current = s.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ink-950">
      <div className="mx-auto flex h-14 w-full max-w-frame items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#about" className="font-mono text-[13px] text-fg">
          <span className="text-accent">~</span>/kshitiz-tyagi
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Sections">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? 'location' : undefined}
              className={`font-mono text-xs transition-colors ${
                active === s.id ? 'text-accent' : 'text-fg-dim hover:text-fg'
              }`}
            >
              <span className={active === s.id ? 'text-accent' : 'text-line-strong'}>
                {String(i + 1).padStart(2, '0')}
              </span>{' '}
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden h-8 items-center gap-2 rounded border border-line px-2 font-mono text-[11px] text-fg-dim transition-colors hover:border-line-strong hover:text-fg sm:inline-flex"
          >
            search
            <kbd className="rounded-sm border border-line px-1 text-[10px] text-fg-muted">⌘K</kbd>
          </button>
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-8 items-center rounded border border-line px-2 font-mono text-[11px] text-fg-muted transition-colors hover:border-line-strong hover:text-fg sm:inline-flex"
          >
            cv.pdf
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="inline-flex h-8 items-center rounded border border-line px-2 font-mono text-[11px] text-fg-muted lg:hidden"
          >
            {menuOpen ? 'close' : 'menu'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" className="border-t border-line bg-ink-950 lg:hidden" aria-label="Sections">
          <ul className="mx-auto max-w-frame px-5 py-2 sm:px-8">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex gap-3 py-2 font-mono text-sm text-fg-muted hover:text-fg"
                >
                  <span className="text-fg-dim">{String(i + 1).padStart(2, '0')}</span>
                  {s.label}
                </a>
              </li>
            ))}
            <li className="flex gap-2 border-t border-line pt-3 pb-1 mt-2">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  onOpenCommand()
                }}
                className="btn"
              >
                search
              </button>
              <a href={resumeHref} target="_blank" rel="noopener noreferrer" className="btn">
                cv.pdf
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
