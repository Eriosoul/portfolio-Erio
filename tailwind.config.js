/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Tokens semanticos: los componentes no vuelven a escribir hex sueltos.
      // Cambiar la identidad del sitio es cambiar este bloque.
      colors: {
        canvas: '#0f1113',
        surface: '#16181c',
        elevated: '#1d2025',
        line: 'rgba(255,255,255,0.08)',
        accent: {
          DEFAULT: '#F7AB0A',
          soft: 'rgba(247,171,10,0.14)',
          muted: 'rgba(247,171,10,0.55)',
        },
        fg: {
          DEFAULT: '#e9eaec',
          muted: '#a1a7ae',
          subtle: '#6f767e',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '64rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.30), 0 8px 24px -12px rgba(0,0,0,0.55)',
        lift: '0 2px 4px rgba(0,0,0,0.30), 0 16px 40px -16px rgba(0,0,0,0.65)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
