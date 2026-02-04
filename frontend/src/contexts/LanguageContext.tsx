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
    contactUs: 'Contact Us',
    exploreProperties: 'Explore Properties',
    happyClients: 'Happy Clients',
    keysDelivered: 'Keys Delivered',
    unlockingDreams: 'Unlocking Your Dreams',
    yearsExperience: 'Years Experience',
    ourServices: 'Our Services',
    servicesDescription: 'Comprehensive real estate solutions designed to unlock your property potential',
    propertySales: 'Property Sales',
    propertySalesDesc: 'Expert guidance in selling residential and commercial properties with market insights',
    realEstateConsultation: 'Real Estate Consultation',
    realEstateConsultationDesc: 'Professional advice on real estate investments, market trends, and strategic planning',
    investmentAdvisory: 'Investment Advisory',
    investmentAdvisoryDesc: 'Strategic investment planning and portfolio optimization for maximum returns',
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
    contactUs: 'ያግኙን',
    exploreProperties: 'ንብረቶችን ይመልከቱ',
    happyClients: 'ደስ የሚል ተጠቃሚዎች',
    keysDelivered: 'የተሰጡ ቁልፎች',
    unlockingDreams: 'የህልሞችን መክፈት',
    yearsExperience: 'ዓመታት ልምድ',
    ourServices: 'የእኛ አገልግሎቶች',
    servicesDescription: 'የንብረት አገማመትዎን ለማስፈት የተዘጋጁ ሙሉ የሪል እስቴት መፍትሄዎች',
    propertySales: 'የንብረት ሽያጭ',
    propertySalesDesc: 'የመኖሪያ እና የንግድ ንብረቶችን በመሸጥ ረገድ ባለሙያ መመሪያ ከገበያ መረዳት ጋር',
    realEstateConsultation: 'የሪል እስቴት ምክር',
    realEstateConsultationDesc: 'በሪል እስቴት ኢንቨስትመንት፣ የገበያ አዝማሚያዎች እና ስትራቴጂካዊ እቅድ ላይ ባለሙያ ምክር',
    investmentAdvisory: 'የኢንቨስትመንት ምክር',
    investmentAdvisoryDesc: 'የመደበኛ ውጤት ለማገኘት ስትራቴጂካዊ የኢንቨስትመንት እቅድ እና የፖርትፎሊዮ ማሻሻያ',
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