import express from 'express';
import multer from 'multer';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { isAdmin } from '../middleware/admin.js';

const router = express.Router();

// Multer config - memory storage for Cloudinary
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

const uploadFields = upload.fields([
  { name: 'productImage', maxCount: 1 },
  { name: 'previewImages', maxCount: 4 },
]);

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Admin routes
router.post('/', isAdmin, uploadFields, createProduct);
router.put('/:id', isAdmin, uploadFields, updateProduct);
router.delete('/:id', isAdmin, deleteProduct);

export default router;
