import { useEffect, useState, lazy, Suspense, type ReactNode } from "react";
import { ThemeProvider } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Apple-style: below-fold sections mount idle (not on scroll proximity).
// Mounting on scroll caused mid-scroll height pops (placeholder 70vh → real
// 90-140vh) and pin-spacer insertion jumps. Apple sites have DOM ready
// before scroll. Idle mount (≈800ms after hero paint, still outside TBT
// critical path) replaces placeholders before user scrolls past hero, so
// height is final and ScrollTrigger pins measure correctly.
function LazySection({
  children,
  minHeight,
}: {
  children: ReactNode;
  minHeight: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // Defer past TBT but before scroll — idle + short timeout
    const w = window as unknown as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idle = (cb: () => void) => {
      if (w.requestIdleCallback) return w.requestIdleCallback(cb, { timeout: 1200 });
      return window.setTimeout(cb, 800) as unknown as number;
    };
    const cancelIdle = (id: number) => {
      if (w.cancelIdleCallback) return w.cancelIdleCallback(id);
      return clearTimeout(id);
    };
    const id = idle(() => setVisible(true));
    // Fallback timer ensures mount even if idle never fires
    const t = window.setTimeout(() => setVisible(true), 1200);
    return () => {
      cancelIdle(id as number);
      clearTimeout(t);
    };
  }, []);
  if (visible) return <>{children}</>;
  // Estimated placeholder close to final height — prevents CLS jump.
  return <div aria-hidden="true" style={{ minHeight }} />;
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
    // Idle-mounted sections are already in DOM by ~1.2s, so refresh
    // soon after without the old 4.5s pin-spacer pop. Still outside
    // initial TBT/LCP window.
    const timeout = setTimeout(refresh, 1800);
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
            <LazySection minHeight="90vh">
              <About />
            </LazySection>
            <LazySection minHeight="65vh">
              <Expertise />
            </LazySection>
            <LazySection minHeight="130vh">
              <Projects />
            </LazySection>
            <LazySection minHeight="90vh">
              <Experience />
            </LazySection>
            <LazySection minHeight="95vh">
              <Education />
            </LazySection>
            <LazySection minHeight="70vh">
              <Contact />
            </LazySection>
          </Suspense>
        </main>
      </div>
    </ThemeProvider>
  );
}
