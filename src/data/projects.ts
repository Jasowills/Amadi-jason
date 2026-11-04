import type { BoardColumnId } from "./domains";

export type ProjectId = "prism" | "tide" | "trace" | "pulse" | "sonar";
export type Annotation = "!" | "!?" | "!!";

export interface Project {
  id: ProjectId;
  name: string;
  oneLiner: string;
  description: string;
  stack: string[];
  mark: Annotation;
  logo: string;
  accent: string;
  repoUrl: string | null;
  liveUrl: string | null;
}

export const projects: readonly Project[] = [
  {
    id: "prism",
    name: "PRISM",
    oneLiner:
      "Payment reconciliation that turns four disagreeing signals into explainable findings.",
    description:
      "Independent payment reconciliation for Flutterwave and Paystack. Durable webhook evidence, independent API verification, and deterministic rules that turn four disagreeing signals (webhook, provider API, merchant ledger, intent) into typed, explainable findings. Verified end to end in live test mode.",
    stack: [
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Docker",
      "Flutterwave",
      "Paystack",
    ],
    mark: "!",
    logo: "/logos/prism.svg",
    accent: "#7C5CFC",
    repoUrl: "https://github.com/jasowills/prism",
    liveUrl: null,
  },
  {
    id: "tide",
    name: "TIDE",
    oneLiner:
      "Telematics infrastructure, from raw vehicle signals to state, events and actions.",
    description:
      "Open-source telematics infrastructure that turns raw vehicle signals into state, events, and actions. Normalizes heterogeneous feeds (MQTT, HTTP, Traccar, flespi, OEM APIs) through one pipeline: validate, dedup, durable log, state engine, versioned rules, NATS JetStream, webhooks. Deterministic replay, a fleet simulator, and chaos-tested reliability.",
    stack: [
      "Go",
      "NATS JetStream",
      "PostgreSQL with PostGIS",
      "Redis",
      "MQTT",
      "Docker",
      "OpenTelemetry",
    ],
    mark: "!?",
    logo: "/logos/tide.svg",
    accent: "#1F8A7E",
    repoUrl: "https://github.com/jasowills/TIDE",
    liveUrl: null,
  },
  {
    id: "trace",
    name: "TRACE",
    oneLiner:
      "Follow one synthetic event through an ingestion pipeline and prove where it went wrong.",
    description:
      "An MCP server that traces synthetic events through a toy ingestion pipeline to check telemetry correctness, so you can see exactly where an event was dropped, duplicated, or reordered.",
    stack: [
      "TypeScript",
      "Node.js",
      "MCP SDK",
      "Redis Streams",
      "PostgreSQL",
      "Docker",
    ],
    mark: "!",
    logo: "/logos/trace.svg",
    accent: "#C77417",
    repoUrl: "https://github.com/jasowills/TRACE",
    liveUrl: null,
  },
  {
    id: "pulse",
    name: "Pulse",
    oneLiner:
      "Typed, live change feeds from your database to your clients, on .NET.",
    description:
      "A real-time data synchronization library for .NET. Subscribes to typed, filtered change feeds from MongoDB, PostgreSQL, and SQL Server and streams live updates to clients over SignalR, with initial snapshots, automatic reconnect and resync, and persistent resume tokens.",
    stack: [
      "C#",
      ".NET",
      "SignalR",
      "MongoDB",
      "PostgreSQL",
      "SQL Server",
    ],
    mark: "!!",
    logo: "/logos/pulse.svg",
    accent: "#D95F85",
    repoUrl: "https://github.com/jasowills/pulse",
    liveUrl: null,
  },
  {
    id: "sonar",
    name: "Sonar",
    oneLiner:
      "Observability with AI root cause analysis and a public status page.",
    description:
      "A full-stack observability platform with real-time service monitoring, uptime tracking, incident management, deployment tracking, error ingestion with AI root cause analysis, a browser SDK, and a public status page.",
    stack: [
      "React",
      "TypeScript",
      "NestJS",
      "GraphQL",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    mark: "!",
    logo: "/logos/sonar.svg",
    accent: "#6B6B70",
    repoUrl: "https://github.com/jasowills/watchDog",
    liveUrl: "https://sonar-dev.vercel.app",
  },
] as const;

export interface BoardColumn {
  id: BoardColumnId;
  name: string;
  logo: string;
  logoDark?: string;
  accent: string;
}

// The coverage board columns. Derived from the same source as the project
// list so the two sections cannot drift apart, plus the Marklite monogram
// for the day job.
export const boardColumns: readonly BoardColumn[] = [
  ...projects.map((p) => ({
    id: p.id as BoardColumnId,
    name: p.name,
    logo: p.logo,
    accent: p.accent,
  })),
  {
    id: "marklite",
    name: "Marklite",
    logo: "/logos/marklite-monogram.svg",
    logoDark: "/logos/marklite-monogram-dark.svg",
    accent: "#7A756A",
  },
] as const;
