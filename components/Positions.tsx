'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { SectionHeader } from './Education'
import { AnimatedHeader, StaggerList, StaggerItem } from './animations'

const { positions } = resumeData

export default function Positions() {
  return (
    <section id="positions" className="py-14 px-6 bg-dark-card/30">
      <div className="max-w-4xl mx-auto">
        <AnimatedHeader>
          <SectionHeader title="Positions of Responsibility" subtitle="Leadership & impact" />
        </AnimatedHeader>

        <StaggerList className="mt-12 space-y-5">
          {positions.map((pos, i) => (
            <StaggerItem key={i} variant="slideLeft">
              <motion.div
                className="group p-6 rounded-2xl border border-dark-border bg-dark-card relative overflow-hidden"
                whileHover={{ y: -4, borderColor: 'rgba(139,92,246,0.35)', boxShadow: '0 8px 40px rgba(139,92,246,0.12)' }}
                transition={{ duration: 0.25 }}
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-text-primary">{pos.role}</h3>
                      <p className="text-sm text-accent-purple mt-0.5">{pos.org}</p>
                    </div>
                    <span className="shrink-0 tag tag-purple font-mono text-xs">{pos.period}</span>
                  </div>

                  <ul className="space-y-2">
                    {pos.bullets.map((b, j) => (
                      <motion.li
                        key={j}
                        className="flex gap-3 text-sm text-text-secondary leading-relaxed"
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.07 + 0.15, duration: 0.35 }}
                      >
                        <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-purple" />
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  )
}
