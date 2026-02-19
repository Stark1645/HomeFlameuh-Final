import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ChefProfile from '../models/ChefProfile.js';

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const register = async (req, res) => {
  try {
    const { name, email, password, role, address, phone, cuisineSpecialty, bio } = req.body;
    
    if (role === 'ADMIN') {
      return res.status(403).json({ message: 'Admin registration is not allowed' });
    }
    
    const user = await User.create({ name, email, password, role, address, phone });
    
    if (role === 'CHEF') {
      await ChefProfile.create({
        userId: user._id,
        name,
        cuisineSpecialty: cuisineSpecialty || 'General',
        bio: bio || 'Passionate home chef',
        hygieneRating: 4.5,
        rating: 4.0
      });
    }

    const token = signToken(user._id);
    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      timestamp: new Date().toISOString(),
      status: 201,
      message: 'Registration successful',
      data: { user: { ...userObj, id: userObj._id }, token }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user._id);
    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Login successful',
      data: { user: { ...userObj, id: userObj._id }, token }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
