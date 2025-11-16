import '../src/index.css'
import './qualification.css'
import { useEffect, useState } from 'react'
import auth from './auth.js'

export default function Qualification() {
    const [qualifications, setQualifications] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completion, setCompletion] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    useEffect(() => { fetchQualifications() }, [])

    const fetchQualifications = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/qualifications')
            const data = await res.json()
            setQualifications(data)
        } catch (err) { console.error(err) }
    }

    const jwt = auth.isAuthenticated()
    const isAdmin = jwt && jwt.user && jwt.user.role === 'admin'

    const createQualification = async (e) => {
        e.preventDefault()
        try {
            const token = jwt && jwt.token
            const res = await fetch('http://localhost:3000/api/qualifications', {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ title, description, completion, firstname, lastname })
            })
            const d = await res.json()
            if (res.ok) { setTitle(''); setDescription(''); setCompletion(''); setFirstname(''); setLastname(''); fetchQualifications() }
            else alert(d.error || 'Create failed')
        } catch (err) { console.error(err) }
    }

    const deleteQualification = async (id) => {
        if (!confirm('Delete this qualification?')) return
        try {
            const token = jwt && jwt.token
            const res = await fetch(`http://localhost:3000/api/qualifications/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
            if (res.ok) fetchQualifications(); else { const d = await res.json(); alert(d.error) }
        } catch (err) { console.error(err) }
    }

    return (
        <div className="page-container">
            <h2>Qualifications</h2>
            {isAdmin && (
                <form onSubmit={createQualification} className="qual-form">
                    <h3>Create Qualification (admin)</h3>
                    <div className="qual-row">
                        <input placeholder="First name" value={firstname} onChange={e => setFirstname(e.target.value)} required className="qual-input" />
                        <input placeholder="Last name" value={lastname} onChange={e => setLastname(e.target.value)} required className="qual-input" />
                    </div>
                    <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="qual-title" />
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="qual-textarea" />
                    <div className="qual-date-row">
                        <label>Completion date:</label>
                        <input type="date" value={completion} onChange={e => setCompletion(e.target.value)} required className="qual-date" />
                        <div className="qual-create-wrap"><button type="submit">Create</button></div>
                    </div>
                </form>
            )}
            <ul className="qualification-list">
                {qualifications.map(q => (
                    <li key={q._id} className="qualification-item">
                        <div className="qualification-header">
                            {q.firstname} {q.lastname} — {q.title}
                        </div>
                        <div className="qualification-description">
                            {q.description}
                        </div>
                        <div className="qualification-completion">
                            <strong>Completion:</strong> {q.completion ? new Date(q.completion).toLocaleDateString() : 'N/A'}
                        </div>
                        {isAdmin && (
                            <button onClick={() => deleteQualification(q._id)} className="qualification-delete-btn">
                                Delete
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
