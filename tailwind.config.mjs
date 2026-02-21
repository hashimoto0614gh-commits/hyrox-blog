/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red:    '#E63329',
          dark:   '#0D0D0D',
          gray:   '#1A1A1A',
          muted:  '#6B7280',
          light:  '#F5F5F5',
          accent: '#F5A623',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
        display: ['"Oswald"', '"Noto Sans JP"', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
      },
    },
  },
  plugins: [],
};
