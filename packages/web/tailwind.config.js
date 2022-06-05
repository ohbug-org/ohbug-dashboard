module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  darkMode: 'class',
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
  daisyui: { darkTheme: 'black' },
}
