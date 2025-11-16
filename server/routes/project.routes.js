import express from 'express'
import projectCtrl from '../controllers/project.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Route for listing all projects, creating a new project, and removing all projects
// Methods: GET (list), POST (create), DELETE (removeAll)
router.route('/api/projects')
    .get(projectCtrl.list)
    // Only admin can create or remove all projects
    .post(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.create)
    .delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.removeAll)

// Middleware to load a project by ID before read, update, or delete operations
router.param('id', projectCtrl.projectByID)

// Routes for reading, updating, and deleting a single project by ID
// Methods: GET (read), PUT (update), DELETE (remove)
router.route('/api/projects/:id')
    .get(projectCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.remove)

export default router
