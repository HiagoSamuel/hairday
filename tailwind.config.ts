import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellowLight: "#DBC170",
        yellow: "#B8952E",
        yellowDark: "#846F2E",

        gray100: "#F5F4F5",
        gray200: "#B2AFB6",
        gray300: "#98959D",
        gray400: "#7A767F",
        gray500: "#3E3C41",
        gray600: "#2E2C30",
        gray700: "#232225",
        gray800: "#19181B",
        gray900: "#050505",
      },
      fontFamily: {
        sans: ["Catamaran", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;