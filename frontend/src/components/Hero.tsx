'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const backgroundImages = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ]

  useEffect(() => {
    setIsVisible(true)
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${image})`}}></div>
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}
      </div>



      {/* Brand Name - Top Center */}
      <div className="absolute top-4 sm:top-6 md:top-8 left-2 right-2 sm:left-4 sm:right-4 md:left-0 md:right-0 flex justify-center z-20">
        <div className="text-center animate-brand-appear px-2" style={{marginTop: '48px'}}>
          <div className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl font-hero">
            <div className="leading-tight text-transparent bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 bg-clip-text">ቤቶን ከእኛ</div>
            <div className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl mt-1 text-transparent bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text leading-tight font-brand">Beton Kegna</div>
          </div>
          <div className="text-base sm:text-lg md:text-xl text-brand-400 font-bold mt-2 drop-shadow-lg px-1 font-elegant italic tracking-wide">
            &quot; የቤትዎን ቁልፍ በጊዜ ይረከቡ! &quot;
          </div>
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white mt-2 sm:mt-3 md:mt-8 lg:mt-12 mb-6 sm:mb-8 md:mb-16 lg:mb-20 max-w-4xl mx-auto animate-fade-in-up delay-300 drop-shadow-lg px-2 leading-relaxed font-body">
            {t('tagline')}
          </p>
          
          {/* Spacer for PC view only */}
          <div className="hidden lg:block h-16 xl:h-24"></div>
        </div>
      </div>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Keys */}
        <div className="absolute top-60 left-10 animate-key-float">
          <div className="text-2xl text-yellow-400">🗝️</div>
        </div>
        <div className="absolute top-80 right-20 animate-key-float" style={{animationDelay: '1s'}}>
          <div className="text-xl text-yellow-500">🗝️</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center pt-20 sm:pt-36 md:pt-48 lg:pt-52">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Animated Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center animate-fade-in-up delay-500 px-2 mb-8 sm:mb-12 md:mb-16 mt-8 lg:mt-12 xl:mt-16 relative z-20">
            <button 
              className="w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px] bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-4 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer font-button" 
              onClick={() => router.push('/contact')}
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm sm:text-base font-medium">{t('contactUs')}</span>
              </span>
            </button>
            
            <button 
              className="w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px] bg-white/10 backdrop-blur-md border border-brand-400 text-brand-400 hover:bg-brand-500 hover:text-white px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer font-button" 
              onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h5" />
                </svg>
                <span className="text-sm sm:text-base font-medium">{t('exploreProperties')}</span>
              </span>
            </button>
          </div>

          {/* Stats and Slider Dots Container */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 animate-fade-in-up delay-700">
            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 px-2">
              <div className="group cursor-pointer rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 hover:bg-white/5 transition-all duration-300">
                <div className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-transparent bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text mb-1 animate-count-up group-hover:scale-110 transition-transform duration-300 font-stats">100+</div>
                <div className="text-brand-300 text-xs sm:text-sm md:text-base leading-tight flex items-center justify-center gap-1 font-text">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-center">Happy Clients</span>
                </div>
              </div>
              <div className="group cursor-pointer rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 hover:bg-white/5 transition-all duration-300">
                <div className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-transparent bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text mb-1 animate-count-up group-hover:scale-110 transition-transform duration-300 font-stats">200M+</div>
                <div className="text-brand-300 text-xs sm:text-sm md:text-base leading-tight flex items-center justify-center gap-1 font-text">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-center">Transactions</span>
                </div>
              </div>
              <div className="group cursor-pointer rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 hover:bg-white/5 transition-all duration-300">
                <div className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-transparent bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text mb-1 animate-count-up group-hover:scale-110 transition-transform duration-300 font-stats">2+</div>
                <div className="text-brand-300 text-xs sm:text-sm md:text-base leading-tight break-words flex items-center justify-center gap-1 flex-wrap font-text">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-center">Years Experience</span>
                </div>
              </div>
            </div>

            {/* Slider Dots - Right Corner on Desktop - HIDDEN */}
            <div className="hidden">
              <div className="flex flex-col space-y-3">
                {backgroundImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-brand-400 scale-125'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Slider Dots - Bottom Center on Mobile/Tablet */}
            <div className="lg:hidden flex space-x-3 z-30">
              {backgroundImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-brand-400 scale-125'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 sm:bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-4 h-6 sm:w-6 sm:h-10 border-2 border-brand-400 rounded-full flex justify-center">
          <div className="w-1 h-1.5 sm:h-3 bg-brand-400 rounded-full mt-1.5 sm:mt-2 animate-scroll-dot"></div>
        </div>
      </div>
    </section>
  )
}