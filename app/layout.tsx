import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kshitiz Tyagi | AI/ML Engineer & Researcher · IIT Kanpur',
  description:
    'Fourth-year undergraduate at IIT Kanpur specializing in AI/ML systems, self-healing RAG pipelines, and neuro-computational modeling. First author at CogSci 2026.',
  keywords: [
    'Kshitiz Tyagi',
    'IIT Kanpur',
    'Machine Learning',
    'AI Systems',
    'CogSci 2026',
    'Battery Smart',
    'Skaeo',
    'Bioengineering',
    'Portfolio',
  ],
  openGraph: {
    title: 'Kshitiz Tyagi | AI/ML Engineer & Researcher',
    description: 'B.Tech at IIT Kanpur · First Author CogSci 2026 · Ex-Battery Smart & Skaeo',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-white text-zinc-900 antialiased font-sans selection:bg-orange-100 selection:text-orange-900">
        <div className="relative min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  )
}

