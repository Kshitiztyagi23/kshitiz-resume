'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/lib/data'
import { SectionHeader } from './Education'
import { AnimatedHeader, StaggerList, StaggerItem } from './animations'

const { courses } = resumeData

export default function Courses() {
  return (
    <section className="py-14 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedHeader>
          <SectionHeader title="Relevant Courses" subtitle="Formal coursework" />
        </AnimatedHeader>

        <StaggerList className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {courses.map((course, i) => (
            <StaggerItem key={i} variant="scaleIn">
              <motion.div
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-dark-border bg-dark-card group cursor-default"
                whileHover={{ borderColor: 'rgba(0,212,255,0.3)', backgroundColor: 'rgba(0,212,255,0.03)', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                  {course.name}
                </span>
                {course.tag && (
                  <span
                    className={`shrink-0 tag text-[10px] ${
                      course.tag === 'Excellent' ? 'tag-green'
                      : course.tag === 'B+' ? 'tag-cyan'
                      : course.tag === 'A' ? 'tag-orange'
                      : 'tag-purple'
                    }`}
                  >
                    {course.tag === 'Excellent' ? 'A' : course.tag === 'Online' ? 'Online' : course.tag}
                  </span>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerList>

        <p className="text-xs text-text-muted mt-4 font-mono">
          <span className="text-accent-green">A</span> = Excellent &nbsp;·&nbsp;
          <span className="text-accent-cyan">B+</span> = Very Good &nbsp;·&nbsp;
          <span className="text-accent-purple">Online</span> = Coursera / deeplearning.ai
        </p>
      </div>
    </section>
  )
}
