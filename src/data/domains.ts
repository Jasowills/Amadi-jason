export type DomainId = "dist" | "ing" | "eng" | "plat" | "ops";

export interface Domain {
  id: DomainId;
  label: string;
  line: string;
}

export const domains: readonly Domain[] = [
  {
    id: "dist",
    label: "Distributed systems",
    line: "Systems where four sources disagree and one of them has to be right.",
  },
  {
    id: "ing",
    label: "Data ingestion",
    line: "Webhooks, MQTT and vendor APIs turned into one durable, replayable stream.",
  },
  {
    id: "eng",
    label: "Data engineering",
    line: "Typed change feeds, pipelines you can trace, and data you can prove.",
  },
  {
    id: "plat",
    label: "Platform",
    line: "Internal tools and open-source infrastructure other engineers build on.",
  },
  {
    id: "ops",
    label: "DevOps",
    line: "Azure, Terraform, Ansible and CI/CD that makes every deploy a commit.",
  },
] as const;
