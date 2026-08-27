'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { Award, Sparkles, BookOpen, Trophy } from 'lucide-react'

const { scholasticAchievements } = resumeData

export default function Achievements() {
  return (
    <section className="py-20 md:py-24 bg-zinc-50/50 border-b border-zinc-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-safety-600 font-semibold tracking-wider uppercase">
          <Trophy className="w-4 h-4" />
          <span>Honors & Recognitions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3">
          Scholastic Achievements
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mb-10">
          Competitive nationwide scholarships, research conference presentations, and institutional awards.
        </p>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {scholasticAchievements.map((item, index) => (
            <motion.div
              key={item.title}
              className="p-6 rounded-xl border border-zinc-200 bg-white hover:border-orange-300 transition-all duration-200 interactive-card shadow-xs flex flex-col justify-between"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="badge-safety">
                    <Sparkles className="w-3 h-3" />
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-950 tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

