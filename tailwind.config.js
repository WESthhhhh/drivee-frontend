/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: "#0B247A",
        primaryHover: "#09206A",
        lightGrey: "button",
      },
      boxShadow: {
        'glow': '0px 4px 21px 0px rgba(13, 46, 153, 0.09)',
      },
    },
  },
  plugins: [],
};
