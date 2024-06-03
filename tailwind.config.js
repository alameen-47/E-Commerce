// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     screens: {
//       sm: "350px",

//       md: "585px",

//       lg: "768px",

//       xl: "1024px",

//       "2xl": "1440px",
//       "3xl": "1540px",
//     },
//     extend: {},
//   },
//   plugins: [require("flowbite/plugin"), require("daisyui")],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "350px",

      md: "585px",

      lg: "768px",

      xl: "1024px",

      "2xl": "1440px",
      "3xl": "1540px",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
