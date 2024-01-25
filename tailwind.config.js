/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      praimary: "'Poppins', sans-serif",
    },
    container: {
      padding: {
        default: "30px",
        lg: "0"
      }
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    }

  },
  extend: {
    colors: {
      primary: "#222222",
      secondary: "#f5e6e0"
    },
    backgroundImage: {
      hero: "url('/src/assets/hero.jpg')",
    },
  },
  plugins: [],
}

