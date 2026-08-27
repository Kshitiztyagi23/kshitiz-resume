'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { Wrench, Code2, Brain, BarChart3, Cloud, Database, Activity, Cpu } from 'lucide-react'

const { skills } = resumeData

const categoryMeta: Record<string, { icon: any; description: string }> = {
  'Software Engineering & Cloud': {
    icon: Code2,
    description: 'Core languages, backend frameworks, distributed databases, and cloud infrastructure',
  },
  'Applied Machine Learning & Deep Learning': {
    icon: Brain,
    description: 'Neural networks, computer vision, ONNX runtime optimization, and agentic systems',
  },
  'Data Analytics, BI & Big Data': {
    icon: BarChart3,
    description: 'Databricks architecture, SQL query patterns, clustering, and visual analytics dashboards',
  },
  'Signal Processing & Statistical Methods': {
    icon: Activity,
    description: 'Acoustic FFT processing, biosignals (EEG), data balancing, and hypothesis testing',
  },
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-24 bg-white border-b border-zinc-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-safety-600 font-semibold tracking-wider uppercase">
          <Wrench className="w-4 h-4" />
          <span>Technical Capabilities</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3">
          Skills & Technical Matrix
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mb-10">
          Core toolkits, frameworks, and infrastructure utilized in production and scientific research.
        </p>

        {/* Skills Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.entries(skills).map(([category, items], index) => {
            const meta = categoryMeta[category] || { icon: Database, description: '' }
            const Icon = meta.icon

            return (
              <motion.div
                key={category}
                className="p-6 rounded-xl border border-zinc-200 bg-white hover:border-orange-300 transition-all duration-200 interactive-card shadow-xs"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-orange-50 text-safety-600 border border-orange-200/70">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-950 tracking-tight font-mono">
                      {category}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-zinc-500 mb-4 font-sans">
                  {meta.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-50 text-zinc-800 border border-zinc-200/80 hover:border-orange-300 hover:text-safety-700 hover:bg-orange-50/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

