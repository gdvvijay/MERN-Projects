import deleteIcon from "../assets/delete.png";
import eye from "../assets/eye.png";
import { useWishListContext } from "../Hooks/useWishListContext";
import useProducts from '../Hooks/useProducts'
import { useEffect, useState } from "react";
import UseRating from '../components/UseRaring'
import { Link } from "react-router-dom";
import heart from "../assets/heart.png";
import { toast } from "react-toastify";
import { useCartContext } from "../Hooks/useCartContext";

export default function WishList(){
  const [wishListItem,setWishListItem]=useWishListContext()
    const [cartItem,setCartItem]=useCartContext()
  const [WishListArrayItem,setWishListArrayItem]=useState([])
  const { products } = useProducts();
  useEffect(()=>{
 
    const WishListArray=products.filter((loopItem)=>wishListItem.some((wish) => wish && loopItem.productName?.includes(wish)))
    setWishListArrayItem(WishListArray)
  
  },[wishListItem])

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

  function handleDelete(item,e){
    e.preventDefault()
    e.stopPropagation()
    toast(<h1 className="text-red-500 font-[Poppins] font-semibold">Item Deleted from WishList</h1>)
    setWishListItem(prev=>prev.filter((filterItem)=>{
      
      return filterItem !== item.productName
    }))
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

    function addingAllToCart(e){
    e.stopPropagation()
    e.preventDefault()

    try {
      const stored = JSON.parse(localStorage.getItem("CART_ITEM-ARRAY")) || [];
      WishListArrayItem.forEach((item)=>{
        const isItemIncluded = cartItem.some((loopItem)=>loopItem === item.productName)
        const existing = stored.find(i => i.productName === item.productName);
        if (existing) {
          existing.quantity = (Number(existing.quantity) || 1) + 1;
        } else {
          stored.push({ ...item, quantity: 1 });
        }
        if(!isItemIncluded){
          setCartItem(prev=>[...prev,item.productName])
        }
      });
      localStorage.setItem("CART_ITEM-ARRAY", JSON.stringify(stored));
      toast(<h1 className="text-green-500 font-[Poppins] font-semibold">Items moved to cart</h1>)
    } catch(err) {}
  }

    return(
        <section className="wishlist mx-auto max-w-6xl flex flex-col mt-30 font-[Poppins]">
            <div className="flex justify-between items-center"><h2 className="text-xl max-sm:text-[16px] px-1.5">Wishlist ({WishListArrayItem.length})</h2><button onClick={(e)=>addingAllToCart(e)} className="border px-7 py-3 max-sm:px-5 max-sm:py-2 rounded font-medium max-sm:text-sm">Move All to Bag</button></div>
             <div className="move-all-to-bag-container mt-20 max-md:mt-10 grid grid-cols-[repeat(auto-fit,minmax(230px,250px))] justify-items-center gap-6 px-1.5">
              {
                    WishListArrayItem.length > 0 &&  WishListArrayItem.map((loopItem)=><div key={loopItem.id} className="item-1 flex flex-col gap-3.5 w-full">
                        <div className="w-full h-[250px] bg-[#F5F5F5] rounded flex justify-center items-center relative overflow-hidden group">
                          <div  onClick={(e)=>handleDelete(loopItem,e)} className="absolute w-9 h-9 bg-white rounded-full flex justify-center items-center top-2 right-3">
                            <img src={deleteIcon} alt="deleteIcon image" className="w-4 h-4" />
                          </div>
                          <div className="absolute bg-[#DB4444] px-3 rounded top-2 left-1.5 text-[12px] py-1 text-white">{loopItem.discount}</div>
                          <div className="w-40 h-40 flex justify-center items-center"><img
                            src={loopItem.productImage}
                            alt={`${loopItem.productName} image`}
                            className=""
                          /></div>
                          <div onClick={(e)=>handleCart(loopItem,e)} className="hidden group-hover:block bg-black absolute left-0 right-0 bottom-0 text-white text-sm font-[Poppins] py-1.5 text-center cursor-pointer">Add To Cart</div>

                        </div>
                        <h2 className="font-[Poppins] font-medium">{loopItem.productName}</h2>
                        <div className="font-[Poppins] font-medium flex gap-3">
                          <span className="text-[#DB4444]">${loopItem.currentPrice}</span>
                          <span className="line-through decoration-1 decoration-[#000000d0] text-[#0000007a]">
                            ${loopItem.oldPrice}
                          </span>
                        </div>
                        <div className="start-container flex h-5 items-center gap-1 max-w-[100px]">
                         <UseRating item={loopItem}/>
                          <span className="font-[Poppins] font-semibold text-[#00000080]">({loopItem.ratingCount})</span>
                        </div>
                      </div>)
                  }
                      
                    </div>
          <div className="just-for-you-text flex justify-between mt-19 px-1.5">
           <div className="this-month-logo flex items-center  gap-4 max-md:gap-3">
          <span className="w-5 h-10 max-md:w-4 max-md:h-8 bg-[#DB4444] rounded"></span>
          <span className="text-[#DB4444] font-[Poppins] font-semibold max-lg:text-sm max-md:text-[12px]">
            Just For You
          </span>
        </div>
          <div className="">
            <Link to='/allitems'  className="rounded border px-7 py-2 max-md:px-6 max-md:py-1.5 max-md:text-sm max-sm:text-[10px] ml-2.5 font-medium">
              See All
            </Link>
          </div>
        </div>
        <div className="just-for-you-container mt-20 max-md:mt-10 grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] justify-items-center gap-5 px-1.5">
                  {
            products.filter(p => p.isBestSelling).map((item)=><Link state={item} to='/productdetails' key={item._id || item.id} className="item-1 flex flex-col gap-3.5 w-full  max-w-[400px]">
            <div className="w-full h-[250px] bg-[#F5F5F5] rounded flex justify-center items-center relative">
              <div onClick={(e)=>handleWishList(item,e)} className="absolute w-9 h-9 bg-white rounded-full flex justify-center items-center top-2 right-3">
                <img src={heart} alt="heart image" className="w-6 h-6" />
              </div>
              <div onClick={(e)=>handleCart(item,e)} className="absolute w-9 h-9 bg-white rounded-full flex justify-center items-center top-[52px] right-3">
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