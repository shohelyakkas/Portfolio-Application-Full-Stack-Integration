/*
  File: services.jsx
  Student: Shohely Akkas
  Student ID: 301257632
  Date: Sept 24, 2025
  Description: This file contains the services page component for the portfolio site.
*/

/* ===== IMPORTS ===== */
import "../src/services.css";
import '../src/index.css'

/* ===== SERVICES COMPONENT ===== */
export default function Services() {
    /* ----- Component JSX Structure ----- */
    return (
        /* Main Page Container */
        <div className="page-container">
            {/* Page Title */}
            <h2 className="servicesTitle">My Services</h2>
            {/* Page Description */}
            <p className="servicesDesc">
                Here are the main services I offer. Each service is focused on
                delivering quality solutions to meet your needs.
            </p>

            {/* Services Grid Container */}
            <div className="services-grid">
                {/* ===== SERVICE CARD 1: Web Design ===== */}
                <div className="service-card">
                    <h3>Web Design</h3>
                    <p>Creating visually appealing and user-friendly web designs.</p>
                </div>

                {/* ===== SERVICE CARD 2: Frontend Development ===== */}
                <div className="service-card">
                    <h3>Frontend Development</h3>
                    <p>Building responsive and interactive user interfaces.</p>
                </div>

                {/* ===== SERVICE CARD 3: Backend Development ===== */}
                <div className="service-card">
                    <h3>Backend Development</h3>
                    <p>Developing robust server-side logic and databases.</p>
                </div>

                {/* ===== SERVICE CARD 4: Full-Stack Development ===== */}
                <div className="service-card">
                    <h3>Full-Stack Development</h3>
                    <p>Combining both frontend and backend skills.</p>
                </div>

                {/* ===== SERVICE CARD 5: Software Development ===== */}
                <div className="service-card">
                    <h3>Software Development</h3>
                    <p>Building custom software solutions to meet your business needs.</p>
                </div>

                {/* ===== SERVICE CARD 6: Content Writing ===== */}
                <div className="service-card">
                    <h3>Content Writing</h3>
                    <p>Writing professional content for your business.</p>
                </div>
            </div>
        </div>
    );
}
