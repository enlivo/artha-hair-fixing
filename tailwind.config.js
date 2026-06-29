/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#2D6A4F',
          hover: '#235C43',
          light: '#52B788',
          tint: '#EEF7F2',
          tintAlt: '#F4FAF6',
          border: '#C5E8D4',
        },
        gold: {
          DEFAULT: '#C9A96E',
          hover: '#A07840',
          light: '#F0D9A8',
          tint: '#FBF8F0',
          border: '#E8D5A3',
        },
        brand: {
          dark: '#1A2E22',
          body: '#3D5244',
          muted: '#7A9485',
          light: '#A8BDB4',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
