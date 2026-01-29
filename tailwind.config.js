/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        'primary-dark': '#0056b3',
        'primary-darker': '#003d82',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'blink': 'blink 0.6s infinite',
        'bounce-dot': 'bounce 1.4s infinite',
        'spin': 'spin 0.8s linear infinite',
      },
      keyframes: {
        slideIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        bounce: {
          '0%, 60%, 100%': {
            opacity: '0.5',
            transform: 'translateY(0)',
          },
          '30%': {
            opacity: '1',
            transform: 'translateY(-10px)',
          },
        },
      },
    },
  },
  plugins: [],
}
