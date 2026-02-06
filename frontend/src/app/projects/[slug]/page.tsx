'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'

interface ProjectData {
  name: string
  description: string
  location: string
  price: string
  type: string
  area: string
  images: string[]
  mapUrl: string
  features: string[]
  overview?: {
    projectName: string
    projectType: string
    configuration?: string
    shops?: string
    deliveredTimeline?: string
    parking?: string
    finishingStatus?: string
    completionDate?: string
  }
  investmentReasons?: Array<{
    number: string
    title: string
    description: string
  }>
}

const projectsData: { [key: string]: ProjectData } = {
  'gold-souq': {
    name: 'Gold Souq by Akoya Properties',
    description: 'Step into Gold Souq — a landmark of luxury, prestige, and promise in the heart of Addis Ababa\'s 4 Kilo district. Experience 14 levels of vibrant retail spaces designed for visibility, value, and success.',
    location: '4 Kilo, Behind Ambassador Mall, Addis Ababa',
    price: 'Starting from 8,500,000 ETB',
    type: 'Commercial Building',
    area: '196 Units Available',
    images: ['/images/gs1.png', '/images/gs2.jpg', '/images/gs3.png', '/images/gs4.jpg', '/images/gs5.jpg', '/images/gs6.jpg'],
    mapUrl: 'https://maps.google.com/?q=4+Kilo,Ambassador+Mall,Addis+Ababa',
    features: ['Event / Common Space', 'Suit Shop', 'Boutique One', 'Boutique Two', 'Gold Shops', 'Cosmetics Shop', 'Swimming Pool', 'Covered Parking', 'Children\'s Play Area', 'Valet Parking', 'EV Charging', 'Fully Finished'],
    overview: {
      projectName: 'Gold Souq',
      projectType: 'Commercial Building',
      configuration: '2 Basement + Ground + 14 Floors',
      shops: '14 per floor (starting from 19 m²)',
      deliveredTimeline: '1 Year and 6 Months',
      parking: 'Valet Parking, EV Charging',
      finishingStatus: 'Fully Finished',
      completionDate: 'May 2027'
    },
    investmentReasons: [
      { number: '01', title: 'Gold Souq by Akoya', description: 'Premium commercial development in the heart of Addis Ababa' },
      { number: '02', title: 'PRIME LOCATION', description: '4 kilo, behind Ambassador Mall' },
      { number: '03', title: 'COMPREHENSIVE DOCUMENTATION', description: 'All legal and financial paper work attached to agreements for transparency' },
      { number: '04', title: 'TRUSTED DEVELOPER', description: 'Akoya\'s track record of 3 delivered projects' },
      { number: '05', title: 'PERMANENT OWNERSHIP', description: 'The only ownership model in a rental only area' },
      { number: '06', title: 'POST-COMPLETION PROMOTION', description: 'Active Akoya backed promotion after handover to attract buyers and tenants' },
      { number: '07', title: 'AFTER SALES SERVICE', description: 'We manage your property and market it before handover' },
      { number: '08', title: 'ETHIOPIAN AIRLINES SHEBAMILES\' PLATINUM PARTNER', description: 'Boosts global exposure and adds lifestyle prestige' },
      { number: '09', title: 'SECURED INVESTMENT', description: 'Managed under a transparent and reliable developer-backed system' },
      { number: '10', title: 'LED BY EXPERTISE', description: 'The project will be executed by Akoya subsidiary Iniyaz Collaborate with a highly experienced Chinese contractor' },
      { number: '11', title: 'HIGH RETURN POTENTIAL', description: 'Prime trade area guarantees strong rental income and asset appreciation' }
    ]
  },
  'ameliaz': {
    name: 'Ameliaz by Akoya Properties',
    description: 'Ameliaz offers affordable luxury apartments in the heart of Sarbet, one of Addis Ababa\'s most desirable living areas. Located near the Canadian Embassy and just footsteps from the African Union.',
    location: 'Sarbet, Addis Ababa',
    price: '',
    type: '1-3 Bedroom Apartments',
    area: '120 Units Available',
    images: ['/images/al1.jpg', '/images/al2.jpg', '/images/al3.jpg', '/images/al4.jpg', '/images/al5.jpg'],
    mapUrl: 'https://maps.google.com/?q=Sarbet,Canadian+Embassy,Addis+Ababa',
    features: ['Event / Common Space', 'Swimming Pool', 'Valet Parking', 'Gym & Spa', 'Cinema', 'Cafe, Restaurant & Hospitality', 'Boutique, Super Markets & Shops', 'Vehicle Charging Stations', 'Car Wash'],
    overview: {
      projectName: 'Ameliaz',
      projectType: '1-3 Bedroom Apartments',
      configuration: 'Ground + 14 Floors',
      deliveredTimeline: '2 Years',
      parking: 'Valet Parking, Vehicle Charging Stations',
      finishingStatus: 'Fully Finished',
      completionDate: 'December 2026'
    },
    investmentReasons: [
      { number: '01', title: 'Ameliaz by Akoya', description: 'Affordable luxury apartments in prime Sarbet location' },
      { number: '02', title: 'PRIME LOCATION', description: 'Near Canadian Embassy and African Union' },
      { number: '03', title: 'COMPREHENSIVE DOCUMENTATION', description: 'All legal and financial paper work attached to agreements for transparency' },
      { number: '04', title: 'TRUSTED DEVELOPER', description: 'Akoya\'s track record of 3 delivered projects' },
      { number: '05', title: 'PERMANENT OWNERSHIP', description: 'Full ownership with legal documentation' },
      { number: '06', title: 'POST-COMPLETION PROMOTION', description: 'Active Akoya backed promotion after handover to attract buyers and tenants' },
      { number: '07', title: 'AFTER SALES SERVICE', description: 'We manage your property and market it before handover' },
      { number: '08', title: 'MODERN AMENITIES', description: 'Cinema, gym, spa, swimming pool and more' },
      { number: '09', title: 'SECURED INVESTMENT', description: 'Managed under a transparent and reliable developer-backed system' },
      { number: '10', title: 'LED BY EXPERTISE', description: 'Professional construction and management team' },
      { number: '11', title: 'HIGH RETURN POTENTIAL', description: 'Prime residential area guarantees strong rental income and asset appreciation' }
    ]
  },
  'ozone': {
    name: 'Ozone by Akoya Properties',
    description: 'Breathe easy at Ozone Apartments, where refreshing living awaits. Enjoy modern design, spacious layouts, and a host of invigorating amenities.',
    location: 'Beside Sarem Hotel, Addis Ababa',
    price: '',
    type: '1-3 Bedroom Apartments',
    area: '105 Units Available',
    images: ['/images/oz1.jpg', '/images/oz2.jpg', '/images/oz3.jpg', '/images/oz4.jpg', '/images/oz5.jpg'],
    mapUrl: 'https://maps.google.com/?q=Sarem+Hotel,Addis+Ababa',
    features: ['Event / Common Space', 'Swimming Pool', 'Valet Parking', 'Gym & Spa', 'Garden'],
    overview: {
      projectName: 'Ozone',
      projectType: '1-3 Bedroom Apartments',
      configuration: 'Ground + 12 Floors',
      deliveredTimeline: '1 Year and 8 Months',
      parking: 'Valet Parking',
      finishingStatus: 'Fully Finished',
      completionDate: 'August 2026'
    },
    investmentReasons: [
      { number: '01', title: 'Ozone by Akoya', description: 'Modern apartments with refreshing design beside Sarem Hotel' },
      { number: '02', title: 'PRIME LOCATION', description: 'Beside Sarem Hotel in central Addis Ababa' },
      { number: '03', title: 'COMPREHENSIVE DOCUMENTATION', description: 'All legal and financial paper work attached to agreements for transparency' },
      { number: '04', title: 'TRUSTED DEVELOPER', description: 'Akoya\'s track record of 3 delivered projects' },
      { number: '05', title: 'PERMANENT OWNERSHIP', description: 'Full ownership with legal documentation' },
      { number: '06', title: 'POST-COMPLETION PROMOTION', description: 'Active Akoya backed promotion after handover to attract buyers and tenants' },
      { number: '07', title: 'AFTER SALES SERVICE', description: 'We manage your property and market it before handover' },
      { number: '08', title: 'MODERN AMENITIES', description: 'Swimming pool, gym, spa, and beautiful gardens' },
      { number: '09', title: 'SECURED INVESTMENT', description: 'Managed under a transparent and reliable developer-backed system' },
      { number: '10', title: 'LED BY EXPERTISE', description: 'Professional construction and management team' },
      { number: '11', title: 'HIGH RETURN POTENTIAL', description: 'Central location guarantees strong rental income and asset appreciation' }
    ]
  },
  'novelty': {
    name: 'Novelty by Akoya Properties',
    description: 'Experience the extraordinary at Novelty Apartments. These unique residences offer a blend of modern design and comfortable living.',
    location: 'Infront of Friendship Park, Addis Ababa',
    price: 'Starting from 4,100,000 ETB',
    type: '2-3 Bedroom Apartments',
    area: '60 Units Available',
    images: ['/images/n1.jpg', '/images/n2.jpg', '/images/n3.jpg', '/images/n4.jpg', '/images/n5.jpg'],
    mapUrl: 'https://maps.google.com/?q=Friendship+Park,Addis+Ababa',
    features: ['Event / Common Space', 'Gym & Spa', 'Gardens', 'Valet Parking'],
    overview: {
      projectName: 'Novelty',
      projectType: '2-3 Bedroom Apartments',
      configuration: 'Ground + 10 Floors',
      deliveredTimeline: '2 Years',
      parking: 'Valet Parking',
      finishingStatus: 'Fully Finished',
      completionDate: 'January 2028'
    },
    investmentReasons: [
      { number: '01', title: 'Novelty by Akoya', description: 'Unique apartments with extraordinary design at Friendship Park' },
      { number: '02', title: 'PRIME LOCATION', description: 'Infront of Friendship Park in prestigious area' },
      { number: '03', title: 'COMPREHENSIVE DOCUMENTATION', description: 'All legal and financial paper work attached to agreements for transparency' },
      { number: '04', title: 'TRUSTED DEVELOPER', description: 'Akoya\'s track record of 3 delivered projects' },
      { number: '05', title: 'PERMANENT OWNERSHIP', description: 'Full ownership with legal documentation' },
      { number: '06', title: 'POST-COMPLETION PROMOTION', description: 'Active Akoya backed promotion after handover to attract buyers and tenants' },
      { number: '07', title: 'AFTER SALES SERVICE', description: 'We manage your property and market it before handover' },
      { number: '08', title: 'FLEXIBLE PAYMENT', description: '10% down payment with convenient payment plans' },
      { number: '09', title: 'SECURED INVESTMENT', description: 'Managed under a transparent and reliable developer-backed system' },
      { number: '10', title: 'LED BY EXPERTISE', description: 'Professional construction and management team' },
      { number: '11', title: 'HIGH RETURN POTENTIAL', description: 'Premium location guarantees strong rental income and asset appreciation' }
    ]
  }
}

export default function ProjectDetailPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  const [currentImage, setCurrentImage] = useState(0)
  const [project, setProject] = useState<ProjectData | null>(null)

  useEffect(() => {
    if (slug && projectsData[slug]) {
      setProject(projectsData[slug])
    }
  }, [slug])

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
          <button onClick={() => router.push('/')} className="bg-brand-500 text-white px-6 py-3 rounded-lg">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-semibold">Back to Properties</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-brand-600 to-brand-800">
        <div className="absolute inset-0">
          <Image src={project.images[0]} alt={project.name} fill className="object-cover opacity-30" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{project.name.split(' by ')[0]}</h1>
            <p className="text-xl md:text-2xl text-brand-100">by Akoya Properties</p>
            <button
              onClick={() => router.push('/contact')}
              className="mt-8 bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold hover:bg-brand-50 transition-all duration-300 transform hover:scale-105"
            >
              Schedule a Visit
            </button>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      {project.overview && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Project Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="border-l-4 border-brand-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Project Name</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{project.overview.projectName}</p>
                </div>
                <div className="border-l-4 border-brand-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Project Type</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{project.overview.projectType}</p>
                </div>
                {project.overview.configuration && (
                  <div className="border-l-4 border-brand-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Configuration</h3>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{project.overview.configuration}</p>
                  </div>
                )}
                {project.overview.shops && (
                  <div className="border-l-4 border-brand-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Shops</h3>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{project.overview.shops}</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {project.overview.deliveredTimeline && (
                  <div className="border-l-4 border-brand-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Delivered Timeline</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{project.overview.deliveredTimeline}</p>
                  </div>
                )}
                <div className="border-l-4 border-brand-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Location</h3>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{project.location}</p>
                </div>
                {project.overview.parking && (
                  <div className="border-l-4 border-brand-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Parking</h3>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{project.overview.parking}</p>
                  </div>
                )}
                {project.overview.finishingStatus && (
                  <div className="border-l-4 border-brand-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Finishing Status</h3>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{project.overview.finishingStatus}</p>
                  </div>
                )}
              </div>
            </div>

            {project.price && (
              <div className="mt-8 p-6 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">Starting Price</p>
                  <p className="text-4xl font-bold text-brand-600 dark:text-brand-400">{project.price}</p>
                  {project.overview.completionDate && (
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Completion: {project.overview.completionDate}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Why Invest Section */}
      {project.investmentReasons && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Why Invest in {project.name.split(' by ')[0]}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.investmentReasons.map((reason) => (
              <div key={reason.number} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {reason.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{reason.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floor Plans Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Floor Plans & Other Details
        </h2>
        <div className="relative h-[500px] rounded-2xl overflow-hidden mb-6">
          <Image src={project.images[currentImage]} alt={`Floor plan ${currentImage + 1}`} fill className="object-contain bg-gray-100 dark:bg-gray-800" />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {project.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                currentImage === index ? 'ring-4 ring-brand-500 scale-105' : 'hover:scale-105 opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={image} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Click images to view detailed floor plans and project renders</p>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Amenities & Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors">
                <div className="w-2 h-2 bg-brand-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Invest?</h2>
          <p className="text-xl mb-8 text-brand-100">Contact us today to learn more and secure your unit</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => router.push('/contact')} className="bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold hover:bg-brand-50 transition-all duration-300 transform hover:scale-105">
              Contact Us
            </button>
            <button onClick={() => window.open(project.mapUrl, '_blank')} className="bg-brand-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-800 transition-all duration-300 transform hover:scale-105">
              View Location
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
