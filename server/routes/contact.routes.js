import express from 'express'
import contactCtrl from '../controllers/contact.controller.js'

const router = express.Router()

// Route for listing all contacts, creating a new contact, and removing all contacts
// Methods: GET (list), POST (create), DELETE (removeAll)
router.route('/api/contacts')
    .get(contactCtrl.list)
    .post(contactCtrl.create)
    .delete(contactCtrl.removeAll)

// Middleware to load a contact by ID before read, update, or delete operations
router.param('id', contactCtrl.contactByID)

// Routes for reading, updating, and deleting a single contact by ID
// Methods: GET (read), PUT (update), DELETE (remove)
router.route('/api/contacts/:id')
    .get(contactCtrl.read)
    .put(contactCtrl.update)
    .delete(contactCtrl.remove)

export default router
