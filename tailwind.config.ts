import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#FDF6F3",
          100: "#FBE8E4",
          200: "#F6D3CE",
        },
        rose: {
          300: "#EFB4BC",
          400: "#E8A0A8",
          500: "#D98894",
          600: "#C9707E",
          700: "#A8555F",
        },
        ink: {
          DEFAULT: "#4A3B3D",
          light: "#7A6567",
        },
        gold: {
          DEFAULT: "#C9A66B",
          light: "#E3CFA4",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        script: ["var(--font-script)", "cursive"],
        body: ["var(--font-jost)", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "bloom": {
          "0%": { strokeDashoffset: "1", opacity: "0" },
          "100%": { strokeDashoffset: "0", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
