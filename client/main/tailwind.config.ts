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
        primary: {
          DEFAULT: '#F26522',
          hover: '#D9551A',
          light: '#FF7F45',
        },
        secondary: {
          DEFAULT: '#1A1A1A',
          light: '#808080',
        },
        tertiary: {
          DEFAULT: '#FFB800',
          hover: '#E6A600',
        },
        neutral: {
          dark: '#1A1A1A',
          medium: '#808080',
          light: '#CCCCCC',
          'off-white': '#F5F5F5',
          white: '#FFFFFF',
        },
        success: '#27AE60',
        warning: '#FFB800',
        error: '#E74C3C',
        info: '#3498DB',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

export default config
