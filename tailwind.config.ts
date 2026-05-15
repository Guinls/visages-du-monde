import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        petrol: {
          DEFAULT: '#1499C7',
          dark: '#0F7CA3',
        },
        navy: {
          DEFAULT: '#0A3B5C',
          dark: '#082E47',
        },
        cream: '#FAF7F2',
        bone: '#F0EBE0',
        charcoal: '#1A1A1A',
        slate: '#4A4A4A',
        terracotta: '#C4633E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Anton', 'Impact', 'sans-serif'],
        heading: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(48px, 9vw, 140px)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-1': ['clamp(36px, 5vw, 72px)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        'display-2': ['clamp(28px, 3.5vw, 48px)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-3': ['clamp(20px, 2vw, 28px)', { lineHeight: '1.2' }],
        'body-lg': ['clamp(16px, 1.5vw, 20px)', { lineHeight: '1.55' }],
        'mono-xl': ['clamp(64px, 8vw, 120px)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'mono-lg': ['clamp(48px, 5vw, 80px)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        container: '1440px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        bounce: 'bounce 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
