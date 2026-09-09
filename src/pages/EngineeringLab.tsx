import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LabNav from "../components/lab/LabNav";
import LabHero from "../components/lab/LabHero";
import SystemDesign from "../components/lab/SystemDesign";
import ADR from "../components/lab/ADR";
import DevOpsNotes from "../components/lab/DevOpsNotes";
import SREKnowledge from "../components/lab/SREKnowledge";
import EngineeringNotes from "../components/lab/EngineeringNotes";

gsap.registerPlugin(ScrollTrigger);

export default function EngineeringLab() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-surface-50 text-surface-800 dark:bg-surface-950 dark:text-surface-100 min-h-screen overflow-x-hidden">
      <LabNav />
      <LabHero />
      <SystemDesign />
      <ADR />
      <DevOpsNotes />
      <SREKnowledge />
      <EngineeringNotes />

      {/* Footer */}
      <footer className="py-12 section-padding border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-body text-xs tracking-wider opacity-25">
            &copy; {new Date().getFullYear()} Amadi Jason · Engineering Lab
          </p>
          <a
            href="/"
            className="font-body text-[11px] tracking-[0.15em] uppercase opacity-30 hover:opacity-80 hover:text-accent transition-all duration-300"
          >
            Back to Portfolio →
          </a>
        </div>
      </footer>
    </div>
  );
}
