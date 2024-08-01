/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        nunito:["Nunito"],
        eduAus:["Edu AU VIC WA NT Hand"]
      }
    },
  },
  plugins: [],
}

