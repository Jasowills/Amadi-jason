// Legacy domain redirect. The old site lived at amadijason.com and is now
// served from amadi-jason.vercel.app. Any request that arrives on the old
// host, or the first request from a browser that has not visited yet, is
// sent to the canonical host at the same path. The visited flag keeps
// returning visitors from being redirected again.
//
// document.domain is never set to or checked against the legacy site, so
// this runs in the same origin even on the old host. The canonical host
// is reached by a full document navigation, never by a window merge.
export const LEGACY_HOSTS = [
  "amadijason.com",
  "www.amadijason.com",
] as const;

const CANONICAL_ORIGIN = "https://amadi-jason.vercel.app";
const VISITED_KEY = "legacy_redirect_visited";

export interface RedirectDecision {
  shouldRedirect: boolean;
  target: string | null;
  reason: "legacy-host" | "first-visit" | "already-visited";
}

export const decideLegacyRedirect = (
  hostname: string,
  pathname: string,
  search: string,
  alreadyVisited: boolean,
): RedirectDecision => {
  const normalizedHost = hostname.trim().toLowerCase().replace(/:\d+$/, "");
  const safePath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const target = `${CANONICAL_ORIGIN}${safePath}${search}`;

  if ((LEGACY_HOSTS as readonly string[]).includes(normalizedHost)) {
    return { shouldRedirect: true, target, reason: "legacy-host" };
  }
  if (!alreadyVisited) {
    return { shouldRedirect: true, target, reason: "first-visit" };
  }
  return { shouldRedirect: false, target: null, reason: "already-visited" };
};

export const hasVisited = (): boolean => {
  try {
    return window.localStorage.getItem(VISITED_KEY) === "1";
  } catch {
    return false;
  }
};

export const markVisited = (): void => {
  try {
    window.localStorage.setItem(VISITED_KEY, "1");
  } catch {
    // Storage unavailable; the next visit simply redirects again.
  }
};

// Runs before first paint from the inline script in index.html, and here
// again as a safety net. Returns the decision so callers can react.
export const runLegacyRedirect = (): RedirectDecision => {
  if (typeof window === "undefined") {
    return { shouldRedirect: false, target: null, reason: "already-visited" };
  }
  const decision = decideLegacyRedirect(
    window.location.hostname,
    window.location.pathname,
    window.location.search,
    hasVisited(),
  );
  if (decision.shouldRedirect && decision.target) {
    markVisited();
    window.location.replace(decision.target);
  }
  return decision;
};
