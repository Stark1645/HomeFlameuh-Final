import express from 'express';
import { updateProfile, getProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.get('/profile', getProfile);
router.patch('/profile', updateProfile);

export default router;
