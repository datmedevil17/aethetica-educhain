module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}", // Add paths to all the files where you will use Tailwind CSS classes
    ],
    theme: {
      extend: {},
    },
    plugins: [require('autoprefixer')],
  }
