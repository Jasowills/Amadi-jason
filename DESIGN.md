---
name: Jason Amadi Portfolio
description: A quiet, writing-first single column. Ink on paper in light mode, the same page under a lamp in dark mode.

colors:
  paper: "#FFFFFF"
  paper-dark: "#0F0F10"
  surface: "#F7F7F5"
  surface-dark: "#17171A"
  surface-2: "#EFEFEC"
  surface-2-dark: "#1F1F23"
  ink: "#1A1A1A"
  ink-dark: "#EDEDED"
  ink-2: "#5C5C5C"
  ink-2-dark: "#A3A3A8"
  ink-3: "#676767"
  ink-3-dark: "#8D8D94"
  hairline: "#E8E8E8"
  hairline-dark: "#26262A"
  hairline-2: "#D6D6D6"
  hairline-2-dark: "#34343A"
  pen: "#2B4A8B"
  pen-dark: "#93AAE8"

typography:
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.75
  handwriting:
    fontFamily: "Caveat, Segoe Script, cursive"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.3
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "14.5px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.01em"

rounded:
  tile: "8px"
  logo: "8px"

spacing:
  section-gap: "40px"
  section-gap-lg: "64px"

components:
  section-label:
    textColor: "{colors.ink-3}"
    typography: "{typography.title}"
    fontSize: "12.5px"
  icon-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    width: "40px"
    height: "40px"
    rounded: "{rounded.tile}"
    padding: "0"
  project-row:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "16px 8px"
---

# Design System: Jason Amadi Portfolio

## Overview

**Creative North Star: "The Engineer's Notebook"**

This is a page from the notebook of an engineer who also plays chess: a single column of ink on white paper, and the same page under a lamp in dark mode. The only expressive devices are three small ones, used sparingly: handwritten margin notes in blue pen ink with a hand-drawn bracket or arrow, chess annotation marks beside projects, and link underlines that draw in like a pen stroke on hover. Everything else is plain: hairline dividers, small muted section labels, text rows instead of cards.

Density stays low and the measure is narrow on purpose. There is no hero, no stats, no card grid, no filter bar. Range is shown as a board you read like a chess score, not as a tag cloud.

**Key Characteristics:**
- One centered column, 720px maximum, on white paper or lamp-lit near-black
- Flat surfaces only; hairlines carry structure
- Handwriting only for margin notes and annotation marks, never for information
- Sentence case everywhere, including section labels
- Nothing here is decorative chrome; every row is a reader's choice

## Colors

A paper and ink palette with one accent, blue pen. Roles are Light and Dark twins; every token exists as a light and a dark value and components reference tokens, never raw hex.

### Primary
- **Pen Ink** (#2B4A8B / #93AAE8): The single accent. Margin notes, annotation marks, the focus ring, and the brand name's handwritten city. Rare by design.

### Neutral
- **Paper** (#FFFFFF / #0F0F10): The page field, light and dark.
- **Surface** (#F7F7F5 / #17171A): Tiles, board squares, subtle fills.
- **Surface 2** (#EFEFEC / #1F1F23): Alternate board squares, hover fills.
- **Ink** (#1A1A1A / #EDEDED): Primary text.
- **Ink 2** (#5C5C5C / #A3A3A8): Secondary text, one-liners, summaries.
- **Ink 3** (#676767 / #8D8D94): Muted labels and metadata. Tuned so every text role passes WCAG AA on every background in both themes.
- **Hairline** (#E8E8E8 / #26262A): Dividers.
- **Hairline 2** (#D6D6D6 / #34343A): Stronger borders, the dormant link underline.

### Named Rules (optional, powerful)
**The One Accent Rule.** Pen ink is the only saturated color on the page. Achieving emphasis any other way (cards, shadows, gradients, badges) is a defect, not a style choice.
**The Flat Surface Rule.** No gradients, drop shadows, glassmorphism, or blur anywhere. Depth is conveyed by hairlines and surface tones, never by light.
**The Handwriting Only Rule.** Caveat never carries body text, essential information, or more than one or two notes per screenful. It is annotation, not information.

## Typography

**Display Font:** not used. This surface has no display face; hierarchy is weight and size within Inter.
**Body Font:** Inter (with -apple-system, BlinkMacSystemFont, Segoe UI fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SF Mono fallback)

**Character:** Inter at 400 and 500 only, Inter Tight never. Caveat 400 is the pen. JetBrains Mono is for coordinates and ADR ids only, never for decorative "technical" dressing.

### Hierarchy
- **Title** (500, 14.5px, 1.4, -0.01em): Project and role names. The heaviest text on the page.
- **Body** (400, 15px, 1.75): Prose. Max measure 58 to 62ch.
- **Label** (400, 11 to 12.5px, 1.4): Section labels in Ink 3, board coordinates, ADR ids. Never uppercase except the chess side labels (10.5px, 0.12em tracking).
- **Handwriting** (400, 18 to 22px): Margin notes. Annotation marks at 26px.

### Named Rules (optional)
**The Sentence Case Rule.** Nothing is set in title case or all caps. Section labels are small, muted, and sentence case.

## Layout

Single centered column, max-width 720px, side padding 24px (20px under 480px). One h1, logical heading order, skip-to-content link.

Margin notes anchor to their target. At 1260px and wider they hang in a right gutter beside the target with a hand-drawn bracket; below that they drop under the target with a small left-pointing arrow. The gutter breakpoint exists so the note never causes horizontal overflow at any width.

Sections are separated by a hairline under the small section label and 40px of vertical rhythm on a 4px scale (64px above the first section). There are no boxes; rows are separated by hairlines.

The coverage board is a real table. On mobile under 641px it collapses to stacked domain blocks with their logos, no horizontal scrolling.

## Elevation & Depth

No shadows, no gradients, no blur. Depth is read from surface tones and hairlines: Surface and Surface 2 alternate on the board; a hairline sits between every row; the page field is Paper.

### Shadow Vocabulary
None. This is deliberate and is the system's signature.

### Named Rules (optional)
**The No Light Rule.** Any box-shadow, gradient, or backdrop-filter reaching this surface is a category reflex, not a design decision. Reject it.

## Shapes

Corner and border language: 8px radius on tiles, controls, and logo marks (logos keep the radius built into their own tile). Hairlines are 1px. The chessboard is a thin Ink border with a 2px radius.

## Components

### Buttons
- **Shape:** 8px radius, 1px hairline border, Paper background.
- **Primary:** the theme toggle and the "As White / As Black" board toggle. 40px minimum height and width on mobile; the toggle is an outline icon button with an accessible label that reads "Switch to dark theme" or "Switch to light theme".
- **Hover / Focus:** border darkens to Hairline 2, text to Ink, background to Surface. Every interactive element carries a 2px Focus outline with 3px offset in Pen Ink.

### Chips
Not used. Stacks render as muted comma-separated text; domains render as a sentence. There is no pill, badge, or filter chip anywhere on the page.

### Cards / Containers
Not used. Text rows separated by hairlines. The project rows expand in place with a native details element; the expanded block is 72px logo, fuller description, and the stack as plain text.

### Inputs / Fields
None. The only forms are the details disclosures and the two toggle controls.

### Navigation
A header with the monogram tile, the name, a handwritten city in Pen Ink rotated about 3 degrees, and the theme toggle at top right. A footer with the current year on the left and "Lagos, Nigeria" on the right. A "Skip to content" link that appears on focus.

### Coverage Board
A table with a screen-reader caption. Rows are the five domains, columns are the six bodies of work. A filled 10px dot in the project's accent color marks a touch. Hover or focus on a row or logo dims everything else and raises the connected logos; Enter pins; Escape clears; a small "clear" control appears beside the label when something is pinned. The action is decorative only; the underlying content is a real table with scope-marked headers and visually hidden per-cell text.

### Chessboard
A static 160px SVG board, 8 by 8, alternating Surface and Surface 2, rendered from a FEN string by a tiny hand-written parser. Piece glyphs come from a chess font stack and are filled or outlined by side. Ranks and files are tiny Mono labels in Ink 3. Two positions toggle with "As White" and "As Black" buttons using aria-pressed; the board carries an aria-label describing the position.

### Margin Note and Annotation Mark
MarginNote renders Caveat in Pen Ink, rotated between -4 and 4 degrees, with an optional hand-drawn bracket on the left or an arrow. The bracket and arrow draw themselves in once with stroke-dasharray when scrolled into view (600ms ease-out, once only, reduced-motion safe). AnnotationMark is the big !, !?, and !! marks at 26px in Pen Ink, aria-hidden, decorative.

### Underlined Link
Links carry a 1px Hairline 2 underline that darkens to Ink and wipes in left to right on hover and focus, 150ms.

## Do's and Don'ts

### Do:
- **Do** reference tokens (`--bg`, `--surface`, `--ink`, `--pen`), never raw hex, in components.
- **Do** keep the measure narrow and the whitespace generous.
- **Do** keep handwriting to margin notes and annotation marks only.
- **Do** verify contrast for every text token on every background in both themes.
- **Do** keep interactive targets at 40px or larger on mobile.
- **Do** honor prefers-reduced-motion and prefers-color-scheme.
- **Do** check for horizontal overflow at 375, 768, 1100, and 1440px.

### Don't:
- **Don't** add cards, stat counters, skill tag lists, tabs, or filter bars.
- **Don't** use gradients, shadows, glassmorphism, or blur.
- **Don't** set eyebrow kickers or numbered section headers; the label carries its own weight.
- **Don't** use em-dashes, en-dashes, or emojis anywhere in copy, comments, commits, or metadata.
- **Don't** invent facts or metrics; unknown values are TODOs in the data file and the page renders gracefully without them.
- **Don't** copy the layout of another portfolio; the structural devices (the board, the annotations, the ADR notes) are deliberately unlike the reference that inspired the mood.
- **Don't** remove the legacy-domain redirect from index.html without a plan for the old address.
