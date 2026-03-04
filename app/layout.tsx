import type { Metadata } from 'next'
import './globals.css'
import NeuralBackground from '@/components/NeuralBackground'

export const metadata: Metadata = {
  title: 'Kshitiz Tyagi | Portfolio',
  description: 'B.Tech student at IIT Kanpur specializing in Machine Learning, AI, and Bioengineering.',
  keywords: ['Kshitiz Tyagi', 'IIT Kanpur', 'Machine Learning', 'AI', 'Bioengineering', 'Portfolio'],
  openGraph: {
    title: 'Kshitiz Tyagi | Portfolio',
    description: 'B.Tech student at IIT Kanpur – ML Engineer & Researcher',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark-bg text-text-primary antialiased">
        <NeuralBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
