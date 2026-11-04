import type { ReactNode } from "react";
import {
  fileLabels,
  parseFen,
  rankLabels,
  type Orientation,
} from "../lib/fen";

interface ChessBoardProps {
  fen: string;
  orientation: Orientation;
  label: string;
}

const SQUARE = 20;
const BOARD = SQUARE * 8;

// A small static SVG chessboard. Squares alternate --surface and
// --surface-2, the border is a thin --ink hairline, and the pieces are
// Unicode glyphs set in the chess font stack.
export default function ChessBoard({ fen, orientation, label }: ChessBoardProps) {
  let pieces: ReturnType<typeof parseFen> = [];
  try {
    pieces = parseFen(fen, orientation);
  } catch {
    pieces = [];
  }

  const squares: ReactNode[] = [];
  for (let rank = 0; rank < 8; rank += 1) {
    for (let file = 0; file < 8; file += 1) {
      const dark = (rank + file) % 2 === 1;
      squares.push(
        <rect
          key={`${rank}-${file}`}
          x={file * SQUARE}
          y={rank * SQUARE}
          width={SQUARE}
          height={SQUARE}
          fill={dark ? "var(--surface-2)" : "var(--surface)"}
        />,
      );
    }
  }

  return (
    <div className="board-grid">
      <div className="board-ranks" aria-hidden="true">
        {rankLabels(orientation).map((r) => (
          <span key={r}>{r}</span>
        ))}
      </div>
      <div role="img" aria-label={label}>
        <svg
          className="chess-board"
          width={BOARD}
          height={BOARD}
          viewBox={`0 0 ${BOARD} ${BOARD}`}
          aria-hidden="true"
        >
          {squares}
          {pieces.map((p, i) => (
            <text
              key={i}
              className="piece"
              x={p.file * SQUARE + SQUARE / 2}
              y={p.rank * SQUARE + SQUARE / 2 + 1}
              textAnchor="middle"
              dominantBaseline="central"
            >
              {p.glyph}
            </text>
          ))}
        </svg>
      </div>
      <div className="board-files" aria-hidden="true">
        {fileLabels(orientation).map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
    </div>
  );
}
