import { useState, useRef, useEffect } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

export default function ExpandableCard({
  title,
  subtitle,
  tags = [],
  children,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div
      className={`border border-black/[0.06] dark:border-white/[0.06] rounded-sm
        transition-all duration-500 ${
          open
            ? "bg-surface-100/40 dark:bg-white/[0.03] border-accent/15"
            : "bg-white/[0.01] dark:bg-white/[0.01] hover:border-accent/10"
        }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-lg md:text-xl mb-1">{title}</h4>
          {subtitle && (
            <p className="font-body text-sm opacity-40 leading-relaxed">
              {subtitle}
            </p>
          )}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase
                    border border-black/[0.06] dark:border-white/[0.06] opacity-40 rounded-sm font-body"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <IoChevronDownOutline
          size={16}
          className={`shrink-0 mt-1 opacity-30 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        style={{ maxHeight: height }}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
      >
        <div ref={contentRef} className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
          <div className="border-t border-black/[0.04] dark:border-white/[0.04] pt-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
