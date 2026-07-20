import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { adrs } from "../../data/lab/adrs";
import ExpandableCard from "./ExpandableCard";

gsap.registerPlugin(ScrollTrigger);

export default function ADR() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="lab-adr" ref={sectionRef} className="py-24 md:py-32 section-padding bg-surface-50 dark:bg-surface-950">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef}>
          <span className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
            Architecture Decision Records
          </span>
          <h2 className="font-display text-display-lg mb-6">
            How I <em className="italic text-accent">decide</em>
          </h2>
          <p className="font-body text-sm opacity-40 max-w-xl mb-10 leading-relaxed">
            Documented engineering decisions — the problem, the choice, the
            reasoning, and the trade-offs accepted.
          </p>
        </div>

        <div className="space-y-4">
          {adrs.map((adr) => (
            <ExpandableCard
              key={adr.id}
              title={
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-accent opacity-70">{adr.id}</span>
                  <span>{adr.title}</span>
                </span>
              }
              subtitle={`${adr.date} · ${adr.status}`}
            >
              <div className="space-y-6">
                <div>
                  <h5 className="font-body text-[11px] tracking-[0.2em] uppercase text-accent mb-2">
                    Problem
                  </h5>
                  <p className="font-body text-sm opacity-55 leading-relaxed">
                    {adr.problem}
                  </p>
                </div>

                <div>
                  <h5 className="font-body text-[11px] tracking-[0.2em] uppercase text-accent mb-2">
                    Decision
                  </h5>
                  <p className="font-body text-sm opacity-55 leading-relaxed">
                    {adr.decision}
                  </p>
                </div>

                <div>
                  <h5 className="font-body text-[11px] tracking-[0.2em] uppercase text-accent mb-2">
                    Reasoning
                  </h5>
                  <p className="font-body text-sm opacity-55 leading-relaxed">
                    {adr.reason}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-body text-[11px] tracking-[0.2em] uppercase text-accent mb-2">
                      Advantages
                    </h5>
                    <ul className="space-y-2">
                      {adr.tradeoffs.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm opacity-50 leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-green-400/50 mt-[7px] shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-body text-[11px] tracking-[0.2em] uppercase text-accent mb-2">
                      Trade-offs
                    </h5>
                    <ul className="space-y-2">
                      {adr.tradeoffs.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm opacity-50 leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-amber-400/50 mt-[7px] shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ExpandableCard>
          ))}
        </div>
      </div>
    </section>
  );
}
