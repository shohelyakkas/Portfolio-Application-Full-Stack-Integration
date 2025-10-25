import express from 'express'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

// Import all route files
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import contactRoutes from './routes/contact.routes.js'
import projectRoutes from './routes/project.routes.js'
import qualificationRoutes from './routes/qualification.routes.js'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

// --- Routes ---
// Mount all route files
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', contactRoutes)
app.use('/', projectRoutes)
app.use('/', qualificationRoutes)

// Welcome route for base URL
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to My Portfolio Application!" });
});

// --- Error Handling ---
// Catch-all for unauthorized errors from express-jwt
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
})

export default app
