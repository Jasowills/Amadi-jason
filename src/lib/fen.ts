export type SquareColor = "w" | "b";

export interface PiecePlacement {
  file: number; // 0 = a, 7 = h, in board orientation coordinates (see note)
  rank: number; // 0 = top row of the diagram, 7 = bottom row
  glyph: string;
  color: SquareColor;
}

const OUTLINE: Record<string, string> = {
  p: "♙",
  n: "♘",
  b: "♗",
  r: "♖",
  q: "♕",
  k: "♔",
};
const FILLED: Record<string, string> = {
  p: "♟",
  n: "♞",
  b: "♝",
  r: "♜",
  q: "♛",
  k: "♚",
};

export type Orientation = "white" | "black";

// Parses the placement field of a FEN string into diagram coordinates for
// the given orientation. White orientation shows rank 8 at the top with a on
// the left; black orientation flips both axes, as if the board were turned
// around to face Black.
export const parseFen = (fen: string, orientation: Orientation): PiecePlacement[] => {
  const placement = fen.trim().split(/\s+/)[0];
  const rows = placement.split("/");
  if (rows.length !== 8) {
    throw new Error("Invalid FEN: expected 8 ranks");
  }

  const flip = orientation === "black";
  const pieces: PiecePlacement[] = [];

  rows.forEach((row, fenRank) => {
    let file = 0;
    for (const ch of row) {
      if (/\d/.test(ch)) {
        file += Number(ch);
        continue;
      }
      const lower = ch.toLowerCase();
      const isWhite = ch === ch.toUpperCase();
      const glyph = (isWhite ? OUTLINE : FILLED)[lower];
      if (!glyph) {
        throw new Error(`Invalid FEN piece: ${ch}`);
      }
      const diagramRank = flip ? 7 - fenRank : fenRank;
      const diagramFile = flip ? 7 - file : file;
      pieces.push({
        file: diagramFile,
        rank: diagramRank,
        glyph,
        color: isWhite ? "w" : "b",
      });
      file += 1;
    }
    if (file !== 8) {
      throw new Error("Invalid FEN: rank does not add up to 8 files");
    }
  });

  return pieces;
};

export const fileLabels = (orientation: Orientation): string[] =>
  orientation === "white"
    ? ["a", "b", "c", "d", "e", "f", "g", "h"]
    : ["h", "g", "f", "e", "d", "c", "b", "a"];

export const rankLabels = (orientation: Orientation): string[] =>
  orientation === "white"
    ? ["8", "7", "6", "5", "4", "3", "2", "1"]
    : ["1", "2", "3", "4", "5", "6", "7", "8"];
