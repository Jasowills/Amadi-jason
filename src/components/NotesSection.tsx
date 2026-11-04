import { notes } from "../lib/notes";
import SectionLabel from "./SectionLabel";

// How I think. The ADRs are the receipts; each row links to its note.
export default function NotesSection() {
  return (
    <section className="section" aria-labelledby="think">
      <SectionLabel
        id="think"
        title="How I think"
        note="I leave the receipts"
      />
      <p className="adr-intro">
        I write ADRs the way I annotate chess games. Not to show the best
        move, but to remember why I thought it was best at the time. Future me
        is my toughest reviewer, so I leave the receipts.
      </p>

      <div className="adr-list">
        {notes.map((note) => (
          <a
            key={note.slug}
            className="adr-row"
            href={`/notes/${note.slug}`}
          >
            <span>
              <span className="adr-title">{note.title}</span>
              <span className="adr-summary">{note.summary}</span>
            </span>
            <span className="adr-id">
              {note.id}
              <span className="adr-date">{note.date}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
