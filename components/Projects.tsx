import { projects, otherProjects, personal } from '@/lib/content'
import { Section } from '@/components/ui'
import Ledger from '@/components/Ledger'

export default function Projects() {
  return (
    <Section
      id="projects"
      index="02"
      title="Projects"
      note="One each for software engineering, analytics and data science, with code on GitHub."
    >
      <Ledger items={projects} variant="project" />

      <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-3 pl-[18px] md:grid-cols-[12rem_minmax(0,1fr)] md:pl-[26px]">
        <h3 className="font-mono text-xs text-fg-dim">also built</h3>
        <div>
          <ul className="divide-y divide-line border-y border-line">
            {otherProjects.map((m) => (
              <li key={m.title} className="flex flex-col gap-x-6 gap-y-0.5 py-2.5 sm:flex-row sm:items-baseline">
                <span className="shrink-0 font-mono text-[13px] text-fg sm:w-56">
                  {m.repo ? (
                    <a href={m.repo} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      {m.title} <span className="text-fg-dim">↗</span>
                    </a>
                  ) : (
                    m.title
                  )}
                </span>
                <span className="text-[13px] leading-snug text-fg-muted">{m.line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-mono text-[11px] text-fg-dim">
            more on{' '}
            <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-accent">
              github.com/{personal.github} ↗
            </a>
          </p>
        </div>
      </div>
    </Section>
  )
}
