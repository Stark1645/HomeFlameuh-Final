import ChefProfile from '../models/ChefProfile.js';
import Order from '../models/Order.js';

export const getAllChefs = async (req, res) => {
  try {
    // Only show verified chefs
    const chefs = await ChefProfile.find({ verified: true }).populate('userId', 'name email');
    const chefsData = chefs.map(c => ({ ...c.toObject(), id: c._id }));
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Success',
      data: chefsData
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllChefsForAdmin = async (req, res) => {
  try {
    // Show all chefs including unverified (for admin)
    const chefs = await ChefProfile.find().populate('userId', 'name email');
    const chefsData = chefs.map(c => ({ ...c.toObject(), id: c._id }));
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Success',
      data: chefsData
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getChefById = async (req, res) => {
  try {
    const chef = await ChefProfile.findById(req.params.id).populate('userId', 'name email');
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Success',
      data: { ...chef.toObject(), id: chef._id }
    });
  } catch (error) {
    res.status(404).json({ message: 'Chef not found' });
  }
};

export const verifyChef = async (req, res) => {
  try {
    const chef = await ChefProfile.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Chef verified',
      data: undefined
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getChefAnalytics = async (req, res) => {
  try {
    const orders = await Order.find({ chefId: req.user._id });
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Success',
      data: {
        totalOrders: orders.length,
        totalRevenue,
        averageRating: 4.8,
        monthlyRevenue: [450, 600, 800, 1200, 950, totalRevenue]
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
