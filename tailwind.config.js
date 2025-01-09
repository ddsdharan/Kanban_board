/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        drkbg: "#232730",
        drkcol: "#d3d3d3",
        drkbg2: "#181a1f",
        drkbrd: "rgba(136, 136, 136, 0.3)",
        hvrcol: "rgba(35,39,47,.05)",
        drkhvrcol: "rgba(246,247,249,.05)",
      },
      screens: {
        "xs": "400px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  darkMode: "selector",
};
