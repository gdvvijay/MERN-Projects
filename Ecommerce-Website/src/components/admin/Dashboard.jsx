import { useEffect, useState } from 'react';
import API from '../../api/axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [productStats, setProductStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userRes, productRes] = await Promise.all([
          API.get('/users/stats'),
          API.get('/products', { params: { limit: 1 } }),
        ]);
        setStats(userRes.data);
        setProductStats({ total: productRes.data.total });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#DB4444]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="text-3xl mb-2">👥</div>
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="text-3xl mb-2">🛡️</div>
          <h3 className="text-gray-500 text-sm">Admin Users</h3>
          <p className="text-3xl font-bold">{stats?.totalAdmins || 0}</p>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="text-3xl mb-2">📦</div>
          <h3 className="text-gray-500 text-sm">Total Products</h3>
          <p className="text-3xl font-bold">{productStats?.total || 0}</p>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
        </div>
        <div className="flex gap-4 flex-wrap">
          <Link
            to="/admin/products/new"
            className="bg-[#DB4444] text-white px-6 py-3 rounded-lg hover:bg-red-600 transition font-medium text-sm"
          >
            + Add New Product
          </Link>
          <Link
            to="/admin/products"
            className="border border-[#DB4444] text-[#DB4444] px-6 py-3 rounded-lg hover:bg-red-50 transition font-medium text-sm"
          >
            Manage Products
          </Link>
          <Link
            to="/admin/users"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
          >
            Manage Users
          </Link>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 font-medium text-gray-500">Name</th>
                <th className="pb-3 font-medium text-gray-500">Email</th>
                <th className="pb-3 font-medium text-gray-500">Role</th>
                <th className="pb-3 font-medium text-gray-500">Joined</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentUsers?.map((u) => (
                <tr key={u._id} className="border-b last:border-0">
                  <td className="py-3">{u.name}</td>
                  <td className="py-3 text-gray-500">{u.email}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.role === 'admin'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
