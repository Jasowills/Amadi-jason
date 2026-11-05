export const site = {
  name: "Jason Amadi",
  role: "Software Engineer",
  location: "Lagos, Nigeria",
  email: "jasowills01@gmail.com",
  url: "https://amadi-jason.vercel.app/",
  githubUrl: "https://github.com/jasowills",
  // Confirmed with Jason during the review pass. The chess handle is
  // jasowillls; marklite.com answers 200 with no redirect. The intro
  // picks markliteUrl up automatically and Elsewhere renders the
  // LinkedIn and chess.com links.
  linkedinUrl: "https://www.linkedin.com/in/jason-amadi/",
  chessProfileUrl: "https://www.chess.com/member/jasowillls",
  markliteUrl: "https://marklite.com",
} as const;

export type Site = typeof site;

// Every public contact link is live: email, GitHub, LinkedIn, the
// chess.com profile and marklite.com in the intro. The canonical
// deployment is https://amadi-jason.vercel.app; the legacy host
// amadijason.com redirects there, and so does a browser's first visit on
// any other host (see index.html and src/lib/legacyRedirect.ts; that
// scope was reviewed and kept as is).
