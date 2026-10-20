/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(212, 175, 55, 0.3), 0 20px 45px rgba(11, 17, 32, 0.35)',
      },
      colors: {
        parchment: '#f5efe2',
        ink: '#101827',
        midnight: '#0d1320',
        gold: '#d4af37',
        ember: '#a4622d',
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        body: ['Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
