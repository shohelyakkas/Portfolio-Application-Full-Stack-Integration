import User from '../models/user.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

const create = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id).select('name email updated created')
        if (!user)
            return res.status('404').json({
                error: "User not found"
            })
        req.profile = user
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}

const read = (req, res) => {
    return res.json(req.profile)
}

const update = async (req, res) => {
    try {
        let user = req.profile
        Object.assign(user, req.body) // Updates the user object with new data
        user.updated = Date.now()
        await user.save()
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.deleteOne()
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const removeAll = async (req, res) => {
    try {
        await User.deleteMany({})
        return res.status(200).json({ message: "All users removed successfully!" })
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

export default { create, userByID, read, list, remove, update, removeAll }
