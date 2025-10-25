

/*
  File: contact.jsx
  Student: Shohely Akkas
  Student ID: 301257632
  Date: Sept 24, 2025
  Description: This file contains the contact page component for the portfolio site.
*/

/* ===== IMPORTS ===== */
import { useNavigate } from 'react-router-dom';
import '../src/contact.css'
import '../src/index.css'

/* ===== CONTACT COMPONENT ===== */
export default function Contact() {
    /* ----- Component State and Navigation ----- */
    const navigate = useNavigate();

    /* ----- Form Submit Handler Function ----- */
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    };

    /* ----- Component JSX Structure ----- */
    return (
        <>
            {/* Main Page Container */}
            <div className="page-container">
                {/* Page Title */}
                <h2>Contact With Me</h2>

                {/* Contact Form Section */}
                <form id="ffp" onSubmit={handleSubmit}>
                    {/* First Name Input */}
                    <label htmlFor="myFName">*First Name:</label>
                    <input type="text" id="myFName" name="myFName" required autoFocus />

                    {/* Last Name Input */}
                    <label htmlFor="myLName">*Last Name:</label>
                    <input type="text" id="myLName" name="myLName" required />

                    {/* Email Input */}
                    <label htmlFor="myEmail">*Email:</label>
                    <input type="email" id="myEmail" name="myEmail" required />

                    {/* Message Textarea */}
                    <label htmlFor="myMessage">Message:</label>
                    <textarea
                        id="myMessage"
                        name="myMessage"
                        rows="5"
                        cols="50"
                        placeholder="Write your message here..."
                    ></textarea>

                    {/* Submit Button */}
                    <input type="submit" className="submit" value="Submit" />
                </form>

                {/* Contact Information Section */}
                <div className="contact-info">
                    {/* Phone Number */}
                    <p><i>Call me on: <strong>437-339-0646</strong></i></p>
                    {/* Facebook Link */}
                    <p>Facebook: <a href="https://www.facebook.com/shohely.akkas" target="_blank" rel="noopener noreferrer">https://www.facebook.com/shohely.akkas</a></p>
                    {/* Email Address */}
                    <p>Email: shohelydu@gmail.com</p>
                </div>
            </div>
        </>
    );
}
