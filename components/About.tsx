import { about, toolkit, recognition } from '@/lib/content'
import { resumeHref } from '@/lib/site'
import { Section } from '@/components/ui'

export default function About() {
  return (
    <Section id="about" index="04" title="About">
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <p className="text-xl leading-relaxed text-fg">{about}</p>
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block font-mono text-xs text-accent hover:underline"
          >
            full record in the cv ↗
          </a>
        </div>

        <div className="col-span-12 space-y-10 lg:col-span-6 lg:col-start-7">
          <dl className="divide-y divide-line border-y border-line">
            {toolkit.map((t) => (
              <div key={t.group} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 py-3">
                <dt className="font-mono text-[11px] leading-6 text-fg-dim">{t.group}</dt>
                <dd className="font-mono text-[13px] leading-6 text-fg-muted">{t.items.join('  ·  ')}</dd>
              </div>
            ))}
          </dl>

          <dl className="divide-y divide-line border-y border-line">
            {recognition.map((r) => (
              <div key={r.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 py-3">
                <dt className="text-sm text-fg">{r.title}</dt>
                <dd className="font-mono text-[11px] text-fg-dim">{r.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
