/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60a5fa',
          DEFAULT: '#2563eb',
          dark: '#1e40af',
        },
        cream: {
          50: '#fefdf8',
          100: '#fdfbf0',
          200: '#faf7e6',
          300: '#f6f1d7',
          400: '#f0e8c1',
          500: '#e8dca6',
          600: '#dcc985',
          700: '#ccb05c',
          800: '#a08847',
          900: '#7a6635',
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Montserrat", "ui-sans-serif", "system-ui"],
      },
      backgroundColor: {
        'light': '#fefdf8', // cream-50
        'dark': '#111827', // gray-900
      }
    },
  },
  plugins: [],
};
