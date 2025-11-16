import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import config from '../../config/config.js'

// Sign in a user
const signin = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ error: "User not found" })
        }

        if (!user.authenticate(req.body.password)) {
            return res.status(401).json({ error: "Email and password don't match." })
        }

        const token = jwt.sign({ _id: user._id }, config.jwtSecret)
        res.cookie('t', token, { expire: new Date() + 9999 })

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
                ,
                role: user.role
            }
        })
    } catch (err) {
        return res.status(401).json({ error: "Could not sign in" })
    }
}

// Sign out a user
const signout = (req, res) => {
    res.clearCookie('t')
    return res.status(200).json({
        message: 'Signed out successfully'
    })
}

// Middleware to protect routes, requiring a valid JWT
const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    userProperty: 'auth'
})

// Middleware to check if the authenticated user is authorized to perform an action
const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!authorized) {
        return res.status(403).json({
            error: 'User is not authorized'
        })
    }
    next()
}

// Middleware to allow action if the requester is the profile owner OR an admin
const isAdminOrSelf = async (req, res, next) => {
    try {
        // owner
        const owner = req.profile && req.auth && req.profile._id == req.auth._id
        if (owner) return next()

        // otherwise check if requester is admin
        const requester = await User.findById(req.auth && req.auth._id)
        if (!requester) return res.status(401).json({ error: 'User not found' })
        if (requester.role === 'admin') return next()

        return res.status(403).json({ error: 'User is not authorized' })
    } catch (err) {
        return res.status(401).json({ error: 'Could not verify authorization.' })
    }
}

// Middleware to check admin role
const isAdmin = async (req, res, next) => {
    try {
        // req.auth is set by requireSignin and contains _id
        const user = await User.findById(req.auth && req.auth._id)
        if (!user) return res.status(401).json({ error: 'User not found' })
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin resource. Access denied.' })
        }
        next()
    } catch (err) {
        return res.status(401).json({ error: 'Could not verify admin.' })
    }
}

export default {
    signin,
    signout,
    requireSignin,
    hasAuthorization,
    isAdminOrSelf,
    isAdmin
}
