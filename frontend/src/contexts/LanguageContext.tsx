'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'am'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations = {
  en: {
    home: 'Home',
    properties: 'Properties',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    getStarted: 'Contact',
    brandName: 'Beton Kegna',
    tagline: 'Your trusted real estate consultancy partner in Ethiopia',
  },
  am: {
    home: 'መነሻ',
    properties: 'ንብረቶች',
    services: 'አገልግሎቶች',
    about: 'ስለ እኛ',
    contact: 'ያግኙን',
    getStarted: 'ያግኙን',
    brandName: 'ቤቶን ከኛ',
    tagline: 'በኢትዮጵያ የሚታመን የሪል እስቴት አማካሪ አጋርዎ',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'am' : 'en'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}