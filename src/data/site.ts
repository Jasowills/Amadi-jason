export const site = {
  name: "Jason Amadi",
  role: "Software Engineer",
  location: "Lagos, Nigeria",
  email: "jasowills01@gmail.com",
  url: "https://amadi-jason.vercel.app/",
  githubUrl: "https://github.com/jasowills",
  linkedinUrl: "https://www.linkedin.com/in/jason-amadi/",
  chessProfileUrl: "https://www.chess.com/member/jasowillls",
  // TODO: Marklite company URL is unknown. Set it and the intro link will pick it up.
  markliteUrl: null as string | null,
} as const;

export type Site = typeof site;

// Open items for the public surface, kept beside the values:
// - Marklite company URL is unknown. Set markliteUrl and the intro link
//   picks it up automatically. The rest of the links are live.
// - The canonical deployment is https://amadi-jason.vercel.app; the
//   legacy host amadijason.com redirects there (see index.html and
//   src/lib/legacyRedirect.ts).
