import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeProvider } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Expertise from "./components/Expertise";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contacts";
import EngineeringLab from "./pages/EngineeringLab";

gsap.registerPlugin(ScrollTrigger);

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
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(timeout);
  }, [route]);

  if (route === "lab") {
    return (
      <ThemeProvider>
        <EngineeringLab />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-surface-950 focus:rounded-sm focus:text-sm focus:font-body"
      >
        Skip to content
      </a>
      <div className="bg-surface-50 text-surface-800 dark:bg-surface-950 dark:text-surface-100 min-h-screen overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </div>
    </ThemeProvider>
  );
}
