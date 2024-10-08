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
      fontFamily: {
        segoe:['segoe']
      },
      screens: {
        'l':'1260px',
        'xlg':'1101px',
        'xs':'541px',
        '2xs':'481px',
        '3xs':'361px',
        '4xs':'321px',
      },
    },
  },
  plugins: [],
};
export default config;
