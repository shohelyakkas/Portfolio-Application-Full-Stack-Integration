import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../src/index.css'
import './Signup.css'

export default function Signup() {
    const [values, setValues] = useState({ name: '', email: '', password: '', message: '', error: '' })
    const navigate = useNavigate()

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value })
    }

    const clickSubmit = async (e) => {
        e.preventDefault()
        setValues({ ...values, error: '', message: '' })
        try {
            const res = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: values.name, email: values.email, password: values.password })
            })
            const data = await res.json()
            if (res.ok) {
                setValues({ ...values, message: data.message || 'Successfully signed up!', error: '' })
            } else {
                setValues({ ...values, error: data.error || 'Signup failed' })
            }
        } catch (err) {
            setValues({ ...values, error: 'Signup request failed' })
        }
    }

    return (
        <div className="page-container">
            <h2>Sign Up</h2>

            <div className="signup-container">
                {values.message && (
                    <div className="signup-message">
                        {values.message}
                    </div>
                )}
                {values.error && (
                    <div className="signup-error">
                        {values.error}
                    </div>
                )}

                <form onSubmit={clickSubmit} className="signup-form">
                    <div className="signup-form-group">
                        <label className="signup-label">
                            Name
                        </label>
                        <input
                            type="text"
                            value={values.name}
                            onChange={handleChange('name')}
                            required
                            className="signup-input"
                        />
                    </div>

                    <div className="signup-form-group">
                        <label className="signup-label">
                            Email
                        </label>
                        <input
                            type="email"
                            value={values.email}
                            onChange={handleChange('email')}
                            required
                            className="signup-input"
                        />
                    </div>

                    <div className="signup-form-group">
                        <label className="signup-label">
                            Password
                        </label>
                        <input
                            type="password"
                            value={values.password}
                            onChange={handleChange('password')}
                            required
                            className="signup-input"
                        />
                    </div>

                    <div>
                        <button type="submit" className="signup-submit-btn">
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="signup-signin-link">
                    Already have an account? <a href="/signin">Sign In</a>
                </div>
            </div>
        </div>
    )
}
