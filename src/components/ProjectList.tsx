import { projects } from "../data/projects";
import SectionLabel from "./SectionLabel";
import AnnotationMark from "./AnnotationMark";
import Arrow from "./Arrow";

// The project list. Hairline-separated text rows, each expandable in
// place. Every row renders at full opacity.
export default function ProjectList() {
  return (
    <section className="section" aria-labelledby="built">
      <SectionLabel
        id="built"
        title="Things I've built"
        note="annotated like my games"
      />

      <div className="projects">
        {projects.map((project) => (
          <details key={project.id} className="project">
            <summary className="project-summary">
              <img
                className="project-logo"
                src={project.logo}
                alt={`${project.name} logo`}
                width={40}
                height={40}
              />
              <span>
                <h3 className="project-name">
                  {project.repoUrl || project.liveUrl ? (
                    <a
                      className="u-link"
                      href={project.repoUrl ?? project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                <p className="project-oneliner">{project.oneLiner}</p>
                {project.tags && (
                  <p className="project-tags">{project.tags.join(", ")}</p>
                )}
              </span>
              <AnnotationMark mark={project.mark} />
              <svg
                className="project-chevron"
                width="16"
                height="16"
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

            <div className="project-detail">
              <img
                className="project-logo-lg"
                src={project.logo}
                alt=""
                width={72}
                height={72}
              />
              <div>
                <p>{project.description}</p>
                <p className="project-stack">
                  <strong>Stack:</strong> {project.stack.join(", ")}
                </p>
                {(project.repoUrl || project.liveUrl) && (
                  <div className="project-links">
                    {project.repoUrl && (
                      <a
                        className="u-link"
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Repository
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        className="u-link"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live site
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </details>
        ))}
      </div>

      <p className="list-foot">
        <a
          className="u-link arrow-link"
          href="https://github.com/jasowills"
          target="_blank"
          rel="noopener noreferrer"
        >
          All projects on GitHub
          <Arrow direction="up-right" size={13} />
        </a>
      </p>
    </section>
  );
}
