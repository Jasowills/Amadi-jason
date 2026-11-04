export interface Role {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  bullets: string[];
}

export const roles: readonly Role[] = [
  {
    id: "marklite",
    role: "Software and DevOps Engineer",
    company: "Marklite",
    location: "Lagos",
    period: "January 2025 to present",
    summary:
      "Fleet management platform on React, TypeScript, Azure Functions and Node, plus the infrastructure and pipelines that ship it.",
    bullets: [
      "Owned reliability and uptime for multiple interconnected production systems serving a B2B client, maintaining 99%+ availability through proactive monitoring, incident response, and root-cause-driven remediation.",
      "Built frontend and backend features for internal and client-facing B2B web applications using React, TypeScript, Azure Functions, and Node, and owned the infrastructure and deployment pipelines that shipped them.",
      "Architected FleetCTRL (RouteCTRL), a full-stack fleet management platform for real-time vehicle tracking, route optimization, and operational visibility across distributed fleets.",
      "Built and maintained monitoring and alerting across production services, reducing time to detection and speeding up on-call response.",
      "Owned Microsoft Azure infrastructure end to end: App Services, Blob Storage, and Azure SQL, including capacity planning, scaling policy design, and production configuration.",
      "Designed Infrastructure as Code workflows with Terraform and Ansible, automating environment provisioning and cutting manual setup time by about 60%.",
      "Streamlined CI/CD pipelines and right-sized compute with autoscaling policies, lowering cloud spend while holding performance under load.",
      "Helped define cloud architecture standards for security, reliability, and scalability.",
    ],
  },
  {
    id: "freelance",
    role: "Software Engineer",
    company: "Freelance",
    location: "Lagos",
    period: "January 2023 to December 2024",
    summary:
      "Full-stack applications for clients across e-commerce, hospitality, transport, and healthcare.",
    bullets: [
      "Designed, built, and deployed full-stack applications from scoping to cloud-hosted production releases.",
      "Built REST APIs and backend services with Node.js, NestJS, and TypeScript, and responsive frontends in React and Next.js.",
      "Managed DNS, SSL, environment configuration, and continuous delivery for every client deployment.",
      "Shipped a donation platform for a non-profit with Flutterwave, an e-commerce site for a jewelry brand on Next.js and Payload CMS, and a doctor management system with live appointment scheduling.",
    ],
  },
  {
    id: "hng",
    role: "Frontend Developer",
    company: "HNG Tech",
    location: "Lagos",
    period: "September 2022 to October 2022",
    summary:
      "Shipped frontend features in collaborative team projects under deadline.",
    bullets: [
      "Contributed frontend features to multiple collaborative projects in a fast-paced, industry-standard environment.",
      "Worked with senior engineers, gaining exposure to production-grade workflows and code review.",
    ],
  },
] as const;
