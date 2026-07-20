import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { devopsSections } from "../../data/lab/devops";
import ExpandableCard from "./ExpandableCard";

gsap.registerPlugin(ScrollTrigger);

export default function DevOpsNotes() {
  const [activeTab, setActiveTab] = useState(devopsSections[0].id);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const active = devopsSections.find((s) => s.id === activeTab);

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
    <section id="lab-devops" ref={sectionRef} className="py-24 md:py-32 section-padding bg-surface-50 dark:bg-surface-950">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef}>
          <span className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
            DevOps & Cloud Engineering
          </span>
          <h2 className="font-display text-display-lg mb-6">
            How I <em className="italic text-accent">deploy</em>
          </h2>
          <p className="font-body text-sm opacity-40 max-w-xl mb-10 leading-relaxed">
            Infrastructure, containers, CI/CD, and cloud architecture — the
            operational side of building production systems.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-10 border-b border-black/[0.06] dark:border-white/[0.06]">
          {devopsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`px-5 py-3 font-body text-[11px] tracking-[0.15em] uppercase
                transition-all duration-300 border-b-2 -mb-px ${
                  activeTab === section.id
                    ? "text-accent border-accent"
                    : "border-transparent opacity-35 hover:opacity-60"
                }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {active?.topics.map((topic) => (
            <ExpandableCard
              key={topic.id}
              title={topic.title}
              subtitle={topic.summary}
            >
              <ul className="space-y-2.5 mb-4">
                {topic.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm opacity-55 leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-accent/50 mt-[7px] shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>

              {topic.commands && topic.commands.length > 0 && (
                <div className="mt-4 p-4 rounded-sm bg-surface-900 dark:bg-black/40 border border-white/[0.04] overflow-x-auto">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-accent/50 mb-2">
                    Commands
                  </p>
                  <div className="space-y-1.5">
                    {topic.commands.map((cmd, i) => (
                      <code key={i} className="block font-mono text-xs text-green-400/70 leading-relaxed">
                        <span className="text-accent/30">$</span> {cmd}
                      </code>
                    ))}
                  </div>
                </div>
              )}
            </ExpandableCard>
          ))}
        </div>
      </div>
    </section>
  );
}
