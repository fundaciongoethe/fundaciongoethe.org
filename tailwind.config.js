const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.html', './src/**/*.njk', './src/**/*.md', './src/**/*.js', './utils/**/*.js'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.stone,
      red: colors.red,
      orange: colors.orange,
      yellow: colors.yellow,
    },
    fontFamily: {
      body: ['GothamRounded', 'sans-serif'],
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shake: {
          '0%': { transform: 'rotateZ(-3deg)' },
          '100%': { transform: 'rotateZ(3deg)' },
        },
        entrance: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        shake: 'shake 3s infinite ease alternate-reverse 2s',
        entrance: 'entrance 1.6s ease-in-out 0.5s forwards',
      },

      zIndex: {
        '-10': '-10',
        '-20': '-20',
      },
      margin: {
        96: '24rem',
        112: '28rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
      },
      opacity: (theme) => ({
        5: '.05',
        10: '.1',
        15: '.15',
        20: '.2',
      }),
      // created my own heights so can specify for Heros
      height: (theme) => ({
        '1/2': '50vh',
        '3/4': '75vh',
        '9/10': '90vh',
        '1/1': '100vh',
        '1/3': 'calc(100vh / 3)',
        '1/4': 'calc(100vh / 4)',
        '1/5': 'calc(100vh / 5)',
        96: '24rem',
        112: '28rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
      }),
      width: (theme) => ({
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '54.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        96: '24rem',
        112: '28rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
  purge:
    process.env.NODE_ENV === 'production'
      ? {
          enabled: true,
          content: ['src/**/*.njk', 'src/**/*.js'],
        }
      : {},
};
