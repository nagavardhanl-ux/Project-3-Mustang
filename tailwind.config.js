/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mach: {
          black: '#080808',
          charcoal: '#0f0f10',
          darkgray: '#171719',
          border: 'rgba(255, 255, 255, 0.08)',
          red: '#c02424',
          gold: '#c99e42',
          amber: '#e67e22',
          chrome: '#e2e8f0',
        }
      },
      fontFamily: {
        editorial: ['"Cinzel"', 'serif'],
        headline: ['"Syne"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif']
      },
      letterSpacing: {
        'widest-car': '0.3em',
        'super-wide': '0.45em',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

