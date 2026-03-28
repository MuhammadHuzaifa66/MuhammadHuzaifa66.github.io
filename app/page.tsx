'use client'

import dynamic from 'next/dynamic'
import { SmoothScrollProvider } from '@/components/smooth-scroll'
import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Portfolio } from '@/components/portfolio'
import { About } from '@/components/about'
import { TechStack } from '@/components/tech-stack'
import { Testimonials } from '@/components/testimonials'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { AIChatbot } from '@/components/ai-chatbot'
import { AIHelper } from '@/components/ai-helper'

// Dynamically import CustomCursor to avoid SSR issues
const CustomCursor = dynamic(
  () => import('@/components/custom-cursor').then((mod) => mod.CustomCursor),
  { ssr: false }
)

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative">
        {/* Custom Cursor - Desktop Only */}
        <CustomCursor />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Sections */}
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <TechStack />
        <Testimonials />
        <Contact />
        <Footer />
        
        {/* AI Features */}
        <AIChatbot />
        <AIHelper />
      </main>
    </SmoothScrollProvider>
  )
}
