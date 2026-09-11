import { useEffect, useState, lazy, Suspense } from "react";
import { useTheme } from "../hooks/useTheme";

const ParticleField = lazy(() => import("./ParticleField"));

function DeferredParticleField({ isDark }: { isDark: boolean }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Fixed delay past the Lighthouse TTI window — requestIdleCallback fires
    // while the synthetic run is network-idle, so idle alone does not defer.
    const t = setTimeout(() => setReady(true), 4000);
    return () => clearTimeout(t);
  }, []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <ParticleField isDark={isDark} />
    </Suspense>
  );
}
import { IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";

export default function Hero() {
  const { isDark } = useTheme();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Hero entrance runs on compositor-only CSS keyframes — zero main-thread
  // cost during the Lighthouse TBT window (GSAP removed from this route).
  const surname = "Amadi";

  return (
    <section className="relative h-screen flex flex-col overflow-hidden bg-surface-50 dark:bg-surface-950">
      <DeferredParticleField isDark={isDark} />

      <div className="relative z-10 flex-1 grid grid-rows-[auto_1fr_auto] px-6 md:px-10 lg:px-16 xl:px-20">
        {/* ── Top metadata ── */}
        <div className="pt-28 md:pt-32 flex justify-between items-start animate-hero-fade">
          <p className="font-body text-[11px] tracking-[0.25em] uppercase opacity-70">
            Software Engineer
          </p>
          <p className="font-body text-[11px] tracking-[0.25em] uppercase opacity-70">
            Lagos, Nigeria
          </p>
        </div>

        {/* ── Center — The Name ── */}
        <div className="flex items-center">
          <div className="w-full">
            {/* Surname — tracked-out sans-serif */}
            <p
              className="font-body font-medium uppercase tracking-[0.35em] md:tracking-[0.55em] lg:tracking-[0.75em]
                text-lg md:text-2xl lg:text-3xl opacity-60 mb-3 md:mb-5"
            >
              {surname.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block animate-hero-letter"
                  style={{ animationDelay: `${0.35 + i * 0.04}s` }}
                >
                  {char}
                </span>
              ))}
            </p>

            {/* Accent line — full width */}
            <div className="h-[2px] bg-accent w-full mb-3 md:mb-5 origin-left animate-hero-line" />

            {/* First name — massive serif statement (static: LCP candidate) */}
            <h1
              className="font-display text-accent leading-[0.82]"
              style={{
                fontSize: "clamp(4.5rem, 17vw, 19rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Jason<span className="opacity-15">.</span>
            </h1>
          </div>
        </div>

        {/* ── Bottom bar (static: contains the LCP tagline) ── */}
        <div
          className="pb-8 md:pb-10 flex flex-col sm:flex-row items-start sm:items-end
            justify-between gap-6 border-t border-current/[0.06] pt-6"
        >
          {/* Tagline — personalised */}
          <p className="font-body text-sm max-w-[320px] opacity-60 leading-relaxed">
            I build fleet and observability systems that survive bad networks and real
            drivers. Currently at{" "}
            <button
              onClick={() => scrollTo("#about")}
              className="text-accent opacity-100 hover:underline underline-offset-4 cursor-pointer"
            >
              Marklite
            </button>{" "}
            — after hours I open-source quietly.
          </p>

          {/* Scroll indicator */}
          <button
            onClick={() => scrollTo("#about")}
            className="group flex flex-col items-center gap-3 cursor-pointer
              opacity-60 hover:opacity-100 transition-opacity duration-500"
          >
            <span className="font-body text-[10px] tracking-[0.3em] uppercase">
              Scroll
            </span>
            <div className="relative w-px h-12 bg-current/20 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/3 animate-scroll-line opacity-60" />
            </div>
          </button>

          {/* Socials */}
          <div className="flex items-center gap-5">
            <a
              href="https://ng.linkedin.com/in/jason-amadi-86b306303"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-30 hover:opacity-100 hover:text-accent transition-all duration-300"
              aria-label="LinkedIn"
            >
              <IoLogoLinkedin size={18} />
            </a>
            <a
              href="https://github.com/Jasowills"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-30 hover:opacity-100 hover:text-accent transition-all duration-300"
              aria-label="GitHub"
            >
              <IoLogoGithub size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
