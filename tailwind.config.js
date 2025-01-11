/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        blackv1: "#111",
        blackv2: "#1C1C1C",
        menuColor: "rgba(255, 255, 255, 0.60)",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1200px",
          "2xl": "1521px",
        },
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1521px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [
    require("tailwind-bootstrap-grid")({
      gridGutterWidth: "1.5rem",
      generateContainer: false,
    }),
  ],
};
