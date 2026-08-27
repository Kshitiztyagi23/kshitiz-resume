'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { 
  ArrowDown, 
  Copy, 
  Check, 
  Mail, 
  Sparkles, 
  GraduationCap, 
  Zap, 
  Cpu, 
  Database 
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/Icons'

const { personal, metrics } = resumeData

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="about"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-white bg-grid-pattern border-b border-zinc-200/80"
    >
      {/* Subtle Warm Radial Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-orange-500/10 via-orange-500/5 to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Availability / Status Chip */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-200 bg-orange-50/80 text-orange-900 text-xs font-mono mb-6 shadow-xs"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safety-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-safety-500" />
          </span>
          <span className="font-semibold text-zinc-900">{personal.status}</span>
        </motion.div>

        {/* Main Hero Header */}
        <div className="max-w-3xl mb-8">
          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold text-zinc-950 tracking-tight leading-[1.1] mb-5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Engineering <span className="text-safety-500">Scalable Systems</span>, Applied Machine Learning & Analytics.
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hi, I&apos;m <strong className="text-zinc-900 font-semibold">{personal.name}</strong>, an{' '}
            <strong className="text-zinc-900 font-semibold">Academic Excellence Award</strong> recipient and fourth-year undergraduate at{' '}
            <strong className="text-zinc-900 font-semibold">IIT Kanpur</strong> with hands-on internship experience engineering production{' '}
            <strong className="text-zinc-900 font-semibold">AI systems</strong>,{' '}
            <strong className="text-zinc-900 font-semibold">data pipelines</strong>, and{' '}
            <strong className="text-zinc-900 font-semibold">analytics infrastructure</strong> at{' '}
            <strong className="text-zinc-900 font-semibold">Battery Smart</strong> and{' '}
            <strong className="text-zinc-900 font-semibold">Skaeo</strong>. Published first-author researcher at{' '}
            <span className="inline-block font-mono text-xs px-2 py-0.5 rounded bg-orange-100/70 text-orange-800 border border-orange-200 font-semibold">
              CogSci 2026
            </span>.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap items-center gap-3 mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#experience"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-safety-500 hover:bg-safety-600 text-white font-medium text-sm shadow-sm transition-all hover:shadow-orange-glow"
          >
            <span>Explore Experience & Projects</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-medium text-sm shadow-xs transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-mono text-xs">Copied to clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-500" />
                <span>{personal.email}</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 pl-2">
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-safety-600 hover:border-orange-300 transition-colors shadow-xs"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-safety-600 hover:border-orange-300 transition-colors shadow-xs"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Live Metrics Bento Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {metrics.map((item, index) => {
            const icons = [GraduationCap, Zap, Cpu, Database]
            const Icon = icons[index] || Sparkles
            return (
              <div
                key={item.label}
                className={`p-4 rounded-xl border bg-white transition-all duration-200 interactive-card ${
                  item.highlight
                    ? 'border-orange-200 shadow-xs'
                    : 'border-zinc-200/90 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider font-mono">
                    {item.label}
                  </span>
                  <div
                    className={`p-1.5 rounded-md ${
                      item.highlight
                        ? 'bg-orange-50 text-safety-600'
                        : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono tracking-tight text-zinc-950">
                  {item.value}
                </div>
                <div className="text-xs text-zinc-500 mt-1 font-medium leading-relaxed">
                  {item.subtext}
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

