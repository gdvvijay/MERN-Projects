import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api/axios';
import { toast } from 'react-toastify';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  const [form, setForm] = useState({
    productName: '',
    category: '',
    currentPrice: '',
    oldPrice: '',
    discount: '',
    rating: '',
    ratingCount: '',
    description: '',
    productTitle: '',
    itemNew: true,
    isFeatured: false,
    isBestSelling: false,
    isFlashSale: false,
  });

  const [mainImage, setMainImage] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImage, setExistingImage] = useState('');
  const [existingPreviews, setExistingPreviews] = useState([]);
  const [colors, setColors] = useState([
    { colorCode: '#000000', blackBorder: true, whiteBorder: true },
  ]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const { data } = await API.get(`/products/${id}`);
          const p = data.product;
          setForm({
            productName: p.productName || '',
            category: p.category || '',
            currentPrice: p.currentPrice || '',
            oldPrice: p.oldPrice || '',
            discount: p.discount || '',
            rating: p.rating || '',
            ratingCount: p.ratingCount || '',
            description: p.description || '',
            productTitle: p.productTitle || '',
            itemNew: p.itemNew ?? true,
            isFeatured: p.isFeatured ?? false,
            isBestSelling: p.isBestSelling ?? false,
            isFlashSale: p.isFlashSale ?? false,
          });
          setExistingImage(p.productImage || '');
          setExistingPreviews(p.preview || []);
          if (p.availableColors?.length) setColors(p.availableColors);
          if (p.availableSizes?.length) setSizes(p.availableSizes);
        } catch (err) {
          toast.error('Failed to load product');
          navigate('/admin/products');
        } finally {
          setFetching(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const addColor = () => setColors([...colors, { colorCode: '#000000', blackBorder: false, whiteBorder: false }]);
  const removeColor = (i) => setColors(colors.filter((_, idx) => idx !== i));
  const updateColor = (i, field, value) => {
    const updated = [...colors];
    updated[i][field] = field === 'colorCode' ? value : !updated[i][field];
    setColors(updated);
  };

  const addSize = () => setSizes([...sizes, { label: '', value: '', isStock: true }]);
  const removeSize = (i) => setSizes(sizes.filter((_, idx) => idx !== i));
  const updateSize = (i, field, value) => {
    const updated = [...sizes];
    if (field === 'label') {
      updated[i].label = value;
      updated[i].value = value;
    } else {
      updated[i][field] = value;
    }
    setSizes(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.productName || !form.category || !form.currentPrice) {
      toast.error('Please fill in required fields (Name, Category, Price)');
      return;
    }
    if (!isEdit && !mainImage) {
      toast.error('Please upload a product image');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      const productData = {
        ...form,
        currentPrice: Number(form.currentPrice),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        rating: form.rating ? Number(form.rating) : 0,
        availableColors: colors,
        availableSizes: sizes.filter((s) => s.label),
      };
      formData.append('productData', JSON.stringify(productData));

      if (mainImage) {
        formData.append('productImage', mainImage);
      }
      previewImages.forEach((file) => {
        formData.append('previewImages', file);
      });

      if (isEdit) {
        await API.put(`/products/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product updated successfully');
      } else {
        await API.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product created successfully');
      }
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#DB4444]"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        {/* Basic Info */}
        <div className="bg-white border rounded-xl p-6 space-y-4 shadow-sm">
          <h3 className="font-medium text-gray-700 mb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Product Name *</label>
              <input name="productName" value={form.productName} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#DB4444]" required />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Category *</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#DB4444]" required>
                <option value="">Select category</option>
                {['phones','gaming','computers','furniture','clothes','speakers','camera','food','beauty and care','footwear'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Current Price *</label>
              <input name="currentPrice" type="number" value={form.currentPrice} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#DB4444]" required />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Old Price</label>
              <input name="oldPrice" type="number" value={form.oldPrice} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#DB4444]" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Discount (e.g. -20%)</label>
              <input name="discount" value={form.discount} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#DB4444]" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Rating (0-5)</label>
              <input name="rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#DB4444]" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Rating Count</label>
              <input name="ratingCount" value={form.ratingCount} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#DB4444]" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Product Title</label>
              <input name="productTitle" value={form.productTitle} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#DB4444]" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#DB4444] resize-none" />
          </div>
          <div className="flex flex-wrap gap-6">
            {[['itemNew', 'New Product'], ['isFeatured', 'Featured'], ['isBestSelling', 'Best Selling'], ['isFlashSale', 'Flash Sale']].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" name={key} checked={form[key]} onChange={handleChange} className="accent-[#DB4444]" />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white border rounded-xl p-6 space-y-4 shadow-sm">
          <h3 className="font-medium text-gray-700 mb-2">Images</h3>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Main Product Image {!isEdit && '*'}</label>
            {existingImage && !mainImage && (
              <img src={existingImage} alt="current" className="w-20 h-20 object-contain rounded bg-gray-100 mb-2" />
            )}
            {mainImage && (
              <img src={URL.createObjectURL(mainImage)} alt="new" className="w-20 h-20 object-contain rounded bg-gray-100 mb-2" />
            )}
            <input type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files[0])} className="text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Preview Images (up to 4)</label>
            {existingPreviews.length > 0 && previewImages.length === 0 && (
              <div className="flex gap-2 mb-2">
                {existingPreviews.map((url, i) => (
                  <img key={i} src={url} alt={`preview ${i}`} className="w-16 h-16 object-contain rounded bg-gray-100" />
                ))}
              </div>
            )}
            <input type="file" accept="image/*" multiple onChange={(e) => setPreviewImages(Array.from(e.target.files).slice(0, 4))} className="text-sm" />
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-700">Available Colors</h3>
            <button type="button" onClick={addColor} className="text-[#DB4444] text-sm font-medium hover:underline cursor-pointer">+ Add Color</button>
          </div>
          {colors.map((color, i) => (
            <div key={i} className="flex items-center gap-3 flex-wrap">
              <input type="color" value={color.colorCode} onChange={(e) => updateColor(i, 'colorCode', e.target.value)} className="w-10 h-8 cursor-pointer" />
              <span className="text-xs text-gray-500">{color.colorCode}</span>
              <label className="flex items-center gap-1 text-xs cursor-pointer">
                <input type="checkbox" checked={color.blackBorder} onChange={() => updateColor(i, 'blackBorder')} className="accent-[#DB4444]" />
                Black Border
              </label>
              <label className="flex items-center gap-1 text-xs cursor-pointer">
                <input type="checkbox" checked={color.whiteBorder} onChange={() => updateColor(i, 'whiteBorder')} className="accent-[#DB4444]" />
                White Border
              </label>
              {colors.length > 1 && (
                <button type="button" onClick={() => removeColor(i)} className="text-red-500 text-xs hover:underline cursor-pointer">Remove</button>
              )}
            </div>
          ))}
        </div>

        {/* Sizes */}
        <div className="bg-white border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-700">Available Sizes</h3>
            <button type="button" onClick={addSize} className="text-[#DB4444] text-sm font-medium hover:underline cursor-pointer">+ Add Size</button>
          </div>
          {sizes.length === 0 && <p className="text-xs text-gray-400">No sizes added. Click "+ Add Size" to add size options.</p>}
          {sizes.map((size, i) => (
            <div key={i} className="flex items-center gap-3 flex-wrap">
              <input value={size.label} onChange={(e) => updateSize(i, 'label', e.target.value)} placeholder="Size (e.g. XS, S, M)" className="border rounded px-2 py-1 text-sm w-28 outline-none focus:border-[#DB4444]" />
              <label className="flex items-center gap-1 text-xs cursor-pointer">
                <input type="checkbox" checked={size.isStock} onChange={(e) => updateSize(i, 'isStock', e.target.checked)} className="accent-[#DB4444]" />
                In Stock
              </label>
              <button type="button" onClick={() => removeSize(i)} className="text-red-500 text-xs hover:underline cursor-pointer">Remove</button>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#DB4444] text-white px-8 py-3 rounded-lg hover:bg-red-600 transition font-medium text-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="border px-8 py-3 rounded-lg hover:bg-gray-50 transition text-sm cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
