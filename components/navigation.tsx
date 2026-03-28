'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-4 bg-[#F2F1ED]/80 backdrop-blur-lg shadow-lg' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Animated Logo with Gradient Border */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#hero')
            }}
            className="flex items-center gap-3 group cursor-pointer"
            onHoverStart={() => setIsLogoHovered(true)}
            onHoverEnd={() => setIsLogoHovered(false)}
          >
            {/* Animated Gradient Border Container - Rounded Square */}
            <div className="relative">
              {/* Animated Gradient Ring - Rounded Square */}
              <motion.div
                className="absolute -inset-0.5 rounded-sm bg-gradient-to-r from-[#27D6DB] via-[#092658] to-[#27D6DB]"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                  opacity: 0.6,
                }}
              />
              
              {/* Inner White Ring - Rounded Square */}
              {/* <div className="absolute -inset-0.5 rounded-xl bg-[#F2F1ED]" /> */}
              
              {/* Logo Container - Rounded Square */}
              {/* <div className="relative w-10 h-10 bg-[#F2F1ED] rounded-xl flex items-center justify-center"> */}
                <AnimatePresence mode="wait">
                  {!isLogoHovered ? (
                    // Logo 1
                    <motion.div
                      key="logo1"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="relative w-8 h-8"
                    >
                      <Image
                        src="/icon_1.svg"
                        alt="Aibrio Digital"
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  ) : (
                    // Logo 2
                    <motion.div
                      key="logo2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="relative w-8 h-8"
                    >
                      <Image
                        src="/icon_2.svg"
                        alt="Aibrio Digital"
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              {/* </div> */}
            </div>
            
            {/* Text Logo */}
            <div className="flex flex-col">
              <span className="font-bold text-[#092658] text-lg leading-tight">Aibrio</span>
              <span className="text-[10px] text-[#092658]/60 tracking-[0.2em] uppercase">Digital</span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className="relative text-[#092658] text-sm font-medium hover:text-[#27D6DB] transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#27D6DB] to-[#092658]"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            className="hidden md:block px-6 py-2.5 rounded-full bg-gradient-to-r from-[#27D6DB] to-[#092658] text-white text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#contact')}
          >
            Get Started
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#092658]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 pt-24 bg-[#F2F1ED]/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className="text-2xl font-medium text-[#092658] hover:text-[#27D6DB] transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#27D6DB] to-[#092658] text-white font-medium"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => scrollToSection('#contact')}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}