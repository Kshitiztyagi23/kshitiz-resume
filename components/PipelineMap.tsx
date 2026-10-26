'use client'

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import type { Pipeline, PipelineStage, StageKind } from '@/lib/pipelines'

const NODE_H = 56
const ROW_GAP = 22
const COL_GAP = 22
const LOOP_LANE = 34 // headroom for back edges routed over the top

const KIND: Record<StageKind, string> = {
  source: 'src',
  process: 'proc',
  model: 'model',
  store: 'store',
  serve: 'serve',
  human: 'human',
}

interface Props {
  pipeline: Pipeline
  name: string
}

export default function PipelineMap({ pipeline, name }: Props) {
  const { stages, edges } = pipeline
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [width, setWidth] = useState(0)

  // Reading order: left → right, then top → bottom
  const ordered = useMemo(
    () => [...stages].sort((a, b) => a.col - b.col || a.row - b.row),
    [stages],
  )
  const [selectedId, setSelectedId] = useState(ordered[0].id)
  const markerId = `arrow-${useId().replace(/:/g, '')}`

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const byId = useMemo(() => Object.fromEntries(stages.map((s) => [s.id, s])), [stages])
  const isBack = (from: string, to: string) => byId[to].col <= byId[from].col

  // Everything upstream and downstream of the selected stage (loops excluded)
  const { upstream, downstream } = useMemo(() => {
    const walk = (start: string, dir: 'up' | 'down') => {
      const seen = new Set<string>()
      const queue = [start]
      while (queue.length) {
        const cur = queue.shift()!
        for (const e of edges) {
          if (isBack(e.from, e.to)) continue
          const [a, b] = dir === 'down' ? [e.from, e.to] : [e.to, e.from]
          if (a === cur && !seen.has(b)) {
            seen.add(b)
            queue.push(b)
          }
        }
      }
      return seen
    }
    return { upstream: walk(selectedId, 'up'), downstream: walk(selectedId, 'down') }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, edges])

  const lit = (id: string) => id === selectedId || upstream.has(id) || downstream.has(id)
  const edgeLit = (from: string, to: string) => {
    if (isBack(from, to)) return from === selectedId || to === selectedId
    const up = (id: string) => id === selectedId || upstream.has(id)
    const down = (id: string) => id === selectedId || downstream.has(id)
    return (up(from) && up(to)) || (down(from) && down(to))
  }

  const cols = Math.max(...stages.map((s) => s.col)) + 1
  const rows = Math.max(...stages.map((s) => s.row)) + 1
  const hasLoop = edges.some((e) => isBack(e.from, e.to))
  const top = hasLoop ? LOOP_LANE : 2
  const height = top + rows * NODE_H + (rows - 1) * ROW_GAP + 2
  const nodeW = width > 0 ? (width - COL_GAP * (cols - 1)) / cols : 0
  const pos = (s: PipelineStage) => ({
    x: s.col * (nodeW + COL_GAP),
    y: top + s.row * (NODE_H + ROW_GAP),
  })

  const edgePath = (from: PipelineStage, to: PipelineStage) => {
    const a = pos(from)
    const b = pos(to)
    if (isBack(from.id, to.id)) {
      const ax = a.x + nodeW / 2
      const bx = b.x + nodeW / 2
      const lane = 12
      return { d: `M ${ax} ${a.y} V ${lane} H ${bx} V ${b.y}`, mid: { x: (ax + bx) / 2, y: lane } }
    }
    const x1 = a.x + nodeW
    const y1 = a.y + NODE_H / 2
    const x2 = b.x
    const y2 = b.y + NODE_H / 2
    if (y1 === y2) return { d: `M ${x1} ${y1} H ${x2}`, mid: null }
    const mx = x1 + (x2 - x1) / 2
    return { d: `M ${x1} ${y1} H ${mx} V ${y2} H ${x2}`, mid: null }
  }

  const move = (delta: number) => {
    const i = ordered.findIndex((s) => s.id === selectedId)
    const next = ordered[(i + delta + ordered.length) % ordered.length]
    setSelectedId(next.id)
    nodeRefs.current[next.id]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      move(1)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      move(-1)
    }
  }

  const selected = byId[selectedId]
  const selectedIndex = ordered.findIndex((s) => s.id === selectedId)
  const inputs = edges.filter((e) => e.to === selectedId).map((e) => byId[e.from].label)
  const outputs = edges.filter((e) => e.from === selectedId).map((e) => byId[e.to].label)

  return (
    <div className="rounded border border-line bg-ink-950">
      {/* Title bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line px-3 py-2 font-mono text-[11px]">
        <span className="text-fg-muted">
          <span className="text-fg-dim">arch://</span>
          {name}
        </span>
        <span className="text-fg-dim">{pipeline.caption}</span>
      </div>

      {/* Graph (md+) */}
      <div className="hidden md:block px-4 pt-5 pb-4">
        <div
          ref={containerRef}
          className="relative"
          style={{ height }}
          role="group"
          aria-label={`${name} architecture. Use arrow keys to step through stages.`}
          onKeyDown={onKeyDown}
        >
          {width > 0 && (
            <>
              <svg className="absolute inset-0 overflow-visible" width={width} height={height} aria-hidden="true">
                <defs>
                  {['idle', 'lit'].map((state) => (
                    <marker
                      key={state}
                      id={`${markerId}-${state}`}
                      viewBox="0 0 8 8"
                      refX="8"
                      refY="4"
                      markerWidth="7"
                      markerHeight="7"
                      markerUnits="userSpaceOnUse"
                      orient="auto"
                    >
                      <path d="M0,0 L8,4 L0,8 z" fill={state === 'lit' ? '#FF6A1A' : '#4A535C'} />
                    </marker>
                  ))}
                </defs>
                {edges.map((e) => {
                  const on = edgeLit(e.from, e.to)
                  const back = isBack(e.from, e.to)
                  const { d, mid } = edgePath(byId[e.from], byId[e.to])
                  return (
                    <g key={`${e.from}-${e.to}`}>
                      <path
                        d={d}
                        fill="none"
                        stroke={on ? '#FF6A1A' : '#4A535C'}
                        strokeWidth={on ? 1.5 : 1}
                        strokeDasharray={back ? '4 4' : undefined}
                        markerEnd={`url(#${markerId}-${on ? 'lit' : 'idle'})`}
                        className="transition-[stroke] duration-150"
                      />
                      {mid && e.label && (
                        <text
                          x={mid.x}
                          y={mid.y - 5}
                          textAnchor="middle"
                          className="font-mono"
                          fontSize="10"
                          fill={on ? '#FF6A1A' : '#7C858E'}
                        >
                          {e.label}
                        </text>
                      )}
                    </g>
                  )
                })}
              </svg>

              {ordered.map((s) => {
                const { x, y } = pos(s)
                const active = s.id === selectedId
                return (
                  <button
                    key={s.id}
                    ref={(el) => {
                      nodeRefs.current[s.id] = el
                    }}
                    type="button"
                    aria-pressed={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setSelectedId(s.id)}
                    className={`absolute flex flex-col justify-center gap-0.5 rounded-sm border px-2.5 text-left transition-[border-color,opacity,background-color] duration-150 ${
                      active
                        ? 'border-accent bg-ink-850'
                        : lit(s.id)
                          ? 'border-line-strong bg-ink-900 hover:border-fg-dim'
                          : 'border-line bg-ink-900 opacity-45 hover:opacity-80'
                    }`}
                    style={{ left: x, top: y, width: nodeW, height: NODE_H }}
                  >
                    <span className={`font-mono text-[10px] leading-none ${active ? 'text-accent' : 'text-fg-dim'}`}>
                      {KIND[s.kind]}
                    </span>
                    <span className="font-mono text-[12px] leading-tight text-fg line-clamp-2">{s.label}</span>
                  </button>
                )
              })}
            </>
          )}
        </div>
      </div>

      {/* Stage list (mobile) */}
      <ol className="md:hidden divide-y divide-line">
        {ordered.map((s, i) => {
          const active = s.id === selectedId
          return (
            <li key={s.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedId(s.id)}
                className={`flex w-full items-baseline gap-3 px-3 py-2 text-left font-mono text-xs ${
                  active ? 'bg-ink-850 text-fg' : 'text-fg-muted'
                }`}
              >
                <span className={active ? 'text-accent' : 'text-fg-dim'}>{String(i + 1).padStart(2, '0')}</span>
                <span className="w-10 shrink-0 text-[10px] text-fg-dim">{KIND[s.kind]}</span>
                <span>{s.label}</span>
              </button>
            </li>
          )
        })}
      </ol>

      {/* Stage inspector */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-line px-4 py-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0" aria-live="polite">
          <div className="font-mono text-[11px] text-fg-dim">
            stage {String(selectedIndex + 1).padStart(2, '0')}/{String(ordered.length).padStart(2, '0')}
            <span className="mx-2 text-line-strong">|</span>
            <span className="text-accent">{KIND[selected.kind]}</span>
          </div>
          <div className="mt-1 font-mono text-sm font-medium text-fg">{selected.label}</div>
          <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-fg-muted">{selected.detail}</p>
        </div>
        <dl className="grid grid-cols-[auto_minmax(0,1fr)] content-start gap-x-3 gap-y-1 font-mono text-[11px] sm:max-w-[260px]">
          <dt className="text-fg-dim">in</dt>
          <dd className="text-fg-muted">{inputs.length ? inputs.join(', ') : '—'}</dd>
          <dt className="text-fg-dim">out</dt>
          <dd className="text-fg-muted">{outputs.length ? outputs.join(', ') : '—'}</dd>
          {selected.tech && (
            <>
              <dt className="text-fg-dim">uses</dt>
              <dd className="text-syn-str">{selected.tech.join(', ')}</dd>
            </>
          )}
        </dl>
      </div>
    </div>
  )
}
