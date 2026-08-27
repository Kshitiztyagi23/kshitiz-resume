'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { Users, Calendar, Award, CheckCircle2 } from 'lucide-react'

const { leadership } = resumeData

export default function Positions() {
  return (
    <section id="leadership" className="py-20 md:py-24 bg-zinc-50/50 border-b border-zinc-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-safety-600 font-semibold tracking-wider uppercase">
          <Users className="w-4 h-4" />
          <span>Leadership & Governance</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3">
          Positions of Responsibility
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mb-10">
          Directing campus research mentorship conclaves, multidisciplinary engineering teams, and institutional initiatives at IIT Kanpur.
        </p>

        {/* Leadership Cards */}
        <div className="space-y-6">
          {leadership.map((pos, index) => (
            <motion.div
              key={pos.role + pos.org}
              className="p-6 sm:p-7 rounded-xl border border-zinc-200 bg-white hover:border-orange-300 transition-all duration-200 interactive-card shadow-xs"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 mb-4 border-b border-zinc-100">
                <div>
                  <h3 className="text-lg font-bold text-zinc-950 tracking-tight flex items-center gap-2">
                    {pos.role}
                  </h3>
                  <div className="text-sm font-semibold text-safety-600 font-mono mt-0.5">
                    {pos.org}
                  </div>
                </div>

                <span className="badge-safety">
                  <Calendar className="w-3 h-3" />
                  {pos.period}
                </span>
              </div>

              <ul className="space-y-2 mb-5 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                {pos.initiatives.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <span className="text-safety-500 font-bold shrink-0 mt-0.5">·</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100">
                {pos.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-orange-50 text-orange-800 border border-orange-200/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

