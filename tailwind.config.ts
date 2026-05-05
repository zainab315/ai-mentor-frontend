import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
	"./styles/**/*.{ts,tsx,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;