import React from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";
const Contact = ({ active }) => {
    const handleMailClick = () => {
        window.location.href = "mailto:Jasowills01gmail.com";
    };

    return (
        <article className={`contact ${active ? "active" : ""}`} data-page="contact">
            <header>
                <h2 className="h2 article-title">Contact</h2>
            </header>

            <section className="mapbox" data-mapbox>
                <figure>
                    <iframe
                        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Nigeria+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        width="400"
                        height="300"
                        loading="lazy"
                        title="Google Maps"
                    ></iframe>
                </figure>
            </section>

            <section className="contact-form">
                <button className="form-btn" onClick={handleMailClick}>
                    <IoPaperPlaneOutline />
                    <span>Get In touch</span>
                </button>
            </section>
        </article>
    );
};

export default Contact;
