
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
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../src/assets/logo.png';
import auth from '../src/auth.js';

/* ===== LAYOUT COMPONENT ===== */
export default function Layout() {
    const navigate = useNavigate()

    const [authState, setAuthState] = useState(auth.isAuthenticated())

    useEffect(() => {
        const handler = () => setAuthState(auth.isAuthenticated())
        window.addEventListener('authChange', handler)
        return () => window.removeEventListener('authChange', handler)
    }, [])

    const handleSignout = () => {
        auth.signout(() => {
            // after signout redirect to home
            navigate('/')
        })
    }

    const isAuth = authState

    /* ----- Component JSX Structure ----- */
    return (
        <>
            {/* User Menu - Top Right Corner */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '40px',
                fontSize: 'large'
            }}>
                <nav style={{ float: 'none' }}>
                    {isAuth ? (
                        <>
                            {/* Users list (visible to signed-in users) */}
                            <Link to="/users">Users</Link>
                            {' '}| <Link to="/profile">Profile</Link>
                            {/* show user name next to profile link */}
                            {' '}<span style={{ marginLeft: 6, color: '#333' }}>({isAuth.user.name})</span>
                            {' '}| <button onClick={handleSignout} style={{ background: 'transparent', border: 'none', color: 'blue', cursor: 'pointer', fontSize: 'inherit' }}>Sign Out</button>
                        </>
                    ) : (
                        <>
                            <Link to="/signin">Sign In</Link>
                            {' '}| <Link to="/signup"> Sign Up</Link>
                        </>
                    )}
                </nav>
            </div>

            {/* Portfolio Logo */}
            <img src={logo} alt="logo" className="logo" width="80px" height="80px" />

            {/* Main Portfolio Title with specific styling */}
            <h1 style={{
                marginTop: '20px',
                fontSize: '3rem',
                fontWeight: 'bold',
                color: 'blue',
            }}>My Portfolio</h1>

            {/* Main Navigation Menu - Centered */}
            <nav style={{ fontSize: 'x-large', marginBottom: '20px' }}>
                <Link to="/">Home</Link> |
                <Link to="/about"> About Me</Link> |
                <Link to="/services"> Services</Link> |
                <Link to="/qualification"> Qualifications</Link> |
                <Link to="/project"> Projects</Link> |
                <Link to="/contact"> Contact With Me</Link>
            </nav>

            {/* Horizontal Divider */}
            <hr className="horizontal-divider" />
        </>
    );
}
