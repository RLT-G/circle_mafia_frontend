// tailwind.config.ts

const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
      },
      colors: {
        gray: {
          100: "#9e9e9e",
          200: "#1e1e1e",
          400: "#141414"
        },
        yellow: {
          100: "#ffeb3b"
        }
      },
    },
  },
  plugins: [],
}

export default config;
