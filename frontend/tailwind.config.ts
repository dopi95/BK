import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Hero & Brand - Modern, Bold, Luxury
        'hero': ['Playfair Display', 'Georgia', 'serif'],
        'brand': ['Montserrat', 'system-ui', 'sans-serif'],
        
        // Headings - Professional, Clean
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        
        // Body Text - Readable, Modern
        'body': ['Source Sans Pro', 'system-ui', 'sans-serif'],
        'text': ['Open Sans', 'system-ui', 'sans-serif'],
        
        // Navigation - Clean, Professional
        'nav': ['Roboto', 'system-ui', 'sans-serif'],
        
        // Buttons & CTAs - Strong, Modern
        'button': ['Nunito Sans', 'system-ui', 'sans-serif'],
        
        // Stats & Numbers - Clean, Technical
        'stats': ['JetBrains Mono', 'Consolas', 'monospace'],
        'mono': ['Fira Code', 'Consolas', 'monospace'],
        
        // Luxury/Premium sections
        'luxury': ['Cormorant Garamond', 'Georgia', 'serif'],
        'elegant': ['Crimson Text', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        brand: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'walk-to-door': 'walkToDoor 8s ease-in-out infinite',
        'walk-legs': 'walkLegs 0.5s ease-in-out infinite',
        'walk-legs-alt': 'walkLegsAlt 0.5s ease-in-out infinite',
        'key-wave': 'keyWave 1s ease-in-out infinite',
        'door-open': 'doorOpen 8s ease-in-out infinite',
        'keyhole-glow': 'keyholeGlow 2s ease-in-out infinite',
        'cloud-drift': 'cloudDrift 15s linear infinite',
        'bounce-in': 'bounceIn 0.5s ease-out',
        'bounce-phone': 'bouncePhone 2s ease-in-out infinite',
        'spin-in': 'spinIn 0.3s ease-out',
        'ping-slow': 'pingSlow 3s ease-in-out infinite',
        'tom-walk': 'tomWalk 5s ease-in-out forwards',
        'jerry-run': 'jerryRun 5s ease-in-out forwards',
        'tom-tail': 'tomTail 1s ease-in-out infinite',
        'jerry-ears': 'jerryEars 0.8s ease-in-out infinite',
        'key-shine': 'keyShine 2s ease-in-out infinite',
        'door-reveal': 'doorReveal 3s ease-in-out forwards',
        'brand-appear': 'brandAppear 2s ease-in-out forwards',
        'tom-celebrate': 'tomCelebrate 2s ease-in-out infinite',
        'jerry-celebrate': 'jerryCelebrate 1.5s ease-in-out infinite',
        'key-float': 'keyFloat 3s ease-in-out infinite',
        'door-glow': 'doorGlow 2s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-medium': 'floatMedium 4s ease-in-out infinite',
        'float-fast': 'floatFast 3s ease-in-out infinite',
        'drift-right': 'driftRight 20s linear infinite',
        'drift-left': 'driftLeft 25s linear infinite',
        'walk-right': 'walkRight 15s linear infinite',
        'walk-left': 'walkLeft 18s linear infinite',
        'walk-cycle': 'walkCycle 0.6s ease-in-out infinite',
        'walk-cycle-reverse': 'walkCycleReverse 0.6s ease-in-out infinite',
        'leg-left': 'legLeft 0.6s ease-in-out infinite',
        'leg-right': 'legRight 0.6s ease-in-out infinite',
        'bounce-ball': 'bounceBall 2s ease-in-out infinite',
        'fly-across': 'flyAcross 12s linear infinite',
        'flap-wings': 'flapWings 0.3s ease-in-out infinite',
        'wing-left': 'wingLeft 0.3s ease-in-out infinite',
        'wing-right': 'wingRight 0.3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'spin-slow': 'spinSlow 3s linear infinite',
        'text-reveal': 'textReveal 1s ease-out',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'pulse-button': 'pulseButton 2s infinite',
        'border-dance': 'borderDance 2s ease-in-out infinite',
        'count-up': 'countUp 1s ease-out',
        'scroll-dot': 'scrollDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        walkToDoor: {
          '0%': { transform: 'translateX(-100px)' },
          '50%': { transform: 'translateX(50vw)' },
          '100%': { transform: 'translateX(50vw)' },
        },
        walkLegs: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(30deg)' },
        },
        walkLegsAlt: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-30deg)' },
        },
        keyWave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(20deg)' },
        },
        doorOpen: {
          '0%, 70%': { transform: 'scaleX(1)' },
          '80%': { transform: 'scaleX(1.1)' },
          '100%': { transform: 'scaleX(1.2)' },
        },
        keyholeGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 255, 0, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 255, 0, 1)' },
        },
        cloudDrift: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' },
        },
        cloudDriftSlow: {
          '0%': { transform: 'translateX(calc(100vw + 100px))' },
          '100%': { transform: 'translateX(-100px)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(-8deg)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(5deg)' },
        },
        driftRight: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' },
        },
        driftLeft: {
          '0%': { transform: 'translateX(calc(100vw + 100px))' },
          '100%': { transform: 'translateX(-100px)' },
        },
        walkRight: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' },
        },
        walkLeft: {
          '0%': { transform: 'translateX(calc(100vw + 100px)) scaleX(-1)' },
          '100%': { transform: 'translateX(-100px) scaleX(-1)' },
        },
        walkCycle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        walkCycleReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '25%': { transform: 'translateY(-2px)' },
          '75%': { transform: 'translateY(-1px)' },
        },
        legLeft: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(20deg)' },
        },
        legRight: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-20deg)' },
        },
        bounceBall: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' },
        },
        flyAcross: {
          '0%': { transform: 'translateX(-50px) translateY(0px)' },
          '25%': { transform: 'translateX(25vw) translateY(-10px)' },
          '50%': { transform: 'translateX(50vw) translateY(5px)' },
          '75%': { transform: 'translateX(75vw) translateY(-5px)' },
          '100%': { transform: 'translateX(calc(100vw + 50px)) translateY(0px)' },
        },
        flapWings: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.3)' },
        },
        wingLeft: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-30deg)' },
        },
        wingRight: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(30deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        textReveal: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseButton: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(245, 158, 11, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(245, 158, 11, 0)' },
        },
        borderDance: {
          '0%, 100%': { borderColor: 'rgb(245, 158, 11)' },
          '50%': { borderColor: 'rgb(217, 119, 6)' },
        },
        countUp: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scrollDot: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(16px)', opacity: '0' },
        },
        tomWalk: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(50vw - 50px))' },
        },
        jerryRun: {
          '0%': { transform: 'translateX(calc(100vw - 100px))' },
          '100%': { transform: 'translateX(calc(50vw + 20px))' },
        },
        tomTail: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '75%': { transform: 'rotate(-15deg)' },
        },
        jerryEars: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.2)' },
        },
        keyShine: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'rotate(10deg) scale(1.1)', filter: 'brightness(1.5)' },
        },
        doorReveal: {
          '0%': { transform: 'scaleX(0)', opacity: '0' },
          '50%': { transform: 'scaleX(0.5)', opacity: '0.5' },
          '100%': { transform: 'scaleX(1)', opacity: '1' },
        },
        brandAppear: {
          '0%': { opacity: '0', transform: 'scale(0.5) rotateY(90deg)' },
          '50%': { opacity: '0.7', transform: 'scale(0.8) rotateY(45deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotateY(0deg)' },
        },
        tomCelebrate: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(5deg)' },
          '75%': { transform: 'translateY(-5px) rotate(-5deg)' },
        },
        jerryCelebrate: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.1)' },
        },
        keyFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(120deg)' },
          '66%': { transform: 'translateY(-4px) rotate(240deg)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGentle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        bouncePhone: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(-5deg) scale(1.05)' },
          '75%': { transform: 'rotate(5deg) scale(1.05)' },
        },
        spinIn: {
          '0%': { transform: 'rotate(0deg) scale(0.8)' },
          '100%': { transform: 'rotate(45deg) scale(1)' },
        },
        pingSlow: {
          '0%': { transform: 'scale(1)', opacity: '0.2' },
          '75%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config