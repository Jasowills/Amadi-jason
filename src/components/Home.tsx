import { site } from "../data/site";
import AcrossSection from "./AcrossSection";
import ProjectList from "./ProjectList";
import NotesSection from "./NotesSection";
import WorkSection from "./WorkSection";
import ChessSection from "./ChessSection";
import Elsewhere from "./Elsewhere";
import MarginNote from "./MarginNote";

// The single page. Section order is fixed by the brief.
export default function Home() {
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
          {/* Gutter rendering, wide viewports only: hangs right of the
              paragraph it annotates, same treatment as the domain rows. */}
          <span className="gutter-note gutter-note-right">
            <MarginNote gutter side="right" rotate={-2}>
              position before material
            </MarginNote>
          </span>
          {/* Inline rendering, under the paragraph on narrow viewports */}
          <span className="inline-note">
            <MarginNote rotate={-2}>position before material</MarginNote>
          </span>
        </div>
      </div>

      <AcrossSection />
      <ProjectList />
      <NotesSection />
      <WorkSection />
      <ChessSection />
      <Elsewhere />
    </>
  );
}
