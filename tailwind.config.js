/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A192F', // Deep Blue / Dark Navy
          gold: '#C6A87C', // Accent Gold
          blue: '#2563EB', // Electric Blue (optional accent)
          light: '#F8FAFC', // Light background
        },
        primary: {
          DEFAULT: '#0A192F', 
          dark: '#020617',
        },
        secondary: {
          DEFAULT: '#C6A87C',
          dark: '#B89665',
        },
        dark: '#1f2937',
      },
      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
