import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Ensure this path matches your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
