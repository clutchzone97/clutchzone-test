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
        primary: {
          DEFAULT: '#1a56db', // Customize as needed based on original
          dark: '#1e40af',
        },
        secondary: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
        },
        dark: '#1f2937',
      },
    },
  },
  plugins: [],
}
