'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'

export default function FAQ() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('faq')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const faqs = [
    {
      question: language === 'am' ? 'ቤቶን ከኛ ምን አይነት አገልግሎቶች ይሰጣል?' : 'What services does Beton Kegna offer?',
      answer: language === 'am' ? 'ቤቶን ከኛ የንግድ እና የመኖሪያ ቤቶች ሽያጭ፣ የሪል እስቴት ማማከር፣ የንብረት አስተዳደር እና የኢንቨስትመንት አማካሪ አገልግሎቶችን ይሰጣል። በተለይም የአኮያ ፕሮፐርቲስ ፕሮጀክቶችን እንወክላለን።' : 'Beton Kegna offers commercial and residential property sales, real estate consulting, property management, and investment advisory services. We specialize in representing Akoya Properties projects.'
    },
    {
      question: language === 'am' ? 'ቤቶን ከኛ የሚወክላቸው ፕሮጀክቶች የትኞቹ ናቸው?' : 'Which projects does Beton Kegna represent?',
      answer: language === 'am' ? 'ቤቶን ከኛ የሚወክላቸው ፕሮጀክቶች ገልድ ሱቅ (4 ኪሎ)፣ አሜሊያዝ (ሳርቤት)፣ ኦዞን (ሳሬም ሆቴል አጠገብ) እና ኖቬልቲ (ፍሬንድሺፕ ፓርክ ፊት ለፊት) ናቸው።' : 'Beton Kegna represents Gold Souq (4 Kilo), Ameliaz (Sarbet), Ozone (beside Sarem Hotel), and Novelty (infront of Friendship Park) projects.'
    },
    {
      question: language === 'am' ? 'ቤቶን ከኛ ከየት ማግኘት ይቻላል?' : 'How can I contact Beton Kegna?',
      answer: language === 'am' ? 'ቤቶን ከኛን በኢሜይል፣ ዋትሳፕ፣ ቴለግራም ወይም በቲክቶክ፣ ዩቱብ፣ ኢንስታግራም በመተካተል ማግኘት ይቻላል። ከፋኑኤል ጋር በቀባሉ ያነጋገሩ።' : 'You can contact Beton Kegna by email, WhatsApp, Telegram, or follow us on TikTok, YouTube, Instagram. Contact directly with Fanuel for personalized service.'
    },
    {
      question: language === 'am' ? 'ቤቶን ከኛ ምን ያህል ልምድ አለው?' : 'How much experience does Beton Kegna have?',
      answer: language === 'am' ? 'ቤቶን ከኛ በሪል እስቴት ዘርፍ ከ15 ዓመት በላይ ልምድ አለው። ከ500 በላይ ደንበኞችን አስደስተናል እና ከ1000 በላይ ቁልፎችን አስረክበናል።' : 'Beton Kegna has over 15 years of experience in the real estate sector. We have served over 500 happy clients and delivered over 1000 keys.'
    }
  ]

  return (
    <section id="faq" className="py-20 lg:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700 bg-clip-text text-transparent mb-6 font-display">
            {language === 'am' ? 'ተደጋጋሚ ጥያቄዎች' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-body">
            {language === 'am' ? 'ስለ አገልግሎቶቻችን እና ፕሮጀክቶቻችን የሚጠየቁ ተደጋጋሚ ጥያቄዎች' : 'Common questions about our services and projects'}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4 font-heading">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-brand-500 transform transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-body">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}