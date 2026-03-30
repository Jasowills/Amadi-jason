import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeProvider } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Expertise from "./components/Expertise";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contacts";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ThemeProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-surface-950 focus:rounded-sm focus:text-sm focus:font-body"
      >
        Skip to content
      </a>
      <div className="bg-surface-50 text-surface-800 dark:bg-surface-950 dark:text-surface-100 transition-colors duration-500 min-h-screen overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </ThemeProvider>
  );
}
