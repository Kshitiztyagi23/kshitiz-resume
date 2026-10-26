'use client'

import { useState } from 'react'
import { research } from '@/lib/content'
import { Section } from '@/components/ui'

function WinRateChart() {
  const [hover, setHover] = useState<string | null>(null)

  return (
    <figure className="rounded border border-line bg-ink-900 p-5">
      <figcaption className="font-mono text-[11px] text-fg-dim">motion’s win rate, head-to-head</figcaption>

      <div className="relative mt-6">
        {/* 50% = no preference */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 border-l border-dashed border-line-strong" aria-hidden="true" />
        <div className="space-y-5">
          {research.results.map((r) => (
            <div
              key={r.opponent}
              className="relative"
              onMouseEnter={() => setHover(r.opponent)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="mb-1.5 flex items-baseline justify-between text-[13px]">
                <span className="text-fg-muted">vs {r.opponent}</span>
                <span className="font-mono text-fg">{r.winRate}%</span>
              </div>
              <div className="h-3.5 w-full bg-ink-850" aria-hidden="true">
                <div
                  className={`h-full rounded-r-[4px] transition-colors ${hover === r.opponent ? 'bg-accent' : 'bg-accent-dim'}`}
                  style={{ width: `${r.winRate}%` }}
                />
              </div>
              {hover === r.opponent && (
                <div className="absolute right-0 top-full z-10 mt-2 rounded-sm border border-line-strong bg-ink-800 px-2 py-1 font-mono text-[11px] text-fg">
                  motion chosen over {r.opponent} in {r.winRate}% of trials
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-fg-dim" aria-hidden="true">
          <span>0%</span>
          <span>50% · no preference</span>
          <span>100%</span>
        </div>
      </div>

      <table className="sr-only">
        <caption>Motion’s win rate against each Gestalt cue</caption>
        <thead>
          <tr>
            <th>Opponent cue</th>
            <th>Motion win rate</th>
          </tr>
        </thead>
        <tbody>
          {research.results.map((r) => (
            <tr key={r.opponent}>
              <td>{r.opponent}</td>
              <td>{r.winRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex items-baseline gap-4 border-t border-line pt-5">
        <span className="font-mono text-3xl font-semibold tracking-tight text-fg">{research.rtOverhead.value}</span>
        <span className="text-[13px] leading-snug text-fg-muted">{research.rtOverhead.label}</span>
      </div>
    </figure>
  )
}

export default function Research() {
  const [first, ...rest] = research.authors.split(', ')
  return (
    <Section id="research" index="03" title="Research" note="Experiment design and statistical analysis, published as first author.">
      <div className="grid grid-cols-12 gap-x-8 gap-y-8">
        <div className="col-span-12 lg:col-span-7">
          <p className="font-mono text-[11px] text-fg-dim">
            <span className="text-accent">first author</span> · {research.format} · {research.venue}
          </p>
          <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
            {research.title}
          </h3>
          <p className="mt-3 font-mono text-xs text-fg-dim">
            <span className="text-fg">{first}</span>, {rest.join(', ')}
          </p>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fg-muted">{research.line}</p>
          <a
            href={research.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block font-mono text-xs text-accent hover:underline"
          >
            {research.linkLabel} ↗
          </a>

          <div className="mt-12 border-t border-line pt-5">
            <p className="font-mono text-[11px] text-fg-dim">{research.secondary.meta}</p>
            <p className="mt-1.5 text-[15px] font-medium text-fg">{research.secondary.title}</p>
            <p className="mt-1 text-[13px] text-fg-muted">{research.secondary.line}</p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <WinRateChart />
        </div>
      </div>
    </Section>
  )
}
