'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Brain, 
  Smartphone, 
  Palette, 
  Zap, 
  Boxes,
  Code,
  ArrowRight
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Brain,
    title: 'AI Solutions',
    description: 'Custom machine learning models, natural language processing, and intelligent automation systems tailored to your business needs.',
    features: ['Custom ML Models', 'NLP & Chatbots', 'Predictive Analytics'],
    color: '#27D6DB',
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications with stunning UI/UX and seamless performance.',
    features: ['iOS & Android', 'Cross-Platform', 'Progressive Web Apps'],
    color: '#092658',
  },
  {
    icon: Palette,
    title: 'Brand Design',
    description: 'Complete brand identity design from logos to comprehensive style guides that make your brand memorable.',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity'],
    color: '#27D6DB',
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Streamline your workflows with intelligent automation solutions that save time and reduce errors.',
    features: ['Process Automation', 'Workflow Optimization', 'Integration APIs'],
    color: '#092658',
  },
  {
    icon: Boxes,
    title: '3D & VFX',
    description: 'Immersive 3D experiences, visual effects, and motion graphics that captivate your audience.',
    features: ['3D Modeling', 'Motion Graphics', 'AR/VR Experiences'],
    color: '#27D6DB',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
    features: ['React & Next.js', 'E-commerce', 'Custom CMS'],
    color: '#092658',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 20
    const y = (e.clientY - rect.top - rect.height / 2) / 20
    setRotation({ x: -y, y: x })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
  }

  const Icon = service.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: isHovered ? 'none' : 'transform 0.5s ease-out',
      }}
      className="group relative"
    >
      <div className={`
        relative p-8 rounded-2xl glass-card overflow-hidden
        transition-all duration-300
        ${isHovered ? 'shadow-2xl scale-[1.02]' : 'shadow-lg'}
      `}>
        {/* Gradient border on hover */}
        <div 
          className={`
            absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
          `}
          style={{
            background: `linear-gradient(135deg, ${service.color}40, transparent)`,
          }}
        />
        
        {/* Glow effect */}
        <div 
          className={`
            absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl
            transition-opacity duration-300
            ${isHovered ? 'opacity-30' : 'opacity-0'}
          `}
          style={{ background: service.color }}
        />
        
        <div className="relative z-10">
          {/* Icon */}
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
            style={{ 
              background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
              boxShadow: isHovered ? `0 0 30px ${service.color}40` : 'none',
            }}
          >
            <Icon 
              className="w-7 h-7 transition-colors" 
              style={{ color: service.color }}
            />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-[#092658] mb-3 group-hover:text-[#27D6DB] transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[#092658]/70 mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {service.features.map((feature, i) => (
              <li 
                key={i} 
                className="flex items-center gap-2 text-sm text-[#092658]/60"
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: service.color }}
                />
                {feature}
              </li>
            ))}
          </ul>

          {/* Learn More */}
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: service.color }}
          >
            Learn More
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 md:py-32 bg-[#F2F1ED] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#27D6DB]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#092658]/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#27D6DB]/10 text-[#27D6DB] text-sm font-medium mb-4"
          >
            Our Services
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#092658] mb-4">
            What We <span className="gradient-text">Build</span>
          </h2>
          <p className="text-[#092658]/60 max-w-2xl mx-auto text-lg">
            From concept to deployment, we deliver end-to-end solutions that transform your ideas into powerful digital products.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
