import React from "react";
import {
    IoConstructOutline,
    IoCodeOutline,
    IoPhonePortraitOutline,
    IoDocumentTextOutline,
    IoCloseOutline,
    IoSettings,
    IoSettingsOutline,
    IoServerOutline,
    IoDesktopOutline,
    IoGlobeOutline,
} from "react-icons/io5";

const About = ({ active }) => {
    return (
        <article className={`about ${active ? "active" : ""}`} data-page="about">
            <header>
                <h2 className="h2 article-title">About me</h2>
            </header>

            <section className="about-text">
                <p>
                    I'm Jason, a passionate Full-Stack Developer with expertise in building scalable, client-focused web
                    applications. With experience in both frontend and backend technologies, I specialize in creating
                    comprehensive solutions from concept to deployment.
                </p>
                <p>
                    Proficient in modern web technologies including React, React Native, Node.js, and the MERN stack. I
                    have experience developing Document Management Systems, mobile applications, and Web3 solutions. My
                    approach focuses on performance optimization, maintainability, and delivering exceptional user
                    experiences that meet client requirements.
                </p>
            </section>

            <section className="service">
                <h3 className="h3 service-title">What I'm doing</h3>
                <ul className="service-list">
                    <li className="service-item">
                        <div className="service-icon-box">
                            <IoDesktopOutline style={{ color: "hsl(123, 100%, 72%)", fontSize: "24px" }} />
                        </div>
                        <div className="service-content-box">
                            <h4 className="h4 service-item-title">Frontend Development</h4>
                            <p className="service-item-text">
                                Building responsive, interactive user interfaces with React, React Native, and Tailwind
                                CSS.
                            </p>
                        </div>
                    </li>
                    <li className="service-item">
                        <div className="service-icon-box">
                            <IoCodeOutline style={{ color: "hsl(123, 100%, 72%)", fontSize: "24px" }} />
                        </div>
                        <div className="service-content-box">
                            <h4 className="h4 service-item-title">Backend Development</h4>
                            <p className="service-item-text">
                                Developing robust server-side applications using Node.js, Express.js, and NestJS.
                            </p>
                        </div>
                    </li>
                    <li className="service-item">
                        <div className="service-icon-box">
                            <IoPhonePortraitOutline style={{ color: "hsl(123, 100%, 72%)", fontSize: "24px" }} />
                        </div>
                        <div className="service-content-box">
                            <h4 className="h4 service-item-title">Mobile Development</h4>
                            <p className="service-item-text">
                                Creating cross-platform mobile applications using React Native for iOS and Android.
                            </p>
                        </div>
                    </li>
                    <li className="service-item">
                        <div className="service-icon-box">
                            <IoGlobeOutline style={{ color: "hsl(123, 100%, 72%)", fontSize: "24px" }} />
                        </div>
                        <div className="service-content-box">
                            <h4 className="h4 service-item-title">Web3 Development</h4>
                            <p className="service-item-text">
                                Building decentralized applications with Solidity and Solana blockchain technologies.
                            </p>
                        </div>
                    </li>
                </ul>
            </section>
        </article>
    );
};

export default About;
