/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        negative: "var(--color-negative)",
        bg: {
          DEFAULT: "var(--color-bg)",
          secondary: "var(--color-bg-secondary)",
          tertiary: "var(--color-bg-tertiary)",
        },
        text: {
          DEFAULT: "var(--color-text)",
          muted: "var(--color-text-muted)",
          subtle: "var(--color-text-subtle)",
        },
        border: "var(--color-border)",
        position: "var(--color-position)"
        
      },
      fontFamily: {
        title: "var(--font-funnel-display)",
        body: "var(--font-funnel-sans)",
      },
    },
  },
  plugins: [],
};