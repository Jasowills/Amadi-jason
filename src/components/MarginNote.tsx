import { useEffect, useRef, type ReactNode } from "react";

interface MarginNoteProps {
  children: ReactNode;
  rotate?: number;
  bracket?: boolean;
}

const clampRotate = (value: number) =>
  Math.max(-4, Math.min(4, value));

// A handwritten note in blue pen. On wide screens it hangs in the right
// gutter beside its target; on narrow screens it drops below the target
// with a small left-pointing arrow. The bracket and arrow draw themselves
// in once when scrolled into view.
export default function MarginNote({
  children,
  rotate = -1.5,
  bracket = false,
}: MarginNoteProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      node.classList.add("drawn");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add("drawn");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className="margin-note"
      style={{ transform: `rotate(${clampRotate(rotate)}deg)` }}
    >
      <svg
        className="note-lead draw"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M13.5 9.6 C10.4 9.2 6.8 9.4 3.2 9.5" />
        <path d="M7 5 C5.5 6.2 4.3 7.8 3.1 9.4 C4.4 11 5.6 12.3 7 13.7" />
      </svg>
      {bracket && (
        <svg
          className="note-bracket draw"
          width="18"
          height="58"
          viewBox="0 0 18 58"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M13.5 3 C9.5 3 8.5 6.5 8.5 12.5 L8.5 22 C8.5 25.5 7.6 28 3.5 28.5 C7.6 29 8.5 31.5 8.5 35.5 L8.5 45.5 C8.5 51.5 9.5 55 13.5 55" />
        </svg>
      )}
      <span className="note-text">{children}</span>
    </span>
  );
}
