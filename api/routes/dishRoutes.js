import express from 'express';
import { getDishesByChef, getAllDishesForAdmin, addDish, updateDish, deleteDish, approveDish } from '../controllers/dishController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.get('/all/admin', protect, restrictTo('ADMIN'), getAllDishesForAdmin);
router.get('/chef/:chefId', getDishesByChef);
router.post('/', protect, restrictTo('CHEF'), addDish);
router.patch('/:id', protect, restrictTo('CHEF'), updateDish);
router.patch('/:id/approve', protect, restrictTo('ADMIN'), approveDish);
router.delete('/:id', protect, restrictTo('CHEF'), deleteDish);

export default router;
