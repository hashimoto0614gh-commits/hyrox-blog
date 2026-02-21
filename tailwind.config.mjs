/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        hyrox: {
          yellow: '#FFFF00',
        },
        surface: {
          base: '#0A0A0A',
          '01':  '#111111',
          '02':  '#161616',
          '03':  '#1E1E1E',
        },
        ink: {
          primary:   '#FFFFFF',
          secondary: '#A0A0A0',
          muted:     '#555555',
        },
      },
      fontFamily: {
        sans:    ['"Noto Sans JP"', 'system-ui', 'sans-serif'],
        display: ['"Noto Sans JP"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Courier New"', 'monospace'],
      },
      borderColor: {
        subtle: 'rgba(255,255,255,0.08)',
      },
      animation: {
        'fade-up':  'fadeUp 0.5s ease forwards',
        'flicker':  'flicker 4s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%':                           { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
