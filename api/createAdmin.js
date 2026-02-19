import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');

    const adminExists = await User.findOne({ email: 'admin@homeflame.com' });
    if (adminExists) {
      console.log('Admin already exists!');
      process.exit(0);
    }

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@homeflame.com',
      password: 'admin123',
      role: 'ADMIN'
    });

    console.log('✅ Admin account created successfully!');
    console.log('Email: admin@homeflame.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
