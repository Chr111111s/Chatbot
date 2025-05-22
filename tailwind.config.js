/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#CB842E',
        'secondary': '#FFCC00',
        'greyPrimary': '#F5F5F5',
        'alert' : '#FF4C4C'
        // Agrega más colores personalizados aquí
      },
    },
  },
  plugins: [],
}
