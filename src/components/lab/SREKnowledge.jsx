import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sreSections } from "../../data/lab/sre";
import ExpandableCard from "./ExpandableCard";

gsap.registerPlugin(ScrollTrigger);

export default function SREKnowledge() {
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
    <section id="lab-sre" ref={sectionRef} className="py-24 md:py-32 section-padding bg-surface-50 dark:bg-surface-950">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef}>
          <span className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
            SRE Knowledge Base
          </span>
          <h2 className="font-display text-display-lg mb-6">
            How I <em className="italic text-accent">operate</em>
          </h2>
          <p className="font-body text-sm opacity-40 max-w-xl mb-10 leading-relaxed">
            Reliability engineering, observability, incident management, and the
            practices that keep production systems running.
          </p>
        </div>

        <div className="space-y-16">
          {sreSections.map((section) => (
            <div key={section.id}>
              <h3 className="font-display text-display-md mb-8">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.topics.map((topic) => (
                  <ExpandableCard
                    key={topic.id}
                    title={topic.title}
                    subtitle={topic.summary}
                  >
                    <ul className="space-y-2.5">
                      {topic.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm opacity-55 leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-accent/50 mt-[7px] shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </ExpandableCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
