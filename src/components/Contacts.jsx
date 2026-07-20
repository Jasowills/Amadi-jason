import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IoMailOutline,
  IoLogoLinkedin,
  IoLogoGithub,
  IoLocationOutline,
} from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
              start: "top 88%",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 md:py-40 section-padding relative min-h-[70vh] flex items-center bg-surface-50 dark:bg-surface-950"
    >
      <div className="max-w-7xl mx-auto w-full">
        <span
          data-reveal
          className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4 block"
        >
          Contact
        </span>
        <h2 data-reveal className="font-display text-display-lg mb-16">
          Let&rsquo;s build
          <br />
          something <em className="italic text-accent">great</em>
        </h2>

        <div data-reveal className="grid sm:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-6">
            <a
              href="mailto:jasowills01@gmail.com"
              className="flex items-center gap-4 group"
            >
              <IoMailOutline className="text-accent shrink-0" size={20} />
              <span className="opacity-50 group-hover:opacity-100 group-hover:text-accent transition-all duration-300 text-sm">
                jasowills01@gmail.com
              </span>
            </a>
            <div className="flex items-center gap-4">
              <IoLocationOutline className="text-accent shrink-0" size={20} />
              <span className="opacity-50 text-sm">Lagos, Nigeria</span>
            </div>
          </div>

          <div className="space-y-6">
            <a
              href="https://ng.linkedin.com/in/jason-amadi-86b306303"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <IoLogoLinkedin className="text-accent shrink-0" size={20} />
              <span className="opacity-50 group-hover:opacity-100 group-hover:text-accent transition-all duration-300 text-sm">
                LinkedIn
              </span>
            </a>
            <a
              href="https://github.com/Jasowills"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <IoLogoGithub className="text-accent shrink-0" size={20} />
              <span className="opacity-50 group-hover:opacity-100 group-hover:text-accent transition-all duration-300 text-sm">
                GitHub
              </span>
            </a>
          </div>
        </div>

        <div
          data-reveal
          className="mt-24 pt-8 border-t border-black/[0.06] dark:border-white/[0.06]"
        >
          <p className="font-body text-xs tracking-wider opacity-25">
            &copy; {new Date().getFullYear()} Amadi Jason. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
