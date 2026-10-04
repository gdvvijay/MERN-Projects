import { Link } from "react-router-dom"
import useProducts from "../Hooks/useProducts"
import { useCartContext } from "../Hooks/useCartContext"
import { useWishListContext } from "../Hooks/useWishListContext"
import heart from "../assets/heart.png";
import eye from "../assets/eye.png";
import UseRating from "./UseRaring";
import { toast } from "react-toastify";

export default function AllProducts(){
    const { products } = useProducts();
       const [cartItem,setCartItem]=useCartContext()
      const [wishListItem,setWishListItem]=useWishListContext()

        function handleWishList(item,e){
        e.stopPropagation()
        e.preventDefault()
        
        const isItemIncluded=wishListItem.some((loopItem)=>loopItem === item.productName)
        if(isItemIncluded){
          toast(<h1 className="text-red-500 font-[Poppins] font-semibold">Already Added to WishList</h1>)
          return
        }else{
          toast(<h1 className="text-green-500 font-[Poppins] font-semibold">Item Added to WishList</h1>)
          setWishListItem(prev=>[...prev,item.productName])
        }
    
      }
     function handleCart(item,e){
    e.stopPropagation()
    e.preventDefault()
    
    const isItemIncluded = cartItem.some((loopItem)=>loopItem === item.productName)
    try {
      const stored = JSON.parse(localStorage.getItem("CART_ITEM-ARRAY")) || [];
      const existing = stored.find(i => i.productName === item.productName);
      if (existing) {
        existing.quantity = (Number(existing.quantity) || 1) + 1;
      } else {
        stored.push({ ...item, quantity: 1 });
      }
      localStorage.setItem("CART_ITEM-ARRAY", JSON.stringify(stored));
    } catch(err) {}

    if(isItemIncluded){
      toast(<h1 className="text-green-500 font-[Poppins] font-semibold">Increased quantity in cart</h1>)
    }else{
      toast(<h1 className="text-green-500 font-[Poppins] font-semibold">Item Added to cart</h1>)
      setCartItem(prev=>[...prev,item.productName])
    }
  }
    return(
       <section className="all-product-section max-w-6xl w-full mx-auto">
        <div className="container mt-20 max-md:mt-10 grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] justify-items-center gap-5 px-1.5">
          {
            products.map((item)=><Link state={item} to='/productdetails' key={item._id || item.id} className="item-1 flex flex-col gap-3.5 w-full  max-w-[400px]">
            <div className="w-full h-[250px] bg-[#F5F5F5] rounded flex justify-center items-center relative">
              <div onClick={(e)=>handleWishList(item,e)} className="absolute w-9 h-9 bg-white rounded-full flex justify-center items-center top-2 right-3">
                <img src={heart} alt="heart image" className="w-6 h-6" />
              </div>
              <div  onClick={(e)=>handleCart(item,e)} className="absolute w-9 h-9 bg-white rounded-full flex justify-center items-center top-[52px] right-3">
                <img src={eye} alt="heart image" className="w-5 h-4" />
              </div>
              <div className="w-40 h-40 flex justify-center items-center"><img
                src={item.productImage}
                alt={`${item.productName} image`}
                className=""
              /></div>
            </div>
            <h2 className="font-[Poppins] font-medium">{item.productName}</h2>
            <div className="font-[Poppins] font-medium flex gap-3">
              <span className="text-[#DB4444]">${item.currentPrice}</span>
              {
                item.oldPrice && <span className="line-through decoration-1 decoration-[#000000d0] text-[#0000007a]">
                ${item.oldPrice}
              </span>
              }
            </div>
            <div className="start-container flex h-4 items-center gap-1">
              <span className="flex gap-1 h-full">
                {
                  <UseRating item={item}/>
                }
              </span>
              <span className="font-[Poppins] font-semibold text-[#00000080]">({item.ratingCount})</span>
            </div>
          </Link>)
          }
          
        </div>
       </section>
    )
}