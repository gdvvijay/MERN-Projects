import { useState, useEffect } from "react";

const USER_KEY = "user";

export default function ManageAccount() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [editing, setEditing] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('NAME')
    const storedEmail=localStorage.getItem('EMAIL')
    const storedPassword=localStorage.getItem('PASSWORD')

    if (storedName && storedEmail && storedPassword) {
      setUser({name:storedName,email:storedEmail,password:storedPassword});
    }
  }, []);


  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    localStorage.setItem('NAME', user.name);
    localStorage.setItem('EMAIL', user.email);
    localStorage.setItem('PASSWORD', user.email);
    setEditing(false);
  }


  function handleLogout() {
    localStorage.removeItem('NAME');
    localStorage.removeItem('EMAIL');
    localStorage.removeItem('PASSWORD');
    window.location.reload();
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Manage My Account
        </h1>

        {/* Profile Info */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full px-3 py-2 border rounded-lg ${
                editing
                  ? "border-blue-500 focus:ring-2 focus:ring-blue-300"
                  : "border-gray-300 bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full px-3 py-2 border rounded-lg ${
                editing
                  ? "border-blue-500 focus:ring-2 focus:ring-blue-300"
                  : "border-gray-300 bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full px-3 py-2 border rounded-lg ${
                editing
                  ? "border-blue-500 focus:ring-2 focus:ring-blue-300"
                  : "border-gray-300 bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              Save Changes
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
