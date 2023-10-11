/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.{html,css,liquid}", "./views/_include/*.{html,css,liquid}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

