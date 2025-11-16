import React, { useEffect, useState } from 'react'
import auth from '../src/auth.js'
import '../src/index.css'
import './Users.css'

export default function Users() {
    const [users, setUsers] = useState([])
    const jwt = auth.isAuthenticated()
    const isAdmin = jwt && jwt.user && jwt.user.role === 'admin'

    useEffect(() => { fetchUsers() }, [])

    const fetchUsers = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/users')
            const data = await res.json()
            setUsers(data)
        } catch (err) { console.error(err) }
    }

    const deleteUser = async (id) => {
        if (!confirm('Delete this user?')) return
        try {
            const token = jwt && jwt.token
            const res = await fetch(`http://localhost:3000/api/users/${id}`, {
                method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) fetchUsers(); else { const d = await res.json(); alert(d.error) }
        } catch (err) { console.error(err) }
    }

    return (
        <div className="page-container">
            <h2>Users</h2>
            <ul className="users-list">
                {users.map(u => (
                    <li key={u._id} className="users-item">
                        <div className="users-item-content">
                            <div>
                                <div className="users-name">
                                    {u.name}
                                </div>
                                <div className="users-email">
                                    {u.email} {u.role && <span className="users-role-badge">({u.role})</span>}
                                </div>
                            </div>
                            {isAdmin && (
                                <button onClick={() => deleteUser(u._id)} className="users-delete-btn">
                                    Delete
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
