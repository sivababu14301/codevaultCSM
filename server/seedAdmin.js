require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/codevault');
    console.log('MongoDB connected...');

    const adminEmail = 'CodeVaultadmin@gmail.com';
    const adminPassword = 'admin123';

    // Check if admin already exists
    let admin = await User.findOne({ email: adminEmail });

    if (admin) {
      console.log('Admin already exists! Updating password just in case...');
      admin.password = adminPassword;
      admin.role = 'admin';
      await admin.save();
      console.log('Admin updated successfully!');
    } else {
      console.log('Creating admin user...');
      admin = await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log('Admin created successfully!');
    }

    console.log('You can now log in with:');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
