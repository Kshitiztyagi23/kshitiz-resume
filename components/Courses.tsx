'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { BookMarked, Sparkles } from 'lucide-react'

const { courses } = resumeData

export default function Courses() {
  return (
    <section className="py-20 md:py-24 bg-white border-b border-zinc-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-safety-600 font-semibold tracking-wider uppercase">
          <BookMarked className="w-4 h-4" />
          <span>Curriculum & Academics</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3">
          Relevant Coursework
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mb-10">
          Core subjects completed at IIT Kanpur and specialized machine learning credentials.
        </p>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {courses.map((course, i) => (
            <motion.div
              key={course.name}
              className="flex items-center justify-between gap-2 p-3.5 rounded-lg border border-zinc-200 bg-white hover:border-orange-300 hover:bg-orange-50/20 transition-all duration-150 shadow-2xs"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.25 }}
            >
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-zinc-900 leading-snug">
                  {course.name}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  {course.category}
                </span>
              </div>

              {course.tag && (
                <span
                  className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                    course.tag === 'Excellent Grade'
                      ? 'bg-orange-50 text-orange-700 border border-orange-200'
                      : course.tag === 'Online Specialized'
                      ? 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                      : 'bg-zinc-50 text-zinc-600 border border-zinc-200'
                  }`}
                >
                  {course.tag}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

