import { useState, type CSSProperties } from "react";
import { domains, type BoardColumnId } from "../data/domains";
import { boardColumns } from "../data/projects";
import SectionLabel from "./SectionLabel";
import {
  columnMatchesPin,
  domainMatchesPin,
  type Pin,
} from "../lib/pin";

interface CoverageBoardProps {
  pin: Pin;
  onPin: (pin: Pin) => void;
}

// The coverage board. Ranks are the five domains, files are the six
// bodies of work. Hovering, focusing or pinning a row or a logo lights
// up what touches what; everything stays decorative, the underlying
// content is a real table for assistive tech.
export default function CoverageBoard({ pin, onPin }: CoverageBoardProps) {
  const [active, setActive] = useState<Pin>(null);
  const engaged = active ?? pin;

  const pinFor = (kind: "domain" | "project", id: string): Pin =>
    ({ kind, id } as Pin);

  const toggle = (next: Pin) => {
    if (!next) return;
    if (pin && pin.kind === next.kind && pin.id === next.id) {
      onPin(null);
      return;
    }
    onPin(next);
  };

  const logoColumn = (colId: BoardColumnId) =>
    engaged ? !columnMatchesPin(colId, engaged) : false;

  const logoRaised = (colId: BoardColumnId) =>
    engaged ? columnMatchesPin(colId, engaged) : false;

  const markFor = (colId: BoardColumnId, touches: readonly BoardColumnId[]) =>
    touches.includes(colId);

  return (
    <section className="section" aria-labelledby="across">
      <SectionLabel
        id="across"
        title="What I work across"
        aside={
          <>
            <p className="section-note">read it like a board</p>
            {pin && (
              <button
                type="button"
                className="clear-pin"
                onClick={() => onPin(null)}
              >
                clear
              </button>
            )}
          </>
        }
      />

      {/* Desktop / tablet: the board as a real table */}
      <div className="board-scroll">
        <table className="board-table">
          <caption className="sr-only">
            Coverage board. Rows are five domains: distributed systems, data
            ingestion, data engineering, platform and DevOps. Columns are six
            bodies of work: PRISM, TIDE, TRACE, Pulse, Sonar and Marklite. A
            filled dot means that body of work touches that domain.
          </caption>
          <colgroup>
            <col className="col-rank" />
            <col className="col-domain" />
            {boardColumns.map((col) => (
              <col key={col.id} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="board-corner" aria-hidden="true" />
              <th className="board-corner" aria-hidden="true" />
              {boardColumns.map((col) => {
                const isPinned =
                  pin?.kind === "project" && pin.id === col.id;
                return (
                  <th key={col.id} scope="col" className="board-logo-cell">
                    <button
                      type="button"
                      className="board-logo-btn"
                      data-dim={logoColumn(col.id) || undefined}
                      data-raised={logoRaised(col.id) || undefined}
                      aria-pressed={isPinned}
                      aria-label={
                        isPinned
                          ? `Unpin ${col.name} from the board`
                          : `Pin ${col.name} on the board`
                      }
                      onClick={() => toggle(pinFor("project", col.id))}
                      onMouseEnter={() =>
                        setActive(pinFor("project", col.id))
                      }
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(pinFor("project", col.id))}
                      onBlur={() => setActive(null)}
                    >
                      {col.logoDark ? (
                        <>
                          <img
                            className="logo-for-light"
                            src={col.logo}
                            alt=""
                            width={28}
                            height={28}
                          />
                          <img
                            className="logo-for-dark"
                            src={col.logoDark}
                            alt=""
                            width={28}
                            height={28}
                          />
                        </>
                      ) : (
                        <img
                          src={col.logo}
                          alt=""
                          width={28}
                          height={28}
                        />
                      )}
                      <span className="sr-only">{col.name}</span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {domains.map((domain, rowIndex) => {
              const dim = engaged ? !domainMatchesPin(domain.id, engaged) : false;
              const isPinned = pin?.kind === "domain" && pin.id === domain.id;
              return (
                <tr
                  key={domain.id}
                  className={dim ? "board-row-dim" : undefined}
                >
                  <td className="board-rank" aria-hidden="true">
                    {rowIndex + 1}
                  </td>
                  <th scope="row">
                    <button
                      type="button"
                      className="domain-btn"
                      aria-pressed={isPinned}
                      aria-label={
                        isPinned
                          ? `Unpin ${domain.label}`
                          : `Pin ${domain.label}`
                      }
                      onClick={() => toggle(pinFor("domain", domain.id))}
                      onMouseEnter={() =>
                        setActive(pinFor("domain", domain.id))
                      }
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(pinFor("domain", domain.id))}
                      onBlur={() => setActive(null)}
                    >
                      <span className="domain-label">{domain.label}</span>
                      <span className="domain-line">{domain.line}</span>
                    </button>
                  </th>
                  {boardColumns.map((col, colIndex) => {
                    const filled = markFor(
                      col.id,
                      domain.touches as readonly BoardColumnId[],
                    );
                    const cellClass =
                      (rowIndex + colIndex) % 2 === 0 ? "cell-a" : "cell-b";
                    return (
                      <td key={col.id} className={`board-cell ${cellClass}`}>
                        {filled ? (
                          <>
                            <span
                              className="board-mark"
                              style={{ "--accent": col.accent } as CSSProperties}
                            />
                            <span className="sr-only">
                              {col.name} works in {domain.label}
                            </span>
                          </>
                        ) : (
                          <span className="sr-only">
                            {col.name} does not work in {domain.label}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot className="board-foot">
            <tr>
              <td aria-hidden="true" />
              <td aria-hidden="true" />
              {["a", "b", "c", "d", "e", "f"].map((file) => (
                <td key={file} aria-hidden="true">
                  {file}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile: stacked blocks, no horizontal scroll */}
      <div className="board-mobile">
        {domains.map((domain) => {
          const dim = engaged ? !domainMatchesPin(domain.id, engaged) : false;
          const isPinned = pin?.kind === "domain" && pin.id === domain.id;
          const touched = boardColumns.filter((col) =>
            (domain.touches as readonly BoardColumnId[]).includes(col.id),
          );
          return (
            <button
              key={domain.id}
              type="button"
              className="board-block"
              data-dim={dim || undefined}
              aria-pressed={isPinned}
              onClick={() => toggle(pinFor("domain", domain.id))}
            >
              <span className="domain-label">{domain.label}</span>
              <span className="domain-line">{domain.line}</span>
              <span className="board-block-logos">
                {touched.map((col) =>
                  col.logoDark ? (
                    <span key={col.id}>
                      <img
                        className="logo-for-light"
                        src={col.logo}
                        alt={col.name}
                        width={24}
                        height={24}
                      />
                      <img
                        className="logo-for-dark"
                        src={col.logoDark}
                        alt={col.name}
                        width={24}
                        height={24}
                      />
                    </span>
                  ) : (
                    <img
                      key={col.id}
                      src={col.logo}
                      alt={col.name}
                      width={24}
                      height={24}
                    />
                  ),
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
