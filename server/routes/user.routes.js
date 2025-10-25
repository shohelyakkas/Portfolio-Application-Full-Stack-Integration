import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js' // We need to import the authentication controller

const router = express.Router()

// Route 1: Create and List Users (List is NOT protected)
router.route('/api/users')
    .get(userCtrl.list) // GET is public (list all users)
    .post(userCtrl.create) // POST is public (create a new user/signup)

// Route 2: Read, Update, and Delete a Specific User (These are PROTECTED)
router.route('/api/users/:userId')
    .get(authCtrl.requireSignin, userCtrl.read) // Must be signed in to read user profile
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update) // Must be signed in AND authorized to update
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove) // Must be signed in AND authorized to delete

// Middleware to load user data when userId is present in the URL
router.param('userId', userCtrl.userByID)

export default router
