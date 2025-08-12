/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8c6abf",
        secondary: "#63adf2",
        offblack: "#131313",
        offgray: "#363636",
        offwhite: "#f3f3f3",
      },
      fontFamily: {
        heading: ["GAU Pop Magic", "sans-serif"],
        sans: ["Spectral", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.5rem",
      },
    },
  },
  plugins: [],
};
