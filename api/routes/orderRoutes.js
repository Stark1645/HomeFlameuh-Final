import express from 'express';
import { createOrder, getUserOrders, getChefOrders, getOrderById, updateOrderStatus } from '../controllers/orderController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.post('/', restrictTo('USER'), createOrder);
router.get('/user', restrictTo('USER'), getUserOrders);
router.get('/chef', restrictTo('CHEF'), getChefOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', restrictTo('CHEF'), updateOrderStatus);

export default router;
