
/*
  File: about.jsx
  Student: Shohely Akkas
  Student ID: 301257632
  Date: Sept 24, 2025
  Description: This file contains the about page component for the portfolio site.
*/
/* ===== IMPORTS ===== */
import BBG from '../src/assets/BBG.jpg';
import resumePDF from '../src/assets/Shohely_Akkas_Resume.pdf';
import { Link } from 'react-router-dom';
import '../src/index.css'
import '../src/about.css'

/* ===== ABOUT COMPONENT ===== */
export default function About() {
    /* ----- Component JSX Structure ----- */
    return <>
        {/* Main Page Container */}
        <div className="page-container">
            {/* About Me Section */}
            <section id="about-me">
                {/* Page Title */}
                <h2>About Me</h2>

                {/* Professional Photo Section */}
                <div className="about-image">
                    <img src={BBG} alt="Shohely Akkas - Professional Photo" className="professional-photo" />
                </div>

                {/* About Content Section */}
                <div className="about-content">
                    {/* Name Header */}
                    <h3>Shohely Akkas</h3>
                    {/* Introduction Paragraph */}
                    <p className="about-paragraph">
                        I am a passionate full-stack developer with a focus on building modern and responsive web applications.
                        With a strong foundation in both frontend and backend technologies, I strive to create seamless and
                        efficient user experiences. I have experience in HTML, CSS, JavaScript, React, and various web development
                        frameworks. I am dedicated to continuous learning and staying updated with the latest industry trends
                        and best practices.
                    </p>
                </div>

                {/* Resume Section */}
                <div className="resume-section">
                    {/* Resume Section Title */}
                    <h4>View My Resume</h4>
                    {/* Resume View Link */}
                    <a href={resumePDF} target="_blank" rel="noopener noreferrer" className="resume-link">📄 View Resume</a>
                    {/* Resume Download Link */}
                    <a href={resumePDF} download="Shohely_Akkas_Resume.pdf" className="resume-link">💾 Download Resume</a>
                </div>
            </section>
        </div>
    </>
}
