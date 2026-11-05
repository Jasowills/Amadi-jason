import { useState } from "react";
import SectionLabel from "./SectionLabel";
import ChessBoard from "./ChessBoard";
import { type Orientation } from "../lib/fen";

const POSITIONS = {
  white: {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 2 2",
    orientation: "white" as Orientation,
    toggle: "As White",
    label:
      "Chess diagram, Accelerated London System after 1. d4 d5 2. Bishop f4. Black to move. White pieces at the bottom.",
  },
  black: {
    fen: "rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    orientation: "black" as Orientation,
    toggle: "As Black",
    label:
      "Chess diagram, Caro-Kann Defense after 1. e4 c6. White to move. Black pieces at the bottom.",
  },
} as const;

type Side = keyof typeof POSITIONS;

// Off the clock. The other board. The chess.com profile link lives in
// the Elsewhere section, not here.
export default function ChessSection() {
  const [side, setSide] = useState<Side>("white");
  const position = POSITIONS[side];

  return (
    <section className="section" aria-labelledby="offclock">
      <SectionLabel
        id="offclock"
        title="Off the clock"
        note="the other board"
      />

      <div className="chess-wrap">
        <div className="chess-rows">
          <div className="chess-row">
            <p className="chess-side">White</p>
            <p className="chess-opening">Accelerated London System</p>
            <p className="chess-note">calm, quick, mine</p>
          </div>
          <div className="chess-row">
            <p className="chess-side">Black</p>
            <p className="chess-opening">Caro-Kann Defense</p>
            <p className="chess-note">solid first, sharp later</p>
          </div>
        </div>

        <div className="board-shell">
          <ChessBoard
            fen={position.fen}
            orientation={position.orientation}
            label={position.label}
          />
          <div className="board-toggle" role="group" aria-label="Choose diagram perspective">
            {(Object.keys(POSITIONS) as Side[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={side === key}
                onClick={() => setSide(key)}
              >
                {POSITIONS[key].toggle}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
