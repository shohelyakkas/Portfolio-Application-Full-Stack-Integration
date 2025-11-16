
// Configuration with environment-variable fallback. 
// Set MONGO_URI in your environment
// to avoid hardcoding credentials in the repo.
const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
    mongoUri: process.env.MONGO_URI || 'mongodb+srv://sakkas_db_user:Password-12345678@cluster0.ijsbvcg.mongodb.net/Portfolio?appName=Cluster0',
};

export default config;


