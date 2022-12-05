/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
  extend: {
    colors: {
      'primary': '#6842FF',
      'second': '#181A20',
      'input': '#1F222A',
      'txt': 'rgba(255,255,255,0.5)'
    },
  },
},
plugins: [],
}
