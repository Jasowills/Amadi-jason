import { useEffect, useState } from "react";
import { site } from "../data/site";
import CoverageBoard from "./CoverageBoard";
import ProjectList from "./ProjectList";
import NotesSection from "./NotesSection";
import WorkSection from "./WorkSection";
import ChessSection from "./ChessSection";
import Elsewhere from "./Elsewhere";
import MarginNote from "./MarginNote";
import type { Pin } from "../lib/pin";

// The single page. Section order is fixed by the brief; state for the
// coverage board's pin lives here so it can dim the project list too.
export default function Home() {
  const [pin, setPin] = useState<Pin>(null);

  useEffect(() => {
    if (!pin) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPin(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pin]);

  return (
    <>
      <div className="intro">
        <p>
          I build the plumbing other systems depend on: ingestion pipelines,
          platforms, and the infrastructure underneath. At{" "}
          {site.markliteUrl ? (
            <a
              className="u-link"
              href={site.markliteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Marklite
            </a>
          ) : (
            "Marklite"
          )}{" "}
          I own a fleet management system end to end, from React and
          TypeScript on the surface to Azure Functions and Node underneath.
        </p>
        <div className="note-anchor">
          <p>
            I learned on a chessboard that a good position makes the next ten
            moves easy. Position before material is how I design systems too.
            After hours I{" "}
            <a
              className="u-link"
              href="https://github.com/jasowills"
              target="_blank"
              rel="noopener noreferrer"
            >
              open-source quietly
            </a>
            .
          </p>
          <MarginNote bracket rotate={-2}>
            position before material
          </MarginNote>
        </div>
      </div>

      <CoverageBoard pin={pin} onPin={setPin} />
      <ProjectList pin={pin} />
      <NotesSection />
      <WorkSection />
      <ChessSection />
      <Elsewhere />
    </>
  );
}
