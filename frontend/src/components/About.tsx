'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function About() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [aboutImage, setAboutImage] = useState('/images/fanuel.jpg')

  useEffect(() => {
    fetchAboutImage()
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('about')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const fetchAboutImage = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about/image`)
      const data = await res.json()
      if (data?.imageUrl) setAboutImage(data.imageUrl)
    } catch (error) {
      console.error('Failed to load about image')
    }
  }

  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://youtube.com/@fanuel_properties?si=ICLDsVBs7s4YCL1s',
      color: 'hover:bg-red-500',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'Telegram',
      url: 'https://t.me/fanuel_properties',
      color: 'hover:bg-blue-500',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.093.036.306.02.472z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@fanuel_akoya',
      color: 'hover:bg-black',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/fanuel_properties',
      color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/1MjNBeMYRb/',
      color: 'hover:bg-blue-600',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Telegram',
      url: 'https://t.me/fanuel_akoya',
      color: 'hover:bg-blue-500',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
        </svg>
      )
    }
  ]

  return (
    <section id="about" className="py-20 lg:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700 bg-clip-text text-transparent mb-6 font-display">
            {t('aboutUs')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-body">
            {t('aboutDescription')}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Consultant Profile */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative">
              {/* Profile Image */}
              <div className="relative w-80 h-80 mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={aboutImage}
                  alt="Fanuel - Sales"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Consultant Info */}
              <div className="text-center lg:text-left mt-6">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-heading">
                  Fanuel Kemeto
                </h3>
                <p className="text-xl text-brand-600 dark:text-brand-400 font-semibold mb-4 font-button">
                  Sales Manager
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-body">
                  {t('consultantBio')}
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-center lg:justify-start space-x-4 mt-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:text-white ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {/* Mission */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                  🎯
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-heading">
                  {t('ourMission')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-body">
                {t('missionText')}
              </p>
            </div>

            {/* Vision */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                  👁️
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-heading">
                  {t('ourVision')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-body">
                {t('visionText')}
              </p>
            </div>

            {/* Why Choose Us */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                  ⭐
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-heading">
                  {t('whyChooseUs')}
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600 dark:text-gray-300 font-text">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-3"></span>
                  {t('expertiseExperience')}
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 font-text">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-3"></span>
                  {t('personalizedService')}
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 font-text">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-3"></span>
                  {t('marketKnowledge')}
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 font-text">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-3"></span>
                  {t('trustedPartner')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}