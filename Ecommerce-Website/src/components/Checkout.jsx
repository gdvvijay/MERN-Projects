import bakashLogo from "../assets/bakasLogo.png";
import visaLogo from "../assets/visaLogo.png";
import masterCardLogo from "../assets/masterCardLogo.png";
import nagadLogo from "../assets/nagad.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure itemData is always an array
  const itemData = Array.isArray(location.state?.data)
    ? location.state.data
    : [location.state?.data].filter(Boolean);

  const [coupon, setCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phoneNumber: "",
    email: "",
  });

  if (!itemData || itemData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen font-[Poppins] text-gray-600">
        <h2>No items to checkout.</h2>
      </div>
    );
  }

  // Helper to parse price safely
  const parsePrice = (value) => {
    if (value == null) return 0;
    const cleaned = String(value).replace(/[^0-9.-]+/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : 0;
  };

  // Subtotal
  const subtotal = itemData.reduce((sum, item) => {
    const price = parsePrice(item.currentPrice ?? item.price ?? 0);
    const qty = Number(item.quantity || 1);
    return sum + price * qty;
  }, 0);

  const discount = coupon === "OFFER25" ? subtotal * 0.25 : 0;
  const total = subtotal - discount;

  // Coupon apply
  function handleCoupon() {
    if (coupon === "OFFER25") {
      toast.success("Coupon Applied Successfully (25% OFF)");
    } else {
      toast.error("Invalid Coupon Code");
    }
  }

  // Generate truly unique ID for each order
  const generateOrderId = () => {
    return "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
  };

  async function handlePlaceOrder() {
    if (!itemData || itemData.length === 0) {
      toast.error("No products selected!");
      return;
    }

    const requiredFields = ['firstName', 'streetAddress', 'city', 'phoneNumber', 'email'];
    const isFormValid = requiredFields.every(field => billingDetails[field].trim() !== "");
    if (!isFormValid) {
      toast.error("Please fill in all required billing details.");
      return;
    }

    const orderItems = itemData.map((item) => {
      const price = parsePrice(item.currentPrice ?? item.price ?? 0);
      const qty = Number(item.quantity || 1);
      return {
        productName: item.productName,
        productImage: item.productImage,
        quantity: qty,
        pricePerUnit: price,
        totalPrice: Number((price * qty).toFixed(2)),
      };
    });

    const orderDetails = {
      orderId: generateOrderId(),
      orderDate: new Date().toLocaleString(),
      items: orderItems,
      shippingAddress: billingDetails,
      subtotal: Number(subtotal.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      total: Number(total.toFixed(2)),
      paymentMethod,
      couponApplied: coupon === "OFFER25",
      status: "Processing",
    };

    if (paymentMethod === "Razorpay") {
      try {
        const loadRazorpayScript = () => {
          return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
          });
        };

        const res = await loadRazorpayScript();
        if (!res) {
          toast.error("Razorpay SDK failed to load. Are you online?");
          return;
        }

        // Import axios dynamically or if we have it
        const API = (await import("../api/axios.js")).default;
        
        const { data: order } = await API.post("/payment/create-order", {
          amount: total,
        });

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "Ecommerce Store",
          description: "Test Transaction",
          order_id: order.id,
          handler: async function (response) {
            try {
              const verifyRes = await API.post("/payment/verify-payment", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                items: orderItems,
                totalAmount: total,
                shippingAddress: billingDetails,
              });
              
              toast.success("Payment successful!");
              // Clear Cart
              localStorage.removeItem("CART_ITEM-ARRAY");
              
              const existingOrders = JSON.parse(localStorage.getItem("ORDERS")) || [];
              const updatedOrders = [{ ...orderDetails, status: 'Completed', paymentId: response.razorpay_payment_id }, ...existingOrders];
              localStorage.setItem("ORDERS", JSON.stringify(updatedOrders));

              navigate("/myorder", { state: { order: updatedOrders[0] } });
            } catch (err) {
              toast.error("Payment Verification Failed!");
            }
          },
          prefill: {
            name: billingDetails.firstName,
            email: billingDetails.email,
            contact: billingDetails.phoneNumber,
          },
          theme: {
            color: "#DB4444",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        toast.error("Payment initiation failed");
        console.error(error);
      }
    } else {
      // Save to localStorage along with previous orders for Cash on Delivery
      const existingOrders = JSON.parse(localStorage.getItem("ORDERS")) || [];
      const updatedOrders = [orderDetails, ...existingOrders];
      localStorage.setItem("ORDERS", JSON.stringify(updatedOrders));
      // Clear Cart
      localStorage.removeItem("CART_ITEM-ARRAY");

      toast.success("Order placed successfully!");
      navigate("/myorder", { state: { order: orderDetails } });
    }
  }

  return (
    <div className="checkout-container flex justify-between px-1.5 max-w-6xl w-full mx-auto mt-30 items-start max-sm:flex-wrap max-sm:justify-center max-sm:gap-y-10">
      {/* Billing Form */}
      <div className="form-container w-full font-[Poppins]">
        <h1 className="text-4xl font-medium max-md:text-3xl max-sm:text-2xl">
          Billing Details
        </h1>
        <form className="flex flex-col gap-y-4 mt-10">
          {[
            { label: "First Name", key: "firstName", req: true },
            { label: "Company Name", key: "companyName", req: false },
            { label: "Street Address", key: "streetAddress", req: true },
            { label: "Apartment floor, etc. (optional)", key: "apartment", req: false },
            { label: "Town / City", key: "city", req: true },
            { label: "Phone Number", key: "phoneNumber", req: true },
            { label: "Email Address", key: "email", req: true },
          ].map((field, i) => (
            <div key={i}>
              <label className="text-[#000000] opacity-40 -mb-2.5 block max-md:text-sm max-sm:text-xs">
                {field.label}
                {field.req && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                value={billingDetails[field.key]}
                onChange={(e) => setBillingDetails({ ...billingDetails, [field.key]: e.target.value })}
                className="bg-[#F5F5F5] py-2 px-2 max-w-[450px] w-full rounded"
              />
            </div>
          ))}
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-5 h-5 accent-[#DB4444] appearance-none bg-transparent checked:bg-[#DB4444] border border-gray-400 rounded"
            />
            <label className="ml-1.5 max-md:text-sm max-sm:text-xs">
              Save this information for faster check-out next time
            </label>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="product-list-container w-full flex flex-col max-w-[425px] gap-y-5 ml-2.5">
        {/* Product List */}
        {itemData.map((item, index) => {
          const price = parsePrice(item.currentPrice ?? item.price ?? 0);
          const qty = Number(item.quantity || 1);
          return (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-3 rounded shadow-sm"
            >
              <div className="flex items-center">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="max-w-[45px] w-full mr-4 rounded border"
                />
                <div>
                  <h4 className="text-sm font-medium">{item.productName}</h4>
                  {qty > 1 && (
                    <p className="text-xs text-gray-500">Qty: {qty}</p>
                  )}
                </div>
              </div>
              <span className="text-sm font-semibold">
                ${Number((price * qty).toFixed(2))}
              </span>
            </div>
          );
        })}

        {/* Price Summary */}
        <div className="cart-total flex flex-col w-full gap-y-3 font-[Poppins]">
          <div className="flex justify-between border-b border-[#00000049] pb-2">
            <h4>Subtotal:</h4>
            <h4>${subtotal.toFixed(2)}</h4>
          </div>
          <div className="flex justify-between border-b border-[#00000049] pb-2">
            <h4>Discount:</h4>
            <h4>-${discount.toFixed(2)}</h4>
          </div>
          <div className="flex justify-between pb-2">
            <h4>Total:</h4>
            <h4>${total.toFixed(2)}</h4>
          </div>
        </div>

        {/* Payment Options */}
        <div className="bank-select flex justify-between items-center">
          <div className="flex items-center w-full">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "Razorpay"}
              onChange={() => setPaymentMethod("Razorpay")}
              className="h-6 w-6 mr-2.5 accent-[#DB4444]"
            />
            <span>Razorpay (Online Payment)</span>
          </div>
          <div className="bank-logo-container flex gap-x-1.5 justify-end">
            <img src={bakashLogo} alt="Bakash" />
            <img src={visaLogo} alt="Visa" />
            <img src={masterCardLogo} alt="MasterCard" />
            <img src={nagadLogo} alt="Nagad" />
          </div>
        </div>

        <div className="bank-select flex justify-between items-center mt-3">
          <div className="flex items-center w-full">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={() => setPaymentMethod("Cash on Delivery")}
              className="h-6 w-6 mr-2.5 accent-[#DB4444]"
            />
            <span>Cash on Delivery</span>
          </div>
        </div>

        {/* Coupon Section */}
        <p className="text-[10px] font-medium">
          Live Offer Coupon code:{" "}
          <span className="text-red-800 font-semibold">OFFER25</span>
        </p>
        {coupon === "OFFER25" && (
          <i className="text-[12px] text-green-500 text-center">
            25% Discount Applied
          </i>
        )}
        <div className="font-[Poppins] flex">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            type="text"
            placeholder="Coupon Code"
            className="outline-2 px-2.5 py-1.5 flex-grow rounded-l border border-gray-300"
          />
          <button
            onClick={handleCoupon}
            type="button"
            className="bg-[#DB4444] text-white rounded-r px-6 py-1.5"
          >
            Apply
          </button>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          type="button"
          className="bg-[#DB4444] text-white font-[Poppins] px-9 py-3 rounded mt-3"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
