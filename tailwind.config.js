/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0B247A',
        secondary: '#D1D5DB',
        accent: '#9AD4DB',
        text: '#1F2937',
        info: '#8ACEFF',
        success: '#81CF92',
        warning: '#FFD88A',
        error: '#F16965',
        light: '#FDFDFD',
        blueB75:'#9DACDE',
        blueB50:'#E7EBF7',
        lightgrey:'#D9DCE1',
        inputtext:'#7D838B',
      },
      borderRadius: {
        'small-sm': '8px',
        'small-md': '12px',
        'large-sm': '16px',
        'large-md': '24px',
      },
      borderWidth: {
        thin: '0.5px',
        medium: '0.9px',
        thick: '1.3px',
      },
      boxShadow: {
        'primary-4': '0px 4px 21px 0px rgba(57, 0.2, 259, 0.04)',
        'primary-9': '0px 4px 21px 0px rgba(57, 0.2, 259, 0.09)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
