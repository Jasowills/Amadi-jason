import { domains, type BoardColumnId, type DomainId } from "../data/domains";
import type { Project, ProjectId } from "../data/projects";

export type Pin =
  | { kind: "domain"; id: DomainId }
  | { kind: "project"; id: ProjectId }
  | null;

const touchesColumn = (domainId: DomainId, col: BoardColumnId): boolean => {
  const domain = domains.find((d) => d.id === domainId);
  return !!domain && (domain.touches as readonly BoardColumnId[]).includes(col);
};

export const projectMatchesPin = (project: Project, pin: Pin): boolean => {
  if (!pin) return true;
  if (pin.kind === "project") return project.id === pin.id;
  return touchesColumn(pin.id, project.id as BoardColumnId);
};

export const domainMatchesPin = (domainId: DomainId, pin: Pin): boolean => {
  if (!pin) return true;
  if (pin.kind === "domain") return domainId === pin.id;
  return touchesColumn(domainId, pin.id as BoardColumnId);
};

export const columnMatchesPin = (
  col: BoardColumnId,
  pin: Pin,
): boolean => {
  if (!pin) return true;
  if (pin.kind === "project") return pin.id === col;
  return touchesColumn(pin.id, col);
};
