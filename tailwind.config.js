/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "rounded-4xl"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'primary': "url('/images/Rectangle1.webp')",
      },

      colors: {
        primary: "#43BA9C",
        primaryHover: "#2F987E",
        primaryActive: "#125443",
        color4: "#1F3A58",
        color4Hover: "#4B719C",
        color4Active: "#D1E7FF"
      }
    },
  },
  plugins: [],
}

