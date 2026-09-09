import React, { useEffect } from "react";
import {
    IoLogoLinkedin,
    IoLogoTwitter,
    IoLogoGithub,
    IoMailOutline,
    IoPhonePortraitOutline,
    IoCalendarOutline,
    IoLocationOutline,
    IoChevronDown,
} from "react-icons/io5";
import image from "../assets/pic.png";

const Sidebar = () => {
    useEffect(() => {
        // Sidebar toggle functionality
        const sidebarBtn = document.querySelector("[data-sidebar-btn]");
        const sidebar = document.querySelector("[data-sidebar]");

        const elementToggleFunc = function (elem) {
            elem.classList.toggle("active");
        };

        if (sidebarBtn && sidebar) {
            sidebarBtn.addEventListener("click", function () {
                elementToggleFunc(sidebar);
            });

            // Cleanup function to remove event listener
            return () => {
                sidebarBtn.removeEventListener("click", function () {
                    elementToggleFunc(sidebar);
                });
            };
        }
    }, []); // Empty dependency array means this effect runs only once after initial render

    return (
        <aside className="sidebar" data-sidebar>
            <div className="sidebar-info">
                <figure className="avatar-box">
                    <img src={image} className="rounded-xl" alt="Amadi Jason Onyedikachi" />
                </figure>

                <div className="info-content">
                    <h1 className="name" title="Amadi Jason Onyedikachi">
                        Amadi Jason 
                    </h1>
                    <div className="flex items-center">
                        <p className="title">Software Developer</p>
                    </div>
                    <br />
                    <ul className="social-list py-4">
                        <li className="social-item">
                            <a
                                href="https://ng.linkedin.com/in/jason-amadi-86b306303"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <IoLogoLinkedin />
                            </a>
                        </li>

                        <li className="social-item">
                            <a
                                href="https://github.com/Jasowills"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <IoLogoGithub />
                            </a>
                        </li>

                       
                    </ul>
                </div>

                <button className="info_more-btn" data-sidebar-btn>
                    <span>Show Contacts</span>
                    <IoChevronDown />
                </button>
            </div>

            <div className="sidebar-info_more">
                <div className="separator"></div>

                <ul className="contacts-list">
                    <li className="contact-item">
                        <div className="icon-box">
                            <IoMailOutline />
                        </div>
                        <div className="contact-info">
                            <p className="contact-title">Email</p>
                            <a href="mailto:jasowills01@gmail.com" className="contact-link">
                                jasowills01@gmail.com
                            </a>
                        </div>
                    </li>

                    <li className="contact-item">
                        <div className="icon-box">
                            <IoPhonePortraitOutline />
                        </div>
                        <div className="contact-info">
                            <p className="contact-title">Phone</p>
                            <a href="tel:+2347076029651" className="contact-link">
                                +234 707 602 9651
                            </a>
                        </div>
                    </li>

                    <li className="contact-item">
                        <div className="icon-box">
                            <IoLocationOutline />
                        </div>
                        <div className="contact-info">
                            <p className="contact-title">Location</p>
                            <address>Lagos, Nigeria</address>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
