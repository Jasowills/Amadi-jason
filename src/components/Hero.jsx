import { useRef, useEffect, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { useTheme } from '../hooks/useTheme';

const ParticleField = lazy(() => import('./ParticleField'));
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io5';

export default function Hero() {
  const sectionRef = useRef(null);
  const metaTopRef = useRef(null);
  const surnameRef = useRef(null);
  const lineRef = useRef(null);
  const firstNameRef = useRef(null);
  const bottomRef = useRef(null);
  const { isDark } = useTheme();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Surname letters stagger in
    tl.fromTo(
      surnameRef.current?.querySelectorAll('.letter') || [],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.04, ease: 'power4.out' }
    );

    // Accent line grows from left
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: 'power4.inOut' },
      '-=0.5'
    );

    // First name slides up
    tl.fromTo(
      firstNameRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out' },
      '-=0.9'
    );

    // Top metadata fades in
    tl.fromTo(
      metaTopRef.current?.children || [],
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
      '-=0.6'
    );

    // Bottom bar staggers up
    tl.fromTo(
      bottomRef.current?.children || [],
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out' },
      '-=0.5'
    );
  }, []);

  const surname = 'Amadi';

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col overflow-hidden"
    >
      <Suspense fallback={null}>
        <ParticleField isDark={isDark} />
      </Suspense>

      <div className="relative z-10 flex-1 grid grid-rows-[auto_1fr_auto] px-6 md:px-10 lg:px-16 xl:px-20">
        {/* ── Top metadata ── */}
        <div
          ref={metaTopRef}
          className="pt-28 md:pt-32 flex justify-between items-start"
        >
          <p className="font-body text-[11px] tracking-[0.25em] uppercase opacity-40">
            (01) — Software Engineer
          </p>
          <p className="font-body text-[11px] tracking-[0.25em] uppercase opacity-40">
            Lagos, Nigeria
          </p>
        </div>

        {/* ── Center — The Name ── */}
        <div className="flex items-center">
          <div className="w-full">
            {/* Surname — tracked-out sans-serif */}
            <p
              ref={surnameRef}
              className="font-body font-medium uppercase tracking-[0.35em] md:tracking-[0.55em] lg:tracking-[0.75em]
                text-lg md:text-2xl lg:text-3xl opacity-60 mb-3 md:mb-5"
            >
              {surname.split('').map((char, i) => (
                <span
                  key={i}
                  className="letter inline-block will-change-transform"
                >
                  {char}
                </span>
              ))}
            </p>

            {/* Accent line — full width */}
            <div
              ref={lineRef}
              className="h-[2px] bg-accent w-full mb-3 md:mb-5 origin-left will-change-transform"
            />

            {/* First name — massive serif statement */}
            <h1
              ref={firstNameRef}
              className="font-display text-accent will-change-transform leading-[0.82]"
              style={{
                fontSize: 'clamp(4.5rem, 17vw, 19rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Jason<span className="opacity-15">.</span>
            </h1>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          ref={bottomRef}
          className="pb-8 md:pb-10 flex flex-col sm:flex-row items-start sm:items-end
            justify-between gap-6 border-t border-current/[0.06] pt-6"
        >
          {/* Tagline */}
          <p className="font-body text-sm max-w-[280px] opacity-40 leading-relaxed">
            Crafting scalable web applications from architecture to interface.
            Currently at{' '}
            <button
              onClick={() => scrollTo('#about')}
              className="text-accent opacity-100 hover:underline underline-offset-4 cursor-pointer"
            >
              Marklite
            </button>
            .
          </p>

          {/* Scroll indicator */}
          <button
            onClick={() => scrollTo('#about')}
            className="group flex flex-col items-center gap-3 cursor-pointer
              opacity-30 hover:opacity-70 transition-opacity duration-500"
          >
            <span className="font-body text-[10px] tracking-[0.3em] uppercase">
              Scroll
            </span>
            <div className="relative w-px h-12 bg-current/20 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/3 animate-scroll-line opacity-60" />
            </div>
          </button>

          {/* Socials */}
          <div className="flex items-center gap-5">
            <a
              href="https://ng.linkedin.com/in/jason-amadi-86b306303"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-30 hover:opacity-100 hover:text-accent transition-all duration-300"
              aria-label="LinkedIn"
            >
              <IoLogoLinkedin size={18} />
            </a>
            <a
              href="https://github.com/Jasowills"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-30 hover:opacity-100 hover:text-accent transition-all duration-300"
              aria-label="GitHub"
            >
              <IoLogoGithub size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
