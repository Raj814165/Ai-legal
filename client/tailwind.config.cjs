module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bgLight: '#EEE9DF',
        secondaryLight: '#C9C1B1',
        primaryDark: '#2C3B4D',
        deepDark: '#1B2632',
        accent: '#FFB162',
        accent2: '#A35139'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}
