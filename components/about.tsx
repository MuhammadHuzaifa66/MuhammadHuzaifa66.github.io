'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Target, Users, Trophy, Lightbulb } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered', icon: Trophy },
  { value: 30, suffix: '+', label: 'Happy Clients', icon: Users },
  { value: 15, suffix: '+', label: 'Team Members', icon: Target },
  { value: 99, suffix: '%', label: 'Success Rate', icon: Lightbulb },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            const duration = 2000
            const startTime = performance.now()

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 4)
              setCount(Math.floor(eased * value))

              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }

            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="gradient-text">
      {count}{suffix}
    </span>
  )
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about-animate').forEach((el) => {
        gsap.fromTo(
          el as Element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el as Element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 bg-[#F2F1ED] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#27D6DB]/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-[#092658]/5 blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="about-animate inline-block px-4 py-1.5 rounded-full bg-[#27D6DB]/10 text-[#27D6DB] text-sm font-medium mb-4"
            >
              About Us
            </motion.span>
            
            <h2 className="about-animate text-3xl md:text-5xl font-bold text-[#092658] mb-6">
              We Build the Future with <span className="gradient-text">Intelligence</span>
            </h2>
            
            <p className="about-animate text-[#092658]/70 text-lg leading-relaxed mb-6">
              Aibrio Digital is a forward-thinking software agency specializing in AI-powered solutions, 
              cutting-edge development, and creative design. Founded in 2026, we&apos;ve rapidly grown 
              to become a trusted partner for businesses seeking digital transformation.
            </p>
            
            <p className="about-animate text-[#092658]/70 text-lg leading-relaxed mb-8">
              Our team of experts combines technical excellence with creative innovation to deliver 
              solutions that not only meet but exceed expectations. We believe in the power of 
              technology to transform businesses and improve lives.
            </p>

            {/* Values */}
            <div className="about-animate grid grid-cols-2 gap-4">
              {[
                { title: 'Innovation First', desc: 'Always pushing boundaries' },
                { title: 'Quality Driven', desc: 'Excellence in every detail' },
                { title: 'Client Focused', desc: 'Your success is our goal' },
                { title: 'Future Ready', desc: 'Building for tomorrow' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-white/50 backdrop-blur-sm"
                >
                  <h4 className="font-semibold text-[#092658] mb-1">{item.title}</h4>
                  <p className="text-sm text-[#092658]/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="about-animate">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-2xl glass-card text-center group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27D6DB]/20 to-[#092658]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#27D6DB]" />
                    </div>
                    <div className="text-4xl font-bold mb-2">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm text-[#092658]/60">{stat.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
