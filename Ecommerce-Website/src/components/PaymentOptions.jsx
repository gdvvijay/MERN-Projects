import { useEffect, useState } from "react";

const PAYMENT_KEY = "PAYMENT_METHODS";

export default function MyPaymentOptions() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    id: null,
    cardName: "",
    cardNumber: "",
    expiry: "",
    type: "",
  });
  const [editing, setEditing] = useState(false);


  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem(PAYMENT_KEY)) || [];
    
    // Clear old dummy data if the user already has it cached
    if (stored.length > 0 && stored[0].cardName === "example 123") {
      stored = [];
      localStorage.removeItem(PAYMENT_KEY);
    }
    
    setPayments(stored);
  }, []);


  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }


  function handleSave() {
    if (!form.cardName || !form.cardNumber || !form.expiry || !form.type) {
      alert("Please fill all fields");
      return;
    }

    let updated;
    if (editing) {
      updated = payments.map((p) => (p.id === form.id ? { ...form } : p));
    } else {
      updated = [...payments, { ...form, id: Date.now() }];
    }

    setPayments(updated);
    localStorage.setItem(PAYMENT_KEY, JSON.stringify(updated));
    setForm({ id: null, cardName: "", cardNumber: "", expiry: "", type: "" });
    setEditing(false);
  }


  function handleEdit(card) {
    setForm(card);
    setEditing(true);
  }


  function handleDelete(id) {
    const filtered = payments.filter((p) => p.id !== id);
    setPayments(filtered);
    localStorage.setItem(PAYMENT_KEY, JSON.stringify(filtered));
  }


  function handleCancel() {
    setForm({ id: null, cardName: "", cardNumber: "", expiry: "", type: "" });
    setEditing(false);
  }

  return (
    <div className="flex flex-col w-full max-w-3xl bg-[#F5F5F5] p-6 gap-y-6 rounded-xl shadow-sm">
      <h3 className="font-medium text-xl text-[#DB4444] text-center">
        My Payment Options
      </h3>

   
      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-y-3">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            name="cardName"
            value={form.cardName}
            onChange={handleChange}
            placeholder="Cardholder Name"
            className="flex-1 border px-3 py-2 rounded-lg text-sm"
          />
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="Card Number (**** **** **** 1234)"
            className="flex-1 border px-3 py-2 rounded-lg text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            placeholder="Expiry (MM/YY)"
            className="flex-1 border px-3 py-2 rounded-lg text-sm"
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="flex-1 border px-3 py-2 rounded-lg text-sm"
          >
            <option value="">Select Type</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="RuPay">RuPay</option>
            <option value="AmEx">AmEx</option>
          </select>
        </div>

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
            {editing ? "Update Card" : "Add Card"}
          </button>
        </div>
      </div>

      {/* Saved Cards List */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h4 className="font-medium text-lg mb-3">Saved Cards</h4>

        {payments.length === 0 ? (
          <p className="text-gray-500 text-sm">No saved payment methods yet.</p>
        ) : (
          <div className="grid gap-4">
            {payments.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 relative"
              >
                <div>
                  <span className="text-sm font-semibold text-[#DB4444]">
                    {p.type}
                  </span>
                  <p className="text-sm text-gray-700">{p.cardName}</p>
                  <p className="text-sm text-gray-500">{p.cardNumber}</p>
                  <p className="text-sm text-gray-500">Exp: {p.expiry}</p>
                </div>

                <div className="flex gap-x-3 sm:absolute sm:top-4 sm:right-4">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
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
