import { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { notes } from "../../data/lab/notes";
import SearchBar from "./SearchBar";
import FilterChips from "./FilterChips";
import ExpandableCard from "./ExpandableCard";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { value: "all", label: "All" },
  { value: "backend", label: "Backend" },
  { value: "frontend", label: "Frontend" },
  { value: "architecture", label: "Architecture" },
  { value: "security", label: "Security" },
];

export default function EngineeringNotes() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const filtered = useMemo(() => {
    return notes.filter((note) => {
      const matchesCategory = category === "all" || note.category === category;
      const matchesSearch =
        !search ||
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase()) ||
        note.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="lab-notes" ref={sectionRef} className="py-24 md:py-32 section-padding bg-surface-50 dark:bg-surface-950">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef}>
          <span className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
            Engineering Notes
          </span>
          <h2 className="font-display text-display-lg mb-6">
            How I <em className="italic text-accent">think</em>
          </h2>
          <p className="font-body text-sm opacity-40 max-w-xl mb-10 leading-relaxed">
            Technical notes on backend, frontend, architecture, and security —
            patterns, principles, and practical knowledge.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search notes..."
          />
          <FilterChips options={categories} active={category} onChange={setCategory} />
        </div>

        {filtered.length === 0 ? (
          <p className="font-body text-sm opacity-30 py-12 text-center">
            No notes match your search.
          </p>
        ) : (
          <div className="space-y-4">
            {filtered.map((note) => (
              <ExpandableCard
                key={note.id}
                title={note.title}
                subtitle={note.category}
                tags={note.tags}
              >
                <p className="font-body text-sm opacity-55 leading-relaxed">
                  {note.content}
                </p>
              </ExpandableCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
