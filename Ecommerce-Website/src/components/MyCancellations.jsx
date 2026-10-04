import { useEffect, useState } from "react";

export default function MyCancellations() {
  const [cancelledOrders, setCancelledOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("ORDERS")) || [];
    const cancelled = storedOrders.filter(
      (order) => order.status === "Cancelled"
    );
    setCancelledOrders(cancelled);
  }, []);

  if (cancelledOrders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-500 font-[Poppins]">
        <h2 className="text-2xl font-semibold text-[#DB4444] mb-4">
          My Cancellations
        </h2>
        <p>No cancelled orders found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-20 p-6 bg-[#F5F5F5] rounded-lg shadow-md font-[Poppins]">
      <h2 className="text-2xl font-semibold text-[#DB4444] mb-6">
        My Cancellations
      </h2>

      <div className="flex flex-col gap-y-6">
        {cancelledOrders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
          >
            {/* Order Header */}
            <div className="flex justify-between border-b pb-2 mb-3">
              <div>
                <p className="font-semibold text-gray-800">
                  Order ID: {order.orderId}
                </p>
                <p className="text-sm text-gray-500">
                  Cancelled on:{" "}
                  {order.cancelDate
                    ? new Date(order.cancelDate).toLocaleString()
                    : "—"}
                </p>
                <p className="text-sm text-gray-500">
                  Payment Method: {order.paymentMethod}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[#DB4444] font-semibold text-lg">
                  Total: ${order.total?.toFixed(2) ?? "0.00"}
                </p>
                <p className="text-sm text-gray-600">
                  Subtotal: ${order.subtotal?.toFixed(2) ?? "0.00"}
                </p>
                <p className="text-sm text-gray-600">
                  Discount: ${order.discount?.toFixed(2) ?? "0.00"}
                </p>
                <p className="text-xs text-red-600 font-semibold mt-1">
                  Cancelled
                </p>
              </div>
            </div>

            {/* Cancelled Order Items */}
            <div className="flex flex-col gap-y-3">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-[#fafafa] p-3 rounded-md"
                >
                  <div className="flex items-center gap-x-4">
                    <img
                      src={
                        item.productImage ||
                        "https://via.placeholder.com/80?text=No+Image"
                      }
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div>
                      <h3 className="font-medium">{item.productName}</h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: ${item.pricePerUnit?.toFixed(2) ?? "0.00"}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#DB4444] font-semibold">
                    ${item.totalPrice?.toFixed(2) ?? "0.00"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
