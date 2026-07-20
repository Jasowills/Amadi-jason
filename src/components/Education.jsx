import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IoSchoolOutline,
  IoDocumentTextOutline,
  IoCloseOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { certifications } from "../data/experience";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    institution: "Harvard University",
    degree: "CS50: Introduction to Computer Science",
    year: "2026",
    description: [
      "Completed Harvard's rigorous introductory computer science curriculum covering algorithms, data structures, software engineering, and web development.",
      "Earned a verified certificate demonstrating proficiency in fundamental CS concepts and practical programming skills.",
    ],
    certificate: "/CS50X.pdf",
  },
];

export default function Education() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const certsHeadingRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);
  const modalRef = useRef(null);

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

      const items = sectionRef.current?.querySelectorAll("[data-edu]");
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

      if (certsHeadingRef.current) {
        gsap.fromTo(
          certsHeadingRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: certsHeadingRef.current,
              start: "top 88%",
            },
          },
        );
      }

      const certs = sectionRef.current?.querySelectorAll("[data-cert]");
      certs?.forEach((cert) => {
        gsap.fromTo(
          cert,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cert,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openCert = useCallback((cert) => {
    setActiveCert(cert);
    setModalOpen(true);
    window.__sonar?.track("certificate_viewed", { source: "portfolio" });
  }, []);

  const closeCert = useCallback(() => {
    setModalOpen(false);
    setActiveCert(null);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeCert();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen, closeCert]);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-32 md:py-40 section-padding bg-surface-50 dark:bg-surface-950"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef}>
          <span className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
            Education
          </span>
          <h2 className="font-display text-display-lg mb-16 md:mb-20">
            Where I&rsquo;ve <em className="italic text-accent">learned</em>
          </h2>
        </div>

        {/* Degree */}
        <div className="space-y-14 md:space-y-20">
          {education.map((item) => (
            <div key={item.degree} data-edu className="relative">
              <div className="flex flex-col gap-1 mb-4">
                <span className="font-body text-[11px] tracking-[0.25em] uppercase text-accent">
                  {item.year}
                </span>
                <h3 className="font-display text-xl md:text-2xl mt-1">
                  {item.degree}
                </h3>
                <p className="font-body text-sm opacity-40">
                  {item.institution}
                </p>
              </div>

              <ul className="space-y-2.5 mb-6">
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

              <button
                onClick={() => openCert(item.certificate)}
                className="inline-flex items-center gap-2.5 font-body text-[12px] tracking-[0.15em] uppercase
                  opacity-50 hover:opacity-100 hover:text-accent transition-all duration-300 group"
              >
                <IoDocumentTextOutline size={16} />
                <span>View Certificate</span>
                <span className="w-4 h-px bg-current opacity-40 group-hover:opacity-100 group-hover:w-8 transition-all duration-300" />
              </button>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-24 md:mt-32">
          <h3
            ref={certsHeadingRef}
            className="font-display text-display-md mb-10"
          >
            Certifications
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                data-cert
                className="flex items-start gap-3 p-5 border border-black/[0.06] dark:border-white/[0.06] rounded-sm
                  text-sm opacity-60 leading-relaxed font-body"
              >
                <IoCheckmarkCircleOutline
                  className="text-accent shrink-0 mt-0.5"
                  size={16}
                />
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {modalOpen && (
        <div
          ref={modalRef}
          role="dialog"
          aria-label="Certificate viewer"
          aria-modal="true"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        >
          <div
            className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm"
            onClick={closeCert}
          />
          <div className="relative w-full max-w-4xl h-[85vh] bg-surface-50 dark:bg-surface-900 rounded-sm border border-black/[0.06] dark:border-white/[0.06] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] dark:border-white/[0.06]">
              <div className="flex items-center gap-3">
                <IoSchoolOutline className="text-accent" size={18} />
                <span className="font-body text-sm opacity-60">
                  CS50 Certificate — Harvard University
                </span>
              </div>
              <button
                onClick={closeCert}
                className="p-2 opacity-50 hover:opacity-100 hover:text-accent transition-all duration-300"
                aria-label="Close certificate viewer"
              >
                <IoCloseOutline size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <object
                data={activeCert}
                type="application/pdf"
                className="w-full h-full"
              >
                <p className="p-8 text-sm opacity-50">
                  Your browser does not support PDF embedding.{" "}
                  <a
                    href={activeCert}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline"
                  >
                    Download the certificate
                  </a>{" "}
                  instead.
                </p>
              </object>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
