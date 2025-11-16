import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: 'First name is required'
    },
    lastname: {
        type: String,
        trim: true,
        required: 'Last name is required'
    },
    email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    message: {
        type: String,
        trim: true,
        default: '',
        minlength: [0, 'Message is too short'],
        maxlength: [200, 'Message is too long']
    }
    // Mongoose automatically adds an '_id' field
})

export default mongoose.model('Contact', ContactSchema)
