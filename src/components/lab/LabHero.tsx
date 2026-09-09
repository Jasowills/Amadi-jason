import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function LabHero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        titleRef.current?.querySelectorAll(".letter") || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power4.out" },
      );

      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.3",
      );

      tl.fromTo(
        descRef.current?.children || [],
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
        "-=0.3",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = "Engineering Lab";

  return (
    <section
      id="lab-hero"
      ref={sectionRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-surface-50 dark:bg-surface-950"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="lab-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lab-grid)" />
        </svg>
        {/* Flowing vertical lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {[15, 35, 55, 75, 90].map((x) => (
            <line
              key={x}
              x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%"
              stroke="currentColor"
              strokeWidth="0.3"
              strokeDasharray="4 16"
              className={x % 2 === 0 ? "animate-grid-flow" : "animate-grid-flow-slow"}
              opacity="0.06"
            />
          ))}
        </svg>
        {/* Gradient orb */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full
          bg-accent/[0.03] blur-[120px] animate-fade-pulse" />
      </div>

      <div className="relative z-10 section-padding w-full pt-32 md:pt-40">
        <div className="max-w-4xl">
          {/* Section label */}
          <p className="font-body text-[11px] tracking-[0.25em] uppercase opacity-30 mb-6">
            Technical Workspace
          </p>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-display leading-[0.95] mb-8"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {title.split("").map((char, i) => (
              <span key={i} className="letter inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          {/* Subtitle with terminal cursor */}
          <p
            ref={subtitleRef}
            className="font-body text-lg md:text-xl opacity-50 max-w-2xl leading-relaxed mb-8"
          >
            Architecture decisions, system designs, engineering notes, and
            technical deep dives.
            <span className="inline-block w-[2px] h-[1em] bg-accent ml-1 align-middle animate-cursor-blink" />
          </p>

          {/* Description */}
          <div ref={descRef} className="space-y-4 max-w-xl">
            <p className="font-body text-sm opacity-35 leading-relaxed">
              This is where I document how I think about building reliable,
              scalable, and maintainable software systems.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-px bg-accent/40" />
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-accent opacity-60">
                Scroll to explore
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
