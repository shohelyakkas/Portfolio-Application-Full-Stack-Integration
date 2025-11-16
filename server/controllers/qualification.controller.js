import Qualification from '../models/qualification.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

const create = async (req, res) => {
    const qualification = new Qualification(req.body)
    try {
        await qualification.save()
        return res.status(200).json({ message: "Qualification added successfully!" })
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const list = async (req, res) => {
    try {
        // Fetches all qualifications, selecting key fields for a list view
        let qualifications = await Qualification.find().select('title completion description')
        res.json(qualifications)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const qualificationByID = async (req, res, next, id) => {
    try {
        let qualification = await Qualification.findById(id).select('title completion description firstname lastname email')
        if (!qualification)
            return res.status(404).json({ error: "Qualification not found" })
        req.qualification = qualification
        next()
    } catch (err) {
        return res.status(400).json({ error: "Could not retrieve qualification by ID" })
    }
}

const read = (req, res) => {
    // Returns the qualification object attached by the qualificationByID middleware
    return res.json(req.qualification)
}

const update = async (req, res) => {
    try {
        // Get the qualification object from the middleware
        let qualification = req.qualification
        // Overwrite old fields with new data from the request body
        Object.assign(qualification, req.body)
        await qualification.save()
        res.json(qualification)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const remove = async (req, res) => {
    try {
        let qualification = req.qualification
        let deletedQualification = await qualification.deleteOne()
        res.json(deletedQualification)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const removeAll = async (req, res) => {
    try {
        await Qualification.deleteMany({})
        return res.status(200).json({ message: "All qualifications removed successfully!" })
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

export default { create, list, qualificationByID, read, update, remove, removeAll }
