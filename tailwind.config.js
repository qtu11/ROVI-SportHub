/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rovi: {
          black: '#080C12',
          surface: '#0F1520',
          'surface-2': '#1A2235',
          border: '#1E2D44',
          'border-light': '#2A3D5C',
          blue: '#0EA5FF',
          'blue-dark': '#0077CC',
          'blue-glow': 'rgba(14, 165, 255, 0.15)',
          lime: '#A3E635',
          amber: '#F59E0B',
          red: '#F43F5E',
          violet: '#8B5CF6',
          'text-primary': '#EFF2F7',
          'text-muted': '#64748B',
          'text-faint': '#334155',
        },
        sport: {
          football: '#22C55E',
          pickleball: '#F97316',
          badminton: '#EC4899',
          basketball: '#EF4444',
          swimming: '#06B6D4',
          tennis: '#EAB308',
        },
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        space: ['var(--font-space)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        jetbrains: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 20s ease-in-out infinite',
        'count-up': 'count-up 800ms ease-out',
        'slide-in-right': 'slide-in-right 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-up': 'fade-in-up 600ms ease-out',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(5deg)' },
          '66%': { transform: 'translateY(10px) rotate(-3deg)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
