# Public surface TODO

The page links below are the live destinations. This file is just a map
so the reader does not have to open the source to find them.

- [Site home](https://amadi-jason.vercel.app/) - the rebuild
- [ADR-001: Why Postgres, not Mongo, for the core](https://amadi-jason.vercel.app/notes/adr-001)
- [ADR-002: Monolith first, microservices when earned](https://amadi-jason.vercel.app/notes/adr-002)
- [ADR-004: Kubernetes on AKS, because SSH and hope doesn't scale](https://amadi-jason.vercel.app/notes/adr-004)
- [GitHub](https://github.com/jasowills)
- [LinkedIn](https://www.linkedin.com/in/jason-amadi/)
- [Chess](https://www.chess.com/member/jasowills)
- [Sonar live demo](https://sonar-dev.vercel.app)

## Open item

- Marklite company URL is unknown. It lives at `markliteUrl` in
  `src/data/site.ts` as a null with a TODO comment. Set it and the
  intro link picks it up automatically. The rest of the links are live.

## Coverage board

The board is a real table with a screen-reader caption. Hover or focus
on a domain row or a project logo to highlight what touches what.
Press Enter to pin, Escape to clear. On mobile it collapses to one
block per domain.

## Reproducing the review evidence

Two scripts generate everything the rebuild was checked against:

- `scripts/render-logos.mjs` (`npm run logos`) renders each logo with
  sharp at 16, 40, 128 and 512px on white, paper and near-black,
  into `LOGO_REVIEW_DIR`.
- `scripts/shoot.mjs` screenshots 375, 768, 1100 and 1440px in both
  themes, plus the chess positions and one note page, into
  `REVIEW_DIR`.
- `scripts/keyboard-walk.mjs` proves focus order, the board pin, the
  Escape clear, and the 40px touch targets.
- `scripts/legacy-redirect-check.mjs` asserts the legacy-domain
  redirect decision matrix.

The same scripts are served verbatim at `/render-logos.mjs` and
`/shoot.mjs` so they can be read alongside the page.
