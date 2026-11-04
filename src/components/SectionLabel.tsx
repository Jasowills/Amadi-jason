import type { ReactNode } from "react";

interface SectionLabelProps {
  id: string;
  title: string;
  note?: string;
  aside?: ReactNode;
}

// Small muted section label with a hairline underneath. Handwritten note
// or controls sit on the right end of the row.
export default function SectionLabel({
  id,
  title,
  note,
  aside,
}: SectionLabelProps) {
  return (
    <div className="section-label-row">
      <h2 className="section-label" id={id}>
        {title}
      </h2>
      {(note || aside) && (
        <div className="section-aside">
          {note && <p className="section-note">{note}</p>}
          {aside}
        </div>
      )}
    </div>
  );
}
