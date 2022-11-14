/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'width': 'width',
      },
      height: {
        'screen/2': '50vh',
        'screen/3': '33.333333vh',
        'screen/4': '25vh',
        'screen/5': '20vh',
      },
      width: {
        'screen/2': '50vw',
        'screen/3': '33.333333vw',
        'screen/4': '25vw',
        'screen/5': '20vw',
      }
    },
  },
  plugins: [],
}
