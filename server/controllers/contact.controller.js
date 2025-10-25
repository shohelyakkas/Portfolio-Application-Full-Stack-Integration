import Contact from '../models/contact.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

const create = async (req, res) => {
    const contact = new Contact(req.body)
    try {
        await contact.save()
        return res.status(200).json({ message: "Contact added successfully!" })
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const list = async (req, res) => {
    try {
        // Selects only the necessary contact fields for a list view
        let contacts = await Contact.find().select('firstname lastname email')
        res.json(contacts)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const contactByID = async (req, res, next, id) => {
    try {
        let contact = await Contact.findById(id).select('firstname lastname email')
        if (!contact)
            return res.status('404').json({ error: "Contact not found" })
        req.contact = contact
        next()
    } catch (err) {
        return res.status('400').json({ error: "Could not retrieve contact by ID" })
    }
}

const read = (req, res) => {
    // Returns the contact object attached by contactByID middleware
    return res.json(req.contact)
}

const update = async (req, res) => {
    try {
        // Get the contact object from the middleware
        let contact = req.contact
        // Overwrite old fields with new data from the request body
        Object.assign(contact, req.body)
        await contact.save()
        res.json(contact)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const remove = async (req, res) => {
    try {
        let contact = req.contact
        let deletedContact = await contact.deleteOne()
        res.json(deletedContact)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const removeAll = async (req, res) => {
    try {
        await Contact.deleteMany({})
        return res.status(200).json({ message: "All contacts removed successfully!" })
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

export default { create, list, contactByID, read, update, remove, removeAll }
