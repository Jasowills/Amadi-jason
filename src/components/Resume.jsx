import React from "react";
import { IoBookOutline, IoDownloadOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";

const Resume = ({ active }) => {
    return (
        <article className={`resume ${active ? "active" : ""}`} data-page="Resume">
            <header className="flex">
                <h2 className="h2 article-title">Resume</h2> &nbsp;&nbsp;&nbsp;
                <a
                    download="Amadi_Jason_Resume.pdf"
                    target="_blank"
                    href="https://docs.google.com/document/d/1mG4VK4aWVfwfT3rkc6cT4VVvudSlzKNf/export?format=pdf"
                    className="icon-box my-2 sm:my-3 mx-3 h-7 w-7 cursor-pointer"
                >
                    <IoDownloadOutline className="invert h-5 w-5" />
                </a>
            </header>

            <section className="timeline">
                <div className="title-wrapper">
                    <div className="icon-box">
                        <IoBookOutline />
                    </div>
                    <h3 className="h3">Experience</h3>
                </div>
                <ol className="timeline-list">
                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">Full-Stack Developer</h4>
                        <div className="flex item-center">
                            <a className="h4" href="#">
                                Marklite | &nbsp;
                            </a>
                            <span className="mx-2 my-1 text-sm">Jan 2025 - Present</span>
                        </div>
                        <p className="timeline-text">
                            Developed and maintained scalable, client-focused web applications. Collaborated with
                            cross-functional teams for performance-optimized solutions. Ensured high usability,
                            long-term maintainability, and seamless deployments.
                        </p>
                    </li>

                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">Full-Stack Developer</h4>
                        <div className="flex item-center">
                            <a className="h4" href="#">
                                Freelance | &nbsp;
                            </a>
                            <span className="mx-2 my-1 text-sm">Oct 2023 - Aug 2024</span>
                        </div>
                        <p className="timeline-text">
                            Built a robust Document Management System (DMS) using the MERN stack. Integrated secure file
                            handling, role-based access, and dynamic workflow UI. Delivered an efficient and scalable
                            solution tailored to client operations.
                        </p>
                    </li>

                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">Full-Stack & Mobile Developer</h4>
                        <div className="flex item-center">
                            <a className="h4" href="#">
                                Freelance | &nbsp;
                            </a>
                            <span className="mx-2 my-1 text-sm">Jul - Aug 2023</span>
                        </div>
                        <p className="timeline-text">
                            Designed and deployed a full-stack solution from concept to production. Managed all stages
                            of development and ensured client satisfaction.
                        </p>
                    </li>

                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">Frontend Developer (Intern)</h4>
                        <div className="flex item-center">
                            <a className="h4" href="#">
                                HNG Internship | &nbsp;
                            </a>
                            <span className="mx-2 my-1 text-sm">Sep - Oct 2023</span>
                        </div>
                        <p className="timeline-text">
                            Contributed to live frontend projects under industry mentor supervision. Improved hands-on
                            experience in React and agile team collaboration. Applied modern development best practices
                            in real-world scenarios.
                        </p>
                    </li>
                </ol>
            </section>

            <section className="timeline">
                <div className="title-wrapper">
                    <div className="icon-box">
                        <IoDocumentTextOutline />
                    </div>
                    <h3 className="h3">Certifications</h3>
                </div>
                <ol className="timeline-list">
                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">JavaScript Algorithms and Data Structures</h4>
                        <span>freeCodeCamp</span>
                        <p className="timeline-text">
                            Comprehensive course covering JavaScript fundamentals, algorithms, and data structures.
                        </p>
                    </li>
                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">Frontend Development Libraries</h4>
                        <span>freeCodeCamp</span>
                        <p className="timeline-text">
                            Advanced frontend development using modern libraries and frameworks.
                        </p>
                    </li>
                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">Backend Development and APIs</h4>
                        <span>freeCodeCamp</span>
                        <p className="timeline-text">Backend development fundamentals and API design principles.</p>
                    </li>
                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">Web3 Full-Stack Development (Solana & Rust)</h4>
                        <span>Certification Program</span>
                        <p className="timeline-text">
                            Specialized training in Solana blockchain development using Rust.
                        </p>
                    </li>
                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">Web3 Full-Stack Development (Solidity)</h4>
                        <span>Certification Program</span>
                        <p className="timeline-text">Ethereum blockchain development with Solidity smart contracts.</p>
                    </li>
                </ol>
            </section>

            <section className="skill">
                <h3 className="h3 skills-title">My skills</h3>
                <ul className="skills-list content-card">
                    <li className="skills-item">
                        <div className="title-wrapper">
                            <h5 className="h5">Languages</h5>
                        </div>
                        <div className="flex">
                            <div className="icon-box">
                                <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://www.typescriptlang.org/assets/images/icons/apple-touch-icon.png"
                                        alt="typescript"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                            &nbsp;
                            <div className="icon-box">
                                <a
                                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                                        alt="javascript"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                            &nbsp;
                            <div className="icon-box">
                                <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
                                        alt="postgresql"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="skills-item">
                        <div className="title-wrapper">
                            <h5 className="h5">Frontend</h5>
                        </div>
                        <div className="flex">
                            <div className="icon-box">
                                <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                                        alt="react"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                            &nbsp;
                            <div className="icon-box">
                                <a href="https://reactnative.dev/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                                        alt="react native"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                            &nbsp;
                            <div className="icon-box">
                                <a href="https://flutter.dev/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png"
                                        alt="flutter"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                            &nbsp;
                            <div className="icon-box" style={{ backgroundColor: "white" }}>
                                <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
                                        alt="next.js"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="skills-item">
                        <div className="title-wrapper">
                            <h5 className="h5">Backend</h5>
                        </div>
                        <div className="flex">
                            <div className="icon-box">
                                <a href="https://nodejs.org" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
                                        alt="nodejs"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                            &nbsp;
                            <div className="icon-box">
                                <a href="https://expressjs.com" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png"
                                        alt="express"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                            &nbsp;
                            <div className="icon-box">
                                <a href="https://nestjs.com/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://nestjs.com/img/logo_text.svg"
                                        alt="nestjs"
                                        width="100"
                                        height="35"
                                        style={{ objectFit: "contain" }}
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="skills-item">
                        <div className="title-wrapper">
                            <h5 className="h5">Database</h5>
                        </div>
                        <div className="flex">
                            <div className="icon-box">
                                <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg"
                                        alt="mongodb"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                            &nbsp;
                            <div className="icon-box">
                                <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
                                        alt="postgresql"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                            &nbsp;
                            <div className="icon-box">
                                <a href="https://www.w3schools.com/sql/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://img.icons8.com/color/48/000000/sql.png"
                                        alt="sql"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="skills-item">
                        <div className="title-wrapper">
                            <h5 className="h5">DevOps & Tools</h5>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="icon-box">
                                <a href="https://git-scm.com/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png"
                                        alt="git"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                            &nbsp;
                            <div className="icon-box">
                                <a
                                    href="https://azure.microsoft.com/en-us/products/devops"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Microsoft_Azure_Logo.svg"
                                        alt="azure devops"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                            &nbsp;
                            <div className="icon-box">
                                <a href="https://aws.amazon.com/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                                        alt="aws"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                        style={{ backgroundColor: "white" }}
                                    />
                                </a>
                            </div>
                            &nbsp;
                            <div className="icon-box">
                                <a href="https://vercel.com/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Vercel_logo.svg"
                                        alt="vercel"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                            &nbsp;
                            <div className="icon-box">
                                <a href="https://www.linux.org/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"
                                        alt="linux"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                            &nbsp;
                            <div className="icon-box">
                                <a href="https://www.gnu.org/software/bash/" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Bash_Logo_Colored.svg"
                                        alt="shell"
                                        width="35"
                                        height="35"
                                        className="rounded-md"
                                    />
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </article>
    );
};

export default Resume;
