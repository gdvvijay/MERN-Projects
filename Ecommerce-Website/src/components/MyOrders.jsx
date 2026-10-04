import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyOrder() {
  const location = useLocation();
  const newOrder = location.state?.order;
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("ORDERS")) || [];
    setOrders(storedOrders);
  }, []);

  // Add new order if passed via navigation
  useEffect(() => {
    if (newOrder && newOrder.orderId) {
      const storedOrders = JSON.parse(localStorage.getItem("ORDERS")) || [];
      const isDuplicate = storedOrders.some(
        (order) => order.orderId === newOrder.orderId
      );

      if (!isDuplicate) {
        const updatedOrders = [newOrder, ...storedOrders];
        localStorage.setItem("ORDERS", JSON.stringify(updatedOrders));
        setOrders(updatedOrders);
      }
    }
  }, [newOrder]);

  // Cancel order handler
  function handleCancel(orderId) {
    const confirmCancel = window.confirm("Cancel this order?");
    if (!confirmCancel) return;

    const updatedOrders = orders.map((order) =>
      order.orderId === orderId
        ? { ...order, status: "Cancelled", cancelDate: new Date().toISOString() }
        : order
    );

    localStorage.setItem("ORDERS", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    toast.error("Order cancelled successfully!", { autoClose: 2000 });
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-500 font-[Poppins]">
        <h2 className="text-2xl font-semibold text-[#DB4444] mb-4">My Orders</h2>
        <p>No orders found. Place your first order!</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-20 p-6 bg-[#F5F5F5] rounded-lg shadow-md font-[Poppins]">
      <h2 className="text-2xl font-semibold text-[#DB4444] mb-6">My Orders</h2>

      <div className="flex flex-col gap-y-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Order Header */}
            <div className="flex justify-between border-b pb-2 mb-3">
              <div>
                <p className="font-semibold text-gray-800">
                  Order ID: {order.orderId}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {order.orderDate}
                </p>
                <p className="text-sm text-gray-500">
                  Payment: {order.paymentMethod}
                </p>
                {order.couponApplied && (
                  <p className="text-xs text-green-600 font-medium">
                    Coupon Applied (OFFER25)
                  </p>
                )}
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold text-[#DB4444]">
                  Total: ${order.total?.toFixed(2) ?? "0.00"}
                </p>
                <p className="text-sm text-gray-600">
                  Subtotal: ${order.subtotal?.toFixed(2) ?? "0.00"}
                </p>
                <p className="text-sm text-gray-600">
                  Discount: ${order.discount?.toFixed(2) ?? "0.00"}
                </p>

                {order.status === "Cancelled" ? (
                  <p className="mt-2 text-sm text-red-600 font-semibold">
                    Cancelled
                  </p>
                ) : (
                  <button
                    onClick={() => handleCancel(order.orderId)}
                    className="mt-2 text-sm text-red-600 hover:underline"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>

            {/* Order Items */}
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
                        Price: ${item.pricePerUnit.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#DB4444] font-semibold">
                    ${item.totalPrice.toFixed(2)}
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
