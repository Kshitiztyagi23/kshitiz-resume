import { personal } from '@/lib/content'
import { resumeHref } from '@/lib/site'
import { Frame } from '@/components/ui'

export default function Hero() {
  return (
    <section id="top" className="border-b border-line pt-32 md:pt-44">
      <Frame className="grid grid-cols-12 gap-x-8 gap-y-10 pb-20 md:pb-28">
        <div className="col-span-12 lg:col-span-9">
          <p className="font-mono text-xs text-fg-dim">
            <span className="text-accent">kshitiz@iitk</span>:~$ whoami
          </p>
          <h1 className="cursor-block mt-6 font-mono text-[52px] font-semibold leading-[0.98] tracking-tight text-fg sm:text-8xl">
            Kshitiz Tyagi
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-snug text-fg sm:text-2xl">
            I build ML and data systems that run in production.
          </p>
          <p className="mt-3 font-mono text-[13px] text-fg-dim">
            {personal.proof}
          </p>
        </div>

        <div className="col-span-12 flex flex-col justify-end gap-5 lg:col-span-3">
          <p className="flex items-center gap-2 font-mono text-[11px] text-fg-muted">
            <span className="h-1.5 w-1.5 bg-syn-str" aria-hidden="true" />
            {personal.status} · graduating 2027
          </p>
          <div className="flex flex-wrap gap-2">
            <a href={`mailto:${personal.email}`} className="btn-primary">
              email
            </a>
            <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" className="btn">
              github ↗
            </a>
            <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn">
              linkedin ↗
            </a>
            <a href={resumeHref} target="_blank" rel="noopener noreferrer" className="btn">
              cv.pdf
            </a>
          </div>
        </div>
      </Frame>
    </section>
  )
}
