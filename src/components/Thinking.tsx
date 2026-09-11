// Thinking — surfaced from /lab — in my own words, not template-speak
const notes = [
  {
    id: "ADR-001",
    date: "2024 — Q3",
    title: "Why Postgres, not Mongo, for the core",
    excerpt:
      "I got tired of chasing tenant leaks at 2am. RLS moves the bouncer from my app to the DB — one place to get it right. ACID for billing, PostGIS so I can ask 'which vans are near Yaba?' without spinning up another service.",
    href: "/lab",
  },
  {
    id: "ADR-002",
    date: "2024 — Q3",
    title: "Monolith first, microservices when earned",
    excerpt:
      "Everyone wants microservices until they're paged for a partition they created. At our size, a modular monolith let the real seams show themselves — like letting a Sicilian structure tell you where to attack, not deciding on move 2.",
    href: "/lab",
  },
  {
    id: "ADR-004",
    date: "2025 — Q1",
    title: "K8s on AKS — because SSH and hope doesn't scale",
    excerpt:
      "I used to deploy with bash and prayer. Helm + ArgoCD made git the source of truth — every deploy a commit, every rollback a revert. YAML tax is real, but so is sleeping through the night.",
    href: "/lab",
  },
];

export default function Thinking() {
  return (
    <section id="thinking" className="py-32 md:py-40 section-padding bg-surface-50 dark:bg-surface-950">
      <div className="max-w-7xl mx-auto">
        <span className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4 block">Thinking</span>
        <h2 className="font-display text-display-lg mb-4">
          How I <em className="italic text-accent">think</em>
        </h2>
        <p className="font-body text-sm leading-[1.7] opacity-60 max-w-[58ch] mb-12">
          I write ADRs the way I annotate chess games — not to show the best move, but to remember <em className="italic">why</em> I thought it was best at the time.
          Future me is my toughest reviewer, so I leave the receipts.
        </p>

        <div className="space-y-4">
          {notes.map((n) => (
            <a
              key={n.id}
              href={n.href}
              className="group flex items-start justify-between gap-6 p-6 border border-black/[0.06] dark:border-white/[0.06] rounded-sm
                bg-white/50 dark:bg-white/[0.02] hover:border-accent/20 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-body text-[11px] tracking-[0.15em] uppercase opacity-50">{n.id}</span>
                  <span className="w-1 h-1 rounded-full bg-accent/50" />
                  <span className="font-body text-[11px] tracking-[0.15em] uppercase opacity-50">{n.date}</span>
                </div>
                <h3 className="font-display text-xl leading-[1.3] group-hover:text-accent transition-colors">{n.title}</h3>
                <p className="font-body text-sm leading-[1.6] opacity-60 mt-2 max-w-[60ch]">{n.excerpt}</p>
              </div>
              <span className="hidden sm:inline font-body text-[11px] tracking-[0.15em] uppercase opacity-60 group-hover:opacity-100 shrink-0 mt-1">Read →</span>
            </a>
          ))}
        </div>

        <div className="mt-8">
          <a
            href="/lab"
            className="inline-flex items-center gap-2 font-body text-[12px] tracking-[0.15em] uppercase opacity-60 hover:opacity-100 hover:text-accent transition-all"
          >
            Open lab — system designs, SRE, DevOps notes →
          </a>
        </div>
      </div>
    </section>
  );
}
