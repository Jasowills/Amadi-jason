export default function FilterChips({ options, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isActive = active === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-4 py-1.5 font-body text-[11px] tracking-[0.15em] uppercase rounded-sm
              border transition-all duration-300 ${
                isActive
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-black/[0.06] dark:border-white/[0.06] opacity-40 hover:opacity-70 hover:border-accent/20"
              }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
