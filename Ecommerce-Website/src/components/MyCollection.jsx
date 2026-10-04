import { useEffect, useState } from "react";
import { useWishListContext } from "../Hooks/useWishListContext";
import useProducts from "../Hooks/useProducts";

const COLLECTION_KEY = "USER_COLLECTION";

export default function MyCollection() {
  const [collection, setCollection] = useState([]);
  const [wishListItem,setWishListItem]=useWishListContext()
    const [WishListArrayItem,setWishListArrayItem]=useState([])
    const { products } = useProducts();
    useEffect(()=>{
   
      const WishListArray=products.filter((loopItem)=>wishListItem.some((wish) => wish && loopItem.productName?.includes(wish)))
      setWishListArrayItem(WishListArray)
    
        const stored = JSON.parse(localStorage.getItem(COLLECTION_KEY)) || [];

    if (stored.length === 0) {
   
      localStorage.setItem(COLLECTION_KEY, JSON.stringify(WishListArray));
      setCollection(WishListArrayItem || []);
    } else {
      setCollection(stored);
    }
    },[])

  useEffect(() => {
  
  }, []);

  // Remove item
  function handleRemove(id) {
    const updated = collection.filter((item) => item._id || item.id !== id);
    setCollection(updated);
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(updated));
  }

  // Clear all items
  function handleClearAll() {
    localStorage.removeItem(COLLECTION_KEY);
    setCollection([]);
  }

  return (
    <div className="flex flex-col w-full max-w-3xl bg-[#F5F5F5] p-6 gap-y-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-xl text-[#DB4444]">My Collection</h3>
        {collection.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-600 hover:text-red-600"
          >
            Clear All
          </button>
        )}
      </div>

      {collection.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-8">
          Your collection is empty. Start adding your favorite items!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {collection.map((item) => (
            <div
              key={item._id || item.id}
              className="bg-white rounded-lg shadow-sm p-3 flex flex-col items-center gap-y-3 border hover:shadow-md transition"
            >
              <img
                src={item.productImage}
                alt={item.productName}
                className="h-30 object-cover rounded-lg"
              />
              <p className="font-medium text-gray-800 text-sm text-center">
                {item.productName}
              </p>
              <p className="text-[#DB4444] font-semibold text-sm">
                ${item.currentPrice}
              </p>
              <button
                onClick={() => handleRemove(item._id || item.id)}
                className="text-xs bg-[#DB4444] text-white px-4 py-1.5 rounded hover:bg-[#c93b3b] transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
