import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        surface: "hsl(var(--surface))",
        secondary: "hsl(var(--secondary))",
        danger: "hsl(var(--danger))",
        accent: "hsl(var(--accent))",
        "text-primary": "hsl(var(--text-primary))",
        "text-secondary": "hsl(var(--text-secondary))",
        warning: "hsl(var(--warning))",
        "primary-light": "hsl(var(--primary-light))",
        primary: "hsl(var(--primary))",
      },
    },
  },
  plugins: [],
};

export default config;
