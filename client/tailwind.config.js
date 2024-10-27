/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "375px",

      md: "585px",

      lg: "768px",

      xl: "1024px",

      "2xl": "1440px",
      "3xl": "1540px",
    },

    extend: {
      fontFamily: {
        RoadRage: ["RoadRage", "sans-serif"], // Add your custom font
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      addUtilities({
        ".scale-custom-sm": { transform: "scaleY(3) scaleX(1.5)" },
        ".scale-custom-md": { transform: "scaleY(2) scaleX(1.5)" },
        ".scale-custom-lg": { transform: "scaleY(4) scaleX(2)" },
      });
    },
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
