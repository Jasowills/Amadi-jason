import { useRef, useEffect } from "react";
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
    <section id="projects" className="py-32 md:py-40 section-padding bg-surface-50 dark:bg-surface-950">
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

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col
                border border-black/[0.06] dark:border-white/[0.06] rounded-sm
                bg-surface-100/30 dark:bg-white/[0.015] overflow-hidden
                hover:border-accent/25 transition-colors duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black/[0.04] dark:bg-white/[0.03]">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top
                    group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source code on GitHub`}
                      className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-body
                        px-4 py-2.5 border border-white/30 text-white bg-black/40 backdrop-blur-sm
                        hover:border-accent hover:text-accent transition-colors duration-300"
                    >
                      <IoLogoGithub size={14} />
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live site`}
                      className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-body
                        px-4 py-2.5 border border-white/30 text-white bg-black/40 backdrop-blur-sm
                        hover:border-accent hover:text-accent transition-colors duration-300"
                    >
                      <IoOpenOutline size={14} />
                      Live
                    </a>
                  )}
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white/80 rounded-sm font-body">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 bg-accent/90 text-surface-950 rounded-sm font-body">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-1 p-6 lg:p-7">
                <h3 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="opacity-50 leading-relaxed mb-6 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
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
            </article>
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
