'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { Activity } from 'lucide-react'

const { extracurricular } = resumeData

export default function ExtraCurricular() {
  return (
    <section className="py-20 md:py-24 bg-zinc-50/50 border-b border-zinc-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-safety-600 font-semibold tracking-wider uppercase">
          <Activity className="w-4 h-4" />
          <span>Extracurricular Endeavors</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3">
          Cultural & Campus Activities
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mb-10">
          Competitive cultural events, community blood drives, and technical championships at IIT Kanpur.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {extracurricular.map((item, i) => (
            <motion.div
              key={i}
              className="p-5 rounded-xl border border-zinc-200 bg-white hover:border-orange-300 transition-all duration-200 interactive-card shadow-xs"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="text-sm font-bold text-zinc-950 tracking-tight mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

