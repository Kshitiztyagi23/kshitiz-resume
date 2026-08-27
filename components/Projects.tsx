'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { resumeData, ProjectItem } from '@/lib/data'
import { FolderGit2, Sparkles, ExternalLink, Layers, ArrowUpRight } from 'lucide-react'

const { projects } = resumeData

const categories = [
  'All',
  'SDE & Full-Stack',
  'Machine Learning & AI',
  'Data Analytics & BI',
  'Biosignals & Robotics',
] as const

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="py-20 md:py-24 bg-zinc-50/50 border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-safety-600 font-semibold tracking-wider uppercase">
          <FolderGit2 className="w-4 h-4" />
          <span>Engineered Systems & Research</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-2">
              Featured Projects & Implementations
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base max-w-2xl">
              From neuromorphic spiking neural networks and EEG decoding to big-data visual analytics and autonomous robotics.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-zinc-200/60">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 ${
                  isActive
                    ? 'bg-safety-500 text-white font-semibold shadow-xs'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Projects Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className={`group flex flex-col justify-between bg-white rounded-xl border p-6 transition-all duration-200 interactive-card ${
                  project.featured
                    ? 'border-orange-300 shadow-xs ring-1 ring-orange-400/20'
                    : 'border-zinc-200 shadow-xs'
                }`}
              >
                <div>
                  {/* Top Bar: Category & Period */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded ${
                        project.featured
                          ? 'bg-orange-50 text-orange-800 border border-orange-200 font-semibold'
                          : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">{project.period}</span>
                  </div>

                  {/* Title & Context */}
                  <h3 className="text-lg font-bold text-zinc-950 tracking-tight group-hover:text-safety-600 transition-colors flex items-center justify-between">
                    <span>{project.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-safety-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <div className="text-xs text-zinc-500 font-mono mb-3">{project.context}</div>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm text-zinc-700 font-medium mb-4 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Metric Pill if available */}
                  {project.metrics && (
                    <div className="text-[11px] font-mono font-semibold text-safety-700 bg-orange-50 px-2.5 py-1 rounded border border-orange-200/80 mb-4 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-safety-500 shrink-0" />
                      <span>{project.metrics}</span>
                    </div>
                  )}

                  {/* Bullet Points */}
                  <ul className="space-y-1.5 mb-5 text-xs text-zinc-600 leading-relaxed">
                    {project.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-safety-500 font-bold shrink-0">·</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Tech Tags */}
                <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 text-zinc-600 border border-zinc-200/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

