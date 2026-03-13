/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spa-bg': '#FFFDF6',
        'spa-accent-1': '#FAF6E9',
        'spa-accent-2': '#DDEB9D',
        'spa-accent-3': '#A0C878',
        'spa-accent-4': '#009245',
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 