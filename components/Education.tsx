'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { AnimatedHeader, StaggerList, StaggerItem } from './animations'

const { education } = resumeData

export default function Education() {
  return (
    <section id="education" className="pt-10 pb-14 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedHeader>
          <SectionHeader title="Academic Qualifications" subtitle="My educational journey" />
        </AnimatedHeader>

        <StaggerList className="mt-12 space-y-4">
          {education.map((edu, i) => (
            <StaggerItem key={i}>
              <motion.div
                className="group relative p-6 rounded-2xl border border-dark-border bg-dark-card card-hover"
                whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.3)', boxShadow: '0 8px 40px rgba(0,212,255,0.12)' }}
                transition={{ duration: 0.25 }}
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-gradient-to-b from-accent-cyan to-accent-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Year badge */}
                  <div className="shrink-0">
                    <span className="tag tag-cyan font-mono text-xs">{edu.year}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-base font-bold text-text-primary">{edu.degree}</h3>
                      <span className="text-text-muted text-sm">&bull;</span>
                      <span className="text-sm text-text-secondary">{edu.institute}</span>
                    </div>
                    <p className="text-xs text-text-muted mt-1">{edu.type}</p>
                  </div>

                  {/* Score */}
                  <div className="shrink-0 text-right">
                    <div className="text-xl font-extrabold text-gradient">{edu.score}</div>
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

export function SectionHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div>
      <p className="text-xs font-mono text-accent-cyan uppercase tracking-widest mb-2">
        {'// '}{subtitle}
      </p>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary section-heading">
        {title}
      </h2>
    </div>
  )
}
