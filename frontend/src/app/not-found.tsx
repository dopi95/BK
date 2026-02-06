'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NotFound() {
  const router = useRouter()
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Animated Emoji */}
        <div className="text-9xl mb-8 animate-bounce">
          🏚️
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl font-bold text-brand-600 dark:text-brand-400 mb-4 animate-pulse">
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          {language === 'am' ? 'ገጹ አልተገኘም' : 'Page Not Found'}
        </h2>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          {language === 'am' 
            ? 'ይቅርታ፣ የፈለጉት ገጽ አልተገኘም። ወደ መነሻ ገጽ ይመለሱ።'
            : 'Sorry, the page you are looking for does not exist. Let\'s get you back home.'
          }
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {language === 'am' ? '🏠 ወደ መነሻ ይመለሱ' : '🏠 Go Home'}
          </button>
          
          <button
            onClick={() => router.back()}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-8 py-4 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {language === 'am' ? '⬅️ ወደ ኋላ ይመለሱ' : '⬅️ Go Back'}
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center space-x-4 text-4xl opacity-50">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>🏢</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🏠</span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🏡</span>
        </div>
      </div>
    </div>
  )
}
