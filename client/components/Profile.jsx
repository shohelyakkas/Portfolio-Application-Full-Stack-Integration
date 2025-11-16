import React, { useState } from 'react'
import auth from '../src/auth.js'
import '../src/index.css'
import './Profile.css'

export default function Profile() {
    const jwt = auth.isAuthenticated()
    const user = jwt && jwt.user ? jwt.user : null

    const [values, setValues] = useState({ name: user ? user.name : '', email: user ? user.email : '', password: '', message: '', error: '' })

    if (!user) return (
        <div className="page-container">
            <h2>Profile</h2>
            <p className="profile-not-signed-in">You are not signed in.</p>
        </div>
    )

    const handleChange = name => e => setValues({ ...values, [name]: e.target.value })

    const submit = async (e) => {
        e.preventDefault()
        setValues({ ...values, error: '', message: '' })
        try {
            const token = jwt && jwt.token
            const res = await fetch(`http://localhost:3000/api/users/${user._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ name: values.name, email: values.email, password: values.password })
            })
            const data = await res.json()
            if (res.ok) {
                // update localStorage stored user
                const stored = JSON.parse(localStorage.getItem('jwt') || '{}')
                stored.user = data
                localStorage.setItem('jwt', JSON.stringify(stored))
                setValues({ ...values, message: 'Profile updated successfully!', password: '' })
            } else setValues({ ...values, error: data.error || 'Update failed' })
        } catch (err) {
            console.error(err)
            setValues({ ...values, error: 'Update error' })
        }
    }

    return (
        <div className="page-container">
            <h2>Profile</h2>

            <div className="profile-container">
                {values.message && (
                    <div className="profile-message">
                        {values.message}
                    </div>
                )}
                {values.error && (
                    <div className="profile-error">
                        {values.error}
                    </div>
                )}

                <form onSubmit={submit} className="profile-form">
                    <div className="profile-form-group">
                        <label className="profile-label">
                            Name
                        </label>
                        <input
                            value={values.name}
                            onChange={handleChange('name')}
                            required
                            className="profile-input"
                        />
                    </div>

                    <div className="profile-form-group">
                        <label className="profile-label">
                            Email
                        </label>
                        <input
                            type="email"
                            value={values.email}
                            onChange={handleChange('email')}
                            required
                            className="profile-input"
                        />
                    </div>

                    <div className="profile-form-group">
                        <label className="profile-label">
                            Password
                        </label>
                        <input
                            type="password"
                            value={values.password}
                            onChange={handleChange('password')}
                            placeholder="Leave blank to keep current password"
                            className="profile-input"
                        />
                    </div>

                    <div>
                        <button type="submit" className="profile-submit-btn">
                            Update Profile
                        </button>
                    </div>
                </form>

                {user.role && (
                    <div className="profile-role-badge">
                        <span className="profile-role-text">
                            Account Role: <strong className="profile-role-value">{user.role}</strong>
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
