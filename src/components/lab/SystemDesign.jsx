import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { systemDesigns } from "../../data/lab/systemDesigns";
import FilterChips from "./FilterChips";
import ExpandableCard from "./ExpandableCard";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { value: "all", label: "All" },
  { value: "ai", label: "AI / ML" },
  { value: "realtime", label: "Real-Time" },
  { value: "saas", label: "SaaS" },
  { value: "cloud", label: "Cloud" },
];

export default function SystemDesign() {
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const filtered =
    filter === "all"
      ? systemDesigns
      : systemDesigns.filter((s) => s.category === filter);

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
    <section id="lab-system-design" ref={sectionRef} className="py-24 md:py-32 section-padding bg-surface-50 dark:bg-surface-950">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef}>
          <span className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
            System Design Library
          </span>
          <h2 className="font-display text-display-lg mb-6">
            Architectures I&rsquo;ve <em className="italic text-accent">designed</em>
          </h2>
          <p className="font-body text-sm opacity-40 max-w-xl mb-10 leading-relaxed">
            Each system represents a real engineering challenge — the decisions,
            trade-offs, and patterns behind production-grade platforms.
          </p>
        </div>

        <FilterChips options={categories} active={filter} onChange={setFilter} />

        <div className="mt-8 space-y-4">
          {filtered.map((system) => (
            <ExpandableCard
              key={system.id}
              title={system.title}
              subtitle={system.problem}
              tags={system.technologies}
            >
              <div className="space-y-6">
                {/* Architecture */}
                <div>
                  <h5 className="font-body text-[11px] tracking-[0.2em] uppercase text-accent mb-3">
                    Architecture
                  </h5>
                  <p className="font-body text-sm opacity-55 leading-relaxed">
                    {system.architecture.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {system.architecture.nodes.map((node) => (
                      <span
                        key={node}
                        className="px-3 py-1 text-[10px] tracking-[0.1em] uppercase font-body
                          bg-accent/[0.06] text-accent/80 border border-accent/10 rounded-sm"
                      >
                        {node}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Decisions */}
                <div>
                  <h5 className="font-body text-[11px] tracking-[0.2em] uppercase text-accent mb-3">
                    Key Decisions
                  </h5>
                  <ul className="space-y-2">
                    {system.keyDecisions.map((d, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm opacity-50 leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-accent/50 mt-[7px] shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Scalability */}
                  <div>
                    <h5 className="font-body text-[11px] tracking-[0.2em] uppercase text-accent mb-3">
                      Scalability
                    </h5>
                    <ul className="space-y-2">
                      {system.scalability.map((s, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm opacity-50 leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-accent/50 mt-[7px] shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Failure Scenarios */}
                  <div>
                    <h5 className="font-body text-[11px] tracking-[0.2em] uppercase text-accent mb-3">
                      Failure Scenarios
                    </h5>
                    <ul className="space-y-2">
                      {system.failureScenarios.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm opacity-50 leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-red-400/50 mt-[7px] shrink-0" />
                          {f}
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
