'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LoadingSpinner from './LoadingSpinner'

interface Property {
  id: number | string
  name: string
  description: string
  location: string
  price: string
  type: string
  bedrooms: number
  bathrooms: number
  area: string
  images: string[]
  mapUrl: string
  tourVideo: string
  features: string[]
  slug?: string
}

export default function Properties() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showTourModal, setShowTourModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({})
  const [detailImageIndex, setDetailImageIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('properties')
    if (section) observer.observe(section)

    fetchProperties()

    return () => observer.disconnect()
  }, [])

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`, {
        next: { revalidate: 300 },
        headers: { 'Cache-Control': 'public, max-age=300' }
      })
      const data = await res.json()
      const mappedProperties = data.map((p: any) => ({
        id: p._id,
        name: p.name,
        description: p.description,
        location: p.location,
        price: p.price ? `Starting from ${p.price} ETB` : '',
        type: p.type,
        bedrooms: 0,
        bathrooms: 0,
        area: p.area.includes('Units Available') ? p.area : `${p.area} Units Available`,
        images: p.images,
        mapUrl: p.mapUrl,
        tourVideo: p.tourVideo,
        features: p.features,
        slug: p.slug
      }))
      setProperties(mappedProperties)
      // Preload first images
      mappedProperties.slice(0, 3).forEach((p: Property) => {
        if (p.images[0]) {
          const img = new window.Image()
          img.src = p.images[0]
        }
      })
    } catch (error) {
      console.error('Failed to fetch properties')
    } finally {
      setLoading(false)
    }
  }

  // Auto-slide for detail modal
  useEffect(() => {
    let detailInterval: NodeJS.Timeout
    if (showDetailModal && selectedProperty && selectedProperty.images.length > 1) {
      detailInterval = setInterval(() => {
        setDetailImageIndex((prev) => (prev + 1) % selectedProperty.images.length)
      }, 3000)
    }
    return () => {
      if (detailInterval) clearInterval(detailInterval)
    }
  }, [showDetailModal, selectedProperty])

  // Auto-slide images for each property
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = []
    
    properties.forEach((property) => {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => ({
          ...prev,
          [property.id as string]: ((prev[property.id as string] || 0) + 1) % property.images.length
        }))
      }, 3000)
      intervals.push(interval)
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  const [properties, setProperties] = useState<Property[]>([])

  // Filter properties based on active filter
  const filteredProperties = properties.filter(property => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'apartments') return property.type.toLowerCase().includes('apartment') || property.type.toLowerCase().includes('አፓርትመንት')
    if (activeFilter === 'commercial') return property.type.toLowerCase().includes('commercial') || property.type.toLowerCase().includes('የንግድ')
    if (activeFilter === 'villa') return property.type.toLowerCase().includes('villa') || property.type.toLowerCase().includes('ቪላ')
    return true
  })

  const displayedProperties = showAll ? filteredProperties : filteredProperties.slice(0, 3)

  // Filter options
  const filterOptions = [
    { id: 'all', label: language === 'am' ? 'ሁሉም' : 'All Properties', icon: '🏢' },
    { id: 'apartments', label: language === 'am' ? 'አፓርትመንቶች' : 'Apartments', icon: '🏠' },
    { id: 'commercial', label: language === 'am' ? 'የንግድ ህንፃዎች' : 'Commercial', icon: '🏬' },
    { id: 'villa', label: language === 'am' ? 'ቪላዎች' : 'Villas', icon: '🏡' }
  ]

  const openDetailModal = (property: Property) => {
    setSelectedProperty(property)
    setDetailImageIndex(0)
    setShowDetailModal(true)
  }

  const openTourModal = (property: Property) => {
    setSelectedProperty(property)
    setShowTourModal(true)
  }

  useEffect(() => {
    if (showTourModal && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [showTourModal])

  return (
    <section id="properties" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700 bg-clip-text text-transparent mb-6 font-display">
            {t('featuredProperties')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-body">
            {t('propertiesDescription')}
          </p>
        </div>

        {/* Property Filters */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Filter Options - All Visible */}
          <div className="grid grid-cols-2 md:flex md:justify-center gap-1.5 md:gap-4 px-1 md:px-0">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id)
                  setShowAll(false)
                }}
                className={`group relative flex items-center justify-center space-x-1 md:space-x-2 px-1.5 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-center ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20'
                }`}
              >
                <span className="text-sm md:text-lg">{filter.icon}</span>
                <span className="text-xs md:text-base leading-tight whitespace-nowrap">{filter.label}</span>
                {activeFilter === filter.id && (
                  <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-r from-brand-400/20 to-brand-600/20 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'am' 
                ? `${filteredProperties.length} ንብረቶች ተገኝተዋል`
                : `${filteredProperties.length} properties found`
              }
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Properties Grid */}
        {!loading && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {displayedProperties.map((property, index) => (
            <div
              key={property.id}
              className={`group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Image Slider */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={property.images[currentImageIndex[property.id as string] || 0]}
                  alt={property.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Image Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, imgIndex) => (
                    <button
                      key={imgIndex}
                      onClick={() => setCurrentImageIndex(prev => ({...prev, [property.id as string]: imgIndex}))}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        (currentImageIndex[property.id as string] || 0) === imgIndex
                          ? 'bg-brand-400 scale-125'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>

                {/* Property Type Badge */}
                <div className="absolute top-4 left-4 bg-brand-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {property.type}
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 transition-colors duration-300 font-heading break-words">
                  {property.name.split(' by ')[0]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 font-body text-sm leading-relaxed break-words overflow-hidden">
                  {property.description.length > 120 ? `${property.description.substring(0, 120)}...` : property.description}
                </p>
                
                {/* Location */}
                <div className="flex items-start sm:items-center text-gray-500 dark:text-gray-400 mb-4">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-xs sm:text-sm leading-tight font-text">{property.location}</span>
                </div>

                {/* Property Info */}
                <div className="flex items-center justify-between mb-6 text-sm text-gray-600 dark:text-gray-300">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                    {property.area}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      const slug = property.slug || {
                        1: 'gold-souq',
                        2: 'ameliaz',
                        3: 'ozone',
                        4: 'novelty'
                      }[property.id as number]
                      router.push(`/projects/${slug}`)
                    }}
                    className="flex-1 bg-brand-500 hover:bg-brand-600 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 font-button"
                  >
                    {t('viewDetails')}
                  </button>
                  <button
                    onClick={() => {
                      if (property.tourVideo && property.tourVideo.trim()) {
                        openTourModal(property)
                      } else {
                        alert('No 3D tour available for this property')
                      }
                    }}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 font-button"
                  >
                    {t('tourThreeD')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>}

        {/* Show More/Less Button */}
        <div className="text-center mt-12">
          {!showAll && filteredProperties.length > 3 && (
            <button
              onClick={() => setShowAll(true)}
              className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 font-button"
            >
              {t('viewMoreProperties')}
            </button>
          )}
          {showAll && (
            <button
              onClick={() => {
                setShowAll(false)
                document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 font-button"
            >
              {t('viewLessProperties')}
            </button>
          )}
        </div>

        {/* No Results Message */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'am' ? 'በቅርቡ ይመጣል!' : 'Coming Soon!'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {language === 'am' 
                ? 'በዚህ ምድብ ውስጥ አዳዲስ ንብረቶች በቅርቡ ይጨመራሉ። እባክዎ ከጊዜ በኋላ ይመለከቱ።'
                : 'Exciting new properties in this category are coming soon. Stay tuned for amazing opportunities!'
              }
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              {language === 'am' ? 'ሌሎች ንብረቶችን ይመልከቱ' : 'Explore Other Properties'}
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full h-[90vh] sm:h-[90vh] max-w-6xl overflow-hidden">
            <div className="p-3 sm:p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-3 sm:mb-6 flex-shrink-0">
                <h3 className="text-base sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {selectedProperty.name}
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-2 flex-shrink-0"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-8 flex-1 min-h-0">
                <div className="h-32 sm:h-48 lg:h-80 flex-shrink-0">
                  <div className="relative h-full">
                    <Image
                      src={selectedProperty.images[detailImageIndex]}
                      alt={selectedProperty.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                    {/* Image Dots */}
                    {selectedProperty.images.length > 1 && (
                      <div className="absolute bottom-1 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
                        {selectedProperty.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={() => setDetailImageIndex(imgIndex)}
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                              detailImageIndex === imgIndex
                                ? 'bg-brand-400 scale-125'
                                : 'bg-white/50 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col min-h-0 space-y-2 sm:space-y-4">
                  {selectedProperty.id === 4 && (
                    <div className="flex-shrink-0">
                      <div className="text-xs sm:text-base text-gray-600 dark:text-gray-300">
                        <span className="font-semibold">Available Units:</span> 2, 3 Bedroom Apartments
                      </div>
                    </div>
                  )}
                  
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-lg leading-tight sm:leading-relaxed flex-shrink-0">
                    {selectedProperty.description}
                  </p>
                  
                  {selectedProperty.id === 1 && (
                    <div className="flex-shrink-0">
                      <div className="text-sm sm:text-2xl font-bold text-brand-600 dark:text-brand-400">
                        Starting from 8,500,000 ETB
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Completion Date: May 2027
                      </div>
                    </div>
                  )}
                  
                  {selectedProperty.id === 4 && (
                    <div className="flex-shrink-0">
                      <div className="text-sm sm:text-2xl font-bold text-brand-600 dark:text-brand-400">
                        Starting from 4,100,000 ETB
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Completion Date: January 2028 • 10% Down Payment
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1 min-h-0">
                    <h4 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-3">Amenities</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0.5 sm:gap-x-4 sm:gap-y-2">
                      {selectedProperty.features.slice(0, 4).map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-1 sm:space-x-2 text-gray-700 dark:text-gray-300"
                        >
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-brand-500 rounded-full flex-shrink-0 mt-1 sm:mt-1.5"></span>
                          <span className="text-xs sm:text-sm leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => window.open(selectedProperty.mapUrl, '_blank')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 flex-shrink-0"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm sm:text-base">View on Map</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3D Tour Modal */}
      {showTourModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl">
            <div className="p-3 sm:p-6">
              <div className="flex justify-between items-center mb-3 sm:mb-6">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                  <span className="block sm:inline">3D Tour - </span>
                  <span className="text-sm sm:text-2xl">{selectedProperty.name}</span>
                </h3>
                <button
                  onClick={() => setShowTourModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0 ml-2"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="aspect-video">
                {(() => {
                  const url = selectedProperty.tourVideo.trim()
                  
                  // Check if it's a YouTube URL
                  if (url.includes('youtube.com') || url.includes('youtu.be')) {
                    let videoId = ''
                    
                    if (url.includes('youtu.be/')) {
                      videoId = url.split('youtu.be/')[1].split('?')[0]
                    } else if (url.includes('watch?v=')) {
                      videoId = url.split('watch?v=')[1].split('&')[0]
                    } else if (url.includes('/embed/')) {
                      videoId = url.split('/embed/')[1].split('?')[0]
                    }
                    
                    if (videoId) {
                      return (
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`}
                          title="3D Property Tour"
                          className="w-full h-full rounded-lg"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      )
                    }
                  }
                  
                  // Check if it's a direct video file
                  if (url.match(/\.(mp4|webm|ogg|mov|avi)$/i)) {
                    return (
                      <video
                        ref={videoRef}
                        src={url}
                        className="w-full h-full rounded-lg"
                        controls
                        autoPlay
                        playsInline
                      ></video>
                    )
                  }
                  
                  // For other URLs, try iframe with error handling
                  return (
                    <div className="relative w-full h-full">
                      <iframe
                        src={url}
                        title="3D Property Tour"
                        className="w-full h-full rounded-lg border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                      ></iframe>
                      <div className="absolute inset-0 pointer-events-none" style={{background: 'transparent'}}></div>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}