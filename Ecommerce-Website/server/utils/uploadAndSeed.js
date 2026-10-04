import 'dotenv/config';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const products = [
  {
    productName: 'JBL Boombox 2 Speaker',
    productImage: 'jblSpeaker.png',
    category: 'speakers',
    discount: '-20%',
    currentPrice: 1000,
    oldPrice: 1150,
    rating: 4,
    ratingCount: '80K',
    productTitle: 'Enhance Your Music Experience',
    description: 'The JBL Boombox 2 is a portable, IPX7 waterproof Bluetooth speaker with monstrous bass and up to 24 hours of massive playtime.',
    itemNew: true,
    isFlashSale: true,
    isFeatured: true,
    availableColors: [
      { colorCode: '#A0BCE0', blackBorder: true, whiteBorder: true },
      { colorCode: '#E07575', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'jbl-preview.jpeg',
      'jbl-preview1.jpeg',
      'jbl-preview2.jpeg',
      'jbl-preview3.jpeg',
    ],
  },
  {
    productName: 'iPhone 14 Series',
    productImage: 'iphone.jpeg',
    category: 'phones',
    discount: '-30%',
    currentPrice: 600,
    oldPrice: 800,
    rating: 4.5,
    ratingCount: '50K',
    description: 'Experience the stunning Super Retina XDR display, powerful A15 Bionic chip, and an advanced dual-camera system for incredible photos and videos in any light.',
    itemNew: true,
    isFlashSale: true,
    availableColors: [
      { colorCode: '#A0BCE0', blackBorder: true, whiteBorder: true },
      { colorCode: '#E07575', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'iphone-preview.jpeg',
      'iphone-preview1.jpeg',
      'iphone-preview2.jpeg',
      'iphone-preview3.jpeg',
    ],
  },
  {
    productName: 'HAVIT HV-G92 Gamepad',
    productImage: 'controller.png',
    category: 'gaming',
    discount: '-22%',
    currentPrice: 120,
    oldPrice: 160,
    rating: 5,
    ratingCount: '88',
    description: 'Enjoy a superior gaming experience with this ergonomic gamepad. Featuring responsive buttons and comfortable grips, it provides precise control for all your favorite games.',
    itemNew: false,
    isFlashSale: true,
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#A0BCE0', blackBorder: true, whiteBorder: true },
      { colorCode: '#E07575', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'controller-preview.jpeg',
      'controller-preview1.jpeg',
      'controller-preview2.jpeg',
      'controller-preview3.jpeg',
    ],
  },
  {
    productName: 'AK-900 Wired Keyboard',
    productImage: 'keyboard.png',
    category: 'computers',
    discount: '-13%',
    currentPrice: 960,
    oldPrice: 1160,
    rating: 4,
    ratingCount: '75',
    description: 'Boost your productivity with the AK-900 keyboard. Its durable design, responsive keys, and full-size layout offer a comfortable and reliable typing experience for hours.',
    itemNew: true,
    isFlashSale: true,
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#A0BCE0', blackBorder: true, whiteBorder: true },
      { colorCode: '#E07575', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'keyboard-preview.jpeg',
      'keyboard-preview1.webp',
      'keyboard-preview2.jpeg',
      'keyboard-preview3.jpeg',
    ],
  },
  {
    productName: 'IPS LCD Gaming Monitor',
    productImage: 'monitor.png',
    category: 'gaming',
    discount: '-42%',
    currentPrice: 370,
    oldPrice: 400,
    rating: 5,
    ratingCount: '99',
    description: 'Immerse yourself in stunning visuals with this IPS LCD gaming monitor. It offers vibrant colors, wide viewing angles, and a high refresh rate for smooth gameplay.',
    itemNew: true,
    isBestSelling: true,
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#A0BCE0', blackBorder: true, whiteBorder: true },
      { colorCode: '#E07575', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'monitor-preview.jpeg',
      'monitor-preview1.jpeg',
      'monitor-preview2.jpeg',
      'monitor-preview3.jpeg',
    ],
  },
  {
    productName: 'S-Series Comfort Chair',
    productImage: 'chair.png',
    category: 'furniture',
    discount: '-50%',
    currentPrice: 375,
    oldPrice: 400,
    rating: 4.6,
    ratingCount: '99',
    description: 'Upgrade your seating with the S-Series Comfort Chair. Its ergonomic design and premium materials provide optimal support and style for any modern workspace.',
    itemNew: true,
    isBestSelling: true,
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#A0BCE0', blackBorder: true, whiteBorder: true },
      { colorCode: '#E07575', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'chair-preview.jpeg',
      'chair-preview1.jpeg',
      'chair-preview2.jpeg',
      'chair-preview3.jpeg',
    ],
  },
  {
    productName: 'The north coat',
    productImage: 'northCoat.png',
    category: 'clothes',
    discount: '-22%',
    currentPrice: 260,
    oldPrice: 360,
    rating: 5,
    ratingCount: '65',
    description: 'Stay warm and stylish with The North Coat. This durable and insulated jacket provides excellent protection against the cold, making it perfect for winter adventures.',
    itemNew: true,
    isBestSelling: true,
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#A0BCE0', blackBorder: true, whiteBorder: true },
      { colorCode: '#E07575', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'coat-preview.jpeg',
      'coat-preview1.jpeg',
      'coat-preview2.jpeg',
      'coat-preview3.jpeg',
    ],
  },
  {
    productName: 'Gucci duffle bag',
    productImage: 'duffleBag.png',
    category: 'furniture',
    discount: '-13%',
    currentPrice: 960,
    oldPrice: 1160,
    rating: 4.4,
    ratingCount: '65',
    description: 'Travel in luxury with the iconic Gucci duffle bag. Made from premium materials, it offers ample space and a timeless design for your weekend getaways.',
    itemNew: true,
    isBestSelling: true,
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#A0BCE0', blackBorder: true, whiteBorder: true },
      { colorCode: '#E07575', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'bag-preview.jpeg',
      'bag-preview1.jpeg',
      'bag-preview2.jpeg',
      'bag-preview3.jpeg',
    ],
  },
  {
    productName: 'RGB liquid CPU Cooler',
    productImage: 'cpuCooler.png',
    category: 'computers',
    discount: '-35%',
    currentPrice: 160,
    oldPrice: 170,
    rating: 4.7,
    ratingCount: '65',
    description: 'Keep your CPU cool with this RGB liquid cooler. It offers efficient heat dissipation and customizable lighting to enhance your PC performance and aesthetics.',
    itemNew: true,
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#A0BCE0', blackBorder: true, whiteBorder: true },
      { colorCode: '#E07575', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'cooler-preview.jpeg',
      'cooler-preview1.jpeg',
      'cooler-preview2.jpeg',
      'cooler-preview3.jpeg',
    ],
  },
  {
    productName: 'Small BookSelf',
    productImage: 'bookSelf.png',
    category: 'furniture',
    discount: '-53%',
    currentPrice: 360,
    oldPrice: null,
    rating: 5,
    ratingCount: '65',
    description: 'Organize your space with this stylish and compact bookshelf. Its minimalist design is perfect for displaying books, plants, and decor in any room.',
    itemNew: true,
    preview: [
      'bookself-preview.jpeg',
      'bookself-preview1.jpeg',
      'bookself-preview2.jpeg',
      'bookself-preview3.jpeg',
    ],
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#A0BCE0', blackBorder: true, whiteBorder: true },
      { colorCode: '#E07575', blackBorder: false, whiteBorder: false },
    ],
  },
  {
    productName: 'Breed Dry Dog Food',
    productImage: 'dogFood.png',
    category: 'food',
    discount: '-64%',
    currentPrice: 100,
    oldPrice: null,
    rating: 3,
    ratingCount: '35',
    description: 'Provide your pet with balanced nutrition. This high-quality dry dog food is made with wholesome ingredients to support your dog overall health and vitality.',
    itemNew: true,
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#A0BCE0', blackBorder: true, whiteBorder: true },
      { colorCode: '#E07575', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'food-preview.jpeg',
      'food-preview1.jpeg',
      'food-preview2.jpeg',
      'food-preview3.jpeg',
    ],
  },
  {
    productName: 'CANON EOS DSLR Camera',
    productImage: 'canonCamera.png',
    category: 'camera',
    discount: '-11%',
    currentPrice: 360,
    oldPrice: null,
    rating: 4,
    ratingCount: '95',
    description: 'Capture life moments in stunning detail. The Canon EOS DSLR offers exceptional image quality, interchangeable lenses, and user-friendly controls for all photographers.',
    itemNew: true,
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#A0BCE0', blackBorder: true, whiteBorder: true },
      { colorCode: '#E07575', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'camera-preview.jpeg',
      'camera-preview1.jpeg',
      'camera-preview2.jpeg',
      'camera-preview3.jpeg',
    ],
  },
  {
    productName: 'ASUS FHD Gaming Laptop',
    productImage: 'asusLaptop.png',
    category: 'gaming',
    discount: '-26%',
    currentPrice: 700,
    oldPrice: null,
    rating: 5,
    ratingCount: '325',
    description: 'Game on the go with the ASUS FHD gaming laptop. It features a high-refresh-rate display, top-tier graphics, and efficient cooling for an immersive experience.',
    itemNew: true,
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#A0BCE0', blackBorder: true, whiteBorder: true },
      { colorCode: '#E07575', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'laptop-preview.jpeg',
      'laptop-preview1.jpeg',
      'laptop-preview2.jpeg',
      'laptop-preview3.jpeg',
    ],
  },
  {
    productName: 'Curology Product Set',
    productImage: 'curologyProduct.png',
    category: 'beauty and care',
    discount: '-30%',
    currentPrice: 500,
    oldPrice: null,
    rating: 4,
    ratingCount: '145',
    description: 'Achieve clearer skin with this personalized Curology set. Custom-formulated by dermatologists, it effectively targets your unique skincare concerns for a healthier complexion.',
    itemNew: true,
    isFeatured: true,
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#A0BCE0', blackBorder: true, whiteBorder: true },
      { colorCode: '#E07575', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'curology-preview.jpeg',
      'curology-preview1.jpeg',
      'curology-preview2.jpeg',
      'curology-preview3.jpeg',
    ],
  },
  {
    productName: 'Kids Electric Car',
    productImage: 'kidsElectricCar.png',
    category: 'gaming',
    discount: '-22%',
    currentPrice: 960,
    oldPrice: null,
    rating: 5,
    ratingCount: '65',
    description: 'Give your child the ultimate ride-on toy. This kids electric car features a realistic design, safe speeds, and fun features for hours of outdoor adventure.',
    itemNew: true,
    availableColors: [
      { colorCode: '#FB1314', blackBorder: true, whiteBorder: true },
      { colorCode: '#DB4444', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'car-preview.jpeg',
      'car-preview1.jpeg',
      'car-preview2.jpeg',
      'car-preview3.jpeg',
    ],
  },
  {
    productName: 'Jr. Zoom Soccer Cleats',
    productImage: 'soccerCleats.png',
    category: 'footwear',
    discount: '-52%',
    currentPrice: 1160,
    oldPrice: null,
    rating: 5,
    ratingCount: '35',
    description: 'Dominate the pitch with the Jr. Zoom Soccer Cleats. Engineered for speed and agility, they provide excellent traction and a comfortable fit for young athletes.',
    itemNew: false,
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#EEFF61', blackBorder: true, whiteBorder: true },
      { colorCode: '#DB4444', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'shoe-preview.jpeg',
      'shoe-preview1.jpeg',
      'shoe-preview2.jpeg',
      'shoe-preview3.jpeg',
    ],
  },
  {
    productName: 'GP11 Shooter USB Gamepad',
    productImage: 'gp11Gamepad.png',
    category: 'gaming',
    discount: '-12%',
    currentPrice: 660,
    oldPrice: null,
    rating: 4.3,
    ratingCount: '55',
    description: 'Gain a competitive edge with this USB Gamepad. Its precise analog sticks, responsive triggers, and comfortable grip are perfect for action-packed gaming sessions.',
    itemNew: true,
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#000000', blackBorder: true, whiteBorder: true },
      { colorCode: '#DB4444', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'gamepad-preview.jpeg',
      'gamepad-preview1.jpeg',
      'gamepad-preview2.jpeg',
      'gamepad-preview3.jpeg',
    ],
  },
  {
    productName: 'Quilted Satin Jacket',
    productImage: 'satinJacket.png',
    category: 'clothes',
    discount: '-33%',
    currentPrice: 660,
    oldPrice: null,
    rating: 4.4,
    ratingCount: '65',
    description: 'Elevate your outerwear with this chic quilted satin jacket. Its sleek design and lightweight warmth make it a versatile and fashionable choice for any season.',
    itemNew: true,
    availableSizes: [
      { label: 'XS', value: 'XS', isStock: false },
      { label: 'S', value: 'S', isStock: true },
      { label: 'M', value: 'M', isStock: true },
      { label: 'L', value: 'L', isStock: false },
      { label: 'XL', value: 'XL', isStock: true },
    ],
    availableColors: [
      { colorCode: '#000000', blackBorder: true, whiteBorder: true },
      { colorCode: '#DB4444', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'jacket-preview.jpg',
      'jacket-preview1.jpg',
      'jacket-preview2.jpg',
      'jacket-preview3.jpg',
    ],
  },
  {
    productName: 'PlayStation 5',
    productImage: 'ps5.png',
    category: 'gaming',
    discount: '-31%',
    currentPrice: 740,
    oldPrice: null,
    rating: 4.1,
    ratingCount: '63K',
    description: 'Black and White version of the PS5 coming out on side.',
    itemNew: true,
    isFeatured: true,
    availableColors: [
      { colorCode: '#000000', blackBorder: true, whiteBorder: true },
      { colorCode: '#DB4444', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'ps5Prev.jpeg',
      'ps5Prev1.jpeg',
      'ps5Prev2.jpeg',
      'ps5Prev3.jpeg',
    ],
  },
  {
    productName: 'Amazon Speakers',
    productImage: 'speakers.png',
    category: 'speakers',
    discount: '-25%',
    currentPrice: 400,
    oldPrice: null,
    rating: 4.5,
    ratingCount: '10K',
    description: 'High-quality wireless speakers with rich, immersive sound for your home entertainment system.',
    itemNew: true,
    isFeatured: true,
    availableColors: [
      { colorCode: '#000000', blackBorder: true, whiteBorder: true },
      { colorCode: '#DB4444', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'speakerPrev.jpeg',
      'speakerPrev1.jpeg',
      'speakerPrev2.jpeg',
      'speakerPrev3.jpeg',
    ],
  },
  {
    productName: 'GUCCI Perfume',
    productImage: 'perfume.png',
    category: 'beauty and care',
    discount: '-20%',
    currentPrice: 300,
    oldPrice: null,
    rating: 4.8,
    ratingCount: '2K',
    description: 'A luxurious fragrance for the modern individual. Bold, elegant, and long-lasting.',
    itemNew: true,
    isFeatured: true,
    availableColors: [
      { colorCode: '#000000', blackBorder: true, whiteBorder: true },
      { colorCode: '#DB4444', blackBorder: false, whiteBorder: false },
    ],
    preview: [
      'perfumPrev.jpeg',
      'perfumPrev1.jpeg',
      'perfumPrev2.jpeg',
      'perfumPrev3.jpeg',
    ],
  },
];

const uploadToCloudinary = async (filename, folder = 'ecommerce/products') => {
  const filePath = path.join(__dirname, '../../src/assets', filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return null;
  }
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${filename}:`, error.message);
    return null;
  }
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const productsToInsert = [];

    for (const prod of products) {
      console.log(`Processing: ${prod.productName}`);
      
      const mainImageUrl = await uploadToCloudinary(prod.productImage);
      if (mainImageUrl) prod.productImage = mainImageUrl;

      const previewUrls = [];
      for (const prevFile of prod.preview) {
        const url = await uploadToCloudinary(prevFile, 'ecommerce/previews');
        if (url) previewUrls.push(url);
      }
      prod.preview = previewUrls;

      productsToInsert.push(prod);
    }

    const created = await Product.insertMany(productsToInsert);
    console.log(`Seeded ${created.length} products`);

    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin@123',
        role: 'admin',
      });
      console.log('Default admin created: admin@gmail.com / admin@123');
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
