/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'sidebar-bg': {
          light: '#EEF6EF',
          dark: '#1E2321'
        },
        'task-bg': {
          light: '#F8FAF8',
          dark: '#2A312C'
        },
        'button-bg': {
          light: '#E3EBE4',
          dark: '#3A423C'
        },
        'text': {
          light: '#000000',
          dark: '#FFFFFF'
        }
      }
    },
  },
  plugins: [],
}