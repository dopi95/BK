'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Logo from './Logo'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    // If we're on contact page, navigate to home first
    if (window.location.pathname === '/contact') {
      window.location.href = `/#${sectionId}`
      return
    }
    
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 animate-fade-in">
            <img src="/assets/logo.jpg" alt="Beton Kegna Logo" className="h-12 w-auto" />
            <button 
              onClick={() => scrollToSection('home')}
              className="flex flex-col hover:scale-105 transition-transform duration-200 cursor-pointer"
              suppressHydrationWarning={true}
            >
              <div className="text-xl font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                {language === 'am' ? 'ቤቶን ከኛ' : 'ቤቶን ከኛ'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'am' ? 'Beton Kegna' : 'Beton Kegna'}
              </div>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-200 hover:scale-105">
              {t('home')}
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-200 hover:scale-105">
              {t('about')}
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-200 hover:scale-105">
              {t('services')}
            </button>
            <button onClick={() => scrollToSection('properties')} className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-200 hover:scale-105">
              {t('properties')}
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            <button onClick={() => window.location.href = '/contact'} className="hidden md:block bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200" suppressHydrationWarning={true}>
              {t('getStarted')}
            </button>

            {/* Language Toggle - Desktop Only */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                suppressHydrationWarning={true}
              >
                <Image
                  src={language === 'en' ? '/assets/uk.svg' : '/assets/et.svg'}
                  alt={language === 'en' ? 'English' : 'አማርኛ'}
                  width={16}
                  height={12}
                  className="rounded-sm"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {language === 'en' ? 'EN' : 'አማ'}
                </span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown */}
              {isLangDropdownOpen && (
                <div className="absolute top-full mt-1 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 min-w-[120px]">
                  <button
                    onClick={() => { if (language !== 'en') toggleLanguage(); setIsLangDropdownOpen(false); }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Image src="/assets/uk.svg" alt="English" width={16} height={12} className="rounded-sm" />
                    <span>EN</span>
                  </button>
                  <button
                    onClick={() => { if (language !== 'am') toggleLanguage(); setIsLangDropdownOpen(false); }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Image src="/assets/et.svg" alt="አማርኛ" width={16} height={12} className="rounded-sm" />
                    <span>አማ</span>
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle - Desktop Only */}
            <button
              onClick={toggleTheme}
              className="hidden lg:block p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              suppressHydrationWarning={true}
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              suppressHydrationWarning={true}
            >
              <svg className={`w-6 h-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg p-4 shadow-lg animate-slide-down">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 py-2 text-left">
                {t('home')}
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 py-2 text-left">
                {t('about')}
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 py-2 text-left">
                {t('services')}
              </button>
              <button onClick={() => scrollToSection('properties')} className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 py-2 text-left">
                {t('properties')}
              </button>
              
              {/* Mobile Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <button onClick={() => window.location.href = '/contact'} className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex-1 mr-4" suppressHydrationWarning={true}>
                  {t('getStarted')}
                </button>
                
                <div className="flex items-center space-x-3">
                  {/* Language Toggle */}
                  <div className="relative">
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                    suppressHydrationWarning={true}
                  >
                    <Image
                      src={language === 'en' ? '/assets/uk.svg' : '/assets/et.svg'}
                      alt={language === 'en' ? 'English' : 'አማርኛ'}
                      width={16}
                      height={12}
                      className="rounded-sm"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {language === 'en' ? 'EN' : 'አማ'}
                    </span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Mobile Dropdown */}
                  {isLangDropdownOpen && (
                    <div className="absolute bottom-full mb-1 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-[100] min-w-[120px]">
                      <button
                        onClick={() => { if (language !== 'en') toggleLanguage(); setIsLangDropdownOpen(false); }}
                        className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Image src="/assets/uk.svg" alt="English" width={16} height={12} className="rounded-sm" />
                        <span>EN</span>
                      </button>
                      <button
                        onClick={() => { if (language !== 'am') toggleLanguage(); setIsLangDropdownOpen(false); }}
                        className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Image src="/assets/et.svg" alt="አማርኛ" width={16} height={12} className="rounded-sm" />
                        <span>አማ</span>
                      </button>
                    </div>
                  )}
                </div>

                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                    suppressHydrationWarning={true}
                  >
                    {theme === 'light' ? (
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}