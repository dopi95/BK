interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Building base */}
        <rect x="8" y="25" width="24" height="12" fill="currentColor" className="text-brand-600" />
        
        {/* Building middle */}
        <rect x="10" y="18" width="20" height="7" fill="currentColor" className="text-brand-500" />
        
        {/* Building top */}
        <rect x="12" y="12" width="16" height="6" fill="currentColor" className="text-brand-400" />
        
        {/* Roof */}
        <path d="M20 8L32 15H8L20 8Z" fill="currentColor" className="text-accent-500" />
        
        {/* Windows */}
        <rect x="14" y="20" width="2" height="3" fill="white" />
        <rect x="18" y="20" width="2" height="3" fill="white" />
        <rect x="22" y="20" width="2" height="3" fill="white" />
        <rect x="26" y="20" width="2" height="3" fill="white" />
        
        <rect x="16" y="28" width="2" height="3" fill="white" />
        <rect x="20" y="28" width="2" height="3" fill="white" />
        <rect x="24" y="28" width="2" height="3" fill="white" />
        
        {/* Door */}
        <rect x="18" y="32" width="4" height="5" fill="white" />
        
        {/* Ethiopian pattern accent */}
        <circle cx="20" cy="10" r="2" fill="currentColor" className="text-primary-600" />
      </svg>
    </div>
  )
}