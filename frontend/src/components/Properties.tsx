'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Property {
  id: number
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
}

export default function Properties() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showTourModal, setShowTourModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({})
  const [detailImageIndex, setDetailImageIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState('all')

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

    return () => observer.disconnect()
  }, [])

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
          [property.id]: ((prev[property.id] || 0) + 1) % property.images.length
        }))
      }, 3000)
      intervals.push(interval)
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  const properties: Property[] = [
    {
      id: 1,
      name: language === 'am' ? 'ገልድ ሱቅ በአኮያ ፕሮፐርቲስ' : 'Gold Souq by Akoya Properties',
      description: language === 'am' ? 'በአዲስ አባባ 4 ኪሎ አካባቢ ውስጥ የቅንጦት፣ ከፍተኛ ደረጃ እና ስልታን መረጃ የሆነ ገልድ ሱቅ ውስጥ ይግቡ። 14 ደረጃ የችርቻሮ ቦታዎች እና የአኮያ የሪል እስቴት አገልግሎት።' : 'Step into Gold Souq — a landmark of luxury, prestige, and promise in the heart of Addis Ababa\'s 4 Kilo district. Experience 14 levels of vibrant retail spaces designed for visibility, value, and success.',
      location: '4 Kilo, Behind Ambassador Mall, Addis Ababa',
      price: '',
      type: language === 'am' ? 'የንግድ ህንፃ' : 'Commercial Building',
      bedrooms: 0,
      bathrooms: 0,
      area: '196 Units Available',
      images: [
        '/images/gs1.png',
        '/images/gs2.jpg',
        '/images/gs3.png',
        '/images/gs4.jpg',
        '/images/gs5.jpg',
        '/images/gs6.jpg'
      ],
      mapUrl: 'https://maps.google.com/?q=4+Kilo,Ambassador+Mall,Addis+Ababa',
      tourVideo: 'https://akoyarealproperty.com/wp-content/uploads/2025/10/Gold-Final.mp4',
      features: language === 'am' ? [
        'የአገር ቦታ',
        'የስይት ዱካን',
        'ቡቲክ አንድ',
        'ቡቲክ ሁለት',
        'የወርቅ ዱካንዎች',
        'የኮዝመቲክስ ዱካን',
        'የመዋኛ ገንዳ',
        'የመኪና ማቆሚያ',
        'የለጀዎች የመዋታ ቦታ',
        'ቫሌት ፓርኪንግ',
        'EV ቻርጂንግ',
        'ሙሉ ማጠናቀቂያ'
      ] : [
        'Event / Common Space',
        'Suit Shop',
        'Boutique One',
        'Boutique Two',
        'Gold Shops',
        'Cosmetics Shop',
        'Swimming Pool',
        'Covered Parking',
        'Children\'s Play Area',
        'Valet Parking',
        'EV Charging',
        'Fully Finished'
      ]
    },
    {
      id: 2,
      name: language === 'am' ? 'አሜሊያዝ በአኮያ ፕሮፐርቲስ' : 'Ameliaz by Akoya Properties',
      description: language === 'am' ? 'አሜሊያዝ በሳርቤት ልብ ውስጥ ተመጣጣኝ የቅንጦት አፓርትመንቶችን ያቀርባል፣ በአዲስ አበባ በጣም የሚፈለጉ የመኖሪያ አካባቢዎች አንዱ። በካናዳ ኤምባሲ አቅራቢያ እና ከአፍሪካ ህብረት በጥቂት እርምጃዎች ርቀት ላይ የሚገኝ።' : 'Ameliaz offers affordable luxury apartments in the heart of Sarbet, one of Addis Ababa\'s most desirable living areas. Located near the Canadian Embassy and just footsteps from the African Union, Ameliaz combines prime location with modern comfort and elegance.',
      location: 'Sarbet, Addis Ababa',
      price: '',
      type: language === 'am' ? '1-3 መኝታ ቤት አፓርትመንቶች' : '1-3 Bedroom Apartments',
      bedrooms: 3,
      bathrooms: 2,
      area: '120 Units Available',
      images: [
        '/images/al1.jpg',
        '/images/al2.jpg',
        '/images/al3.jpg',
        '/images/al4.jpg',
        '/images/al5.jpg'
      ],
      mapUrl: 'https://maps.google.com/?q=Sarbet,Canadian+Embassy,Addis+Ababa',
      tourVideo: 'https://youtu.be/4bPOxraXQjQ?si=E_Wh-SiHn7XzLxI8',
      features: language === 'am' ? ['የክስተት / የጋራ ቦታ', 'የመዋኛ ገንዳ', 'የመኪና ማቆሚያ አገልግሎት', 'ጂም እና ስፓ', 'ሲኒማ', 'ካፌ፣ ሬስቶራንት እና እንግዳ መቀበያ', 'ቡቲክ፣ ሱፐር ማርኬቶች እና ሱቆች', 'የተሽከርካሪ ኃይል መሙያ ጣቢያዎች', 'የመኪና ማጠቢያ'] : ['Event / Common Space', 'Swimming Pool', 'Valet Parking', 'Gym & Spa', 'Cinema', 'Cafe, Restaurant & Hospitality', 'Boutique, Super Markets & Shops', 'Vehicle Charging Stations', 'Car Wash']
    },
    {
      id: 3,
      name: language === 'am' ? 'ኦዞን በአኮያ ፕሮፐርቲስ' : 'Ozone by Akoya Properties',
      description: language === 'am' ? 'በኦዞን አፓርትመንቶች ውስጥ በቀላሉ ይተንፍሱ፣ የሚያድስ መኖሪያ የሚጠብቅበት። ዘመናዊ ዲዛይን፣ ሰፊ አቀማመጥ እና ብዙ የሚያነቃቁ መገልገያዎችን ይደሰቱ። በሕይወት ማህበረሰብ ውስጥ ራስዎን ያጥለቁ እና የራስዎን የግል ኦሳይስ ሰላም ይደሰቱ።' : 'Breathe easy at Ozone Apartments, where refreshing living awaits. Enjoy modern design, spacious layouts, and a host of invigorating amenities. Immerse yourself in a vibrant community while enjoying the tranquility of your own private oasis.',
      location: 'Beside Sarem Hotel, Addis Ababa',
      price: '',
      type: language === 'am' ? '1-3 መኝታ ቤት አፓርትመንቶች' : '1-3 Bedroom Apartments',
      bedrooms: 3,
      bathrooms: 2,
      area: '105 Units Available',
      images: [
        '/images/oz1.jpg',
        '/images/oz2.jpg',
        '/images/oz3.jpg',
        '/images/oz4.jpg',
        '/images/oz5.jpg'
      ],
      mapUrl: 'https://maps.google.com/?q=Sarem+Hotel,Addis+Ababa',
      tourVideo: 'https://youtu.be/ipkOP8TVVEE?si=Pn5ZCCkU_1D8JsYr',
      features: language === 'am' ? ['የክስተት / የጋራ ቦታ', 'የመዋኛ ገንዳ', 'የመኪና ማቆሚያ አገልግሎት', 'ጂም እና ስፓ', 'የአትክልት ስፍራ'] : ['Event / Common Space', 'Swimming Pool', 'Valet Parking', 'Gym & Spa', 'Garden']
    },
    {
      id: 4,
      name: language === 'am' ? 'ኖቬልቲ በአኮያ ፕሮፐርቲስ' : 'Novelty by Akoya Properties',
      description: language === 'am' ? 'በኖቬልቲ አፓርትመንቶች ውስጥ ያልተለመደውን ይለማመዱ። እነዚህ ልዩ መኖሪያ ቤቶች የዘመናዊ ዲዛይን እና ምቹ መኖሪያ ድብልቅ ያቀርባሉ። ሰፊ የውስጥ ክፍሎች፣ ዘመናዊ ማጠናቀቂያዎች እና ልዩ መገልገያዎች ይደሰቱ።' : 'Experience the extraordinary at Novelty Apartments. These unique residences offer a blend of modern design and comfortable living. Enjoy spacious interiors, contemporary finishes, and an array of exclusive amenities.',
      location: 'Infront of Friendship Park, Addis Ababa',
      price: '',
      type: language === 'am' ? '2-3 መኝታ ቤት አፓርትመንቶች' : '2-3 Bedroom Apartments',
      bedrooms: 3,
      bathrooms: 2,
      area: '60 Units Available',
      images: [
        '/images/n1.jpg',
        '/images/n2.jpg',
        '/images/n3.jpg',
        '/images/n4.jpg',
        '/images/n5.jpg'
      ],
      mapUrl: 'https://maps.google.com/?q=Friendship+Park,Addis+Ababa',
      tourVideo: 'https://youtu.be/XWHYP3cvW2o?si=TCOMqz0yEVBf8d6z',
      features: language === 'am' ? ['የክስተት / የጋራ ቦታ', 'ጂም እና ስፓ', 'የአትክልት ስፍራ', 'የመኪና ማቆሚያ አገልግሎት'] : ['Event / Common Space', 'Gym & Spa', 'Gardens', 'Valet Parking']
    }
  ]

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

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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
                  src={property.images[currentImageIndex[property.id] || 0]}
                  alt={property.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Image Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, imgIndex) => (
                    <button
                      key={imgIndex}
                      onClick={() => setCurrentImageIndex(prev => ({...prev, [property.id]: imgIndex}))}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        (currentImageIndex[property.id] || 0) === imgIndex
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 transition-colors duration-300 font-heading">
                  {property.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 font-body">
                  {property.description}
                </p>
                
                {/* Location */}
                <div className="flex items-start sm:items-center text-gray-500 dark:text-gray-400 mb-4">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-xs sm:text-sm leading-tight font-text">{property.location}</span>
                </div>

                {/* Property Info */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                    {property.area}
                  </span>
                </div>

                {/* Price */}
                {property.price && (
                  <div className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-6">
                    {property.price}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      const slugs: { [key: number]: string } = {
                        1: 'gold-souq',
                        2: 'ameliaz',
                        3: 'ozone',
                        4: 'novelty'
                      }
                      router.push(`/projects/${slugs[property.id]}`)
                    }}
                    className="flex-1 bg-brand-500 hover:bg-brand-600 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 font-button"
                  >
                    {t('viewDetails')}
                  </button>
                  <button
                    onClick={() => {
                      if (property.tourVideo.includes('youtube.com') || property.tourVideo.includes('youtu.be')) {
                        openTourModal(property)
                      } else {
                        const video = document.createElement('video')
                        video.src = property.tourVideo
                        video.controls = true
                        video.autoplay = true
                        video.style.width = '100%'
                        video.style.height = '100%'
                        video.style.borderRadius = '8px'
                        
                        const modal = document.createElement('div')
                        modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'
                        modal.innerHTML = `
                          <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl p-6">
                            <div class="flex justify-between items-center mb-6">
                              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">3D Tour - ${property.name}</h3>
                              <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                            <div class="aspect-video"></div>
                          </div>
                        `
                        modal.querySelector('.aspect-video')?.appendChild(video)
                        document.body.appendChild(modal)
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
        </div>

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
                {selectedProperty.tourVideo.includes('youtube.com') || selectedProperty.tourVideo.includes('youtu.be') ? (
                  <iframe
                    src={selectedProperty.tourVideo.replace('youtu.be/', 'youtube.com/embed/').replace('watch?v=', 'embed/').split('?')[0] + '?autoplay=1&mute=1'}
                    title="3D Property Tour"
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    src={selectedProperty.tourVideo}
                    title="3D Property Tour"
                    className="w-full h-full rounded-lg"
                    controls
                    autoPlay
                    muted
                    playsInline
                  ></video>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}