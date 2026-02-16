export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-100 border-t-brand-400 rounded-full animate-spin" style={{animationDirection: 'reverse'}}></div>
        </div>
      </div>
    </div>
  )
}
