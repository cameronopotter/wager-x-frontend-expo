/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './screens/**/*.{js,ts,tsx}', // Include screens folder
    './contexts/**/*.{js,ts,tsx}', // Include contexts folder
    './services/**/*.{js,ts,tsx}', // Include services folder
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
