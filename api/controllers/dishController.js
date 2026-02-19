import Dish from '../models/Dish.js';

export const getDishesByChef = async (req, res) => {
  try {
    // Only show approved dishes to regular users
    const dishes = await Dish.find({ chefId: req.params.chefId, approved: true });
    const dishesData = dishes.map(d => ({ ...d.toObject(), id: d._id }));
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Success',
      data: dishesData
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllDishesForAdmin = async (req, res) => {
  try {
    // Show all dishes including unapproved (for admin)
    const dishes = await Dish.find().populate('chefId', 'name');
    const dishesData = dishes.map(d => ({ ...d.toObject(), id: d._id }));
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Success',
      data: dishesData
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const approveDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Dish approved',
      data: { ...dish.toObject(), id: dish._id }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addDish = async (req, res) => {
  try {
    const dish = await Dish.create({ ...req.body, chefId: req.user._id });
    res.status(201).json({
      timestamp: new Date().toISOString(),
      status: 201,
      message: 'Dish added',
      data: { ...dish.toObject(), id: dish._id }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDish = async (req, res) => {
  try {
    const dish = await Dish.findOneAndUpdate(
      { _id: req.params.id, chefId: req.user._id },
      req.body,
      { new: true }
    );
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Dish updated',
      data: { ...dish.toObject(), id: dish._id }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDish = async (req, res) => {
  try {
    await Dish.findOneAndDelete({ _id: req.params.id, chefId: req.user._id });
    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      message: 'Dish deleted',
      data: undefined
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
