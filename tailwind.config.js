/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: '#E50914',
          black: '#000000',
          gray: {
            100: '#B3B3B3',
            900: '#141414'
          }
        }
      }
    },
  },
  plugins: [],
};