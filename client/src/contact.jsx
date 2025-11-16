

/*
  File: contact.jsx
  Student: Shohely Akkas
  Student ID: 301257632
  Date: Sept 24, 2025
  Description: This file contains the contact page component for the portfolio site.
*/

/* ===== IMPORTS ===== */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import auth from './auth.js'
import '../src/contact.css'
import '../src/index.css'

/* ===== CONTACT COMPONENT ===== */
export default function Contact() {
    /* ----- Component State and Navigation ----- */
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [contacts, setContacts] = useState([])
    const [status, setStatus] = useState('')

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/contacts')
            const data = await res.json()
            setContacts(data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...')
        const MSG_MIN = 10
        const MSG_MAX = 200
        const trimmed = (message || '').trim()
        if (trimmed.length > MSG_MAX) { setStatus(`Message too long (max ${MSG_MAX} chars)`); return }
        if (trimmed.length > 0 && trimmed.length < MSG_MIN) { setStatus(`Message too short (min ${MSG_MIN} chars)`); return }
        try {
            const res = await fetch('http://localhost:3000/api/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname, lastname, email, message: trimmed })
            })
            const data = await res.json()
            if (res.ok) {
                setStatus(data.message || 'Submitted')
                setFirstname('')
                setLastname('')
                setEmail('')
                setMessage('')
                fetchContacts()
            } else {
                setStatus(data.error || 'Error')
            }
        } catch (err) {
            console.error(err)
            setStatus('Submission failed')
        }
    }

    const jwt = auth.isAuthenticated()
    const isAdmin = jwt && jwt.user && jwt.user.role === 'admin'

    const deleteContact = async (id) => {
        if (!confirm('Delete this contact?')) return
        try {
            const token = jwt && jwt.token
            const res = await fetch(`http://localhost:3000/api/contacts/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                fetchContacts()
            } else {
                const d = await res.json(); alert(d.error || 'Delete failed')
            }
        } catch (err) { console.error(err) }
    }

    /* ----- Component JSX Structure ----- */
    return (
        <>
            {/* Main Page Container */}
            <div className="page-container">
                {/* Page Title */}
                <h2>Contact With Me</h2>

                {/* Contact Form Section */}
                <form id="ffp" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label htmlFor="myFName">*First Name: </label>
                        <input type="text" id="myFName" name="myFName" required autoFocus value={firstname} onChange={e => setFirstname(e.target.value)} />
                    </div>

                    <div className="form-row">
                        <label htmlFor="myLName">*Last Name: </label>
                        <input type="text" id="myLName" name="myLName" required value={lastname} onChange={e => setLastname(e.target.value)} />
                    </div>

                    <div className="form-row">
                        <label htmlFor="myEmail">*Email Address: </label>
                        <input type="email" id="myEmail" name="myEmail" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="form-row">
                        <label htmlFor="myMessage">Message :</label>
                        <div style={{ flex: 1 }}>
                            <textarea id="myMessage" name="myMessage" rows={2} placeholder="Write your message here..." value={message} onChange={e => setMessage(e.target.value)} maxLength={200}></textarea>
                            <div style={{ fontSize: '0.85rem', color: message.length > 200 ? 'red' : '#666', marginTop: 6 }}>{message.length} / 200</div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <input type="submit" className="submit" value="Submit" />
                </form>

                {status && <p>{status}</p>}

                <h3>Contacts</h3>
                <ul>
                    {contacts.map(c => (
                        <li key={c._id} style={{ marginBottom: 12, textAlign: 'left' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div><strong>{c.firstname} {c.lastname}</strong> - {c.email}</div>
                                {isAdmin && (
                                    <button onClick={() => deleteContact(c._id)} style={{ marginLeft: 10 }}>Delete</button>
                                )}
                            </div>
                            {c.message && <div style={{ marginTop: 6, color: '#333' }}>{c.message}</div>}
                        </li>
                    ))}
                </ul>

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
