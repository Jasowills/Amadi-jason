import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image from "../assets/pic.png";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal elements
      const elements = sectionRef.current?.querySelectorAll("[data-reveal]");
      elements?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Parallax on image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 md:py-44 px-6 md:px-10 lg:px-16 xl:px-20"
    >
      {/* Section label */}
      <div data-reveal className="flex items-center gap-6 mb-16 md:mb-24">
        <span className="font-body text-[11px] tracking-[0.3em] uppercase opacity-40">
          (02) — About
        </span>
        <div className="flex-1 h-px bg-current opacity-[0.06]" />
      </div>

      {/* Main layout — asymmetric grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6">
        {/* Image — spans 5 cols, offset from left */}
        <div
          data-reveal
          className="lg:col-span-5 lg:col-start-1 overflow-hidden"
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              ref={imageRef}
              src={image}
              alt="Amadi Jason"
              className="w-full h-[115%] object-cover will-change-transform"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text — spans 5 cols, pushed right with vertical offset */}
        <div className="lg:col-span-5 lg:col-start-7 lg:pt-24 xl:pt-32">
          <h2
            data-reveal
            className="font-display text-display-lg mb-10 leading-[1.05]"
          >
            I build things for
            <br />
            the <em className="italic text-accent">web</em>.
          </h2>

          <div
            data-reveal
            className="space-y-6 font-body text-sm leading-[1.8] opacity-50"
          >
            <p>
              I&rsquo;m a software engineer based in Lagos, focused on building
              web applications that are fast, accessible, and built to last. I
              work across the full stack — from designing component systems and
              crafting interfaces to architecting APIs and databases.
            </p>
            <p>
              My toolkit centers on React, Node.js, TypeScript, and cloud
              infrastructure. I care about clean code, thoughtful architecture,
              and shipping products that actually solve problems.
            </p>
          </div>

          {/* Micro stats */}
          <div
            data-reveal
            className="mt-12 pt-8 border-t border-current/[0.06]
              grid grid-cols-2 gap-8"
          >
            <div>
              <span className="block font-display text-3xl md:text-4xl text-accent leading-none mb-2">
                10+
              </span>
              <span className="font-body text-[11px] tracking-[0.2em] uppercase opacity-35">
                Projects shipped
              </span>
            </div>
            <div>
              <span className="block font-display text-3xl md:text-4xl text-accent leading-none mb-2">
                3+
              </span>
              <span className="font-body text-[11px] tracking-[0.2em] uppercase opacity-35">
                Years building
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
