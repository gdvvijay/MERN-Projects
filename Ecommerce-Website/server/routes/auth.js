import express from 'express';
import { signup, login, logout, getMe, updateProfile } from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', isAuthenticated, getMe);
router.put('/profile', isAuthenticated, updateProfile);

export default router;
