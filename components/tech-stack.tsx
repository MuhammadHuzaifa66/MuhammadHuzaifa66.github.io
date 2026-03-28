'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const technologies = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#000000' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Python', color: '#3776AB' },
  { name: 'TensorFlow', color: '#FF6F00' },
  { name: 'PyTorch', color: '#EE4C2C' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Three.js', color: '#000000' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Kubernetes', color: '#326CE5' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Redis', color: '#DC382D' },
  { name: 'GraphQL', color: '#E10098' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Blender', color: '#F5792A' },
]

function TechLogo({ name, color }: { name: string; color: string }) {
  return (
    <div 
      className="flex items-center gap-3 px-6 py-3 rounded-full glass-card mx-2 hover:scale-105 transition-transform"
      style={{ borderColor: `${color}20` }}
    >
      <div 
        className="w-3 h-3 rounded-full"
        style={{ background: color }}
      />
      <span className="text-sm font-medium text-[#092658] whitespace-nowrap">{name}</span>
    </div>
  )
}

function InfiniteScroll({ direction = 'left', speed = 30 }: { direction?: 'left' | 'right'; speed?: number }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollWidth = scrollContainer.scrollWidth / 2
    let scrollPos = direction === 'left' ? 0 : scrollWidth

    const animate = () => {
      if (direction === 'left') {
        scrollPos += 0.5
        if (scrollPos >= scrollWidth) {
          scrollPos = 0
        }
      } else {
        scrollPos -= 0.5
        if (scrollPos <= 0) {
          scrollPos = scrollWidth
        }
      }
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollPos
      }
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [direction])

  const firstHalf = technologies.slice(0, Math.ceil(technologies.length / 2))
  const secondHalf = technologies.slice(Math.ceil(technologies.length / 2))
  const items = direction === 'left' ? firstHalf : secondHalf

  return (
    <div
      ref={scrollRef}
      className="flex overflow-hidden whitespace-nowrap py-2"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="flex">
        {[...items, ...items, ...items].map((tech, index) => (
          <TechLogo key={`${tech.name}-${index}`} name={tech.name} color={tech.color} />
        ))}
      </div>
    </div>
  )
}

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-[#F2F1ED] to-[#F2F1ED]/90 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#27D6DB]/20 to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#092658]/20 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-[#27D6DB]/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#092658]/10 text-[#092658] text-sm font-medium mb-4">
            Our Technology
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#092658] mb-4">
            Powered by <span className="gradient-text">Modern Tech</span>
          </h2>
          <p className="text-[#092658]/60 max-w-2xl mx-auto text-lg">
            We leverage cutting-edge technologies to build scalable, performant, and future-proof solutions.
          </p>
        </motion.div>
      </div>

      {/* Scrolling Tech Logos */}
      <div className="space-y-4">
        <InfiniteScroll direction="left" />
        <InfiniteScroll direction="right" />
      </div>
    </section>
  )
}
