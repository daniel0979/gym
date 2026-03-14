/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        black: '#050505',
        trueBlack: '#000000',
        neonPink: '#ff007f',
        neonPurple: '#b026ff',
        neonCyan: '#00f3ff',
        darkGray: '#111111',
        grayMeta: '#888888',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 50%, rgba(176, 38, 255, 0.15) 0%, rgba(0, 0, 0, 0) 50%)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.7', transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
