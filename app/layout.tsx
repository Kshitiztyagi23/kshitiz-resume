import type { Metadata, Viewport } from 'next'
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

export const viewport: Viewport = {
  themeColor: '#0B0D0F',
}

export const metadata: Metadata = {
  title: 'Kshitiz Tyagi · ML systems & data',
  description:
    'Kshitiz Tyagi builds ML systems, data pipelines and the software around them. IIT Kanpur, previously Battery Smart and Skaeo, first author at CogSci 2026.',
  openGraph: {
    title: 'Kshitiz Tyagi · ML systems & data',
    description: 'Selected work: self-correcting AI assistants, PII-safe NLP pipelines, production computer vision.',
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
      <body>{children}</body>
    </html>
  )
}

