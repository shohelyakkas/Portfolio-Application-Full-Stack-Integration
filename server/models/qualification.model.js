import mongoose from 'mongoose'

const QualificationSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'Qualification title is required'
    },
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    completion: {
        type: Date,
        required: 'Completion date is required'
    },
    description: {
        type: String,
        trim: true
    }
}, { collection: 'qualifications' }) // Explicitly sets the collection name as required

export default mongoose.model('Qualification', QualificationSchema)
