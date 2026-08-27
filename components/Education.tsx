'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { GraduationCap, Calendar, Award } from 'lucide-react'

const { education } = resumeData

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-24 bg-white border-b border-zinc-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-safety-600 font-semibold tracking-wider uppercase">
          <GraduationCap className="w-4 h-4" />
          <span>Academic Background</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3">
          Academic Qualifications
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mb-10">
          Indian Institute of Technology, Kanpur and senior secondary scholastic records.
        </p>

        {/* Education Timeline / Cards */}
        <div className="space-y-4">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              className="p-5 sm:p-6 rounded-xl border border-zinc-200 bg-white hover:border-orange-300 transition-all duration-200 interactive-card shadow-xs"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-orange-50 text-safety-600 border border-orange-200/70 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight">
                      {edu.degree}
                    </h3>
                    <div className="text-xs sm:text-sm text-zinc-600 font-mono mt-0.5">
                      {edu.institute}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1 font-sans">
                      {edu.type}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                  <span className="badge-safety">
                    <Calendar className="w-3 h-3" />
                    {edu.year}
                  </span>
                  <div className="text-base sm:text-lg font-bold font-mono text-zinc-950 bg-zinc-50 px-2.5 py-1 rounded border border-zinc-200/80">
                    {edu.score}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

