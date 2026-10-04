import { useEffect, useState } from "react";

const RETURN_KEY = "USER_RETURNS";

export default function MyReturns() {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem(RETURN_KEY)) || [];
    
    // Clear old dummy data if the user already has it cached in their browser
    if (stored.length > 0 && stored[0].orderId === "ORD-1001") {
      stored = [];
      localStorage.removeItem(RETURN_KEY);
    }
    
    setReturns(stored);
  }, []);

  function handleCancelReturn(id) {
    const updated = returns.map((r) =>
      r.id === id ? { ...r, status: "Cancelled" } : r
    );
    setReturns(updated);
    localStorage.setItem(RETURN_KEY, JSON.stringify(updated));
  }

  return (
    <div className="flex flex-col w-full max-w-3xl bg-[#F5F5F5] p-6 gap-y-6 rounded-xl shadow-sm">
      <h3 className="font-medium text-xl text-[#DB4444] text-center">
        My Returns
      </h3>

      {returns.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">
          You have no return requests yet.
        </p>
      ) : (
        <div className="grid gap-4">
          {returns.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center border border-gray-200"
            >
              <div className="flex flex-col gap-y-1">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Order ID:</span> {item.orderId}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Product:</span> {item.productName}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Reason:</span> {item.reason}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Requested On:</span>{" "}
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    item.status === "Approved"
                      ? "text-green-600"
                      : item.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {item.status}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-x-3 mt-3 sm:mt-0">
                {item.status === "Pending" && (
                  <button
                    onClick={() => handleCancelReturn(item.id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Cancel Return
                  </button>
                )}
                {item.status === "Approved" && (
                  <button className="text-gray-600 text-sm hover:text-gray-900">
                    Track Package
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
