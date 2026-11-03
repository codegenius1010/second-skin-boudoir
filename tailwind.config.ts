import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#111111',
        ivory: '#F7F1EA',
        champagne: '#D8B98A',
        rose: '#B98F84',
        nude: '#D6BFAE',
        espresso: '#3A2A24',
        smoke: '#1B1816',
        // Scoped palette for the /black-friday campaign landing page only
        bfBlack: '#0B0908',
        bfCharcoal: '#1A1513',
        bfGold: '#D9B77E',
        bfIvory: '#F5EFE6',
        bfTaupe: '#B9A99B',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'Arial', 'sans-serif'],
        // Scoped fonts for the /black-friday campaign landing page only
        'bf-serif': ['var(--font-bf-serif)', 'Georgia', 'serif'],
        'bf-serif-italic': ['var(--font-bf-serif-italic)', 'Georgia', 'serif'],
        'bf-sans': ['var(--font-bf-sans)', 'Inter', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 24px 80px rgba(216, 185, 138, 0.12)',
      }
    },
  },
  plugins: [],
}
export default config
