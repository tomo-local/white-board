import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", ".dark"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "slide-top": "slide-top 0.1s linear   both",
        grip: "grip 0.1s linear   both",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(-10px)",
          },
        },
        grip: {
          "0%": {
            transform: "rotate(0deg) translateY(0)",
          },
          to: {
            transform: "rotate(5deg) translateY(-10px)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
