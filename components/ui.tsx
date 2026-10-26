import type { ReactNode } from 'react'

export function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-frame px-5 sm:px-8 ${className}`}>{children}</div>
}

interface SectionProps {
  id: string
  index: string
  title: string
  note?: string
  children: ReactNode
}

// Title on the left, a short note pushed to the right, content full width below.
export function Section({ id, index, title, note, children }: SectionProps) {
  return (
    <section id={id} className="border-b border-line">
      <Frame className="py-16 md:py-24">
        <header className="mb-10 grid grid-cols-12 items-end gap-x-8 gap-y-3 md:mb-12">
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-xs text-fg-dim">
              <span className="text-accent">{index}</span> / {id}
            </div>
            <h2 className="mt-3 font-mono text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h2>
          </div>
          {note && (
            <p className="col-span-12 text-sm leading-relaxed text-fg-muted md:col-span-4 md:col-start-9">{note}</p>
          )}
        </header>
        {children}
      </Frame>
    </section>
  )
}
