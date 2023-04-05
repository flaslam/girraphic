const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#edc250",
          DEFAULT: "#fdb404",
          dark: colors.amber[600],
        },
      },
      fontFamily: {
        display: ["var(--font-lato)"],
        heading: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
};
