import { site } from "../data/site";
import SectionLabel from "./SectionLabel";
import Arrow from "./Arrow";

export default function Elsewhere() {
  return (
    <section className="section" aria-labelledby="elsewhere">
      <SectionLabel id="elsewhere" title="Elsewhere" />
      <div className="elsewhere">
        <p>
          Fastest is{" "}
        <a className="u-link" href={`mailto:${site.email}`}>
          email
        </a>
        . I read everything and reply within a day, sometimes from a
        chess.com tab. Also on{" "}
        <a
          className="u-link"
          href={site.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        and{" "}
        {site.linkedinUrl ? (
          <a
            className="u-link"
            href={site.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        ) : (
          "LinkedIn"
        )}
        .
        </p>
      </div>
      <p className="elsewhere-note">
        <Arrow direction="left" size={16} className="note-arrow" />
        a fleet problem, a weird API, or a Caro-Kann line, write
      </p>
    </section>
  );
}
