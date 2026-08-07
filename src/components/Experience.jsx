import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "../data/experience";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          },
        );
      }

      // Timeline items
      const items = sectionRef.current?.querySelectorAll("[data-timeline]");
      items?.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 md:py-40 section-padding bg-surface-50 dark:bg-surface-950"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef}>
          <span className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
            Experience
          </span>
          <h2 className="font-display text-display-lg mb-16 md:mb-20">
            Where I&rsquo;ve <em className="italic text-accent">been</em>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[7px] md:left-[7px] top-3 bottom-0 w-px bg-black/[0.06] dark:bg-white/[0.06]" />

          <div className="space-y-14 md:space-y-20">
            {experience.map((item, i) => (
              <div key={i} data-timeline className="relative pl-10 md:pl-14">
                {/* Dot */}
                <div className="absolute left-0 top-[10px] w-[15px] h-[15px] rounded-full border-2 border-accent bg-surface-50 dark:bg-surface-950" />

                <div className="flex flex-col gap-1 mb-4">
                  <span className="font-body text-[11px] tracking-[0.25em] uppercase text-accent">
                    {item.period}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl mt-1">
                    {item.role}
                  </h3>
                  <p className="font-body text-sm opacity-40">
                    {item.company}
                    {item.location ? ` — ${item.location}` : ""}
                  </p>
                </div>

                <ul className="space-y-2.5">
                  {item.description.map((point, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 opacity-55 leading-relaxed text-sm"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent/50 mt-[9px] shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
