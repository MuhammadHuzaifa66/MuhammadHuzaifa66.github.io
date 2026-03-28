'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', 'AI', 'Apps', 'Web', 'Design', '3D']

const projects = [
  {
    id: 1,
    title: 'Neural Analytics Platform',
    category: 'AI',
    description: 'Enterprise AI dashboard for real-time data analysis and predictive insights.',
    image: '/placeholder.svg?height=600&width=800',
    tags: ['Machine Learning', 'React', 'Python'],
    color: '#27D6DB',
  },
  {
    id: 2,
    title: 'FinTech Mobile App',
    category: 'Apps',
    description: 'Secure banking application with biometric authentication and AI-powered insights.',
    image: '/placeholder.svg?height=600&width=800',
    tags: ['React Native', 'Node.js', 'AWS'],
    color: '#092658',
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    category: 'Web',
    description: 'High-performance e-commerce solution with personalized recommendations.',
    image: '/placeholder.svg?height=600&width=800',
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    color: '#27D6DB',
  },
  {
    id: 4,
    title: 'Brand Identity - TechCorp',
    category: 'Design',
    description: 'Complete brand overhaul including logo, guidelines, and marketing materials.',
    image: '/placeholder.svg?height=600&width=800',
    tags: ['Branding', 'UI/UX', 'Motion'],
    color: '#092658',
  },
  {
    id: 5,
    title: 'Virtual Showroom',
    category: '3D',
    description: 'Immersive 3D product visualization for automotive industry.',
    image: '/placeholder.svg?height=600&width=800',
    tags: ['Three.js', 'WebGL', 'Blender'],
    color: '#27D6DB',
  },
  {
    id: 6,
    title: 'AI Chatbot Suite',
    category: 'AI',
    description: 'Multi-language customer service bot with sentiment analysis.',
    image: '/placeholder.svg?height=600&width=800',
    tags: ['NLP', 'GPT-4', 'TypeScript'],
    color: '#092658',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            opacity: isHovered ? 1 : 0,
            background: isHovered 
              ? `linear-gradient(to top, ${project.color}E6 0%, ${project.color}80 50%, transparent 100%)`
              : 'transparent'
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Blur Overlay */}
        <motion.div
          className="absolute inset-0 backdrop-blur-sm"
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2">
          {project.title}
        </h3>
        
        {/* Description */}
        <p className="text-white/80 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* View Project */}
        <motion.button
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 text-white font-medium text-sm"
        >
          View Project
          <ArrowUpRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Default State - Category Badge */}
      <motion.div
        className="absolute top-4 left-4"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span 
          className="px-3 py-1.5 text-xs font-semibold rounded-full text-white"
          style={{ background: project.color }}
        >
          {project.category}
        </span>
      </motion.div>
    </motion.div>
  )
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

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
      id="portfolio"
      className="py-24 md:py-32 bg-[#F2F1ED] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#27D6DB]/5 to-[#092658]/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#092658]/10 text-[#092658] text-sm font-medium mb-4"
          >
            Our Work
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#092658] mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[#092658]/60 max-w-2xl mx-auto text-lg">
            Explore our portfolio of successful projects that showcase our expertise in AI, development, and design.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === category
                  ? 'bg-gradient-to-r from-[#27D6DB] to-[#092658] text-white shadow-lg'
                  : 'bg-white/50 text-[#092658]/70 hover:bg-white hover:text-[#092658]'
                }
              `}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#092658]/20 text-[#092658] font-medium hover:bg-[#092658] hover:text-white transition-all duration-300"
          >
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
