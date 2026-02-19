import express from 'express';
import { sendContactMessage, getContactMessages, getUserSubscriptions, createSubscription, getAdminReport } from '../controllers/otherController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.post('/contact', sendContactMessage);
router.get('/contact', protect, restrictTo('ADMIN'), getContactMessages);
router.get('/subscriptions', protect, getUserSubscriptions);
router.post('/subscriptions', protect, restrictTo('USER'), createSubscription);
router.get('/admin/report', protect, restrictTo('ADMIN'), getAdminReport);

export default router;
