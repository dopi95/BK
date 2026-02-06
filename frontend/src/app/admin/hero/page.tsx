'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import AdminSidebar from '@/components/AdminSidebar'

interface HeroSlide {
  _id: string
  imageUrl: string
  order: number
}

interface HeroStat {
  _id: string
  value: string
  label: string
  order: number
}

export default function HeroPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [stats, setStats] = useState<HeroStat[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null)
  const [newSlideImage, setNewSlideImage] = useState<File | null>(null)
  const [newSlideOrder, setNewSlideOrder] = useState<string>('1')
  const [editImage, setEditImage] = useState<File | null>(null)
  const [editOrder, setEditOrder] = useState<string>('1')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    fetchData()
  }, [router])

  const fetchData = async () => {
    try {
      const [slidesRes, statsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero/slides`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero/stats`)
      ])
      const slidesData = await slidesRes.json()
      const statsData = await statsRes.json()
      setSlides(slidesData)
      setStats(statsData)
    } catch (error) {
      showMessage('error', 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const handleCreateSlide = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSlideImage) return
    
    const formData = new FormData()
    formData.append('image', newSlideImage)
    formData.append('order', newSlideOrder)
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero/slides`, {
        method: 'POST',
        body: formData
      })
      if (res.ok) {
        showMessage('success', language === 'am' ? 'ስላይድ ተጨምሯል!' : 'Slide added!')
        setNewSlideImage(null)
        setNewSlideOrder('1')
        if (fileInputRef.current) fileInputRef.current.value = ''
        fetchData()
      } else {
        showMessage('error', 'Failed to add slide')
      }
    } catch (error) {
      showMessage('error', 'Failed to add slide')
    }
  }

  const handleUpdateSlide = async (id: string) => {
    const formData = new FormData()
    if (editImage) formData.append('image', editImage)
    formData.append('order', editOrder)
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero/slides/${id}`, {
        method: 'PUT',
        body: formData
      })
      if (res.ok) {
        showMessage('success', language === 'am' ? 'ስላይድ ተዘምኗል!' : 'Slide updated!')
        setEditingSlide(null)
        setEditImage(null)
        fetchData()
      } else {
        showMessage('error', 'Failed to update slide')
      }
    } catch (error) {
      showMessage('error', 'Failed to update slide')
    }
  }

  const handleDeleteSlide = async (id: string) => {
    if (!confirm(language === 'am' ? 'ስላይድ ይሰረዝ?' : 'Delete slide?')) return
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero/slides/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        showMessage('success', language === 'am' ? 'ስላይድ ተሰርዟል!' : 'Slide deleted!')
        fetchData()
      }
    } catch (error) {
      showMessage('error', 'Failed to delete slide')
    }
  }

  const handleUpdateStat = async (id: string, value: string, label: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero/stats/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value, label })
      })
      if (res.ok) {
        showMessage('success', language === 'am' ? 'ስታት ተዘምኗል!' : 'Stat updated!')
        fetchData()
      }
    } catch (error) {
      showMessage('error', 'Failed to update stat')
    }
  }

  if (loading) return null

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-8 pt-12 lg:pt-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {language === 'am' ? 'ጀግና አስተዳደር' : 'Hero Management'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'am' ? 'የስላይድ ምስሎችን እና ስታቶችን ያስተዳድሩ' : 'Manage slide images and stats'}
          </p>
        </div>

        {message.text && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg animate-fade-in-down max-w-sm ${
            message.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            <div className="flex items-center gap-3">
              {message.type === 'success' ? (
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <p className="font-medium">{message.text}</p>
            </div>
          </div>
        )}

        {/* Hero Slides Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'am' ? 'ስላይድ ምስሎች' : 'Slide Images'}
          </h2>

          {/* Add New Slide */}
          <form onSubmit={handleCreateSlide} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              {language === 'am' ? 'አዲስ ስላይድ ጨምር' : 'Add New Slide'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setNewSlideImage(e.target.files?.[0] || null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
              <input
                type="number"
                placeholder={language === 'am' ? 'ቅደም ተከተል' : 'Order'}
                value={newSlideOrder}
                onChange={(e) => setNewSlideOrder(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                min="1"
                required
              />
              <button
                type="submit"
                className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                {language === 'am' ? 'ጨምር' : 'Add'}
              </button>
            </div>
          </form>

          {/* Slides List */}
          <div className="space-y-4">
            {slides.map((slide) => (
              <div key={slide._id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                {editingSlide?._id === slide._id ? (
                  <div className="space-y-4">
                    <img src={slide.imageUrl} alt="Slide" className="w-full h-48 object-cover rounded" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEditImage(e.target.files?.[0] || null)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    />
                    <input
                      type="number"
                      value={editOrder}
                      onChange={(e) => setEditOrder(e.target.value)}
                      placeholder="Order"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      min="1"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateSlide(slide._id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
                      >
                        {language === 'am' ? 'አስቀምጥ' : 'Save'}
                      </button>
                      <button
                        onClick={() => { setEditingSlide(null); setEditImage(null) }}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium"
                      >
                        {language === 'am' ? 'ሰርዝ' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <img src={slide.imageUrl} alt="Slide" className="w-full h-48 object-cover rounded" />
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Order: {slide.order}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingSlide(slide); setEditOrder(String(slide.order)) }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
                        >
                          {language === 'am' ? 'አርትዕ' : 'Edit'}
                        </button>
                        <button
                          onClick={() => handleDeleteSlide(slide._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
                        >
                          {language === 'am' ? 'ሰርዝ' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hero Stats Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'am' ? 'ስታቶች' : 'Statistics'}
          </h2>
          <div className="space-y-4">
            {stats.map((stat) => (
              <div key={stat._id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const updated = stats.map(s => s._id === stat._id ? { ...s, value: e.target.value } : s)
                      setStats(updated)
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder={language === 'am' ? 'ዋጋ (ለምሳሌ 100+)' : 'Value (e.g. 100+)'}
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const updated = stats.map(s => s._id === stat._id ? { ...s, label: e.target.value } : s)
                      setStats(updated)
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder={language === 'am' ? 'መለያ' : 'Label'}
                  />
                  <button
                    onClick={() => handleUpdateStat(stat._id, stat.value, stat.label)}
                    className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    {language === 'am' ? 'አዘምን' : 'Update'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
