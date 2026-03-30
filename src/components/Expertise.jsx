import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IoDesktopOutline,
  IoCodeOutline,
  IoPhonePortraitOutline,
  IoServerOutline,
} from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  {
    icon: IoDesktopOutline,
    title: "Frontend",
    description:
      "Building responsive, interactive user interfaces with pixel-perfect attention to detail and smooth interactions.",
    technologies: [
      "React",
      "React Native",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
    ],
  },
  {
    icon: IoCodeOutline,
    title: "Backend",
    description:
      "Developing robust server-side applications with scalable architectures and clean, well-documented APIs.",
    technologies: [
      "Node.js",
      "NestJS",
      "C#",
      "Rust",
      "GraphQL",
      "RESTful APIs",
      "CI/CD Pipelines",
    ],
  },
  {
    icon: IoPhonePortraitOutline,
    title: "Mobile",
    description:
      "Creating cross-platform mobile applications that feel native and performant on every device.",
    technologies: ["React Native", "iOS", "Android"],
  },
  {
    icon: IoServerOutline,
    title: "Cloud & DevOps",
    description:
      "Managing cloud infrastructure, automated provisioning, and production-ready deployment pipelines.",
    technologies: [
      "Microsoft Azure",
      "Azure DevOps",
      "MongoDB",
      "SQL",
      "Git",
      "Vercel",
    ],
  },
];

export default function Expertise() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headingRef = useRef(null);
  const mobileCardsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          },
        );
      }

      // Horizontal scroll on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        if (!section || !track) return;
        const totalScroll = track.scrollWidth - window.innerWidth + 100;

        gsap.to(track, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // Mobile cards stagger
      if (mobileCardsRef.current) {
        gsap.fromTo(
          mobileCardsRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mobileCardsRef.current,
              start: "top 85%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const CardContent = ({ item }) => (
    <>
      <item.icon className="text-accent mb-6" size={28} />
      <h3 className="font-display text-2xl mb-4">{item.title}</h3>
      <p className="opacity-50 leading-relaxed mb-8 text-sm">
        {item.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {item.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 text-[11px] tracking-[0.15em] uppercase
              border border-black/[0.06] dark:border-white/[0.06]
              opacity-50 rounded-sm font-body"
          >
            {tech}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      <div className="section-padding pt-32 md:pt-40 pb-12" ref={headingRef}>
        <div className="max-w-7xl mx-auto">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
            Expertise
          </span>
          <h2 className="font-display text-display-lg">
            What I <em className="italic text-accent">do</em>
          </h2>
        </div>
      </div>

      {/* Desktop: Horizontal scroll track */}
      <div
        ref={trackRef}
        className="hidden md:flex gap-8 pl-12 lg:pl-24 xl:pl-32 py-12 will-change-transform"
      >
        {expertise.map((item) => (
          <div
            key={item.title}
            className="flex-shrink-0 w-[400px] lg:w-[440px] group"
          >
            <div
              className="h-full p-8 lg:p-10 flex flex-col
              border border-black/[0.06] dark:border-white/[0.06] rounded-sm
              bg-surface-100/40 dark:bg-white/[0.02]
              hover:border-accent/20 hover:bg-surface-100/60 dark:hover:bg-white/[0.04]
              transition-all duration-500"
            >
              <CardContent item={item} />
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 w-48" />
      </div>

      {/* Mobile: Stacked cards */}
      <div
        ref={mobileCardsRef}
        className="md:hidden section-padding pb-20 space-y-5"
      >
        {expertise.map((item) => (
          <div
            key={item.title}
            className="p-6 border border-black/[0.06] dark:border-white/[0.06] rounded-sm
              bg-surface-100/40 dark:bg-white/[0.02]"
          >
            <CardContent item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
