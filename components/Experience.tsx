'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { Briefcase, Building2, Calendar, CheckCircle2, Cpu, Zap, ChevronRight } from 'lucide-react'

const { experience } = resumeData

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-24 bg-white border-b border-zinc-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-safety-600 font-semibold tracking-wider uppercase">
          <Briefcase className="w-4 h-4" />
          <span>Work Experience & Production AI</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3">
          Engineering & Applied AI Internships
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mb-10">
          Building scalable distributed event pipelines, conversational knowledge extraction graphs, computer vision systems, and low-latency production microservices.
        </p>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experience.map((job, index) => (
            <motion.div
              key={job.company}
              className="bg-white rounded-xl border border-zinc-200 shadow-xs hover:border-orange-300 transition-all duration-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="p-6 sm:p-8">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-5 border-b border-zinc-100">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-950 tracking-tight flex items-center gap-2">
                      {job.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 font-mono text-xs text-zinc-600">
                      <span className="font-semibold text-safety-600 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        {job.company}
                      </span>
                      <span>·</span>
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="badge-safety">
                      <Calendar className="w-3 h-3" />
                      {job.period}
                    </span>
                  </div>
                </div>

                {/* Objective */}
                <div className="my-5 p-3.5 rounded-lg bg-zinc-50 border border-zinc-200/80 text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
                  <strong className="text-zinc-900 font-semibold font-mono text-xs uppercase block mb-1">
                    System Objective:
                  </strong>
                  {job.objective}
                </div>

                {/* High-Impact Engineering Modules */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono">
                    Architectural Contributions & Breakthroughs:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {job.highlights.map((item, hIndex) => (
                      <div
                        key={hIndex}
                        className="p-4 rounded-lg border border-zinc-200 bg-white hover:border-orange-200 transition-colors shadow-2xs"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h5 className="text-xs font-bold text-zinc-900 font-mono tracking-tight flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-safety-500 shrink-0" />
                            {item.title}
                          </h5>
                        </div>
                        <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                          {item.description}
                        </p>
                        {item.metrics && (
                          <div className="text-[11px] font-mono font-semibold text-safety-700 bg-orange-50 px-2 py-1 rounded border border-orange-200/60 mb-2">
                            ⚡ {item.metrics}
                          </div>
                        )}
                        {item.tags && (
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((t) => (
                              <span
                                key={t}
                                className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-100 text-zinc-600"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantified Production Results */}
                <div className="p-4 rounded-lg bg-orange-50/50 border border-orange-200/80 mb-5">
                  <div className="text-xs font-semibold text-orange-950 uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-safety-500" />
                    <span>Key Production Results & Quantified Impact:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-800">
                    {job.resultsSummary.map((res, rIndex) => (
                      <li key={rIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-safety-600 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-zinc-100">
                  <span className="text-xs font-mono text-zinc-400 mr-2">Stack:</span>
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-100 text-zinc-700 border border-zinc-200 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

