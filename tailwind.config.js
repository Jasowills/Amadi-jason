/** @type {import('tailwindcss').Config} */
// The rebuild uses plain CSS custom properties (see src/index.css).
// Tailwind stays installed for the dev dependency but contributes no
// utility classes; keep this config minimal so PostCSS loads without error.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
