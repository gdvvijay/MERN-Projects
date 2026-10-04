import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    productImage: {
      type: String,
      required: [true, 'Product image is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      lowercase: true,
    },
    discount: { type: String, default: null },
    currentPrice: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    oldPrice: { type: Number, default: null },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: String, default: '0' },
    description: { type: String, default: '' },
    productTitle: { type: String, default: '' },
    itemNew: { type: Boolean, default: true },
    availableColors: [
      {
        colorCode: String,
        blackBorder: { type: Boolean, default: false },
        whiteBorder: { type: Boolean, default: false },
      },
    ],
    availableSizes: [
      {
        label: String,
        value: String,
        isStock: { type: Boolean, default: true },
      },
    ],
    preview: [String],
    isFeatured: { type: Boolean, default: false },
    isBestSelling: { type: Boolean, default: false },
    isFlashSale: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
