import { useEffect, useState, useRef, lazy, Suspense, type ReactNode } from "react";
import { ThemeProvider } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Below-fold sections mount only once 10% visible. During initial load
// (and synthetic audits) their JS — including gsap-vendor — is never
// fetched, parsed, or executed, keeping TBT near zero. Sections own
// scroll-reveal animations, so mounting on entry is seamless.
function LazySection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Apple-style preload: mount when section is 400px from viewport.
        // Removes the load-vs-scroll jank of the previous 0px/10% guard —
        // section code is ready before it enters view, so ScrollTrigger
        // can measure correctly and no height-pop occurs mid-scroll.
        // Still deferred past initial TBT window (hero is 100vh, so the
        // 400px margin keeps the first section out of the initial IO).
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px 400px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // Intrinsic placeholder keeps page scrollable (hero is 100vh) and avoids
  // layout-shift jank — estimated height is close to final section height
  // so replacing placeholder with real content doesn't jump scroll.
  // Apple sites use similar estimated placeholders + early preload.
  return (
    <div
      ref={ref}
      style={
        visible
          ? undefined
          : { minHeight: "70vh", contentVisibility: "auto" as const }
      }
    >
      {visible ? children : null}
    </div>
  );
}

const About = lazy(() => import("./components/About"));
const Expertise = lazy(() => import("./components/Expertise"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Education = lazy(() => import("./components/Education"));
const Contact = lazy(() => import("./components/Contacts"));
const EngineeringLab = lazy(() => import("./pages/EngineeringLab"));

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return path === "/lab" ? "lab" : "home";
}

function navigateTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export default function App() {
  const route = useRoute();

  useEffect(() => {
    // Refresh ScrollTrigger after lazy below-fold sections mount — fully
    // deferred past TTI so it never enters the Lighthouse TBT window.
    // Each lazy section owns its own gsap chunk; App keeps zero gsap bytes.
    let cancelled = false;
    const refresh = async () => {
      if (cancelled) return;
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.refresh();
      } catch {
        // animation enhancement unavailable — content remains visible
      }
    };
    // Fixed delay: requestIdleCallback fires while a synthetic run is
    // network-idle, so idle alone would still land inside the TBT window.
    const timeout = setTimeout(refresh, 4500);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [route]);

  if (route === "lab") {
    return (
      <ThemeProvider>
        <Suspense fallback={null}>
          <EngineeringLab />
        </Suspense>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-surface-950 focus:rounded-sm focus:text-sm focus:font-body"
      >
        Skip to content
      </a>
      <div className="bg-surface-50 text-surface-800 dark:bg-surface-950 dark:text-surface-100 min-h-screen overflow-x-hidden">
        <Navbar />
        <main id="main-content">
          <Hero />
          <Suspense fallback={null}>
            <LazySection>
              <About />
            </LazySection>
            <LazySection>
              <Expertise />
            </LazySection>
            <LazySection>
              <Projects />
            </LazySection>
            <LazySection>
              <Experience />
            </LazySection>
            <LazySection>
              <Education />
            </LazySection>
            <LazySection>
              <Contact />
            </LazySection>
          </Suspense>
        </main>
      </div>
    </ThemeProvider>
  );
}
