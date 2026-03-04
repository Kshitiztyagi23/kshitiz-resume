'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { SectionHeader } from './Education'
import { AnimatedHeader, StaggerList, StaggerItem } from './animations'

const { projects } = resumeData

const colorMap: Record<string, { tag: string; border: string; glow: string; dot: string }> = {
  cyan: {
    tag: 'tag-cyan',
    border: 'hover:border-accent-cyan/40',
    glow: 'hover:bg-accent-cyan/3',
    dot: 'bg-accent-cyan',
  },
  purple: {
    tag: 'tag-purple',
    border: 'hover:border-accent-purple/40',
    glow: 'hover:bg-accent-purple/3',
    dot: 'bg-accent-purple',
  },
  green: {
    tag: 'tag-green',
    border: 'hover:border-accent-green/40',
    glow: 'hover:bg-accent-green/3',
    dot: 'bg-accent-green',
  },
  orange: {
    tag: 'tag-orange',
    border: 'hover:border-orange-500/40',
    glow: 'hover:bg-orange-500/3',
    dot: 'bg-orange-400',
  },
}

export default function Projects() {
  return (
    <section id="projects" className="py-14 px-6 bg-dark-card/30">
      <div className="max-w-6xl mx-auto">
        <AnimatedHeader>
          <SectionHeader title="Key Projects" subtitle="What I've built" />
        </AnimatedHeader>

        <StaggerList className="mt-12 grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {projects.map((project, i) => {
            const c = colorMap[project.color] ?? colorMap.cyan
            return (
              <StaggerItem key={i} variant="scaleIn">
                <motion.div
                  className={`group relative p-6 rounded-2xl border border-dark-border bg-dark-card h-full`}
                  whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Index number */}
                  <span className="absolute top-5 right-5 text-3xl font-black text-white/5 select-none font-mono">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Header */}
                  <div className="mb-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-text-primary leading-tight">
                        {project.name}
                      </h3>
                    </div>
                    <p className="text-xs text-text-muted mt-1 leading-snug">{project.context}</p>
                    <span className={`tag ${c.tag} mt-2 text-[11px]`}>{project.period}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Bullets (show first 3) */}
                  <ul className="space-y-1.5 mb-4">
                    {project.bullets.slice(0, 3).map((b, j) => (
                      <li key={j} className="flex gap-2.5 text-xs text-text-muted leading-relaxed">
                        <span className={`shrink-0 mt-1.5 w-1 h-1 rounded-full ${c.dot}`} />
                        {b}
                      </li>
                    ))}
                    {project.bullets.length > 3 && (
                      <li className="text-xs text-text-muted/60 pl-3.5">
                        +{project.bullets.length - 3} more…
                      </li>
                    )}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className={`tag ${c.tag} text-[10px]`}
                        whileHover={{ scale: 1.12 }}
                        transition={{ duration: 0.15 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerList>
      </div>
    </section>
  )
}
