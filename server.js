import config from './config/config.js';
import app from './server/express.js';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri)
    .then(() => {
        console.log("Connected to the database!")
        try {
            // Print the DB name and host mongoose actually connected to
            console.log('mongoUri (configured):', config.mongoUri)
            console.log('mongoose connection db:', mongoose.connection.name)
            console.log('mongoose connection host:', mongoose.connection.host)
        } catch (e) {
            // ignore logging errors
        }
    })
    .catch((err) => console.error("Database connection error:", err));

app.listen(config.port, () => {
    const host = process.env.HOST || 'localhost'
    console.info(`Server running at http://${host}:${config.port}`)
})