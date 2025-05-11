/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF0FD',
          100: '#D1DEFB',
          200: '#A3BCF7',
          300: '#759AF3',
          400: '#4778EF',
          500: '#1956EB',
          600: '#1445BC',
          700: '#0F338D',
          800: '#0A225E',
          900: '#05112F',
          950: '#021138',
        },
        secondary: {
          50: '#FEF9E7',
          100: '#FCF2CF',
          200: '#F9E59F',
          300: '#F5D86F',
          400: '#F2CB3F',
          500: '#EFBE0F',
          600: '#D4AC0D',
          700: '#A3850A',
          800: '#6D5907',
          900: '#372C03',
          950: '#211A02',
        },
        success: {
          50: '#ECFDF5',
          500: '#10B981',
          900: '#064E3B',
        },
        warning: {
          50: '#FFFBEB',
          500: '#F59E0B',
          900: '#78350F',
        },
        danger: {
          50: '#FEF2F2',
          500: '#EF4444',
          900: '#7F1D1D',
        },
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
        'dropdown': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};