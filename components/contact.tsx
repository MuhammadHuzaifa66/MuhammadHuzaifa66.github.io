'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, Mail, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@aibriodigital.com',
    href: 'mailto:hello@aibriodigital.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: '#',
  },
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.contact-animate').forEach((el, i) => {
        gsap.fromTo(
          el as Element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', company: '', service: '', message: '' })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const inputClasses = (fieldName: string) => `
    w-full px-4 py-4 rounded-xl bg-white/50 border-2 transition-all duration-300 text-[#092658] placeholder:text-[#092658]/40
    ${focusedField === fieldName 
      ? 'border-[#27D6DB] shadow-lg shadow-[#27D6DB]/20' 
      : 'border-transparent hover:border-[#27D6DB]/30'
    }
    focus:outline-none focus:border-[#27D6DB] focus:shadow-lg focus:shadow-[#27D6DB]/20
  `

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-32 bg-[#F2F1ED] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#27D6DB]/10 to-[#092658]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#092658]/10 to-[#27D6DB]/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#27D6DB]/10 text-[#27D6DB] text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#092658] mb-4">
            Let&apos;s Build Something <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-[#092658]/60 max-w-2xl mx-auto text-lg">
            Ready to start your next project? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="contact-animate flex items-center gap-4 p-6 rounded-2xl glass-card group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#27D6DB]/20 to-[#092658]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[#27D6DB]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#092658]/50">{item.label}</p>
                    <p className="font-medium text-[#092658]">{item.value}</p>
                  </div>
                </motion.a>
              )
            })}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="contact-animate p-6 rounded-2xl glass-card"
            >
              <p className="text-sm text-[#092658]/50 mb-4">Follow Us</p>
              <div className="flex gap-3">
                {['LinkedIn', 'Twitter', 'GitHub', 'Dribbble'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-[#092658]/5 hover:bg-gradient-to-br hover:from-[#27D6DB] hover:to-[#092658] flex items-center justify-center text-[#092658] hover:text-white transition-all duration-300 text-sm font-medium"
                  >
                    {social[0]}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="contact-animate p-8 rounded-3xl glass-card"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#27D6DB] to-[#092658] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#092658] mb-2">Message Sent!</h3>
                  <p className="text-[#092658]/60">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#092658] mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        required
                        className={inputClasses('name')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#092658] mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="john@example.com"
                        required
                        className={inputClasses('email')}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#092658] mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your Company"
                        className={inputClasses('company')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#092658] mb-2">Service Interested</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('service')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('service')}
                      >
                        <option value="">Select a service</option>
                        <option value="ai">AI Solutions</option>
                        <option value="app">App Development</option>
                        <option value="web">Web Development</option>
                        <option value="design">Brand Design</option>
                        <option value="automation">Automation</option>
                        <option value="3d">3D & VFX</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#092658] mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us about your project..."
                      rows={5}
                      required
                      className={inputClasses('message') + ' resize-none'}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#27D6DB] to-[#092658] text-white font-medium text-lg flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-shadow disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  )
}
