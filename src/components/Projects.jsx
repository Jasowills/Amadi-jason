import React, { useEffect, useRef, useState } from "react";
import { IoConstructOutline, IoGitBranchOutline, IoLogoGithub } from "react-icons/io5";

const Projects = ({ active }) => {
    const [filter, setFilter] = useState("all");
    const [activeButton, setActiveButton] = useState("All");
    const selectRef = useRef(null);
    const selectValueRef = useRef(null);
    const filterItemsRef = useRef([]);

    useEffect(() => {
        const elementToggleFunc = (elem) => {
            elem.classList.toggle("active");
        };

        const handleSelectClick = () => {
            elementToggleFunc(selectRef.current);
        };

        const handleSelectItemClick = (selectedValue) => {
            selectValueRef.current.innerText = selectedValue;
            setFilter(selectedValue.toLowerCase());
            elementToggleFunc(selectRef.current);
        };

        const handleFilterBtnClick = (selectedValue) => {
            setFilter(selectedValue.toLowerCase());
            setActiveButton(selectedValue);
        };

        // Attach event listeners to select box
        selectRef.current.addEventListener("click", handleSelectClick);

        // Cleanup event listeners on unmount
        return () => {
            selectRef.current.removeEventListener("click", handleSelectClick);
        };
    }, []);

    useEffect(() => {
        const filterFunc = () => {
            filterItemsRef.current.forEach((item) => {
                if (filter === "all") {
                    item.classList.add("active");
                } else if (filter === item.dataset.category) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            });
        };

        filterFunc();
    }, [filter]);

    return (
        <article className={`page ${active ? "active" : ""}`} data-page="Projects">
            <header>
                <h2 className="h2 article-title">Projects</h2>
            </header>

            <section className="projects">
                <div className="filter-select-box">
                    <button className="filter-select" data-select ref={selectRef}>
                        <div className="select-value" data-select-value ref={selectValueRef}>
                            Select category
                        </div>
                        <div className="select-icon">
                            <ion-icon name="chevron-down"></ion-icon>
                        </div>
                    </button>
                </div>

                <ul className="service-list">
                    {[
                        {
                            title: "Resortify",
                            category: "API",
                            description:
                                "A comprehensive hotel reservation system built as a capstone project for the Thinkful curriculum. Resortify provides a complete solution for managing hotel bookings, room availability, and customer reservations.",
                            link: "https://github.com/Jasowills/Resortify-hotel-reservation-system",
                        },
                        {
                            title: "MedPay Tracka Backend",
                            category: "API",
                            description:
                                " A comprehensive financial tracking backend API that enables users to manage their income and expenses with detailed analytics and insights. Built for personal finance management and expense tracking applications.",
                            link: "hhttps://github.com/Jasowills/medpay-tracka-backend",
                        },
                        {
                            title: "Wayfarer - Backend ",
                            category: "API",
                            description:
                                "Wayfarer Backend is a server-side application for a public bus transportation booking system. The system serves as a backend API that enables users to book bus trips conveniently from anywhere hotel-management-system · GitHub Topics · GitHub +2, making public transportation more accessible and user-friendly.",
                            link: "https://github.com/Jasowills/Wayfarer-backend",
                        },
                        {
                            title: "Neuron - Resume Builder",
                            category: "UI",
                            description:
                                "A modern, intuitive web application that empowers users to create professional resumes effortlessly. Built with React.js,",
                            link: "https://github.com/Jasowills/Neuron-s-Resume-builder",
                        },
                    ].map((project, index) => (
                        <li
                            key={index}
                            className="service-item"
                            data-filter-item
                            data-category={project.category}
                            ref={(el) => (filterItemsRef.current[index] = el)}
                        >
                            <div className="service-icon-box">
                                <IoLogoGithub style={{ color: "hsl(123, 100%, 72%)", fontSize: "24px" }} />
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
