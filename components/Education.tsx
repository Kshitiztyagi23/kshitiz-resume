import { resumeData, type CourseItem } from '@/lib/data'
import { Section } from '@/components/ui'

const { education, scholasticAchievements, courses, extracurricular } = resumeData

const courseMark: Record<NonNullable<CourseItem['tag']>, { label: string; className: string }> = {
  'Excellent Grade': { label: 'ex', className: 'text-syn-num' },
  Core: { label: 'core', className: 'text-fg-dim' },
  'Online Specialized': { label: 'mooc', className: 'text-fg-dim' },
}

const courseGroups = ['CS & AI', 'Mathematics', 'Bioengineering'] as const

function SubHead({ children, count }: { children: string; count?: number }) {
  return (
    <h3 className="flex items-baseline justify-between border-b border-line pb-2 font-mono text-sm text-fg">
      <span>
        <span className="text-fg-dim">## </span>
        {children}
      </span>
      {count !== undefined && <span className="text-[11px] text-fg-dim">{count}</span>}
    </h3>
  )
}

export default function Education() {
  return (
    <Section
      id="education"
      index="06"
      title="Education"
      cmd="cat transcript.txt"
      note="Degree, awards, coursework, and life outside the lab."
    >
      <div className="space-y-14">
        {/* Degrees */}
        <div>
          <SubHead>degrees</SubHead>
          <table className="w-full border-collapse text-left">
            <tbody>
              {education.map((e) => (
                <tr key={e.degree} className="border-b border-line align-top">
                  <td className="w-28 py-4 pr-4 font-mono text-xs text-fg-dim">{e.year}</td>
                  <td className="py-4 pr-4">
                    <div className="text-[15px] font-medium text-fg">{e.degree}</div>
                    <div className="mt-0.5 text-[13px] text-fg-muted">{e.institute}</div>
                  </td>
                  <td className="py-4 text-right font-mono text-sm text-syn-num">{e.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Awards */}
        <div>
          <SubHead count={scholasticAchievements.length}>awards &amp; recognition</SubHead>
          <ul>
            {scholasticAchievements.map((a) => (
              <li
                key={a.title}
                className="grid grid-cols-1 gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)]"
              >
                <span className="font-mono text-xs text-accent">{a.badge}</span>
                <div>
                  <div className="text-[15px] font-medium text-fg">{a.title}</div>
                  <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">{a.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses */}
        <div>
          <SubHead count={courses.length}>coursework</SubHead>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 pt-4 md:grid-cols-3">
            {courseGroups.map((g) => (
              <div key={g}>
                <div className="font-mono text-[11px] text-fg-dim">{g}</div>
                <ul className="mt-2 space-y-1.5">
                  {courses
                    .filter((c) => c.category === g)
                    .map((c) => {
                      const mark = c.tag ? courseMark[c.tag] : null
                      return (
                        <li key={c.name} className="flex items-baseline justify-between gap-3 text-[13px] text-fg-muted">
                          <span>{c.name}</span>
                          {mark && (
                            <span className={`shrink-0 font-mono text-[10px] ${mark.className}`}>{mark.label}</span>
                          )}
                        </li>
                      )
                    })}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[11px] text-fg-dim">
            <span className="text-syn-num">ex</span> = excellent grade · core = departmental core · mooc = online
            specialization
          </p>
        </div>

        {/* Extra-curricular */}
        <div>
          <SubHead>off the clock</SubHead>
          <ul>
            {extracurricular.map((x) => (
              <li key={x.title} className="border-b border-line py-3 text-[13px] leading-relaxed text-fg-muted">
                <span className="font-medium text-fg">{x.title}.</span> {x.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
