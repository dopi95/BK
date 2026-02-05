import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Beton Kegna - ቤቶን ከእኛ | Real Estate Consultancy',
  description: 'Professional real estate consultancy services in Ethiopia. Find your perfect property with Beton Kegna.',
  icons: {
    icon: '/assets/logo.jpg',
    shortcut: '/assets/logo.jpg',
    apple: '/assets/logo.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-gray-900 transition-colors duration-300`}>
        <ThemeProvider>
          <LanguageProvider>
            <Header />
            <main className="pt-20">
              {children}
            </main>
            <Footer />
            <FloatingContact />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}