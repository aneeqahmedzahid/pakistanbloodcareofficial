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
        // Pakistan flag green palette
        primary: {
          50:  '#e6f4ec',
          100: '#c2e3ce',
          200: '#9ad1ae',
          300: '#70be8e',
          400: '#4fb077',
          500: '#2da260',
          600: '#01884a',  // Mid green
          700: '#01411C',  // Pakistan flag green (main)
          800: '#013016',
          900: '#011f0e',
          DEFAULT: '#01411C',
        },
        // Blood red accent
        blood: {
          50:  '#fce8eb',
          100: '#f7c5cc',
          200: '#f19fab',
          300: '#ea7789',
          400: '#e45a6d',
          500: '#dc3d51',
          600: '#C8102E',  // Blood red (main)
          700: '#a00d25',
          800: '#78091c',
          900: '#500612',
          DEFAULT: '#C8102E',
        },
        // Neutral / surface
        surface: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          DEFAULT: '#f8fafc',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(1, 65, 28, 0.3)',
        'glow-red':   '0 0 20px rgba(200, 16, 46, 0.3)',
        'card':       '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.14)',
        'glass':      '0 8px 32px rgba(31, 38, 135, 0.12)',
      },
      animation: {
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':        'float 3s ease-in-out infinite',
        'blood-drop':   'bloodDrop 2s ease-in-out infinite',
        'slide-up':     'slideUp 0.5s ease-out',
        'fade-in':      'fadeIn 0.4s ease-out',
        'shimmer':      'shimmer 1.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        bloodDrop: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%':      { transform: 'scale(1.1)', opacity: '0.8' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial':    'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero':      'linear-gradient(135deg, #01411C 0%, #016b2e 50%, #01411C 100%)',
        'gradient-blood':     'linear-gradient(135deg, #C8102E 0%, #9b0b22 100%)',
        'glass-white':        'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
    },
  },
  plugins: [],
}
