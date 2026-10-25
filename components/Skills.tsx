import { resumeData } from '@/lib/data'
import { slugify } from '@/lib/site'
import { Section } from '@/components/ui'

const { skills } = resumeData

export default function Skills() {
  const groups = Object.entries(skills)

  return (
    <Section
      id="skills"
      index="04"
      title="Skills"
      cmd="tree ~/stack -L 2"
      note="Tools and methods from the work above, grouped by domain."
    >
      <div className="rounded border border-line bg-ink-900 font-mono text-[13px]">
        <div className="border-b border-line bg-ink-850 px-4 py-2 text-[11px] text-fg-muted">~/stack</div>
        <div className="divide-y divide-line">
          {groups.map(([group, items], gi) => (
            <div key={group} className="grid grid-cols-1 gap-x-6 gap-y-2 px-4 py-5 md:grid-cols-[17rem_minmax(0,1fr)]">
              <div className="grid grid-cols-[2.5em_minmax(0,1fr)] text-fg">
                <span className="text-fg-dim" aria-hidden="true">
                  {gi === groups.length - 1 ? '└──' : '├──'}
                </span>
                <div className="break-words leading-6">
                  {slugify(group)}/
                  <div className="text-[11px] leading-5 text-fg-dim">{items.length} entries</div>
                </div>
              </div>
              <ul className="flex flex-wrap gap-x-1 gap-y-1.5 leading-6 text-fg-muted">
                {items.map((s, i) => (
                  <li key={s}>
                    {s}
                    {i < items.length - 1 && <span className="ml-1 text-line-strong">·</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
