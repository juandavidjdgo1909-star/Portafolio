module.exports = {
  darkMode: 'class',
  content: [
    './public/index.html',
    './public/app.js'
  ],
  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        modalIn: {
          '0%': { opacity: '0', transform: 'scale(.95) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' }
        }
      },
      animation: {
        fadeUp: 'fadeUp .8s ease-out both',
        pulseSoft: 'pulseSoft 2.8s ease-in-out infinite',
        modalIn: 'modalIn .25s ease-out both'
      }
    }
  },
  plugins: []
};
