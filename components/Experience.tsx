'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { SectionHeader } from './Education'
import { AnimatedHeader, StaggerList, StaggerItem } from './animations'

const { experience } = resumeData

export default function Experience() {
  return (
    <section id="experience" className="py-14 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedHeader>
          <SectionHeader title="Work Experience" subtitle="Professional journey" />
        </AnimatedHeader>

        <StaggerList className="mt-12 space-y-6">
          {experience.map((job, i) => (
            <StaggerItem key={i}>
              <motion.div
                className="relative p-7 rounded-2xl border border-dark-border bg-dark-card overflow-hidden group"
                whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.3)', boxShadow: '0 8px 40px rgba(0,212,255,0.15)' }}
                transition={{ duration: 0.25 }}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/3 to-accent-purple/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">{job.role}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-accent-cyan font-semibold text-sm">@ {job.company}</span>
                      </div>
                    </div>
                    <span className="shrink-0 tag tag-cyan font-mono text-xs">{job.period}</span>
                  </div>

                  {/* Objective */}
                  <p className="text-sm text-text-muted italic border-l-2 border-accent-cyan/40 pl-3 mb-5 leading-relaxed">
                    {job.objective}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-2.5 mb-5">
                    {job.bullets.map((b, j) => (
                      <motion.li
                        key={j}
                        className="flex gap-3 text-sm text-text-secondary leading-relaxed"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.08 + 0.2, duration: 0.4 }}
                      >
                        <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                        {b}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Results */}
                  <div className="p-4 rounded-xl bg-accent-green/5 border border-accent-green/15">
                    <p className="text-xs font-semibold text-accent-green uppercase tracking-wider mb-2">
                      Results
                    </p>
                    {job.results.map((r, j) => (
                      <p key={j} className="text-sm text-text-secondary flex gap-2">
                        <span className="text-accent-green">✓</span>
                        {r}
                      </p>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {job.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="tag tag-cyan text-xs"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.15 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  )
}
