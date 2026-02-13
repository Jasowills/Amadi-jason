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
              Developed and maintained scalable, client-focused web
              applications. Collaborated with cross-functional teams for
              performance-optimized solutions. Ensured high usability, long-term
              maintainability, and seamless deployments.
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
              Built a robust Document Management System (DMS) using the MERN
              stack. Integrated secure file handling, role-based access, and
              dynamic workflow UI. Delivered an efficient and scalable solution
              tailored to client operations.
            </p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">
              Full-Stack & Mobile Developer
            </h4>
            <div className="flex item-center">
              <a className="h4" href="#">
                Freelance | &nbsp;
              </a>
              <span className="mx-2 my-1 text-sm">Jul - Aug 2023</span>
            </div>
            <p className="timeline-text">
              Designed and deployed a full-stack solution from concept to
              production. Managed all stages of development and ensured client
              satisfaction.
            </p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">
              Frontend Developer (Intern)
            </h4>
            <div className="flex item-center">
              <a className="h4" href="#">
                HNG Internship | &nbsp;
              </a>
              <span className="mx-2 my-1 text-sm">Sep - Oct 2023</span>
            </div>
            <p className="timeline-text">
              Contributed to live frontend projects under industry mentor
              supervision. Improved hands-on experience in React and agile team
              collaboration. Applied modern development best practices in
              real-world scenarios.
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
            <h4 className="h4 timeline-item-title">
              JavaScript Algorithms and Data Structures
            </h4>
            <span>freeCodeCamp</span>
            <p className="timeline-text">
              Comprehensive course covering JavaScript fundamentals, algorithms,
              and data structures.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">
              Frontend Development Libraries
            </h4>
            <span>freeCodeCamp</span>
            <p className="timeline-text">
              Advanced frontend development using modern libraries and
              frameworks.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">
              Backend Development and APIs
            </h4>
            <span>freeCodeCamp</span>
            <p className="timeline-text">
              Backend development fundamentals and API design principles.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">
              Web3 Full-Stack Development (Solana & Rust)
            </h4>
            <span>Certification Program</span>
            <p className="timeline-text">
              Specialized training in Solana blockchain development using Rust.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">
              Web3 Full-Stack Development (Solidity)
            </h4>
            <span>Certification Program</span>
            <p className="timeline-text">
              Ethereum blockchain development with Solidity smart contracts.
            </p>
          </li>
        </ol>
      </section>

      <section className="skill">
        <h3 className="h3 skills-title">My Skills</h3>
        <ul className="skills-list content-card">
          {/* Languages */}
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Languages</h5>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="icon-box" title="TypeScript">
                <a
                  href="https://www.typescriptlang.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
                    alt="TypeScript"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
              <div className="icon-box" title="JavaScript">
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
                    alt="JavaScript"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
              <div className="icon-box" title="Python">
                <a
                  href="https://www.python.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
                    alt="Python"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
              <div className="icon-box" title="Rust">
                <a
                  href="https://www.rust-lang.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg"
                    alt="Rust"
                    width="35"
                    height="35"
                    className="rounded-md"
                    style={{ filter: "invert(1)" }}
                  />
                </a>
              </div>
            </div>
          </li>

          {/* Frontend */}
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Frontend</h5>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="icon-box" title="React">
                <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
                    alt="React"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
              <div className="icon-box" title="React Native">
                <a
                  href="https://reactnative.dev/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
                    alt="React Native"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
              <div className="icon-box" title="Next.js">
                <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
                    alt="Next.js"
                    width="35"
                    height="35"
                    className="rounded-md"
                    style={{ filter: "invert(1)" }}
                  />
                </a>
              </div>
              <div className="icon-box" title="Flutter">
                <a href="https://flutter.dev/" target="_blank" rel="noreferrer">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg"
                    alt="Flutter"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
              <div className="icon-box" title="Tailwind CSS">
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
                    alt="Tailwind CSS"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
              <div className="icon-box" title="Three.js">
                <a href="https://threejs.org/" target="_blank" rel="noreferrer">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg"
                    alt="Three.js"
                    width="35"
                    height="35"
                    className="rounded-md"
                    style={{ filter: "invert(1)" }}
                  />
                </a>
              </div>
              <div className="icon-box" title="Redux">
                <a
                  href="https://redux.js.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg"
                    alt="Redux"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
            </div>
          </li>

          {/* Backend */}
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Backend</h5>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="icon-box" title="Node.js">
                <a href="https://nodejs.org" target="_blank" rel="noreferrer">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
                    alt="Node.js"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
              <div className="icon-box" title="Express.js">
                <a
                  href="https://expressjs.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"
                    alt="Express.js"
                    width="35"
                    height="35"
                    className="rounded-md"
                    style={{ filter: "invert(1)" }}
                  />
                </a>
              </div>
              <div className="icon-box" title="NestJS">
                <a href="https://nestjs.com/" target="_blank" rel="noreferrer">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg"
                    alt="NestJS"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
            </div>
          </li>

          {/* Database */}
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Database</h5>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="icon-box" title="MongoDB">
                <a
                  href="https://www.mongodb.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
                    alt="MongoDB"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
              <div className="icon-box" title="PostgreSQL">
                <a
                  href="https://www.postgresql.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
                    alt="PostgreSQL"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
              <div className="icon-box" title="SQL">
                <a
                  href="https://www.w3schools.com/sql/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
                    alt="SQL"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
            </div>
          </li>

          {/* Cloud & DevOps */}
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Cloud & DevOps</h5>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="icon-box" title="AWS">
                <a
                  href="https://aws.amazon.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
                    alt="AWS"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
              <div className="icon-box" title="Azure DevOps">
                <a
                  href="https://azure.microsoft.com/en-us/products/devops"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuredevops/azuredevops-original.svg"
                    alt="Azure DevOps"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
              <div className="icon-box" title="Vercel">
                <a href="https://vercel.com/" target="_blank" rel="noreferrer">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg"
                    alt="Vercel"
                    width="35"
                    height="35"
                    className="rounded-md"
                    style={{ filter: "invert(1)" }}
                  />
                </a>
              </div>
              <div className="icon-box" title="Docker">
                <a
                  href="https://www.docker.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
                    alt="Docker"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
              <div className="icon-box" title="Git">
                <a href="https://git-scm.com/" target="_blank" rel="noreferrer">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
                    alt="Git"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
            </div>
          </li>

          {/* Tools */}
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Tools</h5>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="icon-box" title="Linux">
                <a
                  href="https://www.linux.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
                    alt="Linux"
                    width="35"
                    height="35"
                    className="rounded-md"
                  />
                </a>
              </div>
              <div className="icon-box" title="Bash">
                <a
                  href="https://www.gnu.org/software/bash/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg"
                    alt="Bash"
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
