import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../hooks/useTheme";
import {
  IoSunnyOutline,
  IoMoonOutline,
  IoMenuOutline,
  IoCloseOutline,
} from "react-icons/io5";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Focus trap for mobile menu
  const handleMenuKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setMenuOpen(false);
      return;
    }
    if (e.key !== "Tab") return;
    const focusable = menuRef.current?.querySelectorAll("button");
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-surface-50/80 dark:bg-surface-950/80 backdrop-blur-xl border-b border-black/[0.04] dark:border-white/[0.04]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-5">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-lg tracking-[0.05em] hover:text-accent transition-colors duration-300"
          >
            AMADI JASON
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="font-body text-[13px] tracking-[0.15em] uppercase opacity-50 hover:opacity-100 hover:text-accent transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full opacity-50 hover:opacity-100 hover:text-accent transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <IoSunnyOutline size={17} />
              ) : (
                <IoMoonOutline size={17} />
              )}
            </button>
          </div>

          {/* Mobile toggles */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 opacity-60"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <IoSunnyOutline size={17} />
              ) : (
                <IoMoonOutline size={17} />
              )}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 opacity-60"
              aria-label="Open menu"
            >
              <IoMenuOutline size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <nav
        ref={menuRef}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        onKeyDown={handleMenuKeyDown}
        className={`fixed inset-0 z-[100] transition-all duration-500 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-surface-50/95 dark:bg-surface-950/95 backdrop-blur-2xl" />
        <div className="relative h-full flex flex-col items-center justify-center gap-10">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2 opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Close menu"
          >
            <IoCloseOutline size={28} />
          </button>
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="font-display text-3xl tracking-wide opacity-70 hover:opacity-100 hover:text-accent transition-all duration-300"
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
