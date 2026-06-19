/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'var(--bg)',
        'card': 'var(--card)',
        'text': 'var(--text)',
        'muted': 'var(--muted)',
        'accent': 'var(--accent)',
        'pink': 'var(--pink)',
        'cyan': 'var(--cyan)',
        'border': 'var(--border)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'btn': '4px 4px 0 var(--border)',
        'card': '8px 8px 0 var(--border)',
        'lg-btn': '6px 6px 0 var(--border)',
      },
      borderRadius: {
        'sm': '14px',
        'md': '16px',
        'lg': '24px',
        'xl': '28px',
      },
    },
  },
  plugins: [],
}
