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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // Redefine the maxHeight utility to include 'viewpoint height' units
      maxHeight: {
        '85': '85vh',
        '90': '90vh',
        '95': '95vh',
      },
    },
  },
  plugins: [],
};
export default config;
