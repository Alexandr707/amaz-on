/** @type {import('tailwindcss').Config} */
const twColors = require('tailwindcss/colors');

const colors = {
  transparent: twColors.transparent,
  grey: '#cdcdcd',
  black: '#2e3239',
  white: twColors.white,
  primary: '#ff9902',
  secondary: '#161d25',
  aqua: '#268697',
  'bg-color': '#f2f2f5',
  red: twColors.red[400],
};

module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors,
    extend: {
      keyFrames: {
        animationOpacity: {
          frome: { opacity: 0.2 },
          to: { opacity: 1 },
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)',
          },
          '50%': {
            opacity: 0.3,
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        opacity: 'animationOpacity .5s ease-in-out',
        scaleIn: 'scaleIn .35s ease-in-out',
      },
      gridTemplateColumns:{
        'layout': 'minmax(300px,1fr) 4fr',
        'header':'1fr 3fr 1.2fr'
      }
    },
  },
  plugins: [],
};
