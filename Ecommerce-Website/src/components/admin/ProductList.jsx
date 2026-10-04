import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import { toast } from 'react-toastify';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (p = page, s = search) => {
    try {
      setLoading(true);
      const { data } = await API.get('/products', {
        params: { page: p, limit: 10, search: s },
      });
      setProducts(data.products);
      setTotalPages(data.pages);
    } catch (err) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts(1, search);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await API.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <Link
          to="/admin/products/new"
          className="bg-[#DB4444] text-white px-5 py-2.5 rounded-lg hover:bg-red-600 transition text-sm font-medium"
        >
          + Add Product
        </Link>
      </div>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="border rounded-lg px-4 py-2 flex-1 outline-none focus:border-[#DB4444] text-sm"
        />
        <button
          type="submit"
          className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition text-sm"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#DB4444]"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No products found</p>
          <Link to="/admin/products/new" className="text-[#DB4444] underline mt-2 inline-block">
            Add your first product
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b bg-gray-50">
                  <th className="p-4 font-medium text-gray-500">Image</th>
                  <th className="p-4 font-medium text-gray-500">Name</th>
                  <th className="p-4 font-medium text-gray-500">Category</th>
                  <th className="p-4 font-medium text-gray-500">Price</th>
                  <th className="p-4 font-medium text-gray-500">Rating</th>
                  <th className="p-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="w-12 h-12 object-contain rounded bg-gray-100"
                      />
                    </td>
                    <td className="p-4 font-medium">{product.productName}</td>
                    <td className="p-4">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs capitalize">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold">${product.currentPrice}</span>
                      {product.oldPrice && (
                        <span className="text-gray-400 line-through ml-2">${product.oldPrice}</span>
                      )}
                    </td>
                    <td className="p-4">⭐ {product.rating}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="bg-blue-500 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-600 transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id, product.productName)}
                          className="bg-red-500 text-white px-3 py-1.5 rounded text-xs hover:bg-red-600 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 text-sm hover:bg-gray-50 cursor-pointer"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 text-sm hover:bg-gray-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
