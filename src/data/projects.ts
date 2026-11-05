export type ProjectId =
  | "prism"
  | "tide"
  | "trace"
  | "pulse"
  | "sonar"
  | "jenamee";
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
  accentDark?: string;
  repoUrl: string | null;
  liveUrl: string | null;
  // Optional muted tags line under the one-liner. Only the JENAMEE row
  // ships one so far; other rows render without it.
  tags?: string[];
}

// Newest first. Sonar is the most recent private build; JENAMEE is the
// newest production system. Source of truth for the JENAMEE spelling:
// the live site title and og:site_name both read JENAMÉE, as does the
// project repo's own llms.txt. The repo folder/branch name "Jename" is
// the pre-rebrand code name.
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
    accent: "#4F46E5",
    accentDark: "#8B8FF9",
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
    // The logo tile color. Accent fields are metadata only today; no
    // component consumes them. The dark variant lifts the same cyan hue
    // because #0891B2 sits at 5.2 to 1 on the dark surface and #22D3EE
    // keeps that comfortable if any text ever uses it.
    accent: "#0891B2",
    accentDark: "#22D3EE",
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
    accent: "#B65E14",
    accentDark: "#F97316",
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
    accent: "#F43F5E",
    accentDark: "#FDA4AF",
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
    accentDark: "#9CA3AF",
    repoUrl: "https://github.com/jasowills/watchDog",
    liveUrl: "https://sonar-dev.vercel.app",
  },
  {
    id: "jenamee",
    name: "JENAMÉE",
    oneLiner:
      "Live e-commerce for an art and jewelry brand, from custom storefront to CMS.",
    description:
      "A modern e-commerce platform for an art and jewelry brand, live in production. A custom storefront with product management, artist profiles, and contact flows, built on Payload CMS.",
    stack: ["Next.js", "TypeScript", "React", "Payload CMS", "Google Cloud"],
    tags: ["Full-stack", "Cloud"],
    mark: "!",
    logo: "/logos/jenamee.png",
    accent: "#E91F5F",
    accentDark: "#F06995",
    repoUrl: null,
    liveUrl: "https://jenamee.com",
  },
];
