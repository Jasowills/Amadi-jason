export interface Note {
  slug: string;
  id: string;
  title: string;
  summary: string;
  date: string;
  body: string;
}

// Vite imports the markdown sources as raw strings at build time.
const sources = import.meta.glob("../content/notes/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const parseFrontmatter = (raw: string) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { fields: {} as Record<string, string>, body: raw };
  const fields: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) fields[key] = value;
  }
  return { fields, body: match[2].trim() };
};

const slugFromPath = (path: string) =>
  path.replace(/^.*\//, "").replace(/\.md$/, "");

export const notes: readonly Note[] = Object.entries(sources)
  .map(([path, raw]) => {
    const { fields, body } = parseFrontmatter(raw);
    return {
      slug: slugFromPath(path),
      id: fields.id ?? "ADR-???",
      title: fields.title ?? "Untitled note",
      summary: fields.summary ?? "",
      date: fields.date ?? "",
      body,
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

export const getNote = (slug: string) =>
  notes.find((n) => n.slug === slug) ?? null;
