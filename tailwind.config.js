/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#ff2b75',
          'pink-hover': '#e61d65',
          'pink-light': '#fff0f5',
          'pink-subtle': '#fdf2f6',
          'pink-badge': '#fde8ef',
          dark: '#111827',
          gray: '#64748b',
          border: '#e2e8f0',
          card: '#ffffff',
          bg: '#f8fafc',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'card': '0 2px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
        'pink': '0 4px 14px 0 rgba(255, 43, 117, 0.25)',
      }
    },
  },
  plugins: [],
}
