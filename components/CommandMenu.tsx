'use client'

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { personal, experience, projects } from '@/lib/content'
import { resumeHref, sections } from '@/lib/site'

interface CommandMenuProps {
  isOpen: boolean
  onClose: () => void
}

interface Item {
  group: 'goto' | 'work' | 'project' | 'action'
  label: string
  hint?: string
  run: () => void
}

export default function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return
    setQuery('')
    setCursor(0)
    inputRef.current?.focus()
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const items = useMemo<Item[]>(() => {
    const jump = (hash: string) => () => {
      onClose()
      if (window.location.hash === `#${hash}`) document.getElementById(hash)?.scrollIntoView()
      else window.location.hash = hash
    }
    const open = (url: string) => () => {
      window.open(url, '_blank', 'noopener')
      onClose()
    }
    return [
      ...sections.map((s) => ({ group: 'goto' as const, label: s.label, hint: `#${s.id}`, run: jump(s.id) })),
      ...experience.flatMap((job) =>
        job.items.map((w) => ({ group: 'work' as const, label: w.title, hint: job.company, run: jump(w.slug) })),
      ),
      ...projects.map((p) => ({ group: 'project' as const, label: p.title, hint: p.context, run: jump(p.slug) })),
      {
        group: 'action',
        label: 'copy email',
        hint: personal.email,
        run: () => {
          navigator.clipboard.writeText(personal.email)
          setCopied(true)
          setTimeout(() => setCopied(false), 1800)
        },
      },
      { group: 'action', label: 'open cv.pdf', run: open(resumeHref) },
      { group: 'action', label: 'open github', hint: personal.github, run: open(personal.githubUrl) },
      { group: 'action', label: 'open linkedin', hint: personal.linkedin, run: open(personal.linkedinUrl) },
    ]
  }, [onClose])

  const q = query.trim().toLowerCase()
  const results = q ? items.filter((i) => `${i.label} ${i.hint ?? ''}`.toLowerCase().includes(q)) : items

  if (!isOpen) return null

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(c + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(c - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      results[cursor]?.run()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 sm:pt-28">
      <div className="fixed inset-0 bg-ink-950/80" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className="relative w-full max-w-xl rounded border border-line-strong bg-ink-900"
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3 font-mono text-sm">
          <span className="text-accent">›</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setCursor(0)
            }}
            onKeyDown={onKeyDown}
            placeholder="jump to a section, project or action"
            className="w-full bg-transparent text-fg placeholder:text-fg-dim focus:outline-none"
            aria-label="Search"
            aria-controls="command-results"
            aria-activedescendant={results[cursor] ? `cmd-${cursor}` : undefined}
          />
          <kbd className="rounded-sm border border-line px-1 text-[10px] text-fg-dim">esc</kbd>
        </div>

        <ul id="command-results" role="listbox" className="max-h-80 overflow-y-auto py-1 font-mono text-[13px]">
          {results.map((item, i) => (
            <li
              key={`${item.group}-${item.label}`}
              id={`cmd-${i}`}
              role="option"
              aria-selected={i === cursor}
              onMouseEnter={() => setCursor(i)}
              onClick={item.run}
              className={`grid cursor-pointer grid-cols-[4.5rem_minmax(0,1fr)_auto] items-baseline gap-3 px-4 py-1.5 ${
                i === cursor ? 'bg-ink-800 text-fg' : 'text-fg-muted'
              }`}
            >
              <span className="text-[11px] text-fg-dim">{item.group}</span>
              <span className="truncate">
                {item.label}
                {item.label === 'copy email' && copied && <span className="ml-2 text-syn-str">copied</span>}
              </span>
              <span className="truncate text-[11px] text-fg-dim">{item.hint}</span>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-xs text-fg-dim">no match for “{query}”</li>
          )}
        </ul>
      </div>
    </div>
  )
}
