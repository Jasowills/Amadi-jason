interface AnnotationMarkProps {
  mark: string;
}

// The big chess annotation marks beside projects, like a scribbled
// game score. Decorative only; screen readers skip them.
export default function AnnotationMark({ mark }: AnnotationMarkProps) {
  return (
    <span className="annotation-mark" aria-hidden="true">
      {mark}
    </span>
  );
}
