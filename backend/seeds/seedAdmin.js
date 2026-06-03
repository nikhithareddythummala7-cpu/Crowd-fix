const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  try {
    // Check if admin already exists
    let admin = await User.findOne({ email: 'admin@test.com' }).select('+password');
    const newPassword = 'CrowdFixAdmin@2026';
    
    if (!admin) {
      // Create admin user with plain password; model hashes it before save
      admin = await User.create({
        name: 'Admin User',
        email: 'admin@test.com',
        password: newPassword,
        mobile: '9999999999',
        address: 'Admin Office',
        role: 'admin',
        isActive: true,
      });
      
      console.log(`✓ Default admin user created: admin@test.com / ${newPassword}`);
    } else {
      // Update password if admin already exists; model hashes it before save
      admin.password = newPassword;
      await admin.save();
      console.log(`✓ Admin password updated: admin@test.com / ${newPassword}`);
    }
  } catch (error) {
    console.error('Error seeding admin:', error.message);
  }
};

module.exports = seedAdmin;
