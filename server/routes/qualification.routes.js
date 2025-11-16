import express from 'express'
import qualificationCtrl from '../controllers/qualification.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Route for listing all qualifications, creating a new qualification, and removing all
// Methods: GET (list), POST (create), DELETE (removeAll)
router.route('/api/qualifications')
    .get(qualificationCtrl.list)
    .post(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.create)
    .delete(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.removeAll)

// Middleware to load a qualification by ID before read, update, or delete operations
router.param('id', qualificationCtrl.qualificationByID)

// Routes for reading, updating, and deleting a single qualification by ID
// Methods: GET (read), PUT (update), DELETE (remove)
router.route('/api/qualifications/:id')
    .get(qualificationCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.remove)

export default router
