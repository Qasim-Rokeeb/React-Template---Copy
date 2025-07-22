export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: { inter: ["Inter", "sans-serif"] },
      colors: {
        accent: {
          start: "rgb(16 185 129)",   // emerald-500
          stop: "rgb(245 158 11)",    // amber-500
          reset: "rgb(239 68 68)",    // rose-500
          white: "rgb(255 255 255)",
          white80: "rgba(255,255,255,0.8)",
          gray100: "rgb(243 244 246)",
          gray800: "rgb(31 41 55)",
          gray900: "rgb(17 24 39)",
        },
      },
    },
  },
  plugins: [],
};