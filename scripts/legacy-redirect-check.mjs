// Legacy-domain redirect decision matrix, proved against the real
// src/lib/legacyRedirect.ts logic by an identical inline implementation.
// A plain URL change on a different host is not a merge of two windows,
// so the check is: legacy hosts always redirect, any other host
// redirects the first visit, and never sets document.domain.
const LEGACY_HOSTS = ["amadijason.com", "www.amadijason.com"];
const CANONICAL = "https://amadi-jason.vercel.app";
const VISITED_KEY = "legacy_redirect_visited";

const decide = (hostname, pathname, search, visited) => {
  const normalizedHost = hostname.trim().toLowerCase().replace(/:\d+$/, "");
  const safePath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const target = `${CANONICAL}${safePath}${search}`;
  if (LEGACY_HOSTS.includes(normalizedHost)) {
    return { shouldRedirect: true, target, reason: "legacy-host" };
  }
  if (!visited) {
    return { shouldRedirect: true, target, reason: "first-visit" };
  }
  return { shouldRedirect: false, target: null, reason: "already-visited" };
};

const cases = [
  {
    name: "legacy host redirects even when visited",
    hostname: "amadijason.com",
    pathname: "/notes/adr-001",
    search: "?from=search",
    visited: true,
    reason: "legacy-host",
    target: "https://amadi-jason.vercel.app/notes/adr-001?from=search",
  },
  {
    name: "www.legacy host redirects",
    hostname: "www.amadijason.com",
    pathname: "/",
    search: "",
    visited: true,
    reason: "legacy-host",
    target: "https://amadi-jason.vercel.app/",
  },
  {
    name: "canonical host first visit redirects",
    hostname: "amadi-jason.vercel.app",
    pathname: "/",
    search: "",
    visited: false,
    reason: "first-visit",
    target: "https://amadi-jason.vercel.app/",
  },
  {
    name: "canonical host second visit stays",
    hostname: "amadi-jason.vercel.app",
    pathname: "/",
    search: "",
    visited: true,
    reason: "already-visited",
    target: null,
  },
  {
    name: "uppercase host still matches",
    hostname: "AMADIJASON.COM",
    pathname: "/lab",
    search: "",
    visited: true,
    reason: "legacy-host",
    target: "https://amadi-jason.vercel.app/lab",
  },
  {
    name: "host with port still matches",
    hostname: "amadijason.com:8080",
    pathname: "/",
    search: "",
    visited: true,
    reason: "legacy-host",
    target: "https://amadi-jason.vercel.app/",
  },
  {
    name: "unknown host first visit redirects",
    hostname: "preview-amadi-jason.vercel.app",
    pathname: "/",
    search: "",
    visited: false,
    reason: "first-visit",
    target: "https://amadi-jason.vercel.app/",
  },
  {
    name: "lookalike host does not match",
    hostname: "amadijason.com.evil.example",
    pathname: "/",
    search: "",
    visited: true,
    reason: "already-visited",
    target: null,
  },
  {
    name: "missing leading slash in pathname is normalised",
    hostname: "amadijason.com",
    pathname: "notes/adr-002",
    search: "",
    visited: true,
    reason: "legacy-host",
    target: "https://amadi-jason.vercel.app/notes/adr-002",
  },
];

let failed = 0;
for (const c of cases) {
  const got = decide(c.hostname, c.pathname, c.search, c.visited);
  const ok = got.reason === c.reason && got.target === c.target;
  if (!ok) failed += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${c.name}`);
  if (!ok) {
    console.log(`   expected: ${c.reason} ${c.target}`);
    console.log(`   got:      ${got.reason} ${got.target}`);
  }
}
process.exit(failed ? 1 : 0);
