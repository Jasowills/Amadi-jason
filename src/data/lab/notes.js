export const notes = [
  // ── Backend ───────────────────────────────────────────────────────────
  {
    id: "api-design-principles",
    category: "backend",
    title: "API Design Principles",
    tags: ["REST", "HTTP", "OpenAPI", "Pagination"],
    content:
      "Pick a naming convention for your API resources and stick to it. I use plural nouns for collections (users, projects) and singular for sub-resources. It sounds trivial, but it cuts down onboarding time for new developers because they can guess endpoint shapes without reading docs. For versioning, I always go with URL path prefixes like /v1/. It is the most explicit and debuggable strategy, even if some people argue it pollutes URIs. For pagination, skip offset/limit entirely and use cursor-based pagination with an opaque `after` token. Offset pagination breaks under concurrent writes, and I have been bitten by skipped or duplicate records more times than I care to admit. Wrap all your error responses in a consistent envelope like { error: { code, message, details[] } } so clients can handle failures without pattern-matching on random formats. And please, design idempotency keys into your POST endpoints from day one. Network retries happen, and you do not want duplicate resources created because someone's client hit a timeout."
  },
  {
    id: "database-query-optimization",
    category: "backend",
    title: "Database Query Optimization",
    tags: ["PostgreSQL", "Indexing", "EXPLAIN", "Query Planning"],
    content:
      "Always run EXPLAIN (ANALYZE, BUFFERS) on production-representative query plans before assuming a query is fast. I have seen developers optimize the wrong queries because they never checked whether the optimizer was doing a sequential scan when it should have been using an index. Composite indexes follow the leftmost-prefix rule, which trips people up constantly. If you have an index on (tenant_id, created_at, status), it only helps queries that filter on tenant_id first. Order your index columns by selectivity and query frequency. The N+1 query problem is real and rampant. I have used the ActiveRecord Bullet gem to catch these in code review, but honestly just being disciplined about eager loading with includes() or batch-finding with in_batches() eliminates thousands of redundant round-trips per request. For connection pooling, PgBouncer in transaction mode is what I reach for to prevent connection storms during traffic spikes. Set your pool_size to roughly 2 to 4 times your CPU cores, not some arbitrary large number you found in a blog post. Read replicas are great for scaling reads, but always route read-after-write queries back to the primary. The lag-induced inconsistencies will erode user trust faster than almost anything else."
  },
  {
    id: "authentication-patterns",
    category: "backend",
    title: "Authentication Patterns",
    tags: ["JWT", "OAuth2", "Sessions", "Security"],
    content:
      "JWTs are great for stateless, horizontally-scaled architectures because the token is self-contained. But I see people constantly make the mistake of storing sensitive data in the payload. Remember, a JWT is only base64-encoded, not encrypted. Anyone can read it. Implement refresh token rotation from the start. Each time a refresh token is used, issue a new one and invalidate the old. This limits the damage window when a refresh token leaks and gives you server-side revocation for compromised sessions. For SPAs and mobile apps, use the OAuth2 authorization code flow with PKCE. The implicit flow is deprecated for good reason; it is vulnerable to token interception via the fragment URL. SSO integration through SAML or OIDC is deceptively tricky. Pay close attention to clock skew, token expiry, and session lifecycle synchronization. Logging out of your identity provider does not automatically invalidate downstream application sessions, and users will notice. Keep your access tokens short-lived with a server-side refresh token store so you can kill sessions immediately without relying on token expiry as your only safety net."
  },
  {
    id: "distributed-systems-consistency",
    category: "backend",
    title: "Distributed Systems Consistency",
    tags: ["CAP Theorem", "Event Sourcing", "CQRS", "Sagas"],
    content:
      "The CAP theorem gets oversimplified a lot. You are not choosing between consistency and availability in general. You are choosing on a per-operation basis, because partition tolerance is non-negotiable. The real decision is what happens when nodes cannot communicate with each other. Event sourcing gives you a complete audit trail and the ability to rebuild state at any point in time, which is incredibly powerful for debugging production issues. But you absolutely must design snapshotting strategies early. Replaying millions of events to reconstruct current state becomes a serious performance bottleneck otherwise. CQRS separates read and write models so each can be optimized independently. Your write side can enforce business invariants while the read side serves denormalized projections tailored to specific query patterns. I have found this pattern essential in systems where read and write workloads have very different scaling characteristics. The saga pattern replaces distributed transactions with a sequence of local transactions, each with a compensating action. This is what you reach for when you need atomicity across services without two-phase commit's blocking coordinator. And one thing that catches people off guard: achieving eventual consistency in practice requires designing for idempotency at every layer. Consumers must safely process the same event multiple times because network retries and reordering are guarantees, not edge cases."
  },

  // ── Frontend ──────────────────────────────────────────────────────────
  {
    id: "react-architecture-patterns",
    category: "frontend",
    title: "React Architecture Patterns",
    tags: ["React", "Hooks", "Composition", "Patterns"],
    content:
      "Component composition with render props and children-as-function patterns gives consumers full control over rendering without inheritance or prop drilling. I use this a lot when building reusable layout primitives. Custom hooks are where React really shines for code reuse. A useDebounce hook, for example, encapsulates both the timeout lifecycle and cleanup in a single call, keeping consuming components focused on their rendering concerns. Compound components use implicit state sharing through React Context to coordinate between parent and child. A Tabs compound component can manage active tab state internally while allowing consumers to compose arbitrary Tab and Panel children. The container/presentational split from the Redux era has evolved into hooks-based extraction: custom hooks hold logic and data fetching, while components remain thin rendering functions. React.memo, useMemo, and useCallback are not performance silver bullets. I have seen people memoize everything and end up with memoization bugs that are harder to debug than the original render performance issue. Only use them when the cost of comparison is genuinely lower than the cost of re-rendering."
  },
  {
    id: "state-management-decisions",
    category: "frontend",
    title: "State Management Decisions",
    tags: ["Redux", "Zustand", "React Query", "State"],
    content:
      "Local useState is correct for component-specific UI state: form inputs, toggles, hover states. Reaching for a global store for this is the single most common state management anti-pattern I see in React applications. Context API works well for low-frequency updates like theme, locale, or auth state. But every consumer re-renders when the provider value changes, so do not put high-frequency updates like mouse position or form data through it. External stores like Zustand and Jotai give you the ergonomic benefits of global state without Context's re-render problems. Zustand's selector-based subscriptions and Jotai's atomic model let consumers subscribe to only the slices they need. React Query (now TanStack Query) owns server state. Caching, background refetching, optimistic updates, and stale-while-refresh logic are all handled declaratively. This eliminates the manual loading/error/data state management that dominates naive implementations. Redux is still the right choice for complex client state with many interacting slices and strict action logging requirements. But if your main need is server cache management, RTK Query or TanStack Query will replace most of your Redux boilerplate. I have made that migration on multiple projects and never regretted it."
  },
  {
    id: "frontend-performance-optimization",
    category: "frontend",
    title: "Frontend Performance Optimization",
    tags: ["Core Web Vitals", "Code Splitting", "Bundle Analysis", "LCP"],
    content:
      "Code splitting with React.lazy() and dynamic import() ensures users only download the JavaScript needed for the current route. A dashboard-only code chunk should not load on the marketing homepage, and Webpack's splitChunks configuration lets you fine-tune exactly how vendor and shared modules are grouped. For Largest Contentful Paint (LCP), the fix is almost always the hero image or above-the-fold video. Using native loading='lazy' on your LCP element is counterintuitive but a common mistake; those elements should load eagerly. Preload the LCP resource with <link rel='preload'> combined with priority hints for the most measurable impact. Run a bundle analysis with webpack-bundle-analyzer or source-map-explorer to catch unexpected large dependencies. A classic culprit is importing all of lodash when you only use debounce and cloneDeep, or an icon library that includes every icon despite rendering only a few. Image optimization should include format negotiation with <picture> elements serving AVIF to supported browsers and WebP as a fallback. This reduces image payloads by 40 to 60 percent compared to JPEG without perceptible quality loss. One thing people forget: tree shaking only works when dependencies export ES modules. CommonJS libraries bundled with Webpack will include the entire module regardless of what you import, so check the library's package.json for the `module` field before adding it."
  },
  {
    id: "css-architecture-strategies",
    category: "frontend",
    title: "CSS Architecture Strategies",
    tags: ["Tailwind", "CSS-in-JS", "Design Tokens", "Responsive"],
    content:
      "Utility-first CSS with Tailwind eliminates the naming debates and the dead CSS problem that plague every large project. When you delete a component, the associated utilities go with it, unlike class-based approaches where unused .card-wrapper rules linger in stylesheets for years. I have seen codebases with thousands of lines of dead CSS that nobody dares to remove. Define design tokens as a single source of truth, whether in a tokens.json or CSS custom properties. This ensures spacing, color, and typography scales remain consistent across platforms. A React component library and a native iOS app can consume the same token definitions, which saves an enormous amount of design handoff friction. CSS-in-JS with styled-components or Emotion provides runtime scoping and dynamic styling that static CSS cannot match, but the runtime cost is real. SSR-rendered stylesheets are larger, and the hydration cost includes both React reconciliation and style injection. For responsive patterns, always go mobile-first using min-width media queries. This avoids the common bug of applying a desktop layout as default and then overriding it with max-width queries that produce layout shifts at breakpoints. Dark mode via CSS custom properties with a data-theme attribute on the root element is more maintainable than toggling individual class names. You swap the entire color scheme in one cascade without touching component styles."
  },

  // ── Architecture ──────────────────────────────────────────────────────
  {
    id: "microservices-vs-monolith",
    category: "architecture",
    title: "Microservices vs Monolith",
    tags: ["Microservices", "Monolith", "Domain-Driven Design", "Scaling"],
    content:
      "Start with a well-structured modular monolith before extracting services. I have seen too many teams go straight to microservices and end up with a distributed monolith where they have added network boundaries without actual service independence. The debugging and deployment complexity is not worth it. Service boundaries should map to business capabilities like billing, notifications, or user management, not technical layers like data-access-service or api-gateway-service. Technical boundaries still require coordinated deployments and shared databases, which defeats the purpose of the split. The data ownership problem is the hardest part of microservices. Each service must own its data store exclusively, and cross-service queries must go through APIs. Shared databases create tight coupling that undermines the entire architectural split. Communication between services should be synchronous (REST, gRPC) only when you need an immediate response and can tolerate the latency. For everything else, asynchronous messaging reduces coupling and allows services to scale independently. A well-structured monolith with clear module boundaries and dependency rules is almost always the right starting point. The decision to extract a service should be driven by independent deployability requirements or scaling bottlenecks, not architectural idealism."
  },
  {
    id: "event-driven-architecture",
    category: "architecture",
    title: "Event-Driven Architecture",
    tags: ["Kafka", "RabbitMQ", "Event Sourcing", "CQRS"],
    content:
      "Kafka excels at high-throughput, durable event streams where message ordering within a partition matters. Its log-based architecture means consumers can replay events from any offset, which makes it ideal for event sourcing and building new read models from historical data. I have used this repeatedly to rebuild materialized views without taking systems offline. RabbitMQ is better suited for task queuing with complex routing logic, like topic exchanges or headers-based routing, and when you need per-message acknowledgment with consumer prefetch limits for work distribution across workers. It is not a drop-in replacement for Kafka despite what some articles suggest. Event sourcing stores the full history of state changes rather than just the current state. This enables debugging production issues by replaying the exact sequence of events that led to a particular outcome. But you must design for event schema evolution from day one using upcasting or schema registries, or you will be stuck maintaining old event formats forever. CQRS paired with event sourcing separates the write model from the read model, allowing each side to be scaled and optimized independently. The write side validates and emits events while the read side consumes them to build query-optimized projections. And do not skip dead letter queues. Every message broker integration needs DLQ handling with alerting. Poison messages that cannot be processed will silently accumulate and cause memory issues without an explicit retry-and-discard strategy."
  },
  {
    id: "message-queue-patterns",
    category: "architecture",
    title: "Message Queue Patterns",
    tags: ["Message Queue", "Pub/Sub", "Backpressure", "Delivery"],
    content:
      "Point-to-point queues guarantee that each message is consumed by exactly one worker, which is the correct pattern for task distribution. Order processing, email sending, or any job where duplicate processing would cause data corruption belongs in a point-to-point queue. Publish-subscribe fan-out allows multiple consumers to independently process the same event. When an order-created event should trigger inventory updates, email notifications, and analytics tracking simultaneously, pub-sub is what you reach for. Message ordering is only guaranteed within a partition or queue. If ordering matters, like updating a user's subscription status, you must route all messages for that user to the same partition using a consistent hash of the user ID. I have debugged some gnarly race conditions because someone assumed ordering was global. Here is something that trips up almost everyone: exactly-once delivery is a myth at the messaging layer. All distributed systems provide at-most-once or at-least-once semantics. True exactly-once is achieved through idempotent consumers that safely handle duplicate delivery. Configure prefetch limits and rate limiting at the consumer level for backpressure handling, and monitor queue depth against a threshold to trigger horizontal scaling before message latency degrades."
  },
  {
    id: "api-gateway-patterns",
    category: "architecture",
    title: "API Gateway Patterns",
    tags: ["API Gateway", "Rate Limiting", "Service Mesh", "Circuit Breaker"],
    content:
      "An API gateway centralizes cross-cutting concerns like authentication, rate limiting, request transformation, and TLS termination so individual services do not need to implement them independently. This reduces code duplication and security misconfiguration risk, which is more common than people think. Rate limiting should be applied at multiple levels: per-user quotas prevent abuse, per-endpoint limits protect expensive operations, and global rate limits guard overall system capacity. The token bucket algorithm is the standard implementation because it allows burst traffic while enforcing sustained limits. Circuit breakers in the gateway prevent cascading failures by detecting when a downstream service is unhealthy and returning fallback responses instead of letting requests queue up. I have used Resilience4j patterns for this and they work well, but you need to tune the thresholds carefully based on your actual traffic patterns. Request aggregation combines multiple downstream calls into a single client request. A mobile app's dashboard endpoint might aggregate user profile, notifications, and recent activity from three separate services, reducing network overhead and latency for constrained clients. Service mesh (Istio, Linkerd) versus API gateway is not an either-or decision. The mesh handles east-west (service-to-service) traffic management and observability, while the gateway manages north-south (client-to-service) traffic. They serve complementary roles in a distributed architecture."
  },

  // ── Security ──────────────────────────────────────────────────────────
  {
    id: "owasp-top-10-mitigations",
    category: "security",
    title: "OWASP Top 10 Mitigations",
    tags: ["OWASP", "XSS", "Injection", "Security"],
    content:
      "SQL injection is mitigated by parameterized queries, not input validation alone. WAF-based allow-lists inevitably have bypass vectors, and stored procedures still construct dynamic queries internally. I have seen both fail in production. Cross-site scripting (XSS) requires a defense-in-depth strategy. Use output encoding appropriate to the context (HTML, JavaScript, CSS, URL), Content Security Policy headers that restrict inline scripts, and rely on frameworks like React that auto-escape JSX by default. But remember, dangerouslySetInnerHTML or innerHTML always bypass these protections, so be extremely cautious with user-generated content. Broken authentication is the most common real-world vulnerability I encounter. Enforce multi-factor authentication, lock accounts after failed attempts, and never implement your own password hashing. Use bcrypt, scrypt, or Argon2id with appropriate cost factors. Server-side request forgery (SSRF) occurs when user-controlled URLs are used to make server-side requests. Mitigate this by validating URLs against an allowlist of permitted hosts, blocking private IP ranges, and disabling unnecessary URL schemes. Security misconfiguration is the vulnerability class that requires the most organizational discipline. Default credentials, exposed debug endpoints, and unnecessary HTTP methods are all too common. Automate configuration auditing and include a hardened security baseline in your CI pipeline."
  },
  {
    id: "secrets-management",
    category: "security",
    title: "Secrets Management",
    tags: ["Vault", "Environment Variables", "Key Rotation", "CI Security"],
    content:
      "Environment variables are the minimum acceptable secrets storage for local development, but production secrets should use a dedicated vault solution like HashiCorp Vault, AWS Secrets Manager, or GCP Secret Manager. These provide audit logging, access control, and automatic rotation that environment variables simply cannot offer. Set up secret scanning in CI with tools like truffleHog or gitleaks. This prevents accidental commits of API keys and credentials by scanning git history and blocking pushes that contain detected secrets. I have caught more near-misses with this than I would like to admit. Automate key rotation with a zero-downtime strategy. Dual-key approaches where both old and new keys are valid during a rotation window allow services to update credentials without requiring coordinated deployments. Never put secrets in code, even in test fixtures or example configurations. They persist in version control history long after the code is deleted. Use placeholder values in documentation and seed scripts instead. Give every service that accesses a secret its own identity, whether that is a service account or IAM role. Sharing a single master credential across services limits your ability to rotate per-service and makes the blast radius of a compromise much larger."
  },
  {
    id: "identity-and-access-management",
    category: "security",
    title: "Identity & Access Management",
    tags: ["RBAC", "ABAC", "Least Privilege", "IAM"],
    content:
      "Role-Based Access Control (RBAC) assigns permissions to roles like editor, viewer, or admin, and users to roles. It works well for hierarchical organizational structures but becomes unwieldy when permissions depend on resource attributes. That is when Attribute-Based Access Control (ABAC) is the better choice, evaluating policies based on user attributes, resource properties, and environmental context. The principle of least privilege means every service, user, and process should have only the permissions it needs to perform its current function. Enforce this with default-deny policies where access must be explicitly granted, not by trying to enumerate and remove excessive permissions after the fact. I have seen teams spend months on permission audits that could have been avoided with proper defaults from the start. Service-to-service authentication in a microservices architecture is best handled with short-lived, automatically rotated certificates (mTLS via a service mesh) or signed JWTs with a shared identity provider. Long-lived API keys shared between services are a security debt that compounds with every new integration. API key management should include scoped keys with explicit permissions, rate limits per key, and usage logging. Treat API keys as first-class credentials, not throwaway strings. A single over-privileged key shared across all environments and services is a ticking time bomb."
  },
  {
    id: "security-in-cicd-pipelines",
    category: "security",
    title: "Security in CI/CD Pipelines",
    tags: ["SAST", "DAST", "Supply Chain", "Container Security"],
    content:
      "Software Composition Analysis (SCA) tools like Snyk or Dependabot automatically detect known vulnerabilities in dependencies and can block merges when critical CVEs are detected. But the real value is in the automated pull requests that propose patched versions, reducing the time between disclosure and remediation from weeks to hours. Static Application Security Testing (SAST) scans source code for vulnerability patterns during the build, catching issues before they reach runtime. Tools like Semgrep with custom rules can enforce organization-specific security patterns beyond what standard scanners detect. I have written custom rules to catch internal anti-patterns that generic scanners miss entirely. Container image scanning with Trivy or Grype should run both in the CI pipeline and in the registry. New CVEs are published daily, and an image that was clean at build time may be vulnerable by the time it is deployed. Signed container images and signed git commits using Sigstore/cosign provide supply chain integrity guarantees. You can verify that the image running in production was built from a specific commit by a specific person, which is critical for incident response and forensics. DAST (Dynamic Application Security Testing) with tools like OWASP ZAP runs against a deployed staging environment and catches runtime vulnerabilities that static analysis misses. CSRF misconfigurations, authentication bypasses, and business logic flaws only manifest when the application is running, so you need both approaches."
  }
];
