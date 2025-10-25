
/*
  File: Home.jsx
  Student: Shohely Akkas
  Student ID: 301257632
  Date: Sept 24, 2025
  Description: This file contains the home page component for the portfolio site.
*/


/* ===== IMPORTS SECTION ===== */
/* Import background profile image for main hero section */
/* Import hire me button icon for call-to-action */
/* Import Link component from React Router for navigation functionality */
/* Import home page specific CSS styles */
/* Import global CSS styles and layout configurations */
import BBG from '../src/assets/BBG.jpg';
import hire from '../src/assets/hire.png';
import { Link } from 'react-router-dom';
import '../src/home.css'
import '../src/index.css'

/* ===== HOME COMPONENT ===== */
export default function Home() {
    /* ----- Component JSX Structure ----- */
    return <>
        {/* Main Page Container */}
        <div className="page-container">
            {/* Introduction Section */}
            <section id="intro">
                {/* Introduction Content Container */}
                <div className="introContent">
                    {/* Introduction Text */}
                    <span className="introText">
                        <strong className="introHeadline" >Hello, I am Shohely Akkas,
                            <br />Website Designer</strong>
                    </span>

                    {/* Profile Image */}
                    <img src={BBG} alt="profile" className="bbg" width="300" height="300" />

                    {/* Introduction Paragraph */}
                    <p className="introPara">I am a passionate full-stack developer with a focus
                        on building modern and responsive web applications. With a strong foundation
                        in both frontend and backend technologies.
                        I strive to create seamless and efficient user experiences.
                    </p>

                    {/* Hire Me Button */}
                    <Link to="/contact"><button className="btn"><img src={hire} alt="Hire me" width="100px" height="100px" /></button></Link>

                </div>
            </section>
        </div>
    </>
}
