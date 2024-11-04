const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        neonGreen: "#39FF14",
        neonBlue: "#1E90FF",
        neonPink: "#FF1493",
        neonYellow: "#FFFF00",
        neonPurple: "#9D00FF",
        bgLight: "#F3F4F6",
        bgDark: "#1A202C",
      },
    },
  },
  plugins: [],
};
