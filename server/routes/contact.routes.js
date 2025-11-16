import express from 'express'
import contactCtrl from '../controllers/contact.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Route for listing all contacts, creating a new contact, and removing all contacts
// Methods: GET (list), POST (create), DELETE (removeAll)
router.route('/api/contacts')
    .get(contactCtrl.list)
    // creating contacts is public (contact form submissions). Deleting all contacts is admin-only.
    .post(contactCtrl.create)
    .delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.removeAll)

// Middleware to load a contact by ID before read, update, or delete operations
router.param('id', contactCtrl.contactByID)

// Routes for reading, updating, and deleting a single contact by ID
// Methods: GET (read), PUT (update), DELETE (remove)
router.route('/api/contacts/:id')
    .get(contactCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.remove)

export default router
