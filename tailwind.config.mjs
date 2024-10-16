/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        "libre-baskerville": ["Libre Baskerville", "serif"]
      },
      colors: {
        "dark-gray": "#7D7D7D",
        "medium-gray": "#E5E5E5",
        "light-gray": '#F3F3F3',
      }
    },
  },
  plugins: [],
};
