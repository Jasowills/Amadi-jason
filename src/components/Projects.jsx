import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoLogoGithub, IoOpenOutline } from "react-icons/io5";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
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
    }, headingRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.children;
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        overwrite: true,
        scrollTrigger: { trigger: cardsRef.current, start: "top 85%" },
      },
    );
  }, []);

  return (
    <section id="projects" className="py-32 md:py-40 section-padding">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef}>
          <div className="flex items-center gap-6 mb-16 md:mb-20">
            <span className="font-body text-[11px] tracking-[0.3em] uppercase opacity-40">
              (04) — Projects
            </span>
            <div className="flex-1 h-px bg-current opacity-[0.06]" />
          </div>
          <h2 className="font-display text-display-lg mb-12">
            Selected <em className="italic text-accent">work</em>
          </h2>
        </div>

        <div ref={cardsRef} className="space-y-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group p-6 md:p-8 lg:p-10
                border border-black/[0.06] dark:border-white/[0.06] rounded-sm
                bg-surface-100/30 dark:bg-white/[0.015]
                hover:border-accent/20 hover:bg-surface-100/50 dark:hover:bg-white/[0.03]
                transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-accent opacity-60">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 bg-accent/10 text-accent rounded-sm">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mb-3 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="opacity-50 leading-relaxed max-w-2xl mb-6 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-[11px] tracking-[0.1em] uppercase
                          border border-black/[0.06] dark:border-white/[0.06]
                          opacity-45 rounded-sm font-body"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-5 md:pt-2 shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm opacity-40 hover:opacity-100 hover:text-accent transition-all duration-300"
                    >
                      <IoLogoGithub size={18} />
                      <span className="hidden sm:inline font-body text-xs tracking-wider uppercase">
                        Code
                      </span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm opacity-40 hover:opacity-100 hover:text-accent transition-all duration-300"
                    >
                      <IoOpenOutline size={18} />
                      <span className="hidden sm:inline font-body text-xs tracking-wider uppercase">
                        Live
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://github.com/jasowills"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-body text-[12px] tracking-[0.15em] uppercase
              px-7 py-3.5 border border-accent text-accent rounded-sm
              hover:bg-accent hover:text-surface-950 transition-all duration-300"
          >
            View all on GitHub
            <IoLogoGithub size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
