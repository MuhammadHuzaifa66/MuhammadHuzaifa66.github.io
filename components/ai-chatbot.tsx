'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const quickReplies = [
  'What services do you offer?',
  'Tell me about AI solutions',
  'How can I get started?',
  'Request a quote',
]

// Smart rule-based responses
const getAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('what do you')) {
    return 'We offer a comprehensive range of services including AI/ML solutions, mobile app development, web development, brand design, automation, and 3D/VFX creation. Each solution is tailored to meet your specific business needs. Would you like to know more about any specific service?'
  }
  
  if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning') || lowerMessage.includes('artificial')) {
    return 'Our AI solutions include custom machine learning models, natural language processing, chatbots, predictive analytics, and intelligent automation. We can help you leverage AI to streamline operations, enhance customer experience, and drive business growth. What specific AI challenge are you looking to solve?'
  }
  
  if (lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
    return 'We develop native iOS and Android apps, as well as cross-platform solutions using React Native and Flutter. Our apps feature stunning UI/UX, seamless performance, and robust security. Do you have a specific app idea in mind?'
  }
  
  if (lowerMessage.includes('web') || lowerMessage.includes('website')) {
    return 'Our web development services cover everything from modern responsive websites to complex web applications. We specialize in Next.js, React, and cutting-edge technologies for optimal performance. Tell me more about your web project!'
  }
  
  if (lowerMessage.includes('design') || lowerMessage.includes('brand')) {
    return 'Our design team creates complete brand identities, including logos, style guides, UI/UX design, and marketing materials. We focus on creating memorable, cohesive visual experiences that resonate with your target audience.'
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote') || lowerMessage.includes('budget')) {
    return 'Our pricing depends on the project scope and requirements. We offer flexible engagement models including fixed-price projects, hourly rates, and retainer agreements. I recommend filling out our contact form for a detailed, customized quote. Would you like me to guide you there?'
  }
  
  if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('how')) {
    return 'Getting started is easy! Here\'s our process: 1) Initial consultation to understand your needs, 2) Proposal and scope definition, 3) Design and development phases, 4) Testing and refinement, 5) Launch and ongoing support. Ready to begin? Let\'s schedule a call!'
  }
  
  if (lowerMessage.includes('3d') || lowerMessage.includes('vfx') || lowerMessage.includes('animation')) {
    return 'Our 3D & VFX team creates immersive experiences including 3D modeling, product visualization, motion graphics, AR/VR experiences, and visual effects. Perfect for marketing, entertainment, or interactive applications!'
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return 'Hello! Welcome to Aibrio Digital. I\'m here to help you explore our services and find the perfect solution for your needs. What brings you here today?'
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('talk')) {
    return 'You can reach us through our contact form below, or email us at hello@aibriodigital.com. We typically respond within 24 hours. Would you prefer to schedule a call or send us a message?'
  }
  
  return 'That\'s a great question! Our team would love to discuss this in detail with you. You can tell me more about your specific needs, or I can connect you with one of our specialists. What would you prefer?'
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m the Aibrio AI assistant. How can I help you today? Feel free to ask about our services, pricing, or how we can help with your project.',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getAIResponse(input),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, aiResponse])
  }

  const handleQuickReply = (reply: string) => {
    setInput(reply)
    setTimeout(() => handleSend(), 100)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#27D6DB] to-[#092658] text-white shadow-xl flex items-center justify-center ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <MessageCircle className="w-6 h-6" />
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-[#27D6DB] animate-ping opacity-25" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(9, 38, 88, 0.1)',
            }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#27D6DB] to-[#092658] text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Aibrio Assistant</h3>
                    <p className="text-xs text-white/80">Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'assistant'
                        ? 'bg-gradient-to-br from-[#27D6DB] to-[#092658] text-white'
                        : 'bg-[#092658]/10 text-[#092658]'
                    }`}
                  >
                    {message.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.role === 'assistant'
                        ? 'bg-[#F2F1ED] text-[#092658] rounded-tl-none'
                        : 'bg-gradient-to-r from-[#27D6DB] to-[#092658] text-white rounded-tr-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#27D6DB] to-[#092658] flex items-center justify-center text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-[#F2F1ED] p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#092658]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-[#092658]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-[#092658]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length < 3 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1.5 text-xs rounded-full bg-[#27D6DB]/10 text-[#092658] hover:bg-[#27D6DB]/20 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-[#092658]/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 rounded-full bg-[#F2F1ED] border border-transparent focus:border-[#27D6DB] focus:outline-none text-sm text-[#092658] placeholder:text-[#092658]/40"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-[#27D6DB] to-[#092658] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
