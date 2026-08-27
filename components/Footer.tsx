'use client'

import { useState } from 'react'
import { resumeData } from '@/lib/data'
import { Mail, Copy, Check, ArrowUpRight, Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/Icons'

const { personal } = resumeData

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-24 bg-white border-b border-zinc-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-orange-50 text-orange-800 border border-orange-200 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-safety-500" />
            Let&apos;s Connect
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight mb-4">
            Interested in Collaborating?
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed font-sans">
            I am actively looking for impactful AI/ML engineering roles, research attachments, and systems projects. Feel free to reach out via email or connect on social platforms.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-safety-500 hover:bg-safety-600 text-white font-semibold text-sm shadow-sm transition-all hover:shadow-orange-glow"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 text-sm font-mono shadow-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied {personal.email}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-400" />
                  <span>{personal.email}</span>
                </>
              )}
            </button>

            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 text-sm font-mono shadow-xs transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-zinc-600" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 text-sm font-mono shadow-xs transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-blue-600" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer Bar */}
      <footer className="py-8 bg-zinc-50 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div>
            © {new Date().getFullYear()} {personal.name} · Department of BSBE, IIT Kanpur
          </div>
          <div className="flex items-center gap-1 text-zinc-600">
            <span>Built with</span>
            <span className="font-semibold text-zinc-900">Next.js 15</span>
            <span>·</span>
            <span className="font-semibold text-safety-600">Safety Orange</span>
            <span>&</span>
            <span className="font-semibold text-zinc-900">Tailwind</span>
          </div>
        </div>
      </footer>
    </>
  )
}

