
/*
  File: Layout.jsx
  Student: Shohely Akkas
  Student ID: 301257632
  Date: Sept 24, 2025
  Description: This file contains the header layout component with logo, title, navigation menu, 
  and horizontal divider for the portfolio site.
*/

/* ===== IMPORTS SECTION ===== */
/* Import React library for component functionality */
/* Import Link component from React Router for navigation */
/* Import logo image asset for header display */
/* Note: index.css is globally imported in main.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../src/assets/logo.png';

/* ===== LAYOUT COMPONENT ===== */
export default function Layout() {
    /* ----- Component JSX Structure ----- */
    return (
        <>
            {/* Portfolio Logo */}
            <img src={logo} alt="logo" className="logo" width="80px" height="80px" />

            {/* Main Portfolio Title with specific styling */}
            <h1 style={{
                marginTop: '20px',
                fontSize: '3rem',
                fontWeight: 'bold',
                color: 'blue',
            }}>My Portfolio</h1>

            {/* Navigation Menu with specific links */}
            <nav>
                <Link to="/">Home</Link> |
                <Link to="/about">About</Link> |
                <Link to="/services">Services</Link> |
                <Link to="/project">Projects</Link> |
                <Link to="/contact">Contact</Link>
            </nav>
            {/* Spacing */}
            <br />
            <br />
            {/* Horizontal Divider */}
            <hr className="horizontal-divider" />
        </>
    );
}
