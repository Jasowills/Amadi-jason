import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const currentTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";

const applyTheme = (next: Theme) => {
  document.documentElement.setAttribute("data-theme", next);
  try {
    window.localStorage.setItem("theme", next);
  } catch {
    // Private browsing or storage disabled; the choice just won't persist.
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", next === "dark" ? "#0F0F10" : "#FFFFFF");
  }
};

const SunIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="9" cy="9" r="3.4" />
    <path d="M9 1.4 L9 3.4" />
    <path d="M9 14.6 L9 16.6" />
    <path d="M1.4 9 L3.4 9" />
    <path d="M14.6 9 L16.6 9" />
    <path d="M3.6 3.6 L5 5" />
    <path d="M13 13 L14.4 14.4" />
    <path d="M14.4 3.6 L13 5" />
    <path d="M5 13 L3.6 14.4" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14.3 10.8 A6.1 6.1 0 0 1 7.2 3.7 A6.1 6.1 0 1 0 14.3 10.8 Z" />
  </svg>
);

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      className="icon-button"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
