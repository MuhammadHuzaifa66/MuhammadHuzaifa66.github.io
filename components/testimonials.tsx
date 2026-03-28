'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'TechVision Inc.',
    avatar: '/placeholder.svg?height=80&width=80',
    content: 'Aibrio Digital transformed our business with their AI solutions. The machine learning model they built increased our efficiency by 40%. Their team is incredibly professional and innovative.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Product Director',
    company: 'FinFlow',
    avatar: '/placeholder.svg?height=80&width=80',
    content: 'The mobile app Aibrio developed for us exceeded all expectations. The UI is stunning, the performance is flawless, and our users love it. Best decision we made for our digital transformation.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Marketing VP',
    company: 'BrandCraft',
    avatar: '/placeholder.svg?height=80&width=80',
    content: 'Their brand design work is exceptional. Aibrio captured our vision perfectly and created an identity that truly represents who we are. The attention to detail is remarkable.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Park',
    role: 'CTO',
    company: 'DataStream',
    avatar: '/placeholder.svg?height=80&width=80',
    content: 'Working with Aibrio on our web platform was a game-changer. They delivered a scalable, beautiful solution that handles millions of users. Their technical expertise is top-notch.',
    rating: 5,
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const nextTestimonial = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(nextTestimonial, 6000)
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [])

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(nextTestimonial, 6000)
  }

  const handlePrev = () => {
    prevTestimonial()
    resetAutoPlay()
  }

  const handleNext = () => {
    nextTestimonial()
    resetAutoPlay()
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-br from-[#092658] to-[#0a1a3a] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#27D6DB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#27D6DB]/5 rounded-full blur-3xl" />
      </div>
      
      {/* Decorative Quote */}
      <div className="absolute top-10 left-10 opacity-5">
        <Quote className="w-40 h-40 text-white" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#27D6DB]/20 text-[#27D6DB] text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-[#27D6DB]">Clients Say</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it. Here&apos;s what our amazing clients have to say about working with us.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="glass p-8 md:p-12 rounded-3xl text-center"
            >
              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#27D6DB] text-[#27D6DB]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-light">
                &ldquo;{testimonials[activeIndex].content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  className="w-14 h-14 rounded-full border-2 border-[#27D6DB]/30"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-white">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-white/60 text-sm">
                    {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1)
                    setActiveIndex(index)
                    resetAutoPlay()
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-[#27D6DB] w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
