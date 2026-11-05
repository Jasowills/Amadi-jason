import { domains } from "../data/domains";
import SectionLabel from "./SectionLabel";
import MarginNote from "./MarginNote";

const NOTES: Record<string, { side: "left" | "right"; text: string }> = {
  dist: { side: "right", text: "where things disagree" },
  ing: { side: "left", text: "messy in, clean out" },
  eng: { side: "right", text: "prove it" },
  plat: { side: "left", text: "built for other engineers" },
  ops: { side: "right", text: "every deploy a commit" },
};

function DomainRow({ domain }: { domain: (typeof domains)[number] }) {
  const note = NOTES[domain.id];
  return (
    <div className="domain-row">
      <div className="domain-copy">
        <h3 className="domain-label">{domain.label}</h3>
        <p className="domain-line">{domain.line}</p>
      </div>
      {/* Gutter rendering, wide viewports only */}
      <span className={`gutter-note gutter-note-${note.side}`}>
        <MarginNote gutter side={note.side}>
          {note.text}
        </MarginNote>
      </span>
      {/* Inline rendering, under the row on narrow viewports */}
      <span className="inline-note">
        <MarginNote side={note.side}>
          {note.text}
        </MarginNote>
      </span>
    </div>
  );
}

// What I work across. Plain static rows with quiet handwritten notes.
export default function AcrossSection() {
  return (
    <section className="section" aria-labelledby="across">
      <SectionLabel
        id="across"
        title="What I work across"
        note="the short version"
      />
      <div className="domains">
        {domains.map((domain) => (
          <DomainRow key={domain.id} domain={domain} />
        ))}
      </div>
    </section>
  );
}
