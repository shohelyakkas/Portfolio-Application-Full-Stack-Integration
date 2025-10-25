
/*
  File: project.jsx
  Student: Shohely Akkas
  Student ID: 301257632
  Date: Sept 24, 2025
  Description: This file contains the project page component for the portfolio site.
*/


/* ===== IMPORTS ===== */
import project1 from "../src/assets/Project1.png";
import project2 from "../src/assets/Project2.png";
import project3 from "../src/assets/Project3.png";
import project4 from "../src/assets/Project4.png";
import '../src/index.css'
import "../src/project.css";

/* ===== PROJECT COMPONENT ===== */
export default function Project() {
    /* ----- Component JSX Structure ----- */
    return (
        /* Main Page Container */
        <div className="page-container">
            {/* Projects Section */}
            <section id="works">
                {/* Section Title */}
                <h2 className="worksTitle">My Projects</h2>
                {/* Section Description */}
                <p className="worksDesc">
                    Here are a few of my highlighted projects. Each project reflects my
                    focus on detail, design, and functionality.
                </p>

                {/* Project Grid Container */}
                <div className="project-grid">
                    {/* ===== PROJECT CARD 1: Business Website ===== */}
                    <div className="project-card">
                        {/* Project Image */}
                        <img src={project1} alt="Business Website" className="worksImg" />
                        {/* Project Information */}
                        <div className="project-info">
                            <h3>Business Website</h3>
                            <p><strong>My Role:</strong> Frontend Developer</p>
                            <p><strong>Outcome:</strong> Built a responsive business website</p>
                            <p><strong>Technologies:</strong> HTML & CSS </p>
                            {/* Project Link */}
                            <a href="http://studentweb.cencol.ca/sakkas/Final_Project/index.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="github-btn">
                                View Project
                            </a>
                        </div>
                    </div>

                    {/* ===== PROJECT CARD 2: E-Commerce App ===== */}
                    <div className="project-card">
                        {/* Project Image */}
                        <img src={project2} alt="E-Commerce App" className="worksImg" />
                        {/* Project Information */}
                        <div className="project-info">
                            <h3>E-Commerce App</h3>
                            <p><strong>My Role:</strong> Full-Stack Developer</p>
                            <p><strong>Outcome:</strong> Developed a complete web solution with product catalog</p>
                            <p><strong>Technologies:</strong> HTML & CSS</p>
                            {/* Project Link */}
                            <a href="http://studentweb.cencol.ca/sakkas/Assignment_3/Assignment_3.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="github-btn">
                                View Project
                            </a>
                        </div>
                    </div>

                    {/* ===== PROJECT CARD 3: Pokédex Application ===== */}
                    <div className="project-card">
                        {/* Project Image */}
                        <img src={project3} alt="Pokédex Application" className="worksImg" />
                        {/* Project Information */}
                        <div className="project-info">
                            <h3>Pokédex Application</h3>
                            <p><strong>My Role:</strong> UI/UX Designer & Developer</p>
                            <p><strong>Outcome:</strong> Designed and built a fun interactive UI</p>
                            <p><strong>Technologies:</strong> HTML, CSS & JavaScript</p>
                            {/* Project Link */}
                            <a href="https://shohelyakkas.github.io/Academic-Projects_Pok-dex-application/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="github-btn">
                                View Project
                            </a>
                        </div>
                    </div>

                    {/* ===== PROJECT CARD 4: Pixer Movie Gallery ===== */}
                    <div className="project-card">
                        {/* Project Image */}
                        <img src={project4} alt="Pixer Movie" className="worksImg" />
                        {/* Project Information */}
                        <div className="project-info">
                            <h3>Pixer Movie Gallery </h3>
                            <p><strong>My Role:</strong> UI/UX Designer & Developer</p>
                            <p><strong>Outcome:</strong> Designed and developed interactive user interface</p>
                            <p><strong>Technologies:</strong> HTML, CSS & JavaScript</p>
                            {/* Project Link */}
                            <a href="https://shohelyakkas.github.io/Academic-Projects_Pixer-Movie-Gallery/"
                                target="_blank" rel="noopener noreferrer" className="github-btn">
                                View Project
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}