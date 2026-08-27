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
  title: 'Kshitiz Tyagi | AI/ML, Data Science & Systems · IIT Kanpur',
  description:
    'Fourth-year undergraduate at IIT Kanpur with experience in production AI systems, distributed pipelines, and analytics infrastructure at Battery Smart and Skaeo. First author at CogSci 2026.',
  keywords: [
    'Kshitiz Tyagi',
    'IIT Kanpur',
    'Software Engineer',
    'Data Scientist',
    'Data Analyst',
    'Machine Learning Engineer',
    'System Design',
    'FastAPI',
    'React',
    'PostgreSQL',
    'PyTorch',
    'Computer Vision',
    'Databricks',
    'SQL',
    'CogSci 2026',
    'Battery Smart',
    'Skaeo',
  ],
  openGraph: {
    title: 'Kshitiz Tyagi | AI/ML, Data Science & Systems',
    description: 'Fourth-Year Undergraduate at IIT Kanpur · Ex-Battery Smart & Skaeo · CogSci 2026 First Author',
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

