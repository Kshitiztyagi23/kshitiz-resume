import { experience } from '@/lib/content'
import { Section } from '@/components/ui'
import Ledger from '@/components/Ledger'

export default function Experience() {
  return (
    <Section
      id="experience"
      index="01"
      title="Experience"
      note="Production work at two companies, result first. Open any row to see how it was built."
    >
      <div className="space-y-20">
        {experience.map((job) => (
          <article key={job.company}>
            {/* Same columns as the ledger rows below, so everything lines up */}
            <header className="mb-8 grid grid-cols-1 gap-x-10 gap-y-3 pl-[18px] md:grid-cols-[12rem_minmax(0,1fr)_8.5rem] md:pl-[26px]">
              <div className="font-mono text-xs leading-5 md:pt-3">
                <div className="text-fg-muted">{job.period}</div>
                <div className="text-fg-dim">{job.place}</div>
              </div>
              <div className="min-w-0">
                <h3 className="font-mono text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{job.company}</h3>
                <p className="mt-1 font-mono text-xs text-accent">{job.role}</p>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg">{job.summary}</p>
                {job.also.length > 0 && (
                  <ul className="mt-3 max-w-2xl space-y-1">
                    {job.also.map((a) => (
                      <li key={a} className="grid grid-cols-[1rem_minmax(0,1fr)] text-[13px] leading-relaxed text-fg-muted">
                        <span className="font-mono text-fg-dim">+</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </header>
            <Ledger items={job.items} variant="impact" />
          </article>
        ))}
      </div>
    </Section>
  )
}
