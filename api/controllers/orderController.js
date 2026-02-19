import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      userId: req.user._id,
      status: 'PLACED'
    });
    res.status(201).json({
      timestamp: new Date().toISOString(),
      status: 201,
      message: 'Order placed',
      data: { ...order.toObject(), id: order._id }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort('-createdAt');
    const ordersData = orders.map(o => ({ ...o.toObject(), id: o._id }));
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Success',
      data: ordersData
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getChefOrders = async (req, res) => {
  try {
    const orders = await Order.find({ chefId: req.user._id }).sort('-createdAt');
    const ordersData = orders.map(o => ({ ...o.toObject(), id: o._id }));
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Success',
      data: ordersData
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Success',
      data: { ...order.toObject(), id: order._id }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, chefId: req.user._id },
      { status: req.body.status },
      { new: true }
    );
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Status updated',
      data: undefined
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
