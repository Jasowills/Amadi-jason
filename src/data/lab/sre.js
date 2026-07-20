export const sreSections = [
  {
    id: "reliability-engineering",
    title: "Reliability Engineering",
    topics: [
      {
        id: "slis",
        title: "SLIs (Service Level Indicators)",
        summary:
          "SLIs are how you measure whether your service is actually working from the user's perspective. They're the numbers that matter.",
        details: [
          "Latency: how long does it take to serve a request? Measure at the load balancer or app layer. p99 under 200ms for APIs is a solid target. p50 is nice to know but p99 is where users feel the pain.",
          "Throughput: valid requests per second. Use request counters to track it. This tells you traffic patterns and whether you're approaching capacity limits.",
          "Error Rate: fraction of requests that fail (5xx, timeouts, wrong responses). Always separate client errors (4xx) from server errors (5xx). Mixing them gives you a meaningless number.",
          "Availability: time the service is actually working. Uptime divided by total time. I usually derive this from the other three SLIs rather than measuring it separately, since it's really just a composite.",
        ],
      },
      {
        id: "slos",
        title: "SLOs (Service Level Objectials)",
        summary:
          "SLOs are your internal reliability targets. They define how reliable you need to be to keep users happy without burning out your team.",
        details: [
          "Pick targets that are ambitious but actually achievable. Setting 99.99% when you're at 99.5% just creates noise, not motivation. I've seen teams set impossible SLOs and then ignore them entirely.",
          "99.9% availability means about 43.8 minutes of downtime per month. That's roughly the threshold where most users stop noticing degradation.",
          "Define SLOs per service, not globally. A billing service needs a tighter SLO than an internal analytics dashboard. One size does not fit all.",
          "The time window matters a lot. 99.9% monthly gives you 43.8 min of downtime each month, but 99.9% yearly only allows 8.76 hours total across the entire year.",
          "Review SLOs quarterly. Traffic patterns change, services mature, user expectations shift. An SLO that made sense six months ago might be wrong today.",
        ],
      },
      {
        id: "slas",
        title: "SLAs (Service Level Agreements)",
        summary:
          "SLAs are the contracts that tie your reliability commitments to financial consequences. This is where SLOs meet legal.",
        details: [
          "SLAs are external contracts; SLOs are internal targets. Your SLA should always be more conservative than your SLO to give yourself a buffer.",
          "If your SLO is 99.9%, your SLA might guarantee 99.5%. That buffer absorbs brief incidents without breaching the contract. I've seen teams learn this the hard way.",
          "Breaches typically trigger service credits, usually 10-25% of the monthly bill, up to full refunds depending on severity and duration.",
          "SLA terms usually cover availability, latency thresholds, and support response times. Each metric has its own target and penalty structure.",
          "Never set an SLA at a level you haven't sustainably demonstrated. Under-promise and over-deliver. Breaching SLAs damages both trust and revenue.",
        ],
      },
      {
        id: "error-budgets",
        title: "Error Budgets",
        summary:
          "Error budgets are the flip side of your SLO. They tell you how much unreliability you can afford to ship.",
        details: [
          "A 99.9% SLO means a 0.1% error budget. For a 30-day month, that's roughly 43.8 minutes. Every minute of downtime eats into this.",
          "Error budgets govern the velocity vs. reliability trade-off. Healthy budget? Ship aggressively. Depleted? Focus shifts to reliability work.",
          "Release freezes kick in when the error budget is exhausted. This forces engineering to invest in reliability before adding new features. It's a forcing function, and it works.",
          "Track error budgets at multiple granularities. Monthly for operational decisions, quarterly for strategic planning. You need both views.",
          "Teams that consistently exhaust their error budgets are sending a signal: either the SLO is too aggressive, or the service needs serious reliability investment.",
        ],
      },
      {
        id: "availability-math",
        title: "Availability Math",
        summary:
          "The math behind availability targets is simple, but the implications are profound. Each nine costs exponentially more.",
        details: [
          "Five nines (99.999%) means 5.26 minutes of downtime per year. This requires redundant everything: multi-region, automatic failover, zero single points of failure. It's brutally expensive.",
          "Four nines (99.99%) means 52.6 minutes per year, or about 4.38 minutes per month. Achievable with good redundancy and automated recovery, but still a significant investment.",
          "Three nines (99.9%) means 8.76 hours per year, or about 43.8 minutes per month. This is the standard baseline for production services.",
          "Two nines (99%) means 3.65 days per year. Fine for non-critical internal tools, but not acceptable for customer-facing services.",
          "Each additional nine typically costs 10x more in infrastructure and engineering effort. The cost curve is non-linear, and you need to decide if that extra nine is worth it.",
        ],
      },
    ],
  },
  {
    id: "observability",
    title: "Observability",
    topics: [
      {
        id: "logs",
        title: "Logs",
        summary:
          "Logs are the breadcrumbs of your system. They give you the context you need when things go sideways.",
        details: [
          "Structured logging in JSON format is non-negotiable in production. It enables machine parsing, querying, and aggregation. Unstructured log strings are a debugging nightmare.",
          "Use log levels (DEBUG, INFO, WARN, ERROR, FATAL) consistently. DEBUG in production adds noise. I either keep it behind feature flags or use it very sparingly.",
          "Correlation IDs (request IDs, trace IDs) let you follow a single request across services. Inject them at the gateway and propagate through every layer.",
          "Centralized logging platforms like ELK or Grafana Loki aggregate logs from all services into one queryable interface. Without this, debugging distributed systems is misery.",
          "Log retention policies need to balance debugging needs with storage costs. Hot logs for 7 days, warm for 30, cold/archive for 90+ is a tiering strategy that works.",
        ],
      },
      {
        id: "metrics",
        title: "Metrics",
        summary:
          "Metrics are your system's vital signs. They tell you what's happening right now and what's trending.",
        details: [
          "Counter: monotonically increasing value, like total requests. Use rate() to derive throughput. Never reset to zero. If you need something that goes down, use a gauge.",
          "Gauge: value that goes up or down, like current connections or memory usage. It's a point-in-time measurement, nothing more.",
          "Histogram: samples observations into buckets, like request duration. Enables percentile calculations without storing every single value. This is how you get p99 latency.",
          "Time-series databases like Prometheus store metrics with labels for multi-dimensional querying. Think: http_requests_total{method=\"GET\", status=\"200\"}.",
          "Dashboard design should follow the USE method for infrastructure (Utilization, Saturation, Errors) and the RED method for services (Rate, Errors, Duration). These frameworks actually work.",
        ],
      },
      {
        id: "traces",
        title: "Traces",
        summary:
          "Traces follow a single request as it hops through your distributed system. They show you exactly where time is spent.",
        details: [
          "Distributed tracing captures the full lifecycle of a request across service boundaries. Each service creates a span, and spans link into a trace tree.",
          "Span hierarchy shows parent-child relationships: a gateway span contains service spans, which contain database spans. This reveals where time is actually spent.",
          "Trace context propagation uses headers like W3C Trace Context (traceparent) to pass trace IDs across services without manual instrumentation.",
          "Trace-to-log correlation links trace IDs in logs, letting you jump from a trace to all logs generated during that request. This is incredibly powerful for debugging.",
          "Sampling strategies (head-based, tail-based, adaptive) control cost. Sampling 1% of traces may miss rare errors. Tail-based sampling captures interesting traces after the fact, which I prefer.",
        ],
      },
      {
        id: "three-pillars",
        title: "The Three Pillars",
        summary:
          "Logs, metrics, and traces each tell part of the story. Together, they give you the full picture.",
        details: [
          "The three pillars are complementary, not alternatives. Metrics tell you something is wrong, logs tell you why, traces tell you where in the call chain it happened.",
          "RED Method (for services): Rate (requests per second), Errors (error rate), Duration (latency distribution). These three cover most service health checks.",
          "USE Method (for infrastructure): Utilization (CPU/memory/disk usage), Saturation (queue depth, pending work), Errors (hardware/OS errors). Applies to nodes, containers, networks.",
          "Modern observability platforms like Grafana, Datadog, and Honeycomb unify all three pillars with cross-referencing between logs, metrics, and traces. This is where the industry has landed.",
          "OpenTelemetry is converging the instrumentation layer, providing a single SDK that emits traces, metrics, and logs in vendor-neutral formats. It's becoming the standard.",
        ],
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    topics: [
      {
        id: "prometheus",
        title: "Prometheus",
        summary:
          "Prometheus is the go-to open-source monitoring system. It's pull-based, multi-dimensional, and built for reliability.",
        details: [
          "PromQL is the query language. Key functions: rate(http_requests_total[5m]) for request rate, histogram_quantile(0.99, ...) for p99 latency, increase(errors_total[1h]) for error count. Learn these and you're 80% there.",
          "Alerting rules define conditions that trigger PagerDuty or Slack alerts. Example: alert: HighErrorRate, expr: rate(http_requests_total{status=~\"5..\"}[5m]) / rate(http_requests_total[5m]) > 0.05.",
          "Service discovery (Kubernetes, Consul, EC2) automatically finds scrape targets. No manual configuration when new instances deploy. This is one of Prometheus's best features.",
          "Prometheus pulls metrics from endpoints on a configurable interval, typically 15-60 seconds. Pull is preferred over push for most workloads because it's simpler and more resilient.",
          "Recording rules pre-compute expensive PromQL queries. Compute request rate once, then dashboard panels read the pre-computed value. This saves a lot of query time.",
        ],
      },
      {
        id: "grafana",
        title: "Grafana",
        summary:
          "Grafana is the visualization layer that ties everything together. It connects to dozens of data sources and makes your data understandable.",
        details: [
          "Panel types: Time series (default for metrics), stat (single value with sparkline), table (tabular data), heatmap (histogram distribution), logs (log stream). Pick the right one for the data.",
          "Dashboard organization: group by service, then by layer (application, infrastructure, business). Use folders and tags for navigation. A messy dashboard is a useless dashboard.",
          "Variables enable dynamic dashboards. Template variables like $service or $region let users filter all panels simultaneously. This is essential for multi-service environments.",
          "Grafana Alerting uses multi-stage evaluation: pending, then alerting, then ok. Annotations mark deployment events and incidents on dashboards so you can see correlations.",
          "Title every panel. Use consistent color schemes. Add thresholds for visual context. Document dashboards with descriptions. These small things make dashboards actually useful.",
        ],
      },
      {
        id: "opentelemetry",
        title: "OpenTelemetry",
        summary:
          "OpenTelemetry is the vendor-neutral standard for observability instrumentation. It's where the industry is headed, and you should be using it.",
        details: [
          "Auto-instrumentation for popular frameworks (Express, Spring, Django, gRPC) means zero code changes for basic trace and metric collection. Start here.",
          "SDK setup: initialize a TracerProvider and MeterProvider, configure an exporter (OTLP, Jaeger, Prometheus), and instrument your code. It's straightforward once you see the pattern.",
          "Why OpenTelemetry over proprietary agents: no vendor lock-in, community-driven standards, consistent instrumentation across languages, and portable telemetry data. It's a no-brainer.",
          "Trace/Metric/Span export uses OTLP (gRPC or HTTP) as the standard protocol. Export to Jaeger, Tempo, or any OTLP-compatible backend.",
          "Context propagation is built in. W3C Trace Context headers are automatically injected and extracted, enabling distributed tracing across service boundaries without extra work.",
        ],
      },
    ],
  },
  {
    id: "incident-management",
    title: "Incident Management",
    topics: [
      {
        id: "incident-response",
        title: "Incident Response",
        summary:
          "Incident response is about having a repeatable process so you're not making things up under pressure.",
        details: [
          "Detection, triage, mitigation, resolution, postmortem. Five stages, consistent handling regardless of severity. Skip a stage and you'll miss something important.",
          "On-call rotations need to be fair and well-compensated. Use PagerDuty or Opsgenie with escalation policies (L1, L2, L3, management). Nobody should be on-call 24/7 without relief.",
          "Communication channels: dedicated Slack or Teams channel per incident, status page for external communication, and a clear incident commander role. Chaos during an incident makes everything worse.",
          "Mitigation focuses on restoring service, not finding root cause. Rollback, feature flag toggle, or scaling are faster than debugging during an incident. Debug later.",
          "Escalation criteria matter: who gets paged, when, and for what. Clear escalation policies prevent alert fatigue and ensure the right people respond at the right time.",
        ],
      },
      {
        id: "root-cause-analysis",
        title: "Root Cause Analysis",
        summary:
          "Root cause analysis is how you figure out why something broke, not just what broke. It's about systemic understanding.",
        details: [
          "5 Whys: ask 'why' iteratively until you reach the root cause. Why did the database fail? Connection pool exhausted. Why? No connection limit configured. Why? Default was too high. Keep going.",
          "Fishbone diagrams categorize potential causes: People, Process, Technology, Environment. They're great for brainstorming contributing factors when you're stuck.",
          "Blameless culture is essential. The goal is to understand what went wrong in the system, not who made a mistake. People don't break systems. Bad designs do.",
          "Distinguish root cause from contributing factors. A single root cause may have multiple contributing factors (monitoring gaps, missing tests, unclear runbooks).",
          "Document everything and track action items to completion. Unfixed root causes will cause recurring incidents. I've seen it happen too many times.",
        ],
      },
      {
        id: "postmortems",
        title: "Postmortems",
        summary:
          "Postmortems are how your organization learns from incidents. A good postmortem prevents the next outage.",
        details: [
          "Template: incident summary, timeline (key timestamps), impact (users affected, duration, revenue impact), root cause, contributing factors, action items with owners and deadlines. Keep it structured.",
          "Blameless means focusing on systemic failures: 'The alert didn't fire' rather than 'John forgot to configure the alert.' This encourages honest reporting and actually fixes problems.",
          "Action items need to be specific, measurable, and assigned. 'Improve monitoring' is useless. 'Add latency SLO alert for /api/checkout endpoint by March 1st' is actionable.",
          "Postmortem review meetings should include engineering, product, and leadership. This ensures organizational learning beyond the immediate team.",
          "Maintain a postmortem repository. Search past incidents for patterns: recurring root causes, frequent failure modes, systemic gaps. History repeats if you let it.",
        ],
      },
      {
        id: "disaster-recovery",
        title: "Disaster Recovery",
        summary:
          "Disaster recovery is the plan for when everything goes wrong. You don't want to be writing this during an actual disaster.",
        details: [
          "RPO (Recovery Point Objective): maximum acceptable data loss measured in time. An RPO of 1 hour means you can lose up to 1 hour of data. This drives your backup frequency.",
          "RTO (Recovery Time Objective): maximum acceptable downtime. An RTO of 4 hours means you must restore service within 4 hours of a failure. Pick a number that matches your business needs.",
          "The 3-2-1 rule: 3 copies, 2 different media, 1 offsite. Test restores regularly. Untested backups are not backups. I've seen teams discover their backups were corrupted during an actual disaster.",
          "Failover procedures: active-passive (cold standby) vs. active-active (hot standby). Active-active provides zero-downtime failover but requires careful data consistency management.",
          "DR testing must happen regularly, quarterly at minimum. Tabletop exercises walk through scenarios. Full failover tests validate actual recovery procedures. Both are necessary.",
        ],
      },
    ],
  },
];
