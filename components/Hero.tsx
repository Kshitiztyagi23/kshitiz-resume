'use client'

import { useState } from 'react'
import { resumeData } from '@/lib/data'
import { resumeHref } from '@/lib/site'
import { Frame } from '@/components/ui'

const { personal } = resumeData

const profile: [string, string | number | string[]][] = [
  ['focus', 'ML systems · data · software'],
  ['school', 'IIT Kanpur, B.Tech BSBE ’27'],
  ['cpi', 8.8],
  ['interned', ['Battery Smart', 'Skaeo']],
  ['paper', 'CogSci 2026, first author'],
  ['status', 'open to SDE / DS / DA roles'],
]

const signals = [
  { value: '3–5s', label: 'flagged error → committed fix', src: 'Battery Smart' },
  { value: '0', label: 'duplicate commits across autoscaled pods', src: 'Battery Smart' },
  { value: '0.84→0.96', label: 'detection confidence after bias fix', src: 'YOLO · 94,924-image eval' },
  { value: '91.3%', label: 'motion dominance over Prägnanz', src: 'CogSci 2026 · N = 46' },
]

function JsonValue({ v }: { v: string | number | string[] }) {
  if (typeof v === 'number') return <span className="text-syn-num">{v}</span>
  if (Array.isArray(v))
    return (
      <>
        [
        {v.map((s, i) => (
          <span key={s}>
            <span className="text-syn-str">&quot;{s}&quot;</span>
            {i < v.length - 1 && ', '}
          </span>
        ))}
        ]
      </>
    )
  return <span className="text-syn-str">&quot;{v}&quot;</span>
}

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="about" className="border-b border-line pt-28 md:pt-36">
      <Frame className="grid grid-cols-12 gap-x-8 gap-y-12 pb-16 md:pb-20">
        <div className="col-span-12 lg:col-span-7">
          <p className="font-mono text-xs text-fg-dim">
            <span className="text-accent">kshitiz@iitk</span>:~$ whoami
          </p>
          <h1 className="cursor-block mt-5 font-mono text-[44px] font-semibold leading-[1.02] tracking-tight text-fg sm:text-7xl">
            Kshitiz
            <br />
            Tyagi
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-snug text-fg sm:text-xl">
            Production ML systems, data pipelines and the analytics infrastructure around them.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
            Fourth-year at IIT Kanpur. Interned at Battery Smart and Skaeo, shipping a self-correcting assistant, a
            meeting-knowledge pipeline, and computer vision fixes into production. First author at CogSci 2026.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <a href={`mailto:${personal.email}`} className="btn-primary">
              email
            </a>
            <button type="button" onClick={copyEmail} className="btn" aria-live="polite">
              {copied ? <span className="text-syn-str">copied ✓</span> : personal.email}
            </button>
            <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" className="btn">
              github ↗
            </a>
            <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn">
              linkedin ↗
            </a>
            <a href={resumeHref} target="_blank" rel="noopener noreferrer" className="btn">
              cv.pdf
            </a>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:pt-10">
          <div className="rounded border border-line bg-ink-900">
            <div className="flex items-center justify-between border-b border-line bg-ink-850 px-4 py-2 font-mono text-[11px] text-fg-dim">
              <span className="text-fg-muted">profile.json</span>
              <span>{personal.location}</span>
            </div>
            <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-6 text-fg-muted">
              {'{\n'}
              {profile.map(([k, v], i) => (
                <span key={k}>
                  {'  '}
                  <span className="text-fg">&quot;{k}&quot;</span>: <JsonValue v={v} />
                  {i < profile.length - 1 ? ',' : ''}
                  {'\n'}
                </span>
              ))}
              {'}'}
            </pre>
          </div>
        </div>
      </Frame>

      {/* Signal strip */}
      <div className="border-t border-line">
        <Frame>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {signals.map((s, i) => (
              <div
                key={s.label}
                className={`py-6 pr-4 ${i % 2 === 1 ? 'pl-4 border-l border-line' : ''} ${
                  i >= 2 ? 'border-t border-line lg:border-t-0' : ''
                } ${i === 2 ? 'lg:pl-4 lg:border-l' : ''}`}
              >
                <div className="font-mono text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{s.value}</div>
                <div className="mt-2 text-[13px] leading-snug text-fg-muted">{s.label}</div>
                <div className="mt-1 font-mono text-[11px] text-fg-dim">{s.src}</div>
              </div>
            ))}
          </div>
        </Frame>
      </div>
    </section>
  )
}
