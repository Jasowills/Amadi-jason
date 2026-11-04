import { roles } from "../data/work";
import SectionLabel from "./SectionLabel";

// Where I've worked. Text rows, hairline separators, details expand in
// place.
export default function WorkSection() {
  return (
    <section className="section" aria-labelledby="worked">
      <SectionLabel id="worked" title="Where I've worked" />

      <div className="work-list">
        {roles.map((role) => (
          <div key={role.id} className="work-row">
            <div className="work-head">
              <h3 className="work-title">
                {role.company}, {role.role}
              </h3>
              <p className="work-dates">
                <span className="work-location">{role.location}</span>
                {role.period}
              </p>
            </div>
            <p className="work-summary">{role.summary}</p>
            <details className="work-details">
              <summary>
                Read the details
                <svg
                  className="work-chevron"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 6.5 L8 10.5 L12 6.5" />
                </svg>
              </summary>
              <ul>
                {role.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </details>
          </div>
        ))}
      </div>
    </section>
  );
}
