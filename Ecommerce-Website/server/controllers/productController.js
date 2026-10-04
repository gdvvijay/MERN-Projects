import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

// Helper: upload buffer to Cloudinary
const uploadToCloudinary = (buffer, folder = 'ecommerce/products') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// GET /api/products - Public
export const getProducts = async (req, res) => {
  try {
    const { category, search, sort, page = 1, limit = 20, featured, bestselling, flashsale } = req.query;
    const filter = {};

    if (category) filter.category = category.toLowerCase();
    if (search) filter.productName = { $regex: search, $options: 'i' };
    if (featured === 'true') filter.isFeatured = true;
    if (bestselling === 'true') filter.isBestSelling = true;
    if (flashsale === 'true') filter.isFlashSale = true;

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { currentPrice: 1 };
    if (sort === 'price_desc') sortOption = { currentPrice: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };
    if (sort === 'newest') sortOption = { createdAt: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      products,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/products/:id - Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/products - Admin only
export const createProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData || '{}');

    // Upload main image
    if (req.files && req.files.productImage && req.files.productImage[0]) {
      const result = await uploadToCloudinary(req.files.productImage[0].buffer);
      productData.productImage = result.secure_url;
    }

    // Upload preview images
    if (req.files && req.files.previewImages) {
      const previewUrls = [];
      for (const file of req.files.previewImages) {
        const result = await uploadToCloudinary(file.buffer, 'ecommerce/previews');
        previewUrls.push(result.secure_url);
      }
      productData.preview = previewUrls;
    }

    const product = await Product.create(productData);
    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT /api/products/:id - Admin only
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const productData = JSON.parse(req.body.productData || '{}');

    // Upload new main image if provided
    if (req.files && req.files.productImage && req.files.productImage[0]) {
      // Delete old image from Cloudinary if exists
      if (product.productImage && product.productImage.includes('cloudinary')) {
        const publicId = product.productImage.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }
      const result = await uploadToCloudinary(req.files.productImage[0].buffer);
      productData.productImage = result.secure_url;
    }

    // Upload new preview images if provided
    if (req.files && req.files.previewImages && req.files.previewImages.length > 0) {
      // Delete old previews
      if (product.preview && product.preview.length > 0) {
        for (const url of product.preview) {
          if (url.includes('cloudinary')) {
            const publicId = url.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicId).catch(() => {});
          }
        }
      }
      const previewUrls = [];
      for (const file of req.files.previewImages) {
        const result = await uploadToCloudinary(file.buffer, 'ecommerce/previews');
        previewUrls.push(result.secure_url);
      }
      productData.preview = previewUrls;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true, runValidators: true }
    );

    res.json({ message: 'Product updated', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/products/:id - Admin only
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete images from Cloudinary
    if (product.productImage && product.productImage.includes('cloudinary')) {
      const publicId = product.productImage.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId).catch(() => {});
    }
    if (product.preview && product.preview.length > 0) {
      for (const url of product.preview) {
        if (url.includes('cloudinary')) {
          const publicId = url.split('/').slice(-2).join('/').split('.')[0];
          await cloudinary.uploader.destroy(publicId).catch(() => {});
        }
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
