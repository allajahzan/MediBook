/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        mygreen : "#087d1f",
        mygrey : "#e5e7eb"
      }
    },
  },
  plugins: [],
}

