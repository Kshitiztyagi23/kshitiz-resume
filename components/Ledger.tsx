'use client'

import { useEffect, useState } from 'react'
import type { WorkItem } from '@/lib/content'
import type { Pipeline } from '@/lib/pipelines'
import PipelineMap from '@/components/PipelineMap'

// Wiring diagram of a pipeline: boxes and wires only, no labels.
function Schematic({ pipeline, active }: { pipeline: Pipeline; active: boolean }) {
  const CW = 34
  const RH = 16
  const W = 22
  const H = 9
  const byId = Object.fromEntries(pipeline.stages.map((s) => [s.id, s]))
  const isBack = (from: string, to: string) => byId[to].col <= byId[from].col
  const cols = Math.max(...pipeline.stages.map((s) => s.col)) + 1
  const rows = Math.max(...pipeline.stages.map((s) => s.row)) + 1
  const top = pipeline.edges.some((e) => isBack(e.from, e.to)) ? 8 : 1
  const x = (c: number) => c * CW + 1
  const y = (r: number) => top + r * RH
  const stroke = active ? 'stroke-accent' : 'stroke-line-strong group-hover:stroke-fg-dim'

  return (
    <svg
      viewBox={`0 0 ${(cols - 1) * CW + W + 2} ${top + (rows - 1) * RH + H + 1}`}
      className="h-auto w-full"
      aria-hidden="true"
    >
      {pipeline.edges.map((e) => {
        const a = byId[e.from]
        const b = byId[e.to]
        const back = isBack(e.from, e.to)
        const d = back
          ? `M ${x(a.col) + W / 2} ${y(a.row)} V 2 H ${x(b.col) + W / 2} V ${y(b.row)}`
          : `M ${x(a.col) + W} ${y(a.row) + H / 2} H ${x(a.col) + W + (CW - W) / 2} V ${y(b.row) + H / 2} H ${x(b.col)}`
        return (
          <path
            key={`${e.from}-${e.to}`}
            d={d}
            fill="none"
            strokeWidth="1"
            strokeDasharray={back ? '2 2' : undefined}
            className={`transition-colors ${stroke}`}
          />
        )
      })}
      {pipeline.stages.map((s) => (
        <rect
          key={s.id}
          x={x(s.col)}
          y={y(s.row)}
          width={W}
          height={H}
          rx="1"
          strokeWidth="1"
          className={`fill-ink-950 transition-colors ${stroke}`}
        />
      ))}
    </svg>
  )
}

interface RowProps {
  item: WorkItem
  open: boolean
  onToggle: () => void
  variant: 'impact' | 'project'
}

function Row({ item, open, onToggle, variant }: RowProps) {
  const detailId = `${item.slug}-detail`

  return (
    <li
      id={item.slug}
      className={`group scroll-mt-20 border-b border-l-2 border-b-line pl-4 transition-colors md:pl-6 ${
        open ? 'border-l-accent' : 'border-l-transparent hover:border-l-line-strong'
      }`}
    >
      <div className="grid grid-cols-1 gap-x-10 gap-y-3 py-7 md:grid-cols-[12rem_minmax(0,1fr)_8.5rem]">
        {/* Lead column: the number for experience, the domain for projects */}
        {variant === 'impact' ? (
          <div>
            <div className="font-mono text-4xl font-semibold leading-none tracking-tight text-fg md:text-5xl">
              {item.stat!.value}
            </div>
            <div className="mt-2 max-w-[12rem] text-[12px] leading-snug text-fg-dim">{item.stat!.label}</div>
          </div>
        ) : (
          <div className="font-mono text-xs md:pt-2">
            <div className="text-accent">{item.context?.split(' · ')[0]}</div>
            <div className="mt-1 text-fg-dim">{item.context?.split(' · ').slice(1).join(' · ')}</div>
          </div>
        )}

        <div className="min-w-0">
          <h4>
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-controls={detailId}
              className={`text-left font-semibold tracking-tight transition-colors hover:text-accent ${
                variant === 'project' ? 'text-2xl sm:text-[28px]' : 'text-lg'
              } ${open ? 'text-accent' : 'text-fg'}`}
            >
              {item.title}
            </button>
          </h4>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-fg-muted">{item.line}</p>
          {item.metric && <p className="mt-2 font-mono text-[11px] text-syn-num">{item.metric}</p>}
          <p className="mt-3 font-mono text-[11px] text-fg-dim">{item.tags.join('  /  ')}</p>
        </div>

        <div className="flex items-center gap-5 md:flex-col md:items-end md:gap-3">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={detailId}
            className={`font-mono text-[11px] transition-colors ${open ? 'text-accent' : 'text-fg-muted hover:text-fg'}`}
          >
            {open ? '▾ architecture' : '▸ architecture'}
          </button>
          {item.repo && (
            <a
              href={item.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-fg-muted hover:text-accent"
            >
              github ↗
            </a>
          )}
          <div className="hidden w-24 md:block">
            <Schematic pipeline={item.pipeline} active={open} />
          </div>
        </div>
      </div>

      {open && (
        <div id={detailId} className="pb-9">
          <dl className="mb-6 grid max-w-3xl md:ml-[calc(12rem+2.5rem)] grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 gap-y-2.5">
            {(
              [
                ['problem', item.problem],
                ['what I did', item.built],
                ['result', item.outcome],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="pt-0.5 font-mono text-[11px] text-fg-dim">{k}</dt>
                <dd className="text-sm leading-relaxed text-fg">{v}</dd>
              </div>
            ))}
          </dl>
          <PipelineMap pipeline={item.pipeline} name={item.slug} />
        </div>
      )}
    </li>
  )
}

export default function Ledger({ items, variant }: { items: WorkItem[]; variant: 'impact' | 'project' }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  // In-page links (#slug) open the matching row
  useEffect(() => {
    const fromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1))
      if (items.some((w) => w.slug === slug)) {
        setOpenSlug(slug)
        requestAnimationFrame(() => document.getElementById(slug)?.scrollIntoView({ block: 'start' }))
      }
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [items])

  return (
    <ol className="border-t border-line">
      {items.map((item) => (
        <Row
          key={item.slug}
          item={item}
          variant={variant}
          open={openSlug === item.slug}
          onToggle={() => setOpenSlug((cur) => (cur === item.slug ? null : item.slug))}
        />
      ))}
    </ol>
  )
}
