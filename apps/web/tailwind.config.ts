import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f5f0e8",
        surface: "#ede7d9",
        surface2: "#e4ddd0",
        border: "#d4ccbc",
        accent: "#e8441a",
        accent2: "#1a3ae8",
        text: "#1a1714",
        muted: "#7a7060",
        muted2: "#b0a898",
        dark: "#1a1714",
        dark2: "#2a2520",
        dark3: "#3a3530",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
