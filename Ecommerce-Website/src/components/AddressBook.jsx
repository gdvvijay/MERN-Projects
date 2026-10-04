import { useState, useEffect } from "react";

const ADDRESS_KEY = "ADDRESS_BOOK";

export default function AddressBook() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    id: null,
    label: "",
    address: "",
    city: "",
    country: "",
  });
  const [editing, setEditing] = useState(false);

  // Load addresses from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(ADDRESS_KEY)) || [];
    setAddresses(stored);
  }, []);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Add or update address
  function handleSave() {
    if (!form.label || !form.address || !form.city || !form.country) {
      alert("Please fill in all fields.");
      return;
    }

    let updatedAddresses;
    if (editing) {
      updatedAddresses = addresses.map((a) =>
        a.id === form.id ? { ...form } : a
      );
    } else {
      updatedAddresses = [
        ...addresses,
        { ...form, id: Date.now() }, // unique id
      ];
    }

    setAddresses(updatedAddresses);
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(updatedAddresses));

    // Reset form
    setForm({ id: null, label: "", address: "", city: "", country: "" });
    setEditing(false);
  }

  // Delete address
  function handleDelete(id) {
    const filtered = addresses.filter((a) => a.id !== id);
    setAddresses(filtered);
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(filtered));
  }

  // Edit existing address
  function handleEdit(addr) {
    setForm(addr);
    setEditing(true);
  }

  // Cancel editing
  function handleCancel() {
    setForm({ id: null, label: "", address: "", city: "", country: "" });
    setEditing(false);
  }

  return (
    <div className="flex flex-col w-full max-w-3xl bg-[#F5F5F5] p-6 gap-y-6 rounded-xl shadow-sm">
      <h3 className="font-medium text-xl text-[#DB4444] text-center">
        Manage Address Book
      </h3>

      {/* Address Form */}
      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-y-3">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            name="label"
            value={form.label}
            onChange={handleChange}
            placeholder="Label (e.g., Home, Work)"
            className="flex-1 border px-3 py-2 rounded-lg text-sm"
          />
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="flex-1 border px-3 py-2 rounded-lg text-sm"
          />
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            className="flex-1 border px-3 py-2 rounded-lg text-sm"
          />
        </div>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Full address"
          className="border px-3 py-2 rounded-lg text-sm w-full min-h-[80px]"
        />

        <div className="flex justify-end gap-x-3 mt-2">
          {editing && (
            <button
              onClick={handleCancel}
              className="text-gray-600 text-sm hover:text-gray-900"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            className="bg-[#DB4444] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#c93b3b]"
          >
            {editing ? "Update Address" : "Add Address"}
          </button>
        </div>
      </div>

      {/* Address List */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h4 className="font-medium text-lg mb-3">Saved Addresses</h4>

        {addresses.length === 0 ? (
          <p className="text-gray-500 text-sm">No addresses saved yet.</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="border rounded-lg p-3 flex flex-col gap-y-1 relative"
              >
                <span className="text-sm font-semibold text-[#DB4444]">
                  {addr.label}
                </span>
                <span className="text-sm text-gray-700">{addr.address}</span>
                <span className="text-sm text-gray-500">
                  {addr.city}, {addr.country}
                </span>

                <div className="flex gap-x-3 absolute top-3 right-3">
                  <button
                    onClick={() => handleEdit(addr)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
