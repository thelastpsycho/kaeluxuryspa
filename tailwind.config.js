/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury KAE Spa Color Palette - Matched to Flyer Design
        'kae': {
          teal: '#1A5F5F',         // Deep teal/sea green - Primary brand (flyer background)
          'teal-light': '#2D7A7A', // Lighter teal - Accents & hover states
          'teal-dark': '#0F4242',  // Darker teal - Depth & footer
          gold: '#C4A77D',         // Bronze gold - Highlights & CTAs (flyer metallic)
          'gold-light': '#D4C4A8', // Lighter gold - Subtle accents
          'gold-dark': '#A68B5B',  // Darker gold - Hover states
          cream: '#FAF8F5',        // Off-white - Main background
          white: '#FFFFFF',        // Pure white - Text on dark backgrounds
          sand: '#E8DDD0',         // Warm sand - Soft backgrounds
        },
        // Flat utility aliases for convenience (text-kae-teal, bg-kae-gold, etc.)
        'kae-teal': '#1A5F5F',
        'kae-teal-light': '#2D7A7A',
        'kae-teal-dark': '#0F4242',
        'kae-gold': '#C4A77D',
        'kae-gold-light': '#D4C4A8',
        'kae-gold-dark': '#A68B5B',
        'kae-cream': '#FAF8F5',
        'kae-white': '#FFFFFF',
        'kae-sand': '#E8DDD0',
        // Semantic aliases
        'primary': '#1A5F5F',
        'secondary': '#FAF8F5',
        'accent': '#C4A77D',
        'accent-light': '#D4C4A8',
      },
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Montserrat', 'sans-serif'],
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
        'luxury-gradient': 'linear-gradient(135deg, #1A5F5F 0%, #0F4242 100%)',
        'teal-gradient': 'linear-gradient(135deg, #1A5F5F 0%, #2D7A7A 50%, #1A5F5F 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C4A77D 0%, #D4C4A8 50%, #C4A77D 100%)',
        'subtle-gradient': 'linear-gradient(180deg, #FAF8F5 0%, #E8DDD0 100%)',
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(26, 95, 95, 0.12)',
        'luxury-lg': '0 35px 60px -15px rgba(26, 95, 95, 0.2)',
        'luxury-soft': '0 4px 24px -4px rgba(26, 95, 95, 0.08)',
        'gold': '0 10px 40px -10px rgba(196, 167, 125, 0.25)',
        'gold-lg': '0 20px 60px -15px rgba(196, 167, 125, 0.35)',
        'card': '0 2px 20px -4px rgba(26, 95, 95, 0.06)',
        'card-hover': '0 12px 40px -8px rgba(26, 95, 95, 0.15)',
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
