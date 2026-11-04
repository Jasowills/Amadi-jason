# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Primary: recruiters and hiring managers evaluating Jason for full-time roles in distributed systems, data infrastructure, platform, and DevOps. They need to leave convinced he can own complex production systems end to end.
- Secondary: potential freelance clients who would hire him to design and build systems.
- Secondary: engineers and open-source collaborators who discover his work and need to trust it is real and well crafted.

## Product Purpose

This is Amadi Jason's personal portfolio, deployed at amadi-jason.vercel.app (currently also served at amadijason.com per repo metadata; canonical URL is an open decision). Its job is to present his work as an engineer who designs and ships distributed systems, data ingestion pipelines, data engineering, platform, and DevOps, in a writing-first, personal form that reads as one specific person rather than a generic agency page. Success means the right visitors (hiring managers first, then clients and collaborators) read the page and reach out.

## Positioning

A quiet, writing-first engineering portfolio built around the idea that design decisions, reliability, and taste all come from the same habit: leaving the receipts. It shows range across the five domains he works in (distributed systems, data ingestion, data engineering, platform, DevOps) mapped against real bodies of work, with ADRs and chess annotations as proof of thinking, not decorative flourish.

## Operating Context

- Single-page site at `/` plus note pages at `/notes/<slug>`.
- Built with Vite, React 18, TypeScript, Tailwind CSS (being phased out in favor of plain CSS custom properties for this redesign), no backend. Vercel deployment via SPA rewrites.
- Content lives in data files under `src/data` and markdown content under `src/content/notes`.
- Legacy `/lab` section is being retired; genuine ADR content folds into `/notes/<slug>`, the SRE and system design catalog is dropped.
- Chess.com profile link and LinkedIn URL are referenced from site config; several are still TODO.

## Capabilities and Constraints

Confirmed:

- Single centered column, light and dark themes with no-flash toggle, handwritten margin-note system, FEN-driven chessboard, accessible coverage board table.
- No heavy dependencies: no animation libraries, no UI kits, no icon packs. Plain CSS with custom properties and small hand-written components.
- No gradients, drop shadows, glassmorphism, or blur. Flat surfaces, hairline borders.
- No em-dashes, en-dashes, or emojis anywhere in copy, comments, commits, or metadata.
- Copy and metrics come only from the rebuild brief; unknown facts are marked TODO and rendered gracefully.
- Logos must be hand-authored SVG (PRISM, TIDE, TRACE, Pulse). The Sonar logo is copied unmodified from the watchDog repository; the square LogoMark from the same repo is used for small square tile contexts.
- Must remain deployable to Vercel as it is today; framework, package manager, and deploy setup do not change.
- Accessibility target: WCAG AA, keyboard operable, Lighthouse 95+ in all four categories.
- Analytics: an existing first-party Sonar SDK beacon exists in the legacy code; the rebuild must not silently drop it without an explicit decision.

## Brand Commitments

- Voice: first person, quiet, specific, dry. No marketing language, no invented proof.
- Visual: ink on paper in light mode, same page under a lamp in dark mode. Handwriting (Caveat), body text (Inter 400 and 500), sparse mono metadata (JetBrains Mono).
- Sentence case everywhere. Section labels small, muted, with hairline underlines.
- Handwritten margin notes and chess annotation marks are the only expressive flourishes and are used sparingly.
- The site must feel written by one specific person, not generated.

## Evidence on Hand

Real content supplied by the owner in the rebuild brief: intro copy, five project one-liners and full descriptions (PRISM, TIDE, TRACE, Pulse, Sonar), five domains with lines, three ADR bodies (ADR-001 Postgres, ADR-002 monolith first, ADR-004 AKS), work history at Marklite, Freelance, and HNG Tech (as Frontend Developer), chess openings (Accelerated London as White, Caro-Kann as Black), and two FEN positions.

Open decisions, not to be invented: LinkedIn URL, chess.com profile URL, Marklite company URL, TRACE stack (read from the repo if available, otherwise TODO), project repo and live URLs, canonical URL, and OG image handling.

## Product Principles

1. Say less, prove more. Every claim is backed by a specific system, decision, or number the owner actually supplied.
2. One column, one voice. No cards, no stat counters, no skill tag lists; content reads like a page, not a template.
3. Show the thinking, not just the output. ADRs, annotations, and coverage board make reasoning visible.
4. Performance and accessibility are part of the craft, not an audit afterthought.
5. Unknowns stay visible as TODOs rather than being papered over with plausible invention.

## Accessibility & Inclusion

WCAG AA contrast in both themes; visible focus rings; skip-to-content link; keyboard operable toggle, expandable rows, coverage board, and chess toggle; touch targets at least 40px; honors prefers-reduced-motion and prefers-color-scheme; screen-reader text for the coverage board table and board positions.
