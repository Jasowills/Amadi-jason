import type { ReactNode } from "react";

// A tiny markdown renderer for the notes. Supports paragraphs, level-two
// headings, unordered lists, bold, italic, inline code and links. HTML
// comments are stripped so authors can leave TODO markers in the source.
// Raw HTML in notes is not rendered.

const stripComments = (source: string) =>
  source.replace(/<!--[\s\S]*?-->/g, "");

const INLINE_PATTERN =
  /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

const renderInline = (text: string, keyPrefix: string): ReactNode[] => {
  const parts = text.split(INLINE_PATTERN).filter(Boolean);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const external = /^https?:\/\//.test(href);
      return (
        <a
          key={key}
          className="u-link"
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {label}
        </a>
      );
    }
    return <span key={key}>{part}</span>;
  });
};

export const renderMarkdown = (source: string): ReactNode[] => {
  const clean = stripComments(source);
  const blocks = clean
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block, i) => {
    const key = `block-${i}`;

    if (block.startsWith("## ")) {
      return <h2 key={key}>{renderInline(block.slice(3), key)}</h2>;
    }

    const listMatch = block.match(/^(- .+(\n|$))+$/);
    if (listMatch) {
      const items = block
        .split("\n")
        .map((l) => l.replace(/^- /, "").trim())
        .filter(Boolean);
      return (
        <ul key={key}>
          {items.map((item, j) => (
            <li key={j}>{renderInline(item, `${key}-${j}`)}</li>
          ))}
        </ul>
      );
    }

    return <p key={key}>{renderInline(block.replace(/\n/g, " "), key)}</p>;
  });
};
