
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
import ProjectDetail from './src/projectDetail'
import Layout from './components/Layout'
import Services from './src/services'
import Qualification from './src/qualification'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Profile from './components/Profile'
import Users from './components/Users'

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
                <Route exact path="/project/:id" element={<ProjectDetail />} />
                {/* Contact Route */}
                <Route exact path="/contact" element={<Contact />} />
                {/* Qualifications Route */}
                <Route exact path="/qualification" element={<Qualification />} />
                {/* Auth Routes */}
                <Route exact path="/signin" element={<Signin />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/users" element={<Users />} />
            </Routes>
        </div>
    )
}

export default MainRouter
