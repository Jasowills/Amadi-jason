export const adrs = [
  {
    id: "ADR-001",
    title: "PostgreSQL over MongoDB for core application data",
    date: "2024-Q3",
    status: "accepted",
    problem:
      "We need a primary database for a multi-tenant SaaS platform with deeply nested relationships. Organizations contain projects, tasks, assigned users, and cascading permissions. Beyond that, we run complex reporting queries that aggregate data across tenants and join multiple entity types, and compliance demands strict data isolation between tenants. I have seen document databases work well for simpler apps, but this domain is relationship-heavy and reporting-heavy, which changes the calculus.",
    decision:
      "Use PostgreSQL as the sole primary database for all core application data. We will implement row-level security (RLS) policies at the database layer to enforce tenant isolation, and leverage PostGIS extensions for the geospatial query capabilities our field operations features require.",
    reason:
      "PostgreSQL gives us a mature relational model that natively supports complex joins, aggregations, and the transactional guarantees this domain demands. ACID compliance ensures billing and audit operations stay consistent under concurrent writes, which I consider non-negotiable for financial data. Row-level security pushes tenant isolation into the database itself, eliminating an entire class of multi-tenancy bugs that I have watched plague teams that try to handle it at the application layer. The extensible ecosystem, including PostGIS for geospatial queries, pg_trgm for fuzzy search, and pg_cron for scheduled jobs, saves us from spinning up auxiliary services that a document store would require.",
    tradeoffs: {
      pros: [
        "ACID transactions guarantee consistency across billing, audit logs, and entity state changes even under high concurrency, which is critical for a financial platform",
        "Row-level security enforces tenant isolation at the database layer, reducing the attack surface and eliminating reliance on application-level checks that are easy to get wrong",
        "Rich query capabilities including joins, CTEs, window functions, and full-text search handle complex reporting without external indexing services",
      ],
      cons: [
        "Schema migrations require careful planning and coordinated rollouts once the schema is established in production, and I have learned the hard way that rushed migrations cause outages",
        "Vertical scaling has practical limits, and read replicas plus connection pooling add operational complexity as throughput grows",
        "Rigid schema enforcement means structural changes carry more risk than with a flexible document store, so we need to invest in solid migration tooling upfront",
      ],
    },
  },
  {
    id: "ADR-002",
    title: "Modular Monolith before Microservices",
    date: "2024-Q3",
    status: "accepted",
    problem:
      "We are greenfielding a new platform and must decide on the fundamental architectural style. Microservices offer independent deployability and scalability but introduce significant distributed-system complexity, including network partitions, service discovery, distributed tracing, and data consistency challenges. A monolith avoids these costs but risks becoming an unstructured big ball of mud as the codebase grows and the team expands. I have worked on both ends of this spectrum and the tradeoff is real.",
    decision:
      "Start with a modular monolith structured around clearly defined domain boundaries. Each module encapsulates its own data access, business logic, and API surface, communicating with other modules through internal interfaces rather than network calls. The architecture should be explicitly designed so that modules can be extracted into separate services later if and when scaling or organizational needs warrant it.",
    reason:
      "At our current team size and scale, the operational overhead of running and debugging a distributed system far outweighs the theoretical benefits. A modular monolith gives us a simpler deployment model, faster local development cycle, and easier debugging path while we focus on product-market fit, which I believe is the right priority at this stage. Domain boundaries will evolve as the product matures, and starting monolithic lets those boundaries emerge organically from real usage patterns rather than being guessed upfront. The modular structure preserves the option to extract services later with minimal refactoring.",
    tradeoffs: {
      pros: [
        "Single deployment unit simplifies CI/CD pipelines, reduces infrastructure costs, and eliminates cross-service dependency management during early development when things change fast",
        "In-process module communication is orders of magnitude faster than network calls, enabling rapid iteration and simpler local testing without mocking a dozen services",
        "Easier debugging and tracing since stack traces and logs are colocated, and we do not need distributed tracing infrastructure to understand a request flow",
      ],
      cons: [
        "Scaling is limited to the single process, so individual high-throughput modules cannot be independently scaled without extraction into separate services",
        "Maintaining strict module boundaries requires ongoing discipline, and without enforced boundaries, coupling tends to creep in over time as shortcuts accumulate",
        "Eventually extracting modules into services incurs a one-time refactoring cost that we need to budget for in future planning, and I have seen teams underestimate this",
      ],
    },
  },
  {
    id: "ADR-003",
    title: "Event-Driven Architecture for real-time data processing",
    date: "2024-Q4",
    status: "accepted",
    problem:
      "The platform ingests high-volume GPS telemetry from field devices and user action events that must be processed in real-time for live tracking dashboards, route analysis, and anomaly detection. The processing pipeline needs to handle bursts of up to 50,000 events per second, guarantee at-least-once delivery, support replay for debugging and reprocessing, and decouple data producers from downstream consumers like analytics, alerting, and storage services. I have built similar pipelines before and the key is choosing a system that handles all of these requirements without us writing custom infrastructure.",
    decision:
      "Adopt Apache Kafka as the central event bus for all real-time data flows. We will establish a schema registry for event contract management, implement topic partitioning by tenant and entity type, and build consumer groups for each downstream service that requires event data.",
    reason:
      "Kafka's durable append-only log provides the at-least-once delivery guarantee and replay capability that are essential for debugging production issues and reprocessing failed batches. I have relied on replay to recover from bad deployments more than once, and it is invaluable. Horizontal scalability via topic partitioning handles our throughput requirements while maintaining ordering guarantees within a partition, which matters for our tenant-scoped data model. The pub-sub model fully decouples telemetry producers from the various consumers (tracking, analytics, alerting, billing), allowing each to evolve independently. Kafka's ecosystem (Connect, Streams, Schema Registry) also reduces the need for custom infrastructure.",
    tradeoffs: {
      pros: [
        "Durable message log with configurable retention enables replay and reprocessing for debugging, auditing, and backfill scenarios, which has saved me countless hours in past roles",
        "Topic partitioning provides horizontal scalability and maintains ordering within a partition, matching our tenant-scoped data model nicely",
        "Full decoupling of producers and consumers allows independent evolution, so adding a new analytics consumer requires zero changes to upstream services",
      ],
      cons: [
        "Operational complexity is significant, and running a production Kafka cluster requires dedicated expertise in broker management, partition rebalancing, and consumer lag monitoring",
        "Eventual consistency between consumers means downstream views may lag behind the source of truth, which complicates user-facing state management",
        "Ordering guarantees are scoped to a single partition, so cross-partition ordering requires application-level coordination that can be tricky to implement correctly",
      ],
    },
  },
  {
    id: "ADR-004",
    title: "Kubernetes for container orchestration",
    date: "2025-Q1",
    status: "accepted",
    problem:
      "The platform now runs 10-plus services across development, staging, and production environments, each with different resource profiles, scaling requirements, and configuration needs. We need a consistent orchestration layer that handles service discovery, load balancing, automatic restarts on failure, rolling deployments, and horizontal scaling, all without requiring bespoke infrastructure scripts for each environment. I have managed environments with custom scripts and it does not scale past a handful of services before becoming a maintenance nightmare.",
    decision:
      "Adopt Kubernetes on Azure (AKS) as the container orchestration platform. We will package each service as a Helm chart with environment-specific value overrides, and use ArgoCD for GitOps-based continuous deployment. Namespace-level resource quotas and network policies will enforce multi-tenant isolation within the cluster.",
    reason:
      "Kubernetes is the industry standard for container orchestration, and it provides declarative configuration that makes infrastructure reproducible across environments, which is exactly what we need as the team grows. Auto-scaling via Horizontal Pod Autoscaler handles traffic spikes without manual intervention, and self-healing replaces crashed containers automatically, reducing the on-call burden. The Helm ecosystem provides templated, version-controlled deployment manifests that simplify multi-service management, and AKS specifically offers managed control plane operations that reduce the operational burden on our small platform team while retaining full Kubernetes API compatibility.",
    tradeoffs: {
      pros: [
        "Declarative, GitOps-driven deployments ensure environment consistency and provide full audit trails of infrastructure changes via Git history, which I consider essential for compliance",
        "Auto-scaling and self-healing reduce operational toil since the cluster responds to load changes and failures without manual intervention during off-hours",
        "Rich ecosystem of tooling (Helm, ArgoCD, Prometheus, Grafana) provides a mature operational stack out of the box without us building everything from scratch",
      ],
      cons: [
        "Steep learning curve for the team, since Kubernetes concepts (pods, services, ingress, CRDs) require dedicated ramp-up time and ongoing education that takes engineers away from feature work",
        "YAML-heavy configuration with Helm templates can become difficult to maintain and debug as chart complexity grows, and I have spent too many hours debugging template rendering issues",
        "Operational overhead is disproportionate for small teams, as cluster upgrades, node management, and networking policies consume engineering time that could be spent on product work",
      ],
    },
  },
  {
    id: "ADR-005",
    title: "TypeScript across the entire stack",
    date: "2024-Q3",
    status: "accepted",
    problem:
      "The platform consists of a React frontend, a Node.js API layer, background worker processes, and shared utility libraries. Without a unified language, we face context-switching costs, duplicated type definitions between frontend and backend, and classes of bugs that arise from untyped or loosely-typed interfaces crossing service boundaries. Onboarding new engineers also requires proficiency in multiple languages with different conventions, which slows down the hiring pipeline and increases ramp-up time.",
    decision:
      "Standardize on TypeScript as the sole programming language across the entire stack, including the React frontend, Node.js API services, background workers, and shared libraries. We will establish a shared type package that defines API contracts, database entity types, and event schemas used by both frontend and backend.",
    reason:
      "TypeScript provides compile-time type safety that catches entire categories of bugs, such as mismatched API payloads, incorrect database query shapes, and invalid event schemas, before they reach production. I have lost weekends to debugging issues that a type checker would have caught instantly. Shared type definitions between frontend and backend eliminate the drift that occurs when types are maintained independently in different languages, and the single-language stack reduces cognitive load for engineers moving between frontend and backend work. The ecosystem maturity of TypeScript, with robust tooling, type definitions for virtually every library, and strong community support, makes it a practical choice for production workloads.",
    tradeoffs: {
      pros: [
        "Shared type definitions between frontend and backend eliminate an entire class of integration bugs caused by schema drift, which I consider one of the biggest productivity wins of adopting TypeScript",
        "Compile-time type checking catches incorrect API payloads, invalid database query shapes, and mismatched event schemas before runtime, saving us from painful production debugging sessions",
        "Single-language stack accelerates onboarding and reduces context-switching costs when engineers move between frontend and backend tasks, which matters more than people realize",
      ],
      cons: [
        "The build step adds latency to the development cycle, and while incremental compilation helps, it does not eliminate the overhead entirely, which can frustrate engineers used to interpreted languages",
        "Complex type manipulation using conditional types, mapped types, and template literal types can produce cryptic error messages that slow down debugging, especially for engineers new to advanced TypeScript",
        "TypeScript is not the optimal choice for all domains, and compute-intensive or systems-level components may benefit from a more performant language like Go or Rust",
      ],
    },
  },
];
