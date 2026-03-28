import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'Aibrio Digital | Intelligence Through Data',
  description: 'Building Intelligent Digital Futures - AI Model Builders, App Developers, Creative Designers, Automation Experts, 3D & VFX Artists. Est. 2026',
  keywords: ['AI', 'Digital Agency', 'Software Development', 'Machine Learning', 'Web Development', '3D Design'],
  authors: [{ name: 'Aibrio Digital' }],
  openGraph: {
    title: 'Aibrio Digital | Intelligence Through Data',
    description: 'Building Intelligent Digital Futures - Premium AI-powered software agency',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#092658',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
