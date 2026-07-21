/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FAF9F6',
        panel: '#F1EFE9',
        ink: '#1A1A18',
        soft: '#55534C',
        rule: '#D9D5C9',
        press: '#7C2320',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      maxWidth: {
        content: '1180px',
      },
      letterSpacing: {
        widest2: '0.22em',
      },
    },
  },
  plugins: [],
};
