import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        background: "oklch(var(--color-background) / <alpha-value>)",
        surface: "oklch(var(--color-surface) / <alpha-value>)",
        secondary: "oklch(var(--color-secondary) / <alpha-value>)",
        danger: "oklch(var(--color-danger) / <alpha-value>)",
        accent: "oklch(var(--color-accent) / <alpha-value>)",
        "text-primary": "oklch(var(--color-text-primary) / <alpha-value>)",
        "text-secondary": "oklch(var(--color-text-secondary) / <alpha-value>)",
        warning: "oklch(var(--color-warning) / <alpha-value>)",
        "primary-light": "oklch(var(--color-primary-light) / <alpha-value>)",
        primary: "oklch(var(--color-primary) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
