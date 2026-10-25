import type { ReactNode } from 'react'

export function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-frame px-5 sm:px-8 ${className}`}>{children}</div>
}

interface SectionProps {
  id: string
  index: string
  title: string
  cmd: string
  note?: string
  children: ReactNode
}

// Asymmetric section: a narrow sticky rail on the left, content on the right.
export function Section({ id, index, title, cmd, note, children }: SectionProps) {
  return (
    <section id={id} className="border-b border-line">
      <Frame className="grid grid-cols-12 gap-x-8 gap-y-8 py-16 md:py-24">
        <header className="col-span-12 lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <div className="font-mono text-xs text-fg-dim">
              <span className="text-accent">{index}</span> / {id}
            </div>
            <h2 className="mt-3 font-mono text-2xl font-semibold tracking-tight text-fg sm:text-[28px]">{title}</h2>
            <p className="mt-3 font-mono text-xs text-fg-dim">
              <span className="text-accent">$</span> {cmd}
            </p>
            {note && <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-muted">{note}</p>}
          </div>
        </header>
        <div className="col-span-12 min-w-0 lg:col-span-9">{children}</div>
      </Frame>
    </section>
  )
}

interface PanelProps {
  title: ReactNode
  meta?: ReactNode
  children: ReactNode
  className?: string
  id?: string
}

export function Panel({ title, meta, children, className = '', id }: PanelProps) {
  return (
    <div id={id} className={`rounded border border-line bg-ink-900 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line bg-ink-850 px-4 py-2 font-mono text-[11px]">
        <span className="text-fg-muted">{title}</span>
        {meta && <span className="text-fg-dim">{meta}</span>}
      </div>
      {children}
    </div>
  )
}

export function Tags({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((t) => (
        <li
          key={t}
          className="rounded-sm border border-line px-1.5 py-0.5 font-mono text-[11px] leading-none text-fg-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  )
}

// Splits "a · b · c" metric strings so each figure can be set on its own line.
export function MetricList({ value, className = '' }: { value: string; className?: string }) {
  return (
    <ul className={`space-y-0.5 font-mono text-xs ${className}`}>
      {value.split(' · ').map((m) => (
        <li key={m} className="text-syn-num">
          {m}
        </li>
      ))}
    </ul>
  )
}
