export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div id="home" className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ቤቶን ከኛ
          </h1>
          <h2 className="text-3xl font-semibold text-primary-600 mb-6">
            Beton Kegna
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Your trusted real estate consultancy partner in Ethiopia. 
            We help you find the perfect property for your needs.
          </p>
          
          <div id="services" className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary-700">Property Sales</h3>
              <p className="text-gray-600">Find your dream home with our extensive property listings</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary-700">Consultation</h3>
              <p className="text-gray-600">Expert advice for all your real estate investment decisions</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary-700">Market Analysis</h3>
              <p className="text-gray-600">Comprehensive market insights to guide your property choices</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}