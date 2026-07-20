import { useState, useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const sections = [
  { id: "lab-hero", label: "Overview" },
  { id: "lab-system-design", label: "System Design" },
  { id: "lab-adr", label: "ADRs" },
  { id: "lab-devops", label: "DevOps" },
  { id: "lab-sre", label: "SRE" },
  { id: "lab-notes", label: "Notes" },
];

export default function LabNav() {
  const [active, setActive] = useState("lab-hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const offsets = sections.map((s) => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el ? el.getBoundingClientRect().top : Infinity };
      });

      const current = offsets.reduce((closest, s) => {
        if (s.top <= 120 && s.top > closest.top) return s;
        return closest;
      }, { id: "lab-hero", top: -Infinity });

      setActive(current.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Back to portfolio */}
      <a
        href="/"
        className="fixed top-4 left-4 md:left-6 z-[60] flex items-center gap-2
          font-body text-[11px] tracking-[0.15em] uppercase opacity-30 hover:opacity-80
          hover:text-accent transition-all duration-300"
      >
        <IoArrowBackOutline size={14} />
        <span>Portfolio</span>
      </a>

      {/* Desktop sidebar nav */}
      <nav
        className={`hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-[60] flex-col gap-1
          transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="flex items-center gap-3 py-1.5 text-left group"
          >
            <span
              className={`w-5 h-px transition-all duration-300 ${
                active === s.id
                  ? "bg-accent w-8"
                  : "bg-current opacity-20 group-hover:opacity-50"
              }`}
            />
            <span
              className={`font-body text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                active === s.id
                  ? "text-accent opacity-100"
                  : "opacity-30 group-hover:opacity-60"
              }`}
            >
              {s.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Mobile top bar */}
      <nav
        className={`lg:hidden fixed top-0 left-0 right-0 z-[60] overflow-x-auto
          transition-all duration-500 ${
            scrolled
              ? "bg-surface-50/80 dark:bg-surface-950/80 backdrop-blur-xl border-b border-black/[0.04] dark:border-white/[0.04]"
              : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex items-center gap-1 px-4 py-3 min-w-max">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`px-3 py-1 font-body text-[10px] tracking-[0.15em] uppercase rounded-sm
                transition-all duration-300 whitespace-nowrap ${
                  active === s.id
                    ? "text-accent bg-accent/10"
                    : "opacity-30 hover:opacity-60"
                }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
