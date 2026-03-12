import React, { useEffect, useRef, useState } from "react";
import { IoLogoGithub } from "react-icons/io5";

const projects = [
  {
    title: "DocFlow",
    category: "UI",
    description:
      "An AI workflow documentation platform for recording browser flows, generating operational documents, organizing outputs, and supporting shared workspace collaboration.",
    link: "https://github.com/Jasowills/docflow",
  },
  {
    title: "Neuron - meet",
    category: "UI",
    description:
      "Real-time video conferencing with WebRTC, React, and NestJS.",
    link: "https://github.com/Jasowills/Neuron-meet",
  },
  {
    title: "Resortify",
    category: "API",
    description:
      "A hotel reservation system built as a capstone project for the Thinkful curriculum, covering bookings, room availability, and customer reservations.",
    link: "https://github.com/Jasowills/Resortify-hotel-reservation-system",
  },
  {
    title: "MedPay Tracka Backend",
    category: "API",
    description:
      "A financial tracking backend API for managing income, expenses, analytics, and reporting in personal finance applications.",
    link: "https://github.com/Jasowills/medpay-tracka-backend",
  },
  {
    title: "Wayfarer - Backend",
    category: "API",
    description:
      "A backend API for a public bus transportation booking system that handles trip management, booking flows, and rider operations.",
    link: "https://github.com/Jasowills/Wayfarer-backend",
  },
];

const Projects = ({ active }) => {
  const [filter, setFilter] = useState("all");
  const selectRef = useRef(null);
  const selectValueRef = useRef(null);
  const filterItemsRef = useRef([]);

  useEffect(() => {
    const handleSelectClick = () => {
      selectRef.current?.classList.toggle("active");
    };

    const selectElement = selectRef.current;
    selectElement?.addEventListener("click", handleSelectClick);

    return () => {
      selectElement?.removeEventListener("click", handleSelectClick);
    };
  }, []);

  useEffect(() => {
    filterItemsRef.current.forEach((item) => {
      if (!item) return;

      if (filter === "all" || filter === item.dataset.category) {
        item.classList.add("active");
        return;
      }

      item.classList.remove("active");
    });
  }, [filter]);

  const handleSelectItemClick = (selectedValue) => {
    if (selectValueRef.current) {
      selectValueRef.current.innerText = selectedValue;
    }

    setFilter(selectedValue.toLowerCase());
    selectRef.current?.classList.remove("active");
  };

  return (
    <article
      className={`page ${active ? "active" : ""}`}
      data-page="Projects"
    >
      <header>
        <h2 className="h2 article-title">Projects</h2>
      </header>

      <section className="projects">
        <div className="filter-select-box">
          <button className="filter-select" data-select ref={selectRef}>
            <div
              className="select-value"
              data-select-value
              ref={selectValueRef}
            >
              Select category
            </div>
            <div className="select-icon">
              <ion-icon name="chevron-down"></ion-icon>
            </div>
          </button>
        </div>

        <ul className="filter-list">
          {["All", "API", "UI"].map((category) => (
            <li key={category} className="filter-item">
              <button type="button" onClick={() => handleSelectItemClick(category)}>
                {category}
              </button>
            </li>
          ))}
        </ul>

        <ul className="service-list">
          {projects.map((project, index) => (
            <li
              key={project.title}
              className="service-item"
              data-filter-item
              data-category={project.category.toLowerCase()}
              ref={(el) => {
                filterItemsRef.current[index] = el;
              }}
            >
              <div className="service-icon-box">
                <IoLogoGithub
                  style={{ color: "hsl(123, 100%, 72%)", fontSize: "24px" }}
                />
              </div>
              <div className="service-content-box">
                <h3 className="service-item-title h4">{project.title}</h3>
                <p className="service-item-text">{project.description}</p>
                <br />
                <div className="project-links">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <ul className="filter-list">
          <a href="https://github.com/jasowills">
            <li className="filter-item">View More</li>
          </a>
        </ul>
      </section>
    </article>
  );
};

export default Projects;
