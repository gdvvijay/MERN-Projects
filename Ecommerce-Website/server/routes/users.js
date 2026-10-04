import express from 'express';
import { getUsers, updateUserRole, deleteUser, getStats } from '../controllers/userController.js';
import { isAdmin } from '../middleware/admin.js';

const router = express.Router();

router.get('/', isAdmin, getUsers);
router.get('/stats', isAdmin, getStats);
router.put('/:id/role', isAdmin, updateUserRole);
router.delete('/:id', isAdmin, deleteUser);

export default router;
