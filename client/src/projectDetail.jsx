import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!id) return
        fetchProject()
    }, [id])

    const fetchProject = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/projects/${id}`)
            if (!res.ok) {
                const d = await res.json()
                setError(d.error || 'Could not load project')
                return
            }
            const data = await res.json()
            setProject(data)
        } catch (err) { console.error(err); setError('Request failed') }
    }

    if (error) return <div style={{ padding: 20, color: 'red' }}>{error}</div>
    if (!project) return <div style={{ padding: 20 }}>Loading...</div>

    return (
        <div style={{ maxWidth: 900, margin: '2rem auto', padding: 20 }}>
            <h2>{project.title}</h2>
            {project.image && <img src={project.image} alt={project.title} style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }} />}
            <p style={{ marginTop: 12 }}>{project.description}</p>
            <p><strong>Completion:</strong> {project.completion ? new Date(project.completion).toLocaleDateString() : 'N/A'}</p>
        </div>
    )
}
