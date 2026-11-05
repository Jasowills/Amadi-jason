// Scans touched files for em dashes (U+2014) and en dashes (U+2013).
// Exits 1 if any are found.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const targets = ["src", "scripts", "index.html", "public/logos", "src/content"];
const hits = [];

const walk = (dir) => {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!entry.startsWith("node_modules")) walk(full);
    } else if (/\.(tsx?|mjs|md|css|html|svg|json)$/.test(entry)) {
      const text = readFileSync(full, "utf8");
      const chars = [...text];
      chars.forEach((c, i) => {
        if (c === "\u2014" || c === "\u2013") {
          hits.push(`${full} @ ${i}`);
        }
      });
    }
  }
};

for (const t of targets) walk(t);

if (hits.length) {
  console.error(`Found ${hits.length} em/en dash(es):`);
  for (const h of hits) console.error(`  ${h}`);
  process.exit(1);
}
console.log("no em dashes or en dashes found");
