'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/AdminSidebar'

interface Property {
  _id: string
  name: string
  slug: string
  description: string
  location: string
  price: string
  type: string
  category: string
  area: string
  images: string[]
  detailImages: string[]
  mapUrl: string
  tourVideo: string
  features: string[]
  overview: any
  investmentReasons: any[]
  floorPlans: string[]
}

export default function PropertiesAdmin() {
  const [properties, setProperties] = useState<Property[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [toast, setToast] = useState({ show: false, message: '', type: '' })
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    location: '',
    price: '',
    type: '',
    category: 'apartments',
    area: '',
    mapUrl: '',
    tourVideo: '',
    features: '',
    projectName: '',
    projectType: '',
    configuration: '',
    shops: '',
    deliveredTimeline: '',
    parking: '',
    finishingStatus: '',
    completionDate: '',
    investmentReasons: '',
    floorPlans: ''
  })
  const [imageFiles, setImageFiles] = useState<FileList | null>(null)
  const [detailImageFiles, setDetailImageFiles] = useState<FileList | null>(null)
  const [floorPlanFiles, setFloorPlanFiles] = useState<FileList | null>(null)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`)
      const data = await res.json()
      setProperties(data)
    } catch (error) {
      showToast('Failed to fetch properties', 'error')
    }
  }

  const showToast = (message: string, type: string) => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('slug', formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
    formDataToSend.append('description', formData.description)
    formDataToSend.append('location', formData.location)
    formDataToSend.append('price', formData.price)
    formDataToSend.append('type', formData.category)
    formDataToSend.append('category', formData.category)
    formDataToSend.append('area', formData.area)
    formDataToSend.append('mapUrl', formData.mapUrl)
    formDataToSend.append('tourVideo', formData.tourVideo)
    formDataToSend.append('features', JSON.stringify(formData.features.split(',').map(f => f.trim()).filter(f => f)))
    formDataToSend.append('overview', JSON.stringify({
      projectName: formData.projectName,
      projectType: formData.projectType,
      configuration: formData.configuration,
      shops: formData.shops,
      deliveredTimeline: formData.deliveredTimeline,
      parking: formData.parking,
      finishingStatus: formData.finishingStatus,
      completionDate: formData.completionDate
    }))
    
    const reasons = formData.investmentReasons.split('\n').filter(r => r.trim()).map((reason, idx) => ({
      number: String(idx + 1).padStart(2, '0'),
      title: reason.split(':')[0]?.trim() || '',
      description: reason.split(':')[1]?.trim() || reason.trim()
    }))
    formDataToSend.append('investmentReasons', JSON.stringify(reasons))
    formDataToSend.append('floorPlans', JSON.stringify([]))

    if (imageFiles) {
      Array.from(imageFiles).forEach(file => {
        formDataToSend.append('images', file)
      })
    }

    if (detailImageFiles) {
      Array.from(detailImageFiles).forEach(file => {
        formDataToSend.append('detailImages', file)
      })
    }

    if (floorPlanFiles) {
      Array.from(floorPlanFiles).forEach(file => {
        formDataToSend.append('floorPlans', file)
      })
    }

    if (editingProperty) {
      formDataToSend.append('existingImages', JSON.stringify(editingProperty.images))
      formDataToSend.append('existingDetailImages', JSON.stringify(editingProperty.detailImages || []))
      formDataToSend.append('existingFloorPlans', JSON.stringify(editingProperty.floorPlans || []))
    }

    try {
      const url = editingProperty
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${editingProperty._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/properties`
      
      const res = await fetch(url, {
        method: editingProperty ? 'PUT' : 'POST',
        body: formDataToSend
      })

      if (res.ok) {
        showToast(`Property ${editingProperty ? 'updated' : 'created'} successfully`, 'success')
        fetchProperties()
        closeModal()
      } else {
        showToast('Failed to save property', 'error')
      }
    } catch (error) {
      showToast('Failed to save property', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        showToast('Property deleted successfully', 'success')
        fetchProperties()
      }
    } catch (error) {
      showToast('Failed to delete property', 'error')
    }
  }

  const openModal = (property?: Property) => {
    if (property) {
      setEditingProperty(property)
      const overview = property.overview || {}
      const reasons = (property.investmentReasons || []).map(r => `${r.title}: ${r.description}`).join('\n')
      setFormData({
        name: property.name,
        slug: property.slug,
        description: property.description,
        location: property.location,
        price: property.price,
        type: property.type,
        category: property.category,
        area: property.area,
        mapUrl: property.mapUrl,
        tourVideo: property.tourVideo,
        features: property.features.join(', '),
        projectName: overview.projectName || '',
        projectType: overview.projectType || '',
        configuration: overview.configuration || '',
        shops: overview.shops || '',
        deliveredTimeline: overview.deliveredTimeline || '',
        parking: overview.parking || '',
        finishingStatus: overview.finishingStatus || '',
        completionDate: overview.completionDate || '',
        investmentReasons: reasons,
        floorPlans: JSON.stringify(property.floorPlans || [])
      })
    } else {
      setEditingProperty(null)
      setFormData({
        name: '',
        slug: '',
        description: '',
        location: '',
        price: '',
        type: '',
        category: 'apartments',
        area: '',
        mapUrl: '',
        tourVideo: '',
        features: '',
        projectName: '',
        projectType: '',
        configuration: '',
        shops: '',
        deliveredTimeline: '',
        parking: '',
        finishingStatus: '',
        completionDate: '',
        investmentReasons: '',
        floorPlans: ''
      })
    }
    setImageFiles(null)
    setDetailImageFiles(null)
    setFloorPlanFiles(null)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingProperty(null)
    setImageFiles(null)
    setDetailImageFiles(null)
    setFloorPlanFiles(null)
  }

  const inputClass = "w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm sm:text-base"

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      
      <div className="flex-1 lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Manage Properties</h1>
            <button
              onClick={() => openModal()}
              className="w-full sm:w-auto bg-brand-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-brand-600 transition-colors text-sm sm:text-base font-semibold"
            >
              + Add Property
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {properties.map(property => (
              <div key={property._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {property.images[0] && (
                  <div className="relative h-48 sm:h-56">
                    <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-brand-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      {property.category}
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{property.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2 line-clamp-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    {property.location}
                  </p>
                  <p className="text-brand-600 font-semibold text-sm mb-3">
                    {property.area.includes('Units Available') ? property.area : `${property.area} Units Available`}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(property)}
                      className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {properties.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="text-4xl sm:text-6xl mb-4">🏢</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">No Properties Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Click "Add Property" to create your first property listing</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto my-8">
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {editingProperty ? '✏️ Edit Property' : '➕ Add New Property'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Property Name *</label>
                    <input
                      type="text"
                      placeholder="e.g., Gold Souq by Akoya"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Category *</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className={inputClass}
                      required
                    >
                      <option value="apartments">Apartments</option>
                      <option value="commercial">Commercial</option>
                      <option value="villa">Villa</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description *</label>
                  <textarea
                    placeholder="Property description"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className={inputClass}
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Location *</label>
                    <input
                      type="text"
                      placeholder="e.g., 4 Kilo, Addis Ababa"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Units Available *</label>
                    <input
                      type="text"
                      placeholder="e.g., 196"
                      value={formData.area}
                      onChange={e => setFormData({...formData, area: e.target.value})}
                      className={inputClass}
                      required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Will display as "X Units Available"</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Starting Price (ETB)</label>
                  <input
                    type="text"
                    placeholder="e.g., 8,500,000"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Will display as "Starting from X ETB"</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Map URL *</label>
                    <input
                      type="text"
                      placeholder="Google Maps URL"
                      value={formData.mapUrl}
                      onChange={e => setFormData({...formData, mapUrl: e.target.value})}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Tour Video URL</label>
                    <input
                      type="text"
                      placeholder="YouTube or video URL"
                      value={formData.tourVideo}
                      onChange={e => setFormData({...formData, tourVideo: e.target.value})}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Features (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g., Swimming Pool, Gym, Parking"
                    value={formData.features}
                    onChange={e => setFormData({...formData, features: e.target.value})}
                    className={inputClass}
                  />
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Project Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Gold Souq by Akoya"
                        value={formData.projectName}
                        onChange={e => setFormData({...formData, projectName: e.target.value})}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Project Type</label>
                      <input
                        type="text"
                        placeholder="e.g., Commercial Building"
                        value={formData.projectType}
                        onChange={e => setFormData({...formData, projectType: e.target.value})}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Configuration</label>
                      <input
                        type="text"
                        placeholder="e.g., Shops, Offices"
                        value={formData.configuration}
                        onChange={e => setFormData({...formData, configuration: e.target.value})}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Units/Shops</label>
                      <input
                        type="text"
                        placeholder="e.g., 196 Units Available"
                        value={formData.shops}
                        onChange={e => setFormData({...formData, shops: e.target.value})}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Delivered Timeline</label>
                      <input
                        type="text"
                        placeholder="e.g., Q4 2024"
                        value={formData.deliveredTimeline}
                        onChange={e => setFormData({...formData, deliveredTimeline: e.target.value})}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Parking</label>
                      <input
                        type="text"
                        placeholder="e.g., Underground Parking"
                        value={formData.parking}
                        onChange={e => setFormData({...formData, parking: e.target.value})}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Finishing Status</label>
                      <input
                        type="text"
                        placeholder="e.g., Shell & Core"
                        value={formData.finishingStatus}
                        onChange={e => setFormData({...formData, finishingStatus: e.target.value})}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Completion Date</label>
                      <input
                        type="text"
                        placeholder="e.g., December 2024"
                        value={formData.completionDate}
                        onChange={e => setFormData({...formData, completionDate: e.target.value})}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Why Invest</h3>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">One reason per line (format: Title: Description)</label>
                  <textarea
                    placeholder="Prime Location: Located in the heart of 4 Kilo\nHigh ROI: Expected returns of 12-15% annually\nModern Design: Contemporary architecture with premium finishes"
                    value={formData.investmentReasons}
                    onChange={e => setFormData({...formData, investmentReasons: e.target.value})}
                    className={inputClass}
                    rows={8}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Main Images (Slideshow)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={e => setImageFiles(e.target.files)}
                    className={inputClass}
                  />
                  {editingProperty && editingProperty.images.length > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      📷 {editingProperty.images.length} existing image(s)
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Detail Images (Other Details Section)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={e => setDetailImageFiles(e.target.files)}
                    className={inputClass}
                  />
                  {editingProperty && editingProperty.detailImages && editingProperty.detailImages.length > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      🖼️ {editingProperty.detailImages.length} existing detail image(s)
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Floor Plans</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={e => setFloorPlanFiles(e.target.files)}
                    className={inputClass}
                  />
                  {editingProperty && editingProperty.floorPlans && editingProperty.floorPlans.length > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      📐 {editingProperty.floorPlans.length} existing floor plan(s)
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-brand-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-brand-600 text-sm sm:text-base font-semibold transition-colors"
                  >
                    {editingProperty ? '💾 Update Property' : '✨ Create Property'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-600 text-sm sm:text-base font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div className={`fixed top-4 right-4 px-4 sm:px-6 py-3 rounded-lg text-white z-50 shadow-lg ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          <div className="flex items-center space-x-2">
            {toast.type === 'success' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
            )}
            <span className="text-sm sm:text-base font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  )
}
