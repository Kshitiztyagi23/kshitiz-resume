'use client'

import { useState } from 'react'
import { personal } from '@/lib/content'
import { resumeHref } from '@/lib/site'
import { Frame } from '@/components/ui'


export default function Footer() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const links = [
    { k: 'github', v: `github.com/${personal.github}`, href: personal.githubUrl },
    { k: 'linkedin', v: `linkedin.com/in/${personal.linkedin}`, href: personal.linkedinUrl },
    { k: 'resume', v: 'cv.pdf', href: resumeHref },
  ]

  return (
    <footer id="contact">
      <Frame className="grid grid-cols-12 gap-x-8 gap-y-10 py-20 md:py-28">
        <div className="col-span-12 lg:col-span-7">
          <p className="font-mono text-xs text-fg-dim">
            <span className="text-accent">$</span> contact --open
          </p>
          <h2 className="mt-4 font-mono text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-[44px]">
            Hiring for SDE, data science or analytics?
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-fg-muted">
            Email is the fastest way to reach me. Happy to walk through any of this work in detail.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:pt-12">
          <dl className="divide-y divide-line border-y border-line font-mono text-[13px]">
            <div className="grid grid-cols-[6rem_minmax(0,1fr)_auto] items-center gap-3 py-3">
              <dt className="text-fg-dim">email</dt>
              <dd className="truncate">
                <a href={`mailto:${personal.email}`} className="text-fg hover:text-accent">
                  {personal.email}
                </a>
              </dd>
              <dd>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="font-mono text-[11px] text-fg-dim hover:text-fg"
                  aria-live="polite"
                >
                  {copied ? <span className="text-syn-str">copied</span> : 'copy'}
                </button>
              </dd>
            </div>
            {links.map((l) => (
              <div key={l.k} className="grid grid-cols-[6rem_minmax(0,1fr)_auto] items-center gap-3 py-3">
                <dt className="text-fg-dim">{l.k}</dt>
                <dd className="truncate">
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-accent">
                    {l.v}
                  </a>
                </dd>
                <dd className="text-[11px] text-fg-dim" aria-hidden="true">
                  ↗
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Frame>

      <div className="border-t border-line">
        <Frame className="flex flex-col gap-2 py-6 font-mono text-[11px] text-fg-dim sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {personal.name} · IIT Kanpur
          </span>
          <span>next.js · static export · github pages</span>
        </Frame>
      </div>
    </footer>
  )
}
