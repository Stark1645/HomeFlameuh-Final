import User from '../models/User.js';

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, address: req.body.address, phone: req.body.phone },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Profile updated',
      data: { ...user.toObject(), id: user._id }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Success',
      data: { ...user.toObject(), id: user._id }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
