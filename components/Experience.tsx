'use client'

import { useState } from 'react'
import { resumeData, type WorkExperienceItem } from '@/lib/data'
import { slugify } from '@/lib/site'
import { Section, Panel, Tags, MetricList } from '@/components/ui'
import PipelineMap from '@/components/PipelineMap'

const { experience } = resumeData

function Highlight({
  h,
  index,
}: {
  h: WorkExperienceItem['highlights'][number]
  index: number
}) {
  const [open, setOpen] = useState(index === 0)
  const mapId = `arch-${slugify(h.title)}`

  return (
    <li className="border-t border-line px-4 py-5 sm:px-5">
      <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 md:grid-cols-[2rem_minmax(0,1fr)_13rem] md:gap-x-6">
        <span className="pt-0.5 font-mono text-xs text-fg-dim">{String(index + 1).padStart(2, '0')}</span>
        <div className="min-w-0">
          <h4 className="text-[15px] font-semibold leading-snug text-fg">{h.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{h.description}</p>
          {h.tags && <Tags items={h.tags} className="mt-3" />}
        </div>
        <div className="col-start-2 mt-4 md:col-start-3 md:mt-0 md:text-right">
          {h.metrics && <MetricList value={h.metrics} />}
          {h.pipeline && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={mapId}
              className={`mt-3 inline-flex h-7 items-center gap-1.5 rounded-sm border px-2 font-mono text-[11px] transition-colors ${
                open
                  ? 'border-accent text-accent'
                  : 'border-line-strong text-fg-muted hover:border-fg-dim hover:text-fg'
              }`}
            >
              <span aria-hidden="true">{open ? '▾' : '▸'}</span> architecture
            </button>
          )}
        </div>
      </div>
      {h.pipeline && open && (
        <div id={mapId} className="mt-5 md:ml-[2.75rem]">
          <PipelineMap pipeline={h.pipeline} name={slugify(h.title)} />
        </div>
      )}
    </li>
  )
}

export default function Experience() {
  return (
    <Section
      id="experience"
      index="01"
      title="Experience"
      cmd="git log --author=kshitiz --stat"
      note="Two production internships. Each shipped change is listed with its measured result; open the architecture to step through how it works."
    >
      <div className="space-y-8">
        {experience.map((job) => (
          <Panel
            key={job.company}
            title={
              <>
                <span className="text-fg">{slugify(job.company)}</span>
                <span className="text-fg-dim"> / {slugify(job.role)}</span>
              </>
            }
            meta={`${job.period} · ${job.location}`}
          >
            <div className="px-4 py-5 sm:px-5">
              <h3 className="text-xl font-semibold tracking-tight text-fg">
                {job.company}
                <span className="font-normal text-fg-dim"> — {job.role}</span>
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-fg-muted">{job.objective}</p>
            </div>

            <ol>
              {job.highlights.map((h, i) => (
                <Highlight key={h.title} h={h} index={i} />
              ))}
            </ol>

            <div className="border-t border-line bg-ink-950/40 px-4 py-5 sm:px-5">
              <div className="font-mono text-[11px] text-fg-dim">## outcome</div>
              <ul className="mt-3 space-y-2">
                {job.resultsSummary.map((r) => (
                  <li key={r} className="grid grid-cols-[1rem_minmax(0,1fr)] text-sm leading-relaxed text-fg-muted">
                    <span className="font-mono text-accent">›</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[11px] leading-relaxed text-fg-dim">
                stack: <span className="text-fg-muted">{job.stack.join(', ')}</span>
              </p>
            </div>
          </Panel>
        ))}
      </div>
    </Section>
  )
}
