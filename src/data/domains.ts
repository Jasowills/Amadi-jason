export type DomainId = "dist" | "ing" | "eng" | "plat" | "ops";

export interface Domain {
  id: DomainId;
  label: string;
  line: string;
  touches: readonly BoardColumnId[];
}

export type BoardColumnId =
  | "prism"
  | "tide"
  | "trace"
  | "pulse"
  | "sonar"
  | "marklite";

export const domains: readonly Domain[] = [
  {
    id: "dist",
    label: "Distributed systems",
    line: "Systems where four sources disagree and one of them has to be right.",
    touches: ["prism", "tide", "trace"],
  },
  {
    id: "ing",
    label: "Data ingestion",
    line: "Webhooks, MQTT and vendor APIs turned into one durable, replayable stream.",
    touches: ["prism", "tide"],
  },
  {
    id: "eng",
    label: "Data engineering",
    line: "Typed change feeds, pipelines you can trace, and data you can prove.",
    touches: ["trace", "pulse"],
  },
  {
    id: "plat",
    label: "Platform",
    line: "Internal tools and open-source infrastructure other engineers build on.",
    touches: ["tide", "pulse", "sonar", "marklite"],
  },
  {
    id: "ops",
    label: "DevOps",
    line: "Azure, Terraform, Ansible and CI/CD that makes every deploy a commit.",
    touches: ["sonar", "marklite"],
  },
] as const;

export const domainLabelsFor = (columnId: BoardColumnId): string[] =>
  domains.filter((d) => d.touches.includes(columnId)).map((d) => d.label);
