/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        pulse: "pulse 8s infinite",
      },
      colors: {
        arctic: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#b6e1fc",
          300: "#a1c4fd",
          400: "#67a8e4",
          500: "#2e4369",
        },
      },
      boxShadow: {
        icy: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
      },
      dropShadow: {
        nav: "0 2px 6px rgba(0,0,0,0.65)",
      },
      zIndex: {
        modal: "2147483647",
        navbar: "50",
      },
    },
  },
  plugins: [],
};
