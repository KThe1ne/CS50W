/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary-color': '#141115',
        'secondary-color': '#00D05A',
      },
    },
    fontFamily: {
      'body': ['Inter', 'sans-serif'],
      'logo': ['Roboto', 'sans-serif']
    }
  },
  plugins: [],
  mode: 'jit',
}
