/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0B0D12',
          700: '#1A1D23',
          500: '#5A6172',
          400: '#8A92A3',
          300: '#B6BCC9',
          200: '#D9DEE7',
        },
        canvas: {
          DEFAULT: '#F5F7FB',
          tint: '#EEF2F8',
        },
        brand: {
          purple: '#7C3AED',
          purpleSoft: '#EDE6FF',
          purpleGlow: '#C4B5FD',
        },
        accent: {
          mint: '#10B981',
          mintGlow: '#34D399',
          sky: '#3B82F6',
          skySoft: '#DBEAFE',
        },
      },
      fontFamily: {
        sans: ['Inter_400Regular', 'System'],
        medium: ['Inter_500Medium', 'System'],
        semibold: ['Inter_600SemiBold', 'System'],
        bold: ['Inter_700Bold', 'System'],
        black: ['Inter_900Black', 'System'],
      },
      borderRadius: {
        xl2: '20px',
        '3xl': '28px',
      },
    },
  },
  plugins: [],
};
