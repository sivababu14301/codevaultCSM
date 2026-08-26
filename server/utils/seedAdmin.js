const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  try {
    const adminEmail = 'codevaultadmin@gmail.com'; // Normalized to lowercase
    
    // Remove old admin accounts to ensure only one exists, matching insensitively
    await User.deleteMany({ role: 'admin', email: { $not: new RegExp(`^${adminEmail}$`, 'i') } });

    let adminExists = await User.findOne({ email: new RegExp(`^${adminEmail}$`, 'i') });

    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: 'admin123',
        role: 'admin',
      });
      console.log('Seeded predefined admin account.');
    } else {
      // Force reset role and password to ensure it works
      adminExists.role = 'admin';
      adminExists.password = 'admin123';
      await adminExists.save();
      console.log('Predefined admin account verified and reset.');
    }
  } catch (error) {
    console.error('Error seeding admin account:', error.message);
  }
};

module.exports = seedAdmin;
