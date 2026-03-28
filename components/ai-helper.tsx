'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, ArrowRight, RotateCcw, Check } from 'lucide-react'

interface Question {
  id: string
  question: string
  options: { label: string; value: string }[]
}

const questions: Question[] = [
  {
    id: 'project-type',
    question: 'What type of project are you planning?',
    options: [
      { label: 'Mobile App', value: 'mobile' },
      { label: 'Web Application', value: 'web' },
      { label: 'AI/ML Solution', value: 'ai' },
      { label: 'Brand Design', value: 'design' },
      { label: '3D/VFX Project', value: '3d' },
    ],
  },
  {
    id: 'timeline',
    question: 'What is your ideal timeline?',
    options: [
      { label: 'ASAP (1-2 months)', value: 'urgent' },
      { label: 'Normal (3-4 months)', value: 'normal' },
      { label: 'Flexible (5+ months)', value: 'flexible' },
    ],
  },
  {
    id: 'budget',
    question: 'What is your budget range?',
    options: [
      { label: '$5K - $15K', value: 'small' },
      { label: '$15K - $50K', value: 'medium' },
      { label: '$50K - $100K', value: 'large' },
      { label: '$100K+', value: 'enterprise' },
    ],
  },
]

const recommendations: Record<string, { title: string; services: string[]; description: string }> = {
  'mobile-urgent-small': {
    title: 'MVP Mobile App',
    services: ['React Native Development', 'Basic UI/UX Design'],
    description: 'A streamlined mobile app MVP to validate your idea quickly.',
  },
  'mobile-normal-medium': {
    title: 'Full-Featured Mobile App',
    services: ['Native iOS/Android Development', 'Custom UI/UX Design', 'Backend Integration'],
    description: 'A comprehensive mobile application with custom features and polished design.',
  },
  'web-normal-medium': {
    title: 'Modern Web Application',
    services: ['Next.js Development', 'Responsive Design', 'Cloud Hosting'],
    description: 'A fast, scalable web application built with cutting-edge technologies.',
  },
  'ai-normal-large': {
    title: 'Custom AI Solution',
    services: ['ML Model Development', 'Data Pipeline', 'Integration & Deployment'],
    description: 'A tailored AI solution to automate and optimize your business processes.',
  },
  'design-flexible-small': {
    title: 'Brand Identity Package',
    services: ['Logo Design', 'Brand Guidelines', 'Marketing Collateral'],
    description: 'A complete brand identity that makes your business memorable.',
  },
  '3d-flexible-large': {
    title: 'Immersive 3D Experience',
    services: ['3D Modeling', 'Animation', 'Interactive Visualization'],
    description: 'Stunning 3D content that captivates and engages your audience.',
  },
  'default': {
    title: 'Custom Solution',
    services: ['Consultation', 'Custom Development', 'Ongoing Support'],
    description: 'A tailored solution designed specifically for your unique requirements.',
  },
}

const quickActions = [
  { label: 'Build an App', icon: '📱', value: 'mobile' },
  { label: 'Create AI Model', icon: '🤖', value: 'ai' },
  { label: 'Design Brand', icon: '🎨', value: 'design' },
]

export function AIHelper() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)

  const handleQuickAction = (value: string) => {
    setAnswers({ 'project-type': value })
    setCurrentStep(1)
  }

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300)
    } else {
      setTimeout(() => setShowResult(true), 300)
    }
  }

  const getRecommendation = () => {
    const key = `${answers['project-type']}-${answers['timeline']}-${answers['budget']}`
    return recommendations[key] || recommendations['default']
  }

  const reset = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
  }

  const recommendation = getRecommendation()

  return (
    <>
      {/* Floating Orb Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-40 group"
            whileHover={{ scale: 1.1 }}
          >
            <div className="relative">
              {/* Glowing orb */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#27D6DB] to-[#092658] shadow-lg flex items-center justify-center animate-pulse-glow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              {/* Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#092658] text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Need help deciding?
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-[#092658] rotate-45" />
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Helper Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-[340px] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(9, 38, 88, 0.1)',
            }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#27D6DB]/10 to-[#092658]/10 border-b border-[#092658]/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#27D6DB] to-[#092658] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-[#092658]">AI Project Guide</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 rounded-full hover:bg-[#092658]/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-[#092658]" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {currentStep === 0 && Object.keys(answers).length === 0 ? (
                      <>
                        <p className="text-sm text-[#092658]/70 mb-4">
                          Tell us what you need, and we&apos;ll recommend the perfect solution.
                        </p>
                        <div className="space-y-2">
                          {quickActions.map((action) => (
                            <motion.button
                              key={action.value}
                              onClick={() => handleQuickAction(action.value)}
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full p-3 rounded-xl bg-[#F2F1ED] hover:bg-[#27D6DB]/10 flex items-center gap-3 transition-colors group"
                            >
                              <span className="text-xl">{action.icon}</span>
                              <span className="font-medium text-[#092658]">{action.label}</span>
                              <ArrowRight className="w-4 h-4 text-[#27D6DB] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Progress */}
                        <div className="flex gap-1 mb-4">
                          {questions.map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-colors ${
                                i <= currentStep ? 'bg-gradient-to-r from-[#27D6DB] to-[#092658]' : 'bg-[#092658]/10'
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-sm font-medium text-[#092658] mb-4">
                          {questions[currentStep].question}
                        </p>

                        <div className="space-y-2">
                          {questions[currentStep].options.map((option) => (
                            <motion.button
                              key={option.value}
                              onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full p-3 rounded-xl text-left text-sm font-medium transition-all ${
                                answers[questions[currentStep].id] === option.value
                                  ? 'bg-gradient-to-r from-[#27D6DB] to-[#092658] text-white'
                                  : 'bg-[#F2F1ED] text-[#092658] hover:bg-[#27D6DB]/10'
                              }`}
                            >
                              {option.label}
                            </motion.button>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#27D6DB] to-[#092658] flex items-center justify-center mx-auto mb-4">
                      <Check className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-lg font-bold text-[#092658] mb-2">
                      {recommendation.title}
                    </h3>

                    <p className="text-sm text-[#092658]/70 mb-4">
                      {recommendation.description}
                    </p>

                    <div className="bg-[#F2F1ED] rounded-xl p-4 mb-4 text-left">
                      <p className="text-xs font-medium text-[#092658]/50 uppercase mb-2">
                        Recommended Services
                      </p>
                      <ul className="space-y-1">
                        {recommendation.services.map((service, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-[#092658]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#27D6DB]" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={reset}
                        className="flex-1 py-2.5 rounded-xl border border-[#092658]/20 text-[#092658] text-sm font-medium hover:bg-[#092658]/5 transition-colors flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Start Over
                      </button>
                      <button
                        onClick={() => {
                          setIsOpen(false)
                          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#27D6DB] to-[#092658] text-white text-sm font-medium"
                      >
                        Get Quote
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
