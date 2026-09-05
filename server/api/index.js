const app = require('../app');
const connectDB = require('../config/db');

// Connect to the database
connectDB();

// Export the app for Vercel serverless deployment
module.exports = app;
