import express from 'express';
import { getAllChefs, getAllChefsForAdmin, getChefById, verifyChef, getChefAnalytics } from '../controllers/chefController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.get('/all/admin', protect, restrictTo('ADMIN'), getAllChefsForAdmin);
router.get('/analytics/me', protect, restrictTo('CHEF'), getChefAnalytics);
router.get('/', getAllChefs);
router.get('/:id', getChefById);
router.patch('/:id/verify', protect, restrictTo('ADMIN'), verifyChef);

export default router;
