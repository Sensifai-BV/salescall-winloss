/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary, #2563EB)",
          hover: "var(--brand-primary-hover, #1D4ED8)",
          light: "var(--brand-primary-light, #EFF6FF)",
          accent: "var(--brand-accent, #4F46E5)",
        },
        surface: {
          bg: "var(--surface-bg, #F8FAFC)",
          card: "var(--surface-card, #FFFFFF)",
        },
        sidebar: {
          bg: "var(--sidebar-bg, #0B132B)",
          text: "var(--sidebar-text, #F1F5F9)",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
      },
    },
  },
  plugins: [],
};
