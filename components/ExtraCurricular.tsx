'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { SectionHeader } from './Education'
import { AnimatedHeader, StaggerList, StaggerItem } from './animations'

const { extracurricular } = resumeData

export default function ExtraCurricular() {
  return (
    <section className="py-14 px-6 bg-dark-card/30">
      <div className="max-w-4xl mx-auto">
        <AnimatedHeader>
          <SectionHeader title="Extra-Curricular" subtitle="Beyond academics" />
        </AnimatedHeader>

        <StaggerList className="mt-12 flex flex-col gap-4">
          {extracurricular.map((item, i) => (
            <StaggerItem key={i}>
              <motion.div
                className="flex gap-4 p-5 rounded-2xl border border-dark-border bg-dark-card"
                whileHover={{ y: -3, borderColor: 'rgba(0,212,255,0.25)', boxShadow: '0 6px 30px rgba(0,0,0,0.25)' }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="shrink-0 w-10 h-10 rounded-xl bg-dark-bg flex items-center justify-center text-xl"
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.div>
                <p className="text-sm text-text-secondary leading-relaxed self-center">{item.text}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  )
}
