import { resumeData } from '@/lib/data'
import { SectionHeader } from './Education'

const { achievements } = resumeData

const categoryColors: Record<string, string> = {
  Academic: 'tag-cyan',
  Scholarship: 'tag-green',
  Competitive: 'tag-purple',
}

export default function Achievements() {
  return (
    <section className="py-24 px-6 bg-dark-card/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Scholastic Achievements" subtitle="Highlights & honors" />

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {achievements.map((item, i) => (
            <div
              key={i}
              className="group flex gap-4 p-6 rounded-2xl border border-dark-border bg-dark-card card-hover"
            >
              {/* Icon */}
              <div className="shrink-0 w-11 h-11 rounded-xl bg-dark-bg flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Text */}
              <div className="flex-1">
                <span className={`tag ${categoryColors[item.category] ?? 'tag-cyan'} mb-2`}>
                  {item.category}
                </span>
                <p className="text-sm text-text-secondary leading-relaxed mt-1">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
