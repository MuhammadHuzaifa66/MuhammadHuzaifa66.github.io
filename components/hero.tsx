'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Hero3DScene } from './hero-3d-scene'
import { ArrowDown, ChevronRight } from 'lucide-react'

const roles = [
  'AI Model Builders',
  'App Developers',
  'Creative Designers',
  'Automation Experts',
  '3D & VFX Artists',
]

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)

  // Typing animation
  useEffect(() => {
    const role = roles[currentRole]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      )
      
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F2F1ED]"
    >
      {/* 3D Background */}
      <Hero3DScene />
      
      {/* Subtle Noise Overlay */}
      <div className="noise-overlay absolute inset-0 pointer-events-none opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F2F1ED] pointer-events-none" />
      
      {/* Top Bar - EST. 2026 at Extreme Top of Hero Section */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card backdrop-blur-md bg-white/60 border border-[#27D6DB]/20 shadow-sm"
            style={{ background: 'rgba(242, 241, 237, 0.85)', backdropFilter: 'blur(12px)' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27D6DB] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#27D6DB]"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-bold tracking-wide bg-gradient-to-r from-[#27D6DB] to-[#092658] bg-clip-text text-transparent">
              EST. 2026
            </span>
            <span className="text-[11px] sm:text-xs text-[#092658]/30">|</span>
            <span className="text-[10px] sm:text-xs font-medium text-[#092658]/70 whitespace-nowrap tracking-tight">
              Intelligence Through Data
            </span>
          </motion.div>
        </div>
      </div>
      
 {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Main Heading with Gradient - font Medium */}
      <h1
  ref={headingRef}
  className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-4 leading-[1.2] pt-12 sm:pt-16"
  style={{ fontFamily: "'Playfair Display', serif" }}
>
  <span className="text-[#092658]">Building Intelligent</span>
  <br />
  <span className="bg-gradient-to-r from-[#27D6DB] to-[#092658] bg-clip-text text-transparent">
    Digital Futures
  </span>
</h1>


        {/* Typing Animation with Glass Effect */}
        <div className="flex items-center justify-center mb-10">
          <div className="px-5 py-1.5 rounded-full glass-card">
            <p ref={taglineRef} className="text-lg md:text-xl text-[#092658]/70">
              We are{' '}
              <span className="font-semibold bg-gradient-to-r from-[#27D6DB] to-[#092658] bg-clip-text text-transparent">
                {displayText}
                <span className="typing-cursor text-[#27D6DB]">|</span>
              </span>
            </p>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group px-8 py-3 rounded-full bg-gradient-to-r from-[#27D6DB] to-[#092658] text-white font-medium text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Project
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-full glass-card text-[#092658] font-medium text-base hover:border-[#27D6DB]/50 transition-all"
            onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Our Work
          </motion.button>
        </motion.div>

        {/* Stats - Clean, no backgrounds */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-12"
        >
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '30+', label: 'Happy Clients' },
            { value: '99%', label: 'Success Rate' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#27D6DB] to-[#092658] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs text-[#092658]/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator with Gradient */}
      <motion.div
        transition={{ delay: 1.5 }}
        className="absolute bottom-1 initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={scrollToServices}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap--50.5 group"
        >
          <span className="text-xs font-medium uppercase tracking-wider bg-gradient-to-r from-[#27D6DB] to-[#092658] bg-clip-text text-transparent">
            Explore more
          </span>
          <ArrowDown className="w-4 h-4 text-[#27D6DB] group-hover:text-[#092658] transition-colors" />
        </motion.button>
      </motion.div>
    </section>
  )
}