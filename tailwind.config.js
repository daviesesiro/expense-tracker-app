const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        black: "#101010",
        brown: "#867373",
        gold: "#C59900",
      },
      gridTemplateColumns: {
        flexible: "repeat(auto-fill, minmax(320px, 1fr))",
        "flexible-sm": "repeat(auto-fill, minmax(250px, 1fr))",
      },
      screens: {
        xs: "475px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
};
