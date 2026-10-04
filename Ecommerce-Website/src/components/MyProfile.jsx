import { useState, useEffect } from "react";
import useAuthContext from "../Hooks/useAuthContext";
import { toast } from "react-toastify";

export default function ManageAccount() {
  const { user, updateProfile } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address?.street || ""); // Just mapping street for simplicity, or we can use full address
    }
  }, [user]);

  // Save updates
  async function handleSave() {
    try {
      await updateProfile({ name, phone, address: { street: address } });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  }

  // Cancel edits
  function handleCancel() {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address?.street || "");
    }
  }

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="flex flex-col w-full max-w-4xl bg-white shadow-sm rounded-lg p-10 max-md:p-6 max-sm:p-4 border border-gray-100 mx-auto">
      <h3 className="font-semibold text-2xl text-[#DB4444] mb-8 max-sm:text-xl">
        Edit Your Profile
      </h3>

      <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#F5F5F5] rounded px-4 py-3 outline-none focus:ring-1 focus:ring-[#DB4444] transition-all text-sm"
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            value={email}
            disabled
            className="w-full bg-gray-200 text-gray-500 cursor-not-allowed rounded px-4 py-3 outline-none text-sm"
            placeholder="example@gmail.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-[#F5F5F5] rounded px-4 py-3 outline-none focus:ring-1 focus:ring-[#DB4444] transition-all text-sm"
            placeholder="Your phone number"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-[#F5F5F5] rounded px-4 py-3 outline-none focus:ring-1 focus:ring-[#DB4444] transition-all text-sm"
            placeholder="Your address"
          />
        </div>
      </div>

      {/* Password section removed as we don't have a backend endpoint for just password update in updateProfile, or if we do it wasn't specified in authController */}

      <div className="flex justify-end gap-6 mt-4 items-center">
        <button
          onClick={handleCancel}
          className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-[#DB4444] hover:bg-red-600 text-white font-medium px-8 py-3 rounded transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
