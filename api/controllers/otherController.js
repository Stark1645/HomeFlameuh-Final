import { ContactMessage, Subscription } from '../models/Others.js';
import User from '../models/User.js';
import ChefProfile from '../models/ChefProfile.js';
import Order from '../models/Order.js';

export const sendContactMessage = async (req, res) => {
  try {
    await ContactMessage.create(req.body);
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Message sent',
      data: undefined
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort('-createdAt');
    const messagesData = messages.map(m => ({ ...m.toObject(), id: m._id }));
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Success',
      data: messagesData
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find({ userId: req.user._id });
    const subsData = subs.map(s => ({ ...s.toObject(), id: s._id }));
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Success',
      data: subsData
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createSubscription = async (req, res) => {
  try {
    const sub = await Subscription.create({ ...req.body, userId: req.user._id });
    res.status(201).json({
      timestamp: new Date().toISOString(),
      status: 201,
      message: 'Subscribed',
      data: { ...sub.toObject(), id: sub._id }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAdminReport = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalChefs = await ChefProfile.countDocuments();
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Success',
      data: { totalUsers, totalChefs, totalOrders, totalRevenue }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
