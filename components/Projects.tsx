'use client'

import { Fragment, useState } from 'react'
import { resumeData, type ProjectItem } from '@/lib/data'
import { slugify } from '@/lib/site'
import { Section, Panel, Tags, MetricList } from '@/components/ui'
import PipelineMap from '@/components/PipelineMap'

const { projects } = resumeData

const filters: { flag: string; category?: ProjectItem['category'] }[] = [
  { flag: '--all' },
  { flag: '--sde', category: 'SDE & Full-Stack' },
  { flag: '--ml', category: 'Machine Learning & AI' },
  { flag: '--data', category: 'Data Analytics & BI' },
  { flag: '--bio', category: 'Biosignals & Robotics' },
]

function FeaturedProject({ p }: { p: ProjectItem }) {
  return (
    <Panel id={`project-${slugify(p.name)}`} title={`projects/${slugify(p.name)}`} meta={p.period}>
      <div className="grid grid-cols-12 gap-x-8 gap-y-5 px-4 py-6 sm:px-5">
        <div className="col-span-12 md:col-span-5">
          <h3 className="font-mono text-2xl font-semibold tracking-tight text-fg">{p.name}</h3>
          <p className="mt-2 text-[15px] leading-snug text-fg">{p.tagline}</p>
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-fg-dim">{p.context}</p>
          {p.metrics && <MetricList value={p.metrics} className="mt-4" />}
        </div>
        <div className="col-span-12 md:col-span-7">
          <ul className="space-y-2">
            {p.bullets.map((b) => (
              <li key={b} className="grid grid-cols-[1rem_minmax(0,1fr)] text-sm leading-relaxed text-fg-muted">
                <span className="font-mono text-fg-dim">-</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <Tags items={p.tags} className="mt-4" />
        </div>
      </div>
      {p.pipeline && (
        <div className="border-t border-line px-4 py-5 sm:px-5">
          <PipelineMap pipeline={p.pipeline} name={slugify(p.name)} />
        </div>
      )}
    </Panel>
  )
}

export default function Projects() {
  const [flag, setFlag] = useState('--all')
  const [openRow, setOpenRow] = useState<string | null>(null)

  const featured = projects.filter((p) => p.featured)
  const active = filters.find((f) => f.flag === flag)!
  const rows = active.category ? projects.filter((p) => p.category === active.category) : projects

  return (
    <Section
      id="projects"
      index="03"
      title="Projects"
      cmd="ls projects/ --sort=impact"
      note="Click any stage in a diagram to inspect it, or step through with the arrow keys. The full index is below."
    >
      <div className="space-y-8">
        {featured.map((p) => (
          <FeaturedProject key={p.name} p={p} />
        ))}
      </div>

      {/* Full index */}
      <div className="mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-3">
          <h3 className="font-mono text-sm text-fg">
            index <span className="text-fg-dim">({rows.length})</span>
          </h3>
          <div className="flex flex-wrap gap-1 font-mono text-[11px]" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f.flag}
                type="button"
                aria-pressed={flag === f.flag}
                onClick={() => setFlag(f.flag)}
                className={`h-7 rounded-sm border px-2 transition-colors ${
                  flag === f.flag
                    ? 'border-accent text-accent'
                    : 'border-transparent text-fg-dim hover:border-line-strong hover:text-fg'
                }`}
              >
                {f.flag}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full table-fixed border-collapse text-left">
          <thead className="font-mono text-[11px] text-fg-dim">
            <tr className="border-b border-line">
              <th className="w-10 py-2 font-normal">#</th>
              <th className="py-2 font-normal">project</th>
              <th className="hidden w-40 py-2 font-normal md:table-cell">area</th>
              <th className="hidden w-40 py-2 font-normal lg:table-cell">period</th>
              <th className="w-8 py-2" />
            </tr>
          </thead>
          <tbody>
            {rows.map((p, i) => {
              const open = openRow === p.name
              const detailId = `row-${slugify(p.name)}`
              return (
                <Fragment key={p.name}>
                  <tr
                    className={`cursor-pointer border-b border-line align-top transition-colors hover:bg-ink-900 ${
                      open ? 'bg-ink-900' : ''
                    }`}
                    onClick={() => setOpenRow(open ? null : p.name)}
                  >
                    <td className="py-3 font-mono text-xs text-fg-dim">{String(i + 1).padStart(2, '0')}</td>
                    <td className="py-3 pr-4">
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={detailId}
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenRow(open ? null : p.name)
                        }}
                        className="text-left"
                      >
                        <span className={`font-mono text-sm ${open ? 'text-accent' : 'text-fg'}`}>{p.name}</span>
                        {p.featured && <span className="ml-2 font-mono text-[10px] text-fg-dim">[featured]</span>}
                        <span className="mt-0.5 block text-[13px] leading-snug text-fg-muted">{p.tagline}</span>
                      </button>
                    </td>
                    <td className="hidden py-3 pr-4 font-mono text-[11px] leading-5 text-fg-muted md:table-cell">
                      {p.category}
                    </td>
                    <td className="hidden py-3 pr-4 font-mono text-[11px] leading-5 text-fg-dim lg:table-cell">
                      {p.period}
                    </td>
                    <td className="py-3 text-right font-mono text-xs text-fg-dim" aria-hidden="true">
                      {open ? '−' : '+'}
                    </td>
                  </tr>
                  {open && (
                    <tr id={detailId} className="border-b border-line bg-ink-900">
                      <td />
                      <td colSpan={4} className="pb-6 pr-4 pt-1">
                        <p className="font-mono text-[11px] text-fg-dim">{p.context}</p>
                        <ul className="mt-3 space-y-1.5">
                          {p.bullets.map((b) => (
                            <li
                              key={b}
                              className="grid grid-cols-[1rem_minmax(0,1fr)] text-sm leading-relaxed text-fg-muted"
                            >
                              <span className="font-mono text-fg-dim">-</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        {p.metrics && <MetricList value={p.metrics} className="mt-3" />}
                        <Tags items={p.tags} className="mt-3" />
                        {p.pipeline && !p.featured && (
                          <div className="mt-5">
                            <PipelineMap pipeline={p.pipeline} name={slugify(p.name)} />
                          </div>
                        )}
                        {p.featured && (
                          <a
                            href={`#project-${slugify(p.name)}`}
                            className="mt-4 inline-block font-mono text-[11px] text-accent hover:underline"
                          >
                            → view architecture above
                          </a>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </Section>
  )
}
