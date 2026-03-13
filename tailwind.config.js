/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury KAE Spa Color Palette - Refined Premium System
        'kae': {
          green: '#004225',        // Deep emerald - Primary brand
          beige: '#F5F5DC',        // Warm beige - Main background
          gold: '#C9A227',         // Rich gold - Highlights & CTAs (less yellow)
          'gold-light': '#E5C76B', // Lighter gold - Accents & hover states
          peach: '#E8D4A0',        // Warm gold-tinted - Soft accents
          'green-dark': '#002817', // Darker green - Depth & footer
          'gold-dark': '#A67C00',  // Darker gold - Hover states
          'beige-warm': '#FAF6F0', // Slightly warmer beige variant
        },
        // Flat utility aliases for convenience (text-kae-green, bg-kae-gold, etc.)
        'kae-green': '#004225',
        'kae-beige': '#F5F5DC',
        'kae-gold': '#C9A227',
        'kae-gold-light': '#E5C76B',
        'kae-peach': '#E8D4A0',
        'kae-green-dark': '#002817',
        // Semantic aliases
        'primary': '#004225',
        'secondary': '#F5F5DC',
        'accent': '#C9A227',
        'accent-light': '#E5C76B',
      },
      fontFamily: {
        'heading': ['Cormorant Garamond', 'Playfair Display', 'serif'],
        'body': ['Cormorant', 'Montserrat', 'sans-serif'],
        'script': ['Great Vibes', 'cursive'],
      },
      fontSize: {
        'display': ['6rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'headline': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'title': ['3rem', { lineHeight: '1.2', letterSpacing: '0' }],
        'subtitle': ['2rem', { lineHeight: '1.3', letterSpacing: '0.01em' }],
        'body-lg': ['1.25rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'body': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'body-sm': ['1rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #004225 0%, #002817 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #E5C76B 50%, #C9A227 100%)',
        'subtle-gradient': 'linear-gradient(180deg, #F5F5DC 0%, #FAF8F0 100%)',
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(0, 66, 37, 0.12)',
        'luxury-lg': '0 35px 60px -15px rgba(0, 66, 37, 0.2)',
        'luxury-soft': '0 4px 24px -4px rgba(0, 66, 37, 0.08)',
        'gold': '0 10px 40px -10px rgba(201, 162, 39, 0.25)',
        'gold-lg': '0 20px 60px -15px rgba(201, 162, 39, 0.35)',
        'card': '0 2px 20px -4px rgba(0, 66, 37, 0.06)',
        'card-hover': '0 12px 40px -8px rgba(0, 66, 37, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      transitionDuration: {
        '400': '400ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
