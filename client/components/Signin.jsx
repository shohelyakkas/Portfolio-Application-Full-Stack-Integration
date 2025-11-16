import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import auth from '../src/auth.js'
import '../src/index.css'
import './Signin.css'

export default function Signin() {
    const [values, setValues] = useState({ email: '', password: '', error: '' })
    const navigate = useNavigate()

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value })
    }

    const clickSubmit = async (e) => {
        e.preventDefault()
        setValues({ ...values, error: '' })
        try {
            const res = await fetch('http://localhost:3000/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: values.email, password: values.password })
            })
            const data = await res.json()
            if (res.ok) {
                // save token and user
                auth.authenticate(data, () => {
                    navigate('/')
                })
            } else {
                setValues({ ...values, error: data.error || 'Signin failed' })
            }
        } catch (err) {
            setValues({ ...values, error: 'Signin request failed' })
        }
    }

    return (
        <div className="page-container">
            <h2>Sign In</h2>

            <div className="signin-container">
                {values.error && (
                    <div className="signin-error">
                        {values.error}
                    </div>
                )}

                <form onSubmit={clickSubmit} className="signin-form">
                    <div className="signin-form-group">
                        <label className="signin-label">
                            Email
                        </label>
                        <input
                            type="email"
                            value={values.email}
                            onChange={handleChange('email')}
                            required
                            className="signin-input"
                        />
                    </div>

                    <div className="signin-form-group">
                        <label className="signin-label">
                            Password
                        </label>
                        <input
                            type="password"
                            value={values.password}
                            onChange={handleChange('password')}
                            required
                            className="signin-input"
                        />
                    </div>

                    <div>
                        <button type="submit" className="signin-submit-btn">
                            Sign In
                        </button>
                    </div>
                </form>

                <div className="signin-signup-link">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </div>
            </div>
        </div>
    )
}
