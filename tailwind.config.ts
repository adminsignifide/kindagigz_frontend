import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: '#3B3B6B',
          50: '#F0F0F5',
          100: '#E1E1EB',
          200: '#C3C3D7',
          300: '#A5A5C3',
          400: '#7373A1',
          500: '#3B3B6B', // Main
          600: '#2F2F56',
          700: '#232341',
          800: '#17172C',
          900: '#0B0B16',
        },
        secondary: {
          DEFAULT: '#FBD430',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FBD430', // Main
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Card colors
        card: {
          DEFAULT: '#F9FAFB',
          border: '#B5B5B5',
        },
        // UI colors
        'button-secondary': '#EBEBF0',
        footer: '#0F172A',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config