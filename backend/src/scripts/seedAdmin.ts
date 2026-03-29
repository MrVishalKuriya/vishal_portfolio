import mongoose from 'mongoose';
import { User } from '../models/User';
import { env } from '../config/env';

async function seedAdmin() {
  try {
    console.log('🚀 Connecting to MongoDB Atlas...');
    await mongoose.connect(env.MONGODB_URI);
    console.log('✅ Connected.');

    const adminEmail = 'vishalpravinbhai6@gmail.com';
    const adminPassword = 'Vishal@2024'; // RECOMMENDED: Change this immediately after login

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(`⚠️ Admin ${adminEmail} already exists.`);
      process.exit(0);
    }

    const adminUser = new User({
      email: adminEmail,
      password: adminPassword,
      name: 'Vishal Pravinbhai',
      role: 'admin',
    });

    await adminUser.save();
    console.log('🏆 Admin User Provisioned Successfully.');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Initial Key: ${adminPassword}`);
    console.log('-----------------------------------');
    console.log('⚠️ PLEASE CHANGE YOUR PASSWORD IMMEDIATELY AFTER LOGGING IN.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
