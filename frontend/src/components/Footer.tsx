'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'

export default function Footer() {
  const { language } = useLanguage()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img src="/assets/logo.jpg" alt="Beton Kegna Logo" className="h-12 w-auto" />
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                  {language === 'am' ? 'ቤቶን ከእኛ' : 'ቤቶን ከእኛ'}
                </div>
                <div className="text-sm text-gray-400">Beton Kegna</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {language === 'am' 
                ? 'በኢትዮጵያ ውስጥ ሙያዊ የሪል እስቴት አማካሪ አገልግሎቶች። ከቤቶን ከኛ ጋር ፍጹም ንብረትዎን ያግኙ።'
                : 'Professional real estate consultancy services in Ethiopia. Find your perfect property with Beton Kegna.'
              }
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="https://www.youtube.com/@fanuel_properties" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@fanuelakoyaproperties" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/fanuel_properties" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/fanuel.solomon.5" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-brand-400">
              {language === 'am' ? 'ፈጣን አገናኞች' : 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('home')} 
                        className="text-gray-300 hover:text-brand-400 transition-colors duration-200 text-sm">
                  {language === 'am' ? 'ቤት' : 'Home'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} 
                        className="text-gray-300 hover:text-brand-400 transition-colors duration-200 text-sm">
                  {language === 'am' ? 'ስለ እኛ' : 'About'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} 
                        className="text-gray-300 hover:text-brand-400 transition-colors duration-200 text-sm">
                  {language === 'am' ? 'አገልግሎቶች' : 'Services'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('properties')} 
                        className="text-gray-300 hover:text-brand-400 transition-colors duration-200 text-sm">
                  {language === 'am' ? 'ንብረቶች' : 'Properties'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} 
                        className="text-gray-300 hover:text-brand-400 transition-colors duration-200 text-sm">
                  {language === 'am' ? 'ተደጋጋሚ ጥያቄዎች' : 'FAQ'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-brand-400">
              {language === 'am' ? 'ያግኙን' : 'Contact Us'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <a href="tel:+251930879595" className="text-brand-400 hover:text-brand-300 transition-colors duration-200">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                <div>
                  <a href="tel:+251930879595" className="text-gray-300 hover:text-brand-400 text-sm transition-colors duration-200">+251 930 879 595</a>
                  <br />
                  <a href="tel:+251711879595" className="text-gray-300 hover:text-brand-400 text-sm transition-colors duration-200">+251 711 879 595</a>
                  <p className="text-xs text-gray-400 mt-1">
                    {language === 'am' ? 'ከፋኑኤል ጋር ያነጋግሩ' : 'Contact Fanuel'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <a href="mailto:info@betonkegna.com" className="text-brand-400 hover:text-brand-300 transition-colors duration-200">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <div>
                  <a href="mailto:info@betonkegna.com" className="text-gray-300 hover:text-brand-400 text-sm transition-colors duration-200">info@betonkegna.com</a>
                  <p className="text-xs text-gray-400 mt-1">
                    {language === 'am' ? 'የንግድ መረጃ' : 'Business Inquiries'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-gray-300 text-sm">
                    {language === 'am' ? 'አዲስ አበባ፣ ኢትዮጵያ' : 'Addis Ababa, Ethiopia'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-sm text-gray-400 text-center">
            © 2024 {language === 'am' ? 'ቤቶን ከእኛ' : 'Beton Kegna'}. 
            {language === 'am' ? ' ሁሉም መብቶች የተጠበቁ ናቸው።' : ' All rights reserved.'}
          </div>
        </div>
      </div>
    </footer>
  )
}