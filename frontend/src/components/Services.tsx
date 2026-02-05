'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'

export default function Services() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('services-section')
    if (section) observer.observe(section)

    // Auto-slide for mobile
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % 3)
      }
    }, 5000)

    // Prevent auto-slide during touch interactions
    const handleTouchStart = () => setIsPaused(true)
    const handleTouchEnd = () => setIsPaused(false)
    const handleTouchCancel = () => setIsPaused(false)
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
    document.addEventListener('touchcancel', handleTouchCancel, { passive: true })

    return () => {
      observer.disconnect()
      clearInterval(interval)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchcancel', handleTouchCancel)
    }
  }, [])

  const services = [
    {
      icon: '🏠',
      titleKey: 'propertySales',
      descKey: 'propertySalesDesc'
    },
    {
      icon: '💼',
      titleKey: 'realEstateConsultation',
      descKey: 'realEstateConsultationDesc'
    },
    {
      icon: '💰',
      titleKey: 'investmentAdvisory',
      descKey: 'investmentAdvisoryDesc'
    }
  ]

  return (
    <section id="services" className="py-20 lg:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-brand-200/20 dark:bg-brand-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-300/20 dark:bg-brand-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700 bg-clip-text text-transparent mb-6 font-display">
            {t('ourServices')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-body">
            {t('servicesDescription')}
          </p>
        </div>

        {/* Mobile Slider */}
        <div className="lg:hidden relative">
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-brand-100/50 dark:border-brand-700/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent dark:from-brand-800/20 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex items-center gap-4 mb-6">
                      <div className="text-5xl group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors duration-300 font-heading">
                        {t(service.titleKey)}
                      </h3>
                    </div>
                    <div className="relative z-10">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 font-body">
                        {t(service.descKey)}
                      </p>
                    </div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-brand-400/0 group-hover:border-brand-400/30 dark:group-hover:border-brand-500/40 transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)}
              className="p-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-lg transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-brand-400 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-brand-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % services.length)}
              className="p-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-lg transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-xl hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 transform hover:-translate-y-4 border border-brand-100/50 dark:border-brand-700/30 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent dark:from-brand-800/20 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon and Title in one line */}
              <div className="relative z-10 flex items-center gap-4 mb-6">
                <div className="text-5xl lg:text-6xl group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg">
                  {service.icon}
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors duration-300 font-heading">
                  {t(service.titleKey)}
                </h3>
              </div>
              {/* Description */}
              <div className="relative z-10">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 font-body">
                  {t(service.descKey)}
                </p>
              </div>
              
              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-brand-400/0 group-hover:border-brand-400/30 dark:group-hover:border-brand-500/40 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}