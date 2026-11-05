// Scans the production build output (dist/) for hrefs that are "#",
// empty, contain "TODO", or point at an internal route that does not
// exist. Exits with an error if any are found.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
if (!existsSync(DIST)) {
  console.error("dist/ does not exist. Run npm run build first.");
  process.exit(1);
}

const htmlFiles = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else if (entry.endsWith(".html")) {
      htmlFiles.push(full);
    }
  }
};
walk(DIST);

const errors = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const hrefRe = /href=(?:"([^"]*)"|'([^']*)')/g;
  let m;
  while ((m = hrefRe.exec(html)) !== null) {
    const href = m[1] ?? m[2] ?? "";
    const trimmed = href.trim();
    if (trimmed === "#" || trimmed === "") {
      errors.push(`${file}: href="${href}" is empty or a bare hash`);
      continue;
    }
    if (/TODO/i.test(href)) {
      errors.push(`${file}: href="${href}" contains TODO`);
      continue;
    }
    if (href.startsWith("javascript:")) {
      errors.push(`${file}: href="${href}" uses javascript:`);
      continue;
    }
    if (href.startsWith("/") && !href.startsWith("//")) {
      // Internal route: the SPA serves index.html for every path, so
      // accept any path that either has a real file in dist/ or is a
      // known route (/, /notes/<slug>).
      const cleanPath = href.split("?")[0].split("#")[0];
      const diskPath = join(DIST, cleanPath);
      const knownRoute =
        cleanPath === "/" ||
        /^\/notes\/[a-z0-9-]+\/?$/.test(cleanPath) ||
        cleanPath === "/PUBLIC_SURFACE_TODO.md";
      if (!existsSync(diskPath) && !knownRoute) {
        errors.push(
          `${file}: internal href="${href}" has no dist file and is not a known route`,
        );
      }
      continue;
    }
    if (!/^https?:\/\//.test(trimmed) && !trimmed.startsWith("mailto:")) {
      errors.push(`${file}: href="${href}" is not absolute or mailto`);
    }
  }
}

if (errors.length) {
  console.error(`Found ${errors.length} bad link(s):`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`check-links: ${htmlFiles.length} html file(s) in dist/, no bad hrefs.`);
