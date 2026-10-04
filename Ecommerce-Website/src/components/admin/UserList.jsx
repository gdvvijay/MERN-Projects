import { useEffect, useState } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import useAuthContext from '../../Hooks/useAuthContext';

export default function UserList() {
  const { user: currentUser } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (p = page, s = search) => {
    try {
      setLoading(true);
      const { data } = await API.get('/users', {
        params: { page: p, limit: 10, search: s },
      });
      setUsers(data.users);
      setTotalPages(data.pages);
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers(1, search);
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await API.put(`/users/${userId}/role`, { role: newRole });
      toast.success('Role updated');
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update role');
    }
  };

  const handleDelete = async (userId, name) => {
    if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    try {
      await API.delete(`/users/${userId}`);
      toast.success('User deleted');
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Users</h2>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name or email..."
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
      ) : (
        <>
          <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b bg-gray-50">
                  <th className="p-4 font-medium text-gray-500">Name</th>
                  <th className="p-4 font-medium text-gray-500">Email</th>
                  <th className="p-4 font-medium text-gray-500">Role</th>
                  <th className="p-4 font-medium text-gray-500">Joined</th>
                  <th className="p-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4 font-medium">{u.name}</td>
                    <td className="p-4 text-gray-500">{u.email}</td>
                    <td className="p-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        disabled={u._id === currentUser?._id}
                        className="border rounded px-2 py-1 text-xs outline-none disabled:opacity-50"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-4 text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {u._id !== currentUser?._id && (
                        <button
                          onClick={() => handleDelete(u._id, u.name)}
                          className="bg-red-500 text-white px-3 py-1.5 rounded text-xs hover:bg-red-600 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      )}
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
