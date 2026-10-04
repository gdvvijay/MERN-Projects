import { useEffect, useState } from "react";
import { useCartContext } from "../Hooks/useCartContext";
import useProducts from "../Hooks/useProducts";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItem, setCartItem] = useCartContext();
  const LOCAL_STORAGE_KEY = "CART_ITEM-ARRAY";
  const [coupon,setCoupon]=useState('')
  const navigate=useNavigate()
  const [cartItemArray, setCartItemArray] = useState(() => {
    try {
      const availableItem = localStorage.getItem(LOCAL_STORAGE_KEY);
      return availableItem ? JSON.parse(availableItem) : [];
    } catch (err) {
      console.error("something went wrong");
      return [];
    }
  });

  const { products } = useProducts();
  
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItemArray));
    } catch (err) {
      console.error("something went wrong");
    }
  }, [cartItemArray]);

  const subtotal = cartItemArray.reduce((acc, curr) => {
    const quantity = Number(curr.quantity) || 0;
    return acc + curr.currentPrice * quantity;
  }, 0);

  // NEW - This preserves the quantity from the previous state (loaded from localStorage)
  useEffect(() => {
    // 1. Get the list of products from the main data that are in the cart
    const itemsInCartData = products.filter((loopItem) =>
      cartItem.some((cart) => loopItem.productName?.includes(cart))
    );

    // 2. Update the state based on the previous state (which contains persisted quantities)
    setCartItemArray((prevCartArray) => {
      // Create a map of existing quantities for easy lookup
      const existingQuantities = prevCartArray.reduce((map, item) => {
        map[item.productName] = item.quantity;
        return map;
      }, {});

      // Map the new item data, but use the existing quantity if available
      return itemsInCartData.map((item) => {
        const storedQuantity = existingQuantities[item.productName];

        return {
          ...item,
          // Use the stored quantity if it exists, otherwise default to 1
          quantity: storedQuantity !== undefined ? storedQuantity : 1,
        };
      });
    });

    // NOTE: If an item is REMOVED from the cart, it will naturally disappear
    // because it won't be in `itemsInCartData`.
  }, [cartItem, products]); // Added 'data' to dependency array for correctness

  function handleCount(productName, action) {
    setCartItemArray((prevItems) =>
      prevItems.map((item) => {
        if (item.productName === productName) {
          let newQuantity = Number(item.quantity);

          if (action === "increment") {
            newQuantity += 1;
          } else if (action === "decrement") {
            newQuantity = Math.max(1, newQuantity - 1);
          }

          return { ...item, quantity: newQuantity };
        }

        return item;
      })
    );
  }

  function handleDelete(item, e) {
    e.preventDefault();
    e.stopPropagation();
    toast(
      <h1 className="text-red-500 font-[Poppins] font-semibold">
        Item Deleted from Cart
      </h1>
    );
    setCartItem((prev) =>
      prev.filter((filterItem) => filterItem !== item.productName)
    );
  }
  function handleCoupon(){
    if(coupon === 'OFFER25'){
      
      toast(<h1 className="text-green-500 font-[Poppins] font-semibold">Coupon Code Applied</h1>)
    }else{
      toast(<h1 className="text-red-500 font-[Poppins] font-semibold">Coupon Code Invalid</h1>)

    }
  }
  function handleUpdateCart(){
    toast(<h1 className="text-green-500 font-[Poppins] font-semibold">Successfully Cart Updated</h1>)
  }


  function handleCheckout(){
      navigate('/checkout',{state:{from:'cart',data:cartItemArray}})
  }
  return (
    <div className="cart-container max-w-6xl mx-auto flex flex-col mt-20 gap-y-14 px-1.5">
      <div className="bg-[rgba(0,0,0,0.04)] flex justify-between px-10 max-sm:px-4 rounded font-[Poppins] py-5 max-lg:text-sm max-md:text-[12px] max-sm:text-[6px]">
        <h2>Product</h2>
        <h2 className="ml-10 min-sm:ml-20">Price</h2>
        <h2>Quality</h2>
        <h2>Subtotal</h2>
      </div>

      {cartItemArray.map((cartArrayItem) => (
        <div
          key={cartArrayItem.productName}
          className="bg-[rgba(0,0,0,0.04)] flex justify-between max-sm:-my-5 px-10 max-sm:px-4 rounded font-[Poppins] py-5 items-center max-lg:text-sm max-md:text-[12px] max-sm:text-[6px]"
        >
          <div className="item-one flex items-center relative">
            <div className="image-container w-[50px] max-[640px]:w-[30px]">
              <img
                src={cartArrayItem.productImage}
                alt="monitor image"
                className="w-full"
              />
            </div>
            <h3 className="ml-3 max-sm:ml-1">{cartArrayItem.productName}</h3>
            <div
              onClick={(e) => handleDelete(cartArrayItem, e)}
              className="remove w-3 h-3 bg-[#DB4444] rounded-full text-[9px] text-white flex justify-center items-center absolute -top-1.5 -left-2 cursor-pointer"
            >
              x
            </div>
          </div>
          <h3 className="item-second -ml-[90px] max-sm:-ml-9 max-[400px]:ml-0">
            ${cartArrayItem.currentPrice}
          </h3>

          <div className="item-third relative">
            <input
              type="number"
              className="bg-white max-w-20 py-2.5 pl-1.5 max-sm:max-w-10"
              readOnly
              value={cartArrayItem.quantity}
            />
            <button
              onClick={() =>
                handleCount(cartArrayItem.productName, "increment")
              }
              name="increment"
              className="transform rotate-90 text-2xl max-md:text-base absolute top-0 h-5 w-5 max-lg:h-4 max-lg:w-4 max-md:w-3 max-md:h-3 flex justify-center items-center right-0 bg-amber-400 rounded-full z-30"
            >
              &lt;
            </button>
            <button
              onClick={() =>
                handleCount(cartArrayItem.productName, "decrement")
              }
              name="decrement"
              className="transform rotate-90 text-2xl max-md:text-base absolute bottom-0 h-5 w-5 max-lg:h-4 max-lg:w-4 max-md:w-3 max-md:h-3 flex justify-center items-center right-0 z-30 bg-amber-400 rounded-full"
            >
              &gt;
            </button>
          </div>
          <h3 className="item-fourth">
            ${+cartArrayItem.currentPrice * +cartArrayItem.quantity}
          </h3>
        </div>
      ))}

      <div className="return-to-shop-container flex justify-between font-[Poppins] font-medium">
        <Link to='/' className="border rounded px-9 py-3.5 max-md:px-6 max-md:py-2.5 max-sm:px-3 max-sm:py-1.5">
          Return To Shop
        </Link>
        <button onClick={handleUpdateCart} className="border rounded px-9 py-3.5 max-md:px-6 max-md:py-2.5 max-sm:px-3 max-sm:py-1.5">
          Update Cart
        </button>
      </div>
      <div className="coupon-code-main flex justify-between">
        <div className="coupon-code-container w-full mr-4">
          <p className="text-[10px] max-sm:text-[6px] font-[Poppins] font-medium">Live Offer Coupon code:-<span className="text-red-800">OFFER25</span></p>
          <input
            type="text"
            value={coupon}
            onChange={(e)=>setCoupon(e.target.value)}
            placeholder="Coupon Code"
            className="outline-none border py-3 max-sm:py-1 pl-2 w-full max-w-[300px] max-lg:max-w-[250px] max-md:max-w-[170px] max-md:placeholder:text-sm max-sm:placeholder:text-[10px]"
          />
          <button onClick={handleCoupon} className="bg-[#DB4444] text-white py-3 max-sm:py-2 px-6 max-lg:px-4 ml-4 max-lg:ml-3 max-md:ml-2 rounded max-md:text-sm max-sm:text-[10px]">
            Apply Coupon
          </button>
        </div>
        <div className="cart-total flex flex-col w-full max-w-[470px] max-lg:max-w-[380px] max-md:max-w-[290px] border rounded px-8 max-sm:px-2 pb-8 max-sm:pb-4 pt-5 max-sm:pt-3 gap-y-5 font-[Poppins]">
          <h1 className="font-medium text-xl max-md:text-[18px] max-sm:text-sm">
            Cart Total
          </h1>
          <div className="sub-total flex justify-between border-b border-[#00000049] max-md:text-sm max-sm:text-[10px]">
            <h4>Subtotal:</h4>
            <h4>${subtotal.toFixed(2)}</h4>
          </div>
          <div className="shipping flex justify-between border-b border-[#00000049] max-md:text-sm max-sm:text-[10px]">
            <h4>Shipping:</h4>
            <h4>$0</h4>
          </div>
          <div className="total flex justify-between max-md:text-sm max-sm:text-[10px]">
            <h4 className="flex items-center">Total:</h4>
            <h4>${coupon.includes('OFFER25') ? subtotal.toFixed(2) - ((subtotal.toFixed(2) * 25)/100) : subtotal.toFixed(2)}</h4>
          </div>
          {
            coupon.includes('OFFER25') && <i className="text-[12px] max-sm:text-[6px] text-green-500 w-full text-center">discount added</i>
          }
          <button onClick={handleCheckout} className="bg-[#DB4444] max-w-50 font-medium text-white self-center w-full py-2.5 max-md:text-sm max-sm:text-[10px]  rounded">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
