import { resumeData } from '@/lib/data'
import { Section, Tags } from '@/components/ui'

const { leadership } = resumeData

export default function Positions() {
  return (
    <Section
      id="leadership"
      index="05"
      title="Leadership"
      cmd="cat roles.log"
      note="Running student organizations at IIT Kanpur: teams, budgets, mentorship and outreach."
    >
      <ol className="border-t border-line">
        {leadership.map((r) => (
          <li key={r.org} className="grid grid-cols-12 gap-x-6 gap-y-3 border-b border-line py-7">
            <div className="col-span-12 font-mono text-xs text-fg-dim md:col-span-3">{r.period}</div>
            <div className="col-span-12 min-w-0 md:col-span-9">
              <h3 className="text-lg font-semibold tracking-tight text-fg">
                {r.role}
                <span className="font-normal text-fg-dim"> @ {r.org}</span>
              </h3>
              <ul className="mt-3 space-y-1.5">
                {r.initiatives.map((i) => (
                  <li key={i} className="grid grid-cols-[1rem_minmax(0,1fr)] text-sm leading-relaxed text-fg-muted">
                    <span className="font-mono text-fg-dim">-</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <Tags items={r.tags} className="mt-4" />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
