const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        huzz: {
          pink: '#ff00cc',
          purple: '#8000ff',
          dark: '#0A0A0F',
          'dark-purple': '#13111C',
          'dark-accent': '#1F1932',
        },
        glow: {
          pink: '#ff00cc33',
          purple: '#8000ff33',
        }
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'glow-pink': '0 0 20px 2px #ff00cc33',
        'glow-purple': '0 0 20px 2px #8000ff33',
        'glow-sm': '0 0 10px 1px rgba(255, 0, 204, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-huzz': 'linear-gradient(135deg, #ff00cc 0%, #8000ff 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
