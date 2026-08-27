'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { resumeData, PublicationItem } from '@/lib/data'
import { BookOpen, Sparkles, ChevronDown, ChevronUp, Copy, Check, Calendar, Award, MapPin } from 'lucide-react'

const { publications } = resumeData

export default function Publications() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const [copiedBibtex, setCopiedBibtex] = useState<string | null>(null)

  const handleCopyBibtex = (title: string, bibtex: string) => {
    navigator.clipboard.writeText(bibtex)
    setCopiedBibtex(title)
    setTimeout(() => setCopiedBibtex(null), 2000)
  }

  const getBibtex = (pub: PublicationItem) => {
    if (pub.role === 'First Author') {
      return `@inproceedings{tyagi2026motion,
  title={When Motion Wins: Cognitive Efficiency in Perceptual Grouping},
  author={Tyagi, Kshitiz and Srivastava, Anveshna},
  booktitle={Proceedings of the 48th Annual Meeting of the Cognitive Science Society (CogSci 2026)},
  year={2026},
  address={Rio de Janeiro, Brazil}
}`
    }
    return `@article{srivastava2026computational,
  title={Plural Pathways to Computational Thinking},
  author={Srivastava, Anveshna and Tyagi, Kshitiz},
  journal={Cognitive Development and Education Research},
  year={2026}
}`
  }

  return (
    <section id="research" className="py-20 md:py-24 bg-zinc-50/50 border-b border-zinc-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-safety-600 font-semibold tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>Research & Publications</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3">
          Peer-Reviewed Research & Cognitive Models
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mb-10">
          Empirical psychophysics, perceptual dominance hierarchies, and developmental algorithmic reasoning conducted at IIT Kanpur.
        </p>

        {/* Publications Cards Grid */}
        <div className="space-y-6">
          {publications.map((pub, index) => {
            const isExpanded = expandedIndex === index
            const bibtex = getBibtex(pub)

            return (
              <motion.div
                key={pub.title}
                className="bg-white rounded-xl border border-zinc-200 shadow-xs hover:border-orange-300 transition-all duration-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="p-5 sm:p-7">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge-safety">
                        <Award className="w-3 h-3" />
                        {pub.venue}
                      </span>
                      <span className="badge-neutral">
                        {pub.role}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-zinc-100 text-zinc-600">
                        <Calendar className="w-3 h-3" />
                        {pub.year}
                      </span>
                    </div>

                    {pub.location && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-zinc-500">
                        <MapPin className="w-3 h-3 text-zinc-400" />
                        {pub.location}
                      </span>
                    )}
                  </div>

                  {/* Title & Authors */}
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight mb-2">
                    {pub.title}
                  </h3>
                  <div className="text-xs sm:text-sm text-zinc-600 mb-4 font-mono">
                    <span className="text-zinc-400">Authors: </span>
                    <strong className="text-zinc-800 font-semibold">{pub.authors}</strong>
                  </div>

                  {/* Core Theoretical Highlight */}
                  <div className="p-3.5 rounded-lg bg-orange-50/70 border border-orange-200/80 mb-5">
                    <div className="text-xs font-semibold text-orange-950 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-safety-500 shrink-0 mt-0.5" />
                      <span>{pub.highlight}</span>
                    </div>
                  </div>

                  {/* Key Findings List */}
                  <div className="mb-5 space-y-2">
                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono">
                      Key Experimental Findings:
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700">
                      {pub.findings.map((finding, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2">
                          <span className="text-safety-500 font-bold shrink-0">·</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-zinc-100">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-100 text-zinc-600 border border-zinc-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Abstract Expander & Citation */}
                  <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-safety-600 transition-colors"
                    >
                      <span>{isExpanded ? 'Hide Abstract' : 'View Full Abstract'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleCopyBibtex(pub.title, bibtex)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 transition-colors"
                    >
                      {copiedBibtex === pub.title ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">BibTeX Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Copy BibTeX</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expanded Abstract Section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="mt-4 p-4 rounded-lg bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <strong className="block text-zinc-900 font-semibold mb-1 font-mono text-xs uppercase">
                          Abstract:
                        </strong>
                        {pub.abstract}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

