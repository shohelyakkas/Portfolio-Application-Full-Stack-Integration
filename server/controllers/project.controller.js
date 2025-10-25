import Project from '../models/project.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

const create = async (req, res) => {
    const project = new Project(req.body)
    try {
        await project.save()
        return res.status(200).json({ message: "Project added successfully!" })
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const list = async (req, res) => {
    try {
        // Fetches all projects, selecting key fields
        let projects = await Project.find().select('title completion description')
        res.json(projects)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const projectByID = async (req, res, next, id) => {
    try {
        let project = await Project.findById(id).select('title completion description firstname lastname email')
        if (!project)
            return res.status('404').json({ error: "Project not found" })
        req.project = project
        next()
    } catch (err) {
        return res.status('400').json({ error: "Could not retrieve project by ID" })
    }
}

const read = (req, res) => {
    // Returns the project object attached by projectByID middleware
    return res.json(req.project)
}

const update = async (req, res) => {
    try {
        // Get the project object from the middleware
        let project = req.project
        // Overwrite old fields with new data from the request body
        Object.assign(project, req.body)
        await project.save()
        res.json(project)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const remove = async (req, res) => {
    try {
        let project = req.project
        let deletedProject = await project.deleteOne()
        res.json(deletedProject)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const removeAll = async (req, res) => {
    try {
        await Project.deleteMany({})
        return res.status(200).json({ message: "All projects removed successfully!" })
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

export default { create, list, projectByID, read, update, remove, removeAll }
