import { resumeData } from '@/lib/data'
import { Section, Tags } from '@/components/ui'

const { publications } = resumeData

export default function Publications() {
  return (
    <Section
      id="research"
      index="02"
      title="Research"
      cmd="cat publications.bib"
      note="Experimental design and statistics on human behavior. First-author work presented at CogSci 2026 in Rio de Janeiro."
    >
      <div className="divide-y divide-line border-y border-line">
        {publications.map((p) => (
          <article key={p.title} className="grid grid-cols-12 gap-x-6 gap-y-4 py-8">
            <div className="col-span-12 font-mono text-xs md:col-span-3">
              <div className="text-3xl font-semibold tracking-tight text-fg">{p.year}</div>
              <dl className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1.5">
                <dt className="text-fg-dim">role</dt>
                <dd className={p.role === 'First Author' ? 'text-accent' : 'text-fg-muted'}>
                  {p.role.toLowerCase()}
                </dd>
                <dt className="text-fg-dim">status</dt>
                <dd className={p.status === 'Presented & Published' ? 'text-syn-str' : 'text-syn-num'}>
                  {p.status === 'Presented & Published' ? 'published' : 'under review'}
                </dd>
                {p.location && (
                  <>
                    <dt className="text-fg-dim">where</dt>
                    <dd className="text-fg-muted">{p.location}</dd>
                  </>
                )}
              </dl>
            </div>

            <div className="col-span-12 min-w-0 md:col-span-9">
              <h3 className="text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl">{p.title}</h3>
              <p className="mt-2 font-mono text-xs text-fg-dim">
                {p.venue} · {p.authors}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">{p.abstract}</p>

              <div className="mt-5 font-mono text-[11px] text-fg-dim">## findings</div>
              <ol className="mt-2 space-y-1.5">
                {p.findings.map((f, i) => (
                  <li key={f} className="grid grid-cols-[1.75rem_minmax(0,1fr)] text-sm leading-relaxed text-fg">
                    <span className="font-mono text-xs leading-6 text-fg-dim">{i + 1}.</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ol>
              <Tags items={p.tags} className="mt-5" />
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
