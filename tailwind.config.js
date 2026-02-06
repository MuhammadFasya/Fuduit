/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#a3e637",
        "primary-light": "#b2eb59",
        "primary-glow": "#ccf58a",
        secondary: "#f472b6",
        dark: "#121212",
        background: "#121212",
        surface: "#1E1E1E",
        "surface-light": "#252525",
        border: "#ffffff0D",
        gray: "#ffffff66",
        textPrimary: "#FFFFFF",
        textSecondary: "#B3B3B3",
        textMuted: "#ffffff66",
        success: "#22c55e",
        warning: "#eab308",
        error: "#ef4444",
        income: "#a3e637",
        expense: "#f472b6",
      },
      fontFamily: {
        sans: ["SplineSans", "system-ui", "sans-serif"],
        display: ["SplineSans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      spacing: {
        18: "4.5rem",
        72: "18rem",
      },
    },
  },
  plugins: [],
};
