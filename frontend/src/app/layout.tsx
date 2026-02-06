'use client'

import { usePathname } from 'next/navigation'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'
  const isForgotPasswordPage = pathname === '/forgot-password'
  const isAdminPage = pathname?.startsWith('/admin')
  const hideLayout = isLoginPage || isForgotPasswordPage || isAdminPage

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo.jpg" />
        <title>Beton Kegna - Real Estate Sales</title>
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-900 transition-colors duration-300`}>
        <ThemeProvider>
          <LanguageProvider>
            {!hideLayout && <Header />}
            <main className={hideLayout ? '' : 'pt-20'}>
              {children}
            </main>
            {!hideLayout && <Footer />}
            {!hideLayout && <FloatingContact />}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}