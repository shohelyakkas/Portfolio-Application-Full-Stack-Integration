
/*
  File: MainRouter.jsx
  Student: Shohely Akkas
  Student ID: 301257632
  Date: Sept 24, 2025
  Description: This file contains the routing configuration and layout structure for the portfolio site.
*/

/* ===== IMPORTS ===== */
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './src/about'
import Contact from './src/contact'
import Project from './src/project'
import Layout from './components/Layout'
import Services from './src/services'

/* ===== MAIN ROUTER COMPONENT ===== */
const MainRouter = () => {
    /* ----- Component JSX Structure ----- */
    return (
        <div>
            {/* Layout Component - Contains Header, Logo, and Navigation */}
            <Layout />

            {/* Route Configuration */}
            <Routes>
                {/* Home Route */}
                <Route exact path="/" element={<Home />} />
                {/* About Route */}
                <Route exact path="/about" element={<About />} />
                {/* Services Route */}
                <Route exact path="/services" element={<Services />} />
                {/* Projects Route */}
                <Route exact path="/project" element={<Project />} />
                {/* Contact Route */}
                <Route exact path="/contact" element={<Contact />} />
            </Routes>
        </div>
    )
}

export default MainRouter
