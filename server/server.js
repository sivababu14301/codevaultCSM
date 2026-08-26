require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');
const seedCategories = require('./utils/seedCategories');

// Connect to database
connectDB().then(() => {
  seedCategories();
  seedAdmin();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
