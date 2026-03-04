'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { SectionHeader } from './Education'
import { AnimatedHeader, StaggerList, StaggerItem } from './animations'

const { skills } = resumeData

const categoryIcons: Record<string, string> = {
  Languages: '{ }',
  Frameworks: '⚙️',
  Libraries: '📦',
  Tools: '🛠',
}

const categoryColors: Record<string, string> = {
  Languages: 'tag-cyan',
  Frameworks: 'tag-purple',
  Libraries: 'tag-green',
  Tools: 'tag-orange',
}

export default function Skills() {
  return (
    <section id="skills" className="py-14 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedHeader>
          <SectionHeader title="Technical Skills" subtitle="Tools & technologies" />
        </AnimatedHeader>

        <StaggerList className="mt-12 grid sm:grid-cols-2 gap-5">
          {Object.entries(skills).map(([category, items]) => (
            <StaggerItem key={category}>
              <motion.div
                className="p-6 rounded-2xl border border-dark-border bg-dark-card h-full"
                whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">{categoryIcons[category]}</span>
                  <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, idx) => (
                    <motion.span
                      key={skill}
                      className={`tag ${categoryColors[category] ?? 'tag-cyan'} text-xs cursor-default`}
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.04, duration: 0.3, ease: 'easeOut' }}
                      whileHover={{ scale: 1.15, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  )
}
