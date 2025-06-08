/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/preline/preline.js",
  ],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#ffffff",
      gray: colors.gray,
      indigo: colors.indigo,
      neutral: colors.neutral, // Used mainly for text color
      yellow: {
        50: "#fefce8",
        100: "#fef9c3",
        400: "#facc15",
        500: "#eab308",
      }, // Accent colors, used mainly for star color, heading and buttons
      orange:{
        100: "#ebf4ff",  // Very light blue (softer than original for better readability)
        200: "#c3dafe",  // Light blue (matches original's airy feel)
        300: "#7ea5f8",  // Medium blue (vibrant but not overwhelming)
        400: "#4b7bf5",  // Rich primary blue (perfect balance of saturation)
        500: "#3b66f2",  // Deep blue (maintains original's boldness)
        600: "#304fdb"   // Dark blue (more sophisticated than original)
      },
      teal: {
        600: "#3D958E",
      },
      blue: {
        600: "#1E7DB6",
      }, // Primary colors, used mainly for links, buttons and svg icons
      red: colors.red, // Used for bookmark icon
      zinc: colors.zinc, // Used mainly for box-shadow
    },
    extend: {
      keyframes: {
        "fade-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "fade-in-left": "fade-in-left 1s ease-out forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss/nesting"),
    require("preline/plugin"),
    require("@tailwindcss/forms"),
  ],
};
