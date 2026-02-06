'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import AdminSidebar from '@/components/AdminSidebar'

export default function AboutImagePage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [currentImage, setCurrentImage] = useState<string>('')
  const [newImage, setNewImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    fetchImage()
  }, [router])

  const fetchImage = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about/image`)
      const data = await res.json()
      if (data?.imageUrl) setCurrentImage(data.imageUrl)
    } catch (error) {
      console.error('Failed to load image')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const handleUpdateImage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newImage) return

    setUploading(true)
    const formData = new FormData()
    formData.append('image', newImage)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about/image`, {
        method: 'PUT',
        body: formData
      })
      if (res.ok) {
        showMessage('success', language === 'am' ? 'ምስል ተዘምኗል!' : 'Image updated!')
        setNewImage(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
        fetchImage()
      } else {
        showMessage('error', 'Failed to update image')
      }
    } catch (error) {
      showMessage('error', 'Failed to update image')
    } finally {
      setUploading(false)
    }
  }

  if (loading) return null

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-8 pt-12 lg:pt-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {language === 'am' ? 'ስለ ምስል አስተዳደር' : 'About Image Management'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'am' ? 'የስለ ክፍል ምስል ያስተዳድሩ' : 'Manage about section image'}
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

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {language === 'am' ? 'የአሁኑ ምስል' : 'Current Image'}
          </h2>

          {currentImage && (
            <div className="mb-6">
              <img 
                src={currentImage} 
                alt="About" 
                className="w-full max-w-2xl h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          <form onSubmit={handleUpdateImage} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'am' ? 'አዲስ ምስል ይምረጡ' : 'Select New Image'}
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={uploading || !newImage}
              className="bg-brand-500 hover:bg-brand-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {uploading 
                ? (language === 'am' ? 'በመስቀል ላይ...' : 'Uploading...') 
                : (language === 'am' ? 'ምስል አዘምን' : 'Update Image')}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
