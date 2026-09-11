export const notes = [
  {
    id: "api-design-principles",
    category: "backend",
    title: "API Design Principles",
    tags: ["REST", "HTTP", "OpenAPI", "Pagination"],
    content:
      "I stopped arguing about singular vs plural and just picked plural for collections (users, projects) — now a new dev can guess the shape without opening docs. I version with /v1/ in the path; it’s boring and debuggable, which I prefer at 2am. I don’t do offset pagination anymore — I’ve been bitten by duplicates under concurrent writes, so I use cursor with opaque after tokens. I wrap errors as { error: { code, message, details[] } } so clients don’t regex random strings. And I put idempotency-key on every POST from day one — retries happen, and Lagos networks love to prove it.",
  },
  {
    id: "database-query-optimization",
    category: "backend",
    title: "Database Query Optimization",
    tags: ["PostgreSQL", "Indexing", "EXPLAIN", "Query Planning"],
    content:
      "I run EXPLAIN (ANALYZE, BUFFERS) on a prod-like dataset before I claim a query is fast — I’ve optimized the wrong query too many times by guessing. Composite indexes obey leftmost-prefix: (tenant_id, created_at, status) only helps if you filter tenant_id first. I sort columns by selectivity. N+1 is still the silent killer; I lean on includes()/batching and actually check the log for those 1,000 round-trips. For pooling I use PgBouncer in transaction mode, pool ~2-4× cores, not a blog-post magic number. Read replicas are great, but I route read-after-write back to primary — that lag-induced “where’s my data?” erodes trust faster than a slow query.",
  },
  {
    id: "authentication-patterns",
    category: "backend",
    title: "Authentication Patterns",
    tags: ["JWT", "OAuth2", "Sessions", "Security"],
    content:
      "JWTs are nice until you put secrets in the payload and forget it’s just base64. I keep access tokens short and rotate refresh tokens on every use — old one dies, new one lives. For SPAs/mobile I use auth code + PKCE; implicit is dead for a reason. SSO via SAML/OIDC is where clock skew and “logout everywhere” will humble you — logging out of the IdP doesn’t magically kill downstream sessions. I keep a server-side refresh store so I can revoke now, not when the token finally expires. At Marklite I learned that the hard way after a 24h window where a removed admin could still call the API.",
  },
  {
    id: "distributed-systems-consistency",
    category: "backend",
    title: "Distributed Systems Consistency",
    tags: ["CAP Theorem", "Event Sourcing", "CQRS", "Sagas"],
    content:
      "CAP isn’t a global switch — it’s per operation when partitions hit. Event sourcing gives you a time machine (rebuild state, debug the exact sequence that broke prod), but you must plan snapshots early or replaying millions of events becomes your new bottleneck. CQRS lets the write side guard invariants while the read side serves denormalized views — essential when reads and writes scale differently, like our fleet dashboards vs ingest. Sagas replace distributed transactions with local steps + compensations. And idempotency everywhere — consumers will see the same event twice; design for it like you design for bad network, because you are.",
  },
  {
    id: "react-architecture-patterns",
    category: "frontend",
    title: "React Architecture Patterns",
    tags: ["React", "Hooks", "Composition", "Patterns"],
    content:
      "I reach for composition over inheritance every time — render props / children-as-function lets a layout primitive stay dumb while consumers stay in control. Custom hooks are where reuse actually works: a useDebounce that owns its timeout and cleanup keeps components thin. Compound components via Context let Tabs manage active state while still letting you compose arbitrary Tab/Panels. And I stopped memoizing everything — React.memo/useMemo/useCallback are not fairy dust. I only add them when the comparison is cheaper than the render; otherwise I’m just hiding a perf bug with a memo bug.",
  },
  {
    id: "state-management-decisions",
    category: "frontend",
    title: "State Management Decisions",
    tags: ["Redux", "Zustand", "React Query", "State"],
    content:
      "useState for local UI — toggles, inputs, hover. Putting that in a global store is the most common mistake I see. Context is for low-frequency values (theme, auth) — it re-renders every consumer on change, so don’t pipe mouse or form state through it. For global client state I pick Zustand/Jotai with selectors so only the slice re-renders. Server state is TanStack Query’s job — caching, background refetch, optimistic updates, all declarative. I’ve migrated Redux → Query on two fleets and never missed the boilerplate. Redux still earns its keep when you have many interacting client slices that need strict logging; otherwise Query owns it.",
  },
  {
    id: "frontend-performance-optimization",
    category: "frontend",
    title: "Frontend Performance Optimization",
    tags: ["Core Web Vitals", "Code Splitting", "Bundle Analysis", "LCP"],
    content:
      "Split by route with React.lazy — marketing shouldn’t pay for dashboard code. LCP is almost always the hero image; don’t lazy it, preload it and hint priority. I run bundle-analyzer on every big PR — the classic shock is importing all of lodash for debounce. Use <picture> with AVIF→WebP→JPEG and you’ll cut images 40-60% without visible loss. And check the package’s module field — CommonJS won’t tree-shake no matter how you import it; you’ll ship the whole thing and wonder why your vendor chunk is huge.",
  },
  {
    id: "css-architecture-strategies",
    category: "frontend",
    title: "CSS Architecture Strategies",
    tags: ["Tailwind", "CSS-in-JS", "Design Tokens", "Responsive"],
    content:
      "Tailwind killed my dead-CSS graveyard — delete a component, the utilities go with it. I keep tokens as the source of truth (spacing, color, type) so React and the design file don’t drift. CSS-in-JS is tempting but the runtime + hydration cost shows up on cheap Androids I actually test on. I go mobile-first with min-width queries to avoid desktop-default overrides that shift at breakpoints. And I do dark via data-theme on :root with CSS vars — one cascade swap, no class whack-a-mole per component.",
  },
  {
    id: "microservices-vs-monolith",
    category: "architecture",
    title: "Microservices vs Monolith",
    tags: ["Microservices", "Monolith", "Domain-Driven Design", "Scaling"],
    content:
      "I start with a modular monolith. I’ve seen distributed monoliths where teams added network hops without independence — now you have latency and debugging pain with none of the benefits. Boundaries should be business capabilities (billing, notifications), not layers (data-access-service). Data ownership is the hard part: each service owns its DB, cross-service reads go via API, no shared DB. Use sync only when you need an answer now; async for the rest. Extract a service when deploy or scale demands it — like moving a rook because the position demands it, not because the opening book says so.",
  },
  {
    id: "event-driven-architecture",
    category: "architecture",
    title: "Event-Driven Architecture",
    tags: ["Kafka", "RabbitMQ", "Event Sourcing", "CQRS"],
    content:
      "Kafka when you need throughput, ordering per partition, and replay — I’ve rebuilt materialized views from history without downtime because of it. RabbitMQ when you need routing (topic/headers) and per-message acks for work distribution. Event sourcing is a superpower until you forget schema evolution — upcasting/registry on day one or you’ll maintain ghosts forever. CQRS + events lets writes guard invariants while reads scale as projections. And always add DLQs with alerts — poison messages don’t fix themselves, they fill disks.",
  },
  {
    id: "message-queue-patterns",
    category: "architecture",
    title: "Message Queue Patterns",
    tags: ["Message Queue", "Pub/Sub", "Backpressure", "Delivery"],
    content:
      "Point-to-point for “exactly one worker must do this” (orders, emails). Pub/sub for “everyone cares” (order-created → inventory + email + analytics). Ordering is per-partition/queue only — hash userId to partition if order matters, I’ve debugged that race the hard way. And there’s no exactly-once at the broker — only at-least/at-most. Exactly-once is idempotent consumers. Backpressure is real: set prefetch, monitor depth, and scale before latency dies.",
  },
  {
    id: "api-gateway-patterns",
    category: "architecture",
    title: "API Gateway Patterns",
    tags: ["API Gateway", "Rate Limiting", "Service Mesh", "Circuit Breaker"],
    content:
      "Gateway centralizes auth, rate limit, TLS — so services don’t each invent security bugs. I rate-limit at user, endpoint, and global with token bucket so bursts work but abuse doesn’t. Circuit breakers stop cascades — I use Resilience4j-style tripping tuned to real traffic, not defaults. Aggregation (one dashboard call fanned to three services) saves mobile round-trips. Mesh vs gateway isn’t either-or: mesh for east-west, gateway for north-south. They complement like bishops on opposite colors.",
  },
  {
    id: "owasp-top-10-mitigations",
    category: "security",
    title: "OWASP Top 10 Mitigations",
    tags: ["OWASP", "XSS", "Injection", "Security"],
    content:
      "Parametrized queries, not allow-lists, stop SQLi — I’ve seen WAFs bypassed and stored procs still build strings. XSS needs layered defense: context-aware encoding + CSP + React auto-escape, but dangerouslySetInnerHTML bypasses all of it. Broken auth is what I actually find in the wild — enforce MFA, lock after fails, never roll your own hash (bcrypt/Argon2). SSRF: allowlist hosts, block private IPs, disable weird schemes. Misconfig is the boring killer — default creds, open debug, extra methods. I put a hardened baseline in CI so it can’t drift.",
  },
  {
    id: "secrets-management",
    category: "security",
    title: "Secrets Management",
    tags: ["Vault", "Environment Variables", "Key Rotation", "CI Security"],
    content:
      "Env vars are for local dev — prod deserves Vault/Secrets Manager with audit and rotation. I run truffleHog/gitleaks in CI; it’s caught more near-misses than I’ll admit. Rotation with dual-valid window (old + new accepted briefly) lets you roll without coordinated deploys. Never put real values in fixtures or examples — history remembers forever. And give each service its own identity; one master credential is one big blast radius.",
  },
  {
    id: "identity-and-access-management",
    category: "security",
    title: "Identity & Access Management",
    tags: ["RBAC", "ABAC", "Least Privilege", "IAM"],
    content:
      "RBAC for hierarchies (owner/admin/viewer), ABAC when resource attributes decide. I default to deny and explicitly grant — auditing “who has too much” for months is avoidable. For service-to-service I prefer short-lived mTLS or signed JWTs over forever API keys. Scoped keys with limits and logs per key; one god-key across envs is a bomb with a slow fuse.",
  },
  {
    id: "security-in-cicd-pipelines",
    category: "security",
    title: "Security in CI/CD Pipelines",
    tags: ["SAST", "DAST", "Supply Chain", "Container Security"],
    content:
      "SCA (Snyk/Dependabot) plus auto-PRs shrinks disclosure→patch from weeks to hours. SAST in build (Semgrep with my own rules) catches our specific anti-patterns that generic scanners miss. Scan images with Trivy/Grype in CI and in the registry — a clean build can be CVE-dirty by deploy time. Sign images/commits with Sigstore/cosign so I can prove what ran in prod came from which commit — useful when you’re debugging at 1am and need truth, not trust.",
  },
];
