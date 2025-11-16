

/* ===== IMPORTS ===== */
import '../src/index.css'
import "../src/project.css";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import auth from './auth.js'
import Project1 from './assets/Project1.png'
import Project2 from './assets/Project2.png'
import Project3 from './assets/Project3.png'
import Project4 from './assets/Project4.png'
import Project7 from './assets/project7.jpg'

/* ===== PROJECT COMPONENT ===== */
export default function Project() {

    const [projects, setProjects] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completion, setCompletion] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [projectUrl, setProjectUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    // Edit state for admin editing existing projects
    const [editingId, setEditingId] = useState(null)
    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editCompletion, setEditCompletion] = useState('')
    const [editProjectUrl, setEditProjectUrl] = useState('')
    const [editImageUrl, setEditImageUrl] = useState('')
    const [editFirstname, setEditFirstname] = useState('')
    const [editLastname, setEditLastname] = useState('')

    useEffect(() => { fetchProjects() }, [])

    const fetchProjects = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/projects')
            const data = await res.json()
            setProjects(data)
        } catch (err) { console.error(err) }
    }

    const jwt = auth.isAuthenticated()
    const isAdmin = jwt && jwt.user && jwt.user.role === 'admin'
    const navigate = useNavigate()

    // helper: normalize external URLs so window.open works even if admin omits protocol
    const normalizeUrl = (u) => {
        if (!u) return ''
        const s = (u || '').toString().trim()
        if (!s) return ''
        if (s.startsWith('http://') || s.startsWith('https://')) return s
        return `https://${s}`
    }

    const createProject = async (e) => {
        e.preventDefault()
        setSuccessMessage('')
        setErrorMessage('')

        // Check for duplicate project title
        const duplicateProject = projects.find(p => p.title.toLowerCase() === title.toLowerCase())
        if (duplicateProject) {
            setErrorMessage('A project with this title already exists!')
            setTimeout(() => setErrorMessage(''), 5000)
            return
        }

        try {
            const token = jwt && jwt.token
            const res = await fetch('http://localhost:3000/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ title, description, completion, firstname, lastname, projectUrl: normalizeUrl(projectUrl), imageUrl })
            })
            const d = await res.json()
            if (res.ok) {
                setSuccessMessage('Project created successfully!')
                // Auto-hide success message after 5 seconds
                setTimeout(() => setSuccessMessage(''), 5000)
                fetchProjects()
            } else {
                setErrorMessage(d.error || 'Failed to create project')
                setTimeout(() => setErrorMessage(''), 5000)
            }
        } catch (err) {
            console.error(err)
            setErrorMessage('Failed to create project')
            setTimeout(() => setErrorMessage(''), 5000)
        }
    }

    const startEdit = (p) => {
        setEditingId(p._id)
        setEditTitle(p.title || '')
        setEditDescription(p.description || '')
        setEditCompletion(p.completion ? p.completion.split('T')[0] : '')
        setEditProjectUrl(p.projectUrl || '')
        setEditImageUrl(p.imageUrl || '')
        setEditFirstname(p.firstname || '')
        setEditLastname(p.lastname || '')
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditTitle('')
        setEditDescription('')
        setEditCompletion('')
        setEditProjectUrl('')
        setEditImageUrl('')
        setEditFirstname('')
        setEditLastname('')
    }

    const submitEdit = async (id) => {
        try {
            const token = jwt && jwt.token
            const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ title: editTitle, description: editDescription, completion: editCompletion, projectUrl: normalizeUrl(editProjectUrl), imageUrl: editImageUrl, firstname: editFirstname, lastname: editLastname })
            })
            const d = await res.json()
            if (res.ok) {
                cancelEdit()
                fetchProjects()
            } else {
                alert(d.error || 'Update failed')
            }
        } catch (err) { console.error(err) }
    }

    const deleteProject = async (id) => {
        const project = projects.find(p => p._id === id)
        const projectName = project ? project.title : 'this project'
        if (!confirm(`Delete "${projectName}"?`)) return
        try {
            const token = jwt && jwt.token
            const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
                method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) fetchProjects(); else { const d = await res.json(); alert(d.error) }
        } catch (err) { console.error(err) }
    }

    return (
        <div className="page-container">
            <section id="works">
                <h2 className="worksTitle">My Projects</h2>
                <p className="worksDesc">Here are a few of my highlighted projects. Each project reflects my focus on detail, design, and functionality.</p>

                {successMessage && (
                    <div className="project-success-message">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="project-error-message">
                        {errorMessage}
                    </div>
                )}

                {isAdmin && (
                    <form onSubmit={createProject} className="qual-form project-admin-form">
                        <h3>Create Project (Admin)</h3>
                        <div className="qual-row">
                            <input placeholder="First name" value={firstname} onChange={e => setFirstname(e.target.value)} required className="qual-input" />
                            <input placeholder="Last name" value={lastname} onChange={e => setLastname(e.target.value)} required className="qual-input" />
                        </div>
                        <input placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} required className="qual-title" />
                        <textarea placeholder="Project Description" value={description} onChange={e => setDescription(e.target.value)} className="qual-textarea" />
                        <input placeholder="Image Path (e.g. ./assets/Portfolio.png or Portfolio.png) or URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="qual-title" />
                        <input placeholder="External URL (optional) e.g. example.com or https://site.com" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} className="qual-title" />
                        <div className="qual-date-row">
                            <label>Completion date:</label>
                            <input type="date" value={completion} onChange={e => setCompletion(e.target.value)} required className="qual-date" />
                            <div className="qual-create-wrap"><button type="submit">Create Project</button></div>
                        </div>
                    </form>
                )}

                <div className="project-grid">
                    {projects.map((p, idx) => {
                        const defaults = [Project1, Project2, Project3, Project4, Project7]
                        // Try to import the image dynamically, or use URL, or use default
                        let src = defaults[idx % defaults.length]
                        if (p.imageUrl) {
                            // If it's a URL (starts with http), use it directly
                            if (p.imageUrl.startsWith('http')) {
                                src = p.imageUrl
                            } else {
                                // For local images, try to import dynamically
                                try {
                                    // Extract just the filename from various path formats
                                    let imagePath = p.imageUrl
                                    // Remove any variations of the path prefix
                                    imagePath = imagePath.replace(/^.*[\\\/]assets[\\\/]/, './assets/')
                                    imagePath = imagePath.replace(/^src[\\\/]assets[\\\/]/, './assets/')
                                    imagePath = imagePath.replace(/^client[\\\/].*[\\\/]assets[\\\/]/, './assets/')

                                    // If it doesn't start with ./, add it
                                    if (!imagePath.startsWith('./')) {
                                        imagePath = './assets/' + imagePath.split(/[\\\/]/).pop()
                                    }

                                    src = new URL(imagePath, import.meta.url).href
                                } catch (e) {
                                    console.error('Error loading image:', e)
                                    src = p.imageUrl
                                }
                            }
                        }
                        const external = normalizeUrl(p.projectUrl || p.link || p.url || p.externalLink)
                        const openExternal = (u) => {
                            try {
                                if (!u) return
                                const a = document.createElement('a')
                                a.href = u
                                a.target = '_blank'
                                a.rel = 'noopener noreferrer'
                                // append to body to make click reliable in all browsers
                                document.body.appendChild(a)
                                a.click()
                                a.remove()
                            } catch (err) { console.error('openExternal error', err) }
                        }
                        return (
                            <div key={p._id} className="project-card">
                                <div className="project-image-placeholder">
                                    <img src={src} alt={p.title} className="project-card-image" />
                                </div>
                                <div className="project-info">
                                    {editingId === p._id ? (
                                        <div className="project-edit-form">
                                            <input placeholder="Title" value={editTitle} onChange={e => setEditTitle(e.target.value)} className="project-edit-input" />
                                            <div className="project-edit-name-row">
                                                <input placeholder="First name" value={editFirstname} onChange={e => setEditFirstname(e.target.value)} className="project-edit-name-input" />
                                                <input placeholder="Last name" value={editLastname} onChange={e => setEditLastname(e.target.value)} className="project-edit-name-input" />
                                            </div>
                                            <textarea placeholder="Description" value={editDescription} onChange={e => setEditDescription(e.target.value)} className="project-edit-textarea" />
                                            <div className="project-edit-field">
                                                <label className="project-edit-label">Image Path or URL:</label>
                                                <input placeholder="./assets/Portfolio.png or Portfolio.png or https://..." value={editImageUrl} onChange={e => setEditImageUrl(e.target.value)} className="project-edit-input" />
                                            </div>
                                            <div className="project-edit-field">
                                                <label className="project-edit-label">Completion date:</label>
                                                <input type="date" value={editCompletion} onChange={e => setEditCompletion(e.target.value)} />
                                            </div>
                                            <div className="project-edit-field">
                                                <label className="project-edit-label">External URL:</label>
                                                <input placeholder="https://project-site.com" value={editProjectUrl} onChange={e => setEditProjectUrl(e.target.value)} className="project-edit-input" />
                                            </div>
                                            <div>
                                                <button onClick={() => submitEdit(p._id)} className="project-edit-save-btn">Save</button>
                                                <button onClick={cancelEdit}>Cancel</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="project-card-title">{p.title}</h3>
                                            {(p.firstname || p.lastname) && (
                                                <p className="project-card-author"><strong>By:</strong> {p.firstname} {p.lastname}</p>
                                            )}
                                            <p className="project-card-description">{p.description}</p>
                                            <p className="project-card-completion">
                                                <strong>Completion:</strong> {p.completion ? new Date(p.completion).toLocaleDateString() : 'N/A'}
                                            </p>
                                            <div className="project-card-buttons">
                                                <div>
                                                    <button
                                                    className="project-view-btn"
                                                    onClick={() => {
                                                        // If project has an external link, open it.
                                                        if (external) {
                                                            openExternal(external)
                                                            return
                                                        }
                                                        // Otherwise navigate to project detail page for everyone.
                                                        navigate(`/project/${p._id}`)
                                                    }}
                                                >
                                                    View Project
                                                </button>
                                                </div>
                                                {isAdmin && (
                                                    <div className="project-admin-buttons">
                                                        <button onClick={() => startEdit(p)} className="project-edit-btn">Edit</button>
                                                        <button onClick={() => deleteProject(p._id)} className="project-delete-btn">
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section >
        </div >
    )
}
