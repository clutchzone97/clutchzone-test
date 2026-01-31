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
          light: '#F8FAFC', // Light background
        },
        primary: {
          DEFAULT: '#3789DB', // Primary Blue
          hover: '#37BDDB',   // Hover / Active
        },
        secondary: {
          DEFAULT: '#4D37DB', // Secondary Purple-Blue
        },
        accent: {
          1: '#3755DB', // Royal Blue
          2: '#37BDDB', // Cyan/Turquoise
        },
        muted: '#7F90DB', // Muted Blue
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
