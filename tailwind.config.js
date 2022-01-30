module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        'cw-48': '48%',
      },
    },
  },
  plugins: [require('daisyui')],
}
