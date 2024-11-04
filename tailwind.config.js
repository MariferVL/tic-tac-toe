const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        custom: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: { sans: ["Roboto", ...defaultTheme.fontFamily.sans] },
      colors: {
        neonGreen: "#39FF14",
        neonBlue: "#1E90FF",
        neonPink: "#FF1493",
        neonYellow: "#FFFF00",
        neonOrange: "#FF4F00",
        neonPurple: "#9D00FF",
        softGrey: "#F0F0F0",
        paleYellow: "#FFF9C4",
        mint: "#8bfca1",
        bgLight: "#F3F4F6",
        bgDark: "#1A202C",
      },
    },
  },
  plugins: [],
};
