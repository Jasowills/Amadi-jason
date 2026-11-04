interface ArrowProps {
  direction?: "right" | "up-right" | "left";
  size?: number;
  className?: string;
}

// Hand-drawn arrows. Stroke only, round caps, meant to sit beside text.
export default function Arrow({
  direction = "right",
  size = 14,
  className,
}: ArrowProps) {
  const paths = {
    right: (
      <>
        <path d="M2.5 7.5 C5.6 7.1 9 7.4 13.2 7.3" />
        <path d="M9.6 3.3 C11.1 4.6 12.3 6 13.6 7.4 C12.2 8.9 10.9 10.2 9.4 11.6" />
      </>
    ),
    "up-right": (
      <>
        <path d="M3 11.5 C6.2 9.2 9.1 6.4 12.6 2.8" />
        <path d="M6.8 2.6 C9 2.4 10.9 2.4 13 2.5 C13 4.7 13 6.7 13 9" />
      </>
    ),
    left: (
      <>
        <path d="M13.5 8.2 C10.4 7.8 7 8 2.8 7.9" />
        <path d="M6.3 3.9 C4.8 5.2 3.5 6.7 2.2 8.1 C3.6 9.6 4.9 11 6.4 12.4" />
      </>
    ),
  }[direction];

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths}
    </svg>
  );
}
