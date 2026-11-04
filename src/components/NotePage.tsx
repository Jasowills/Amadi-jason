import { getNote } from "../lib/notes";
import { renderMarkdown } from "../lib/markdown";
import Arrow from "./Arrow";

interface NotePageProps {
  slug: string;
}

// A note page. Same visual language as the home page: back link, the
// ADR id and date in mono, handwriting kept out of the body.
export default function NotePage({ slug }: NotePageProps) {
  const note = getNote(slug);

  if (!note) {
    return (
      <div className="notfound">
        <h2>No note at that address</h2>
        <p>The page you are looking for does not exist, or moved.</p>
        <a className="u-link arrow-link" href="/">
          <Arrow direction="left" size={13} />
          Back home
        </a>
      </div>
    );
  }

  return (
    <article className="note-page">
      <a className="back-link" href="/">
        <Arrow direction="left" size={13} />
        All notes
      </a>
      <p className="note-meta">
        <span>{note.id}</span>
        <span aria-hidden="true">/</span>
        <span>{note.date}</span>
      </p>
      <h2 className="note-title">{note.title}</h2>
      <div className="note-body">{renderMarkdown(note.body)}</div>
    </article>
  );
}
