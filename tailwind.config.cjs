module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        'brand-blue': '#0ea5e9',
        'brand-cyan': '#06b6d4'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
