/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    
    extend: {
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
      colors: {
        'custom-blue': '#3B82F6',
        'custom-black': '#000000',
        'custom-gray': '#e5e7eb',
      },
    },
  },
  plugins: [],
}
