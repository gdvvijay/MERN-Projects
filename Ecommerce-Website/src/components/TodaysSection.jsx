import leftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";
import {  useRef} from "react";

import heart from '../assets/heart.png'
import eye from '../assets/eye.png'
import useDateTime from "../Hooks/useDateTime";
import useProducts from '../Hooks/useProducts'
import UseRating from "./UseRaring";
import { Link } from "react-router-dom";
import { useWishListContext } from "../Hooks/useWishListContext";
import { toast } from "react-toastify";
import { useCartContext } from "../Hooks/useCartContext";
 
export default function TodaysSection(){
  const [wishListItem,setWishListItem]=useWishListContext()
  const [cartItem,setCartItem]=useCartContext()
 const dateTime=useDateTime();
  const { products } = useProducts();

  const scrollableDiv = useRef()
   function scrollToLeft(){
     scrollableDiv.current?.scrollBy({
  left: -200,
  top: 0, 
  behavior: 'smooth'
})
   }
    function scrollToRight(){
     scrollableDiv.current?.scrollBy({
  left: 200,
  top: 0, 
  behavior: 'smooth'
})
   }

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
    if(!products) return <div className="flex w-full justify-center">Loading..</div>
    return(
        <section className="today-section flex flex-col w-full space-y-3 max-sm:space-y-0 border-b border-[#00000036] pb-12 max-sm:pb-5 overflow-x-hidden px-0.5">
        <div className="today-logo mt-24 max-sm:mt-10 flex items-center">
          <div className="w-5 bg-[#DB4444] h-10 rounded max-md:w-4 max-md:h-8 max-sm:w-3 max-sm:h-6"></div>
          <h4 className="text-[#DB4444] ml-2.5 font-[Poppins] font-semibold max-lg:text-[15px] max-md:text-[14px] max-sm:text-[12px] max-sm:ml-1">
            Today's
          </h4>
        </div>
        <div className="sale-countdown flex justify-between items-end">
          <div className="flex items-end">
            <h2 className="text-4xl font-[Inter] font-semibold max-lg:text-3xl max-md:text-2xl max-sm:text-xl ">Flash <p className="inline-block max-[400px]:hidden">Sales</p><p className="inline-block min-[400px]:hidden ml-2">Sales</p></h2>
            <div className="ml-20 flex items-center gap-4 max-sm:gap-1.5 max-sm:ml-8">
              {dateTime.flashSale ? (
                <>
                  {" "}
                  <div>
                    <h4 className="text-sm font-[Poppins] font-medium max-lg:text-[12px] max-md:text-[10px] max-sm:text-[7px]">Days</h4>
                    <h1 className="font-[Inter] text-4xl font-bold max-lg:text-3xl max-md:text-2xl max-sm:text-xl">
                      {dateTime.days < 10 ? `0${dateTime.days}` : dateTime.days}
                    </h1>
                  </div>
                  <span className="text-[#E07575] text-5xl max-md:text-4xl  max-sm:text-2xl">:</span>
                  <div>
                    <h4 className="text-sm font-[Poppins] font-medium max-lg:text-[12px] max-md:text-[10px] max-sm:text-[7px]">
                      Hours
                    </h4>
                    <h1 className="font-[Inter] text-4xl font-bold max-lg:text-3xl max-md:text-2xl max-sm:text-xl">
                      {dateTime.hours < 10
                        ? `0${dateTime.hours}`
                        : dateTime.hours}
                    </h1>
                  </div>
                  <span className="text-[#E07575] text-5xl max-md:text-4xl  max-sm:text-2xl">:</span>
                  <div>
                    <h4 className="text-sm font-[Poppins] font-medium max-lg:text-[12px] max-md:text-[10px] max-sm:text-[7px]">
                      Minutes
                    </h4>
                    <h1 className="font-[Inter] text-4xl font-bold max-lg:text-3xl max-md:text-2xl max-sm:text-xl ">
                      {dateTime.minutes < 10
                        ? `0${dateTime.minutes}`
                        : dateTime.minutes}
                    </h1>
                  </div>
                  <span className="text-[#E07575] text-5xl max-md:text-4xl  max-sm:text-2xl">:</span>
                  <div>
                    <h4 className="text-sm font-[Poppins] font-medium max-lg:text-[12px] max-md:text-[10px] max-sm:text-[7px]">
                      Seconds
                    </h4>
                    <h1 className="font-[Inter] text-4xl font-bold max-lg:text-3xl max-md:text-2xl max-sm:text-xl">
                      {dateTime.seconds < 10
                        ? `0${dateTime.seconds}`
                        : dateTime.seconds}
                    </h1>
                  </div>{" "}
                </>
              ) : (
                <div className="text-red-500 font-bold text-2xl">
                  Sale Ended!
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3 max-sm:ml-4 text-3xl flex-wrap">
            <div className="rounded-full h-12 w-12 max-sm:h-8 max-sm:w-8 bg-[#F5F5F5] flex justify-center items-center" onClick={scrollToLeft}>
              <img src={leftArrow} alt="left arrow" className="w-6 max-lg:w-5 max-md:w-4 max-sm:w-3" />
            </div>
            <div className="rounded-full h-12 w-12 max-sm:h-8 max-sm:w-8 bg-[#F5F5F5] flex justify-center items-center" onClick={scrollToRight}>
              <img src={rightArrow} alt="right arrow" className="w-8 max-lg:w-6 max-md:w-5 max-sm:w-4" />
            </div>
          </div>
        </div>
        <div className="products-list flex mt-8 gap-x-6  overflow-x-auto overflow-y-hidden " id="scroll-visibility" ref={scrollableDiv}>
        {
          products.filter(p => p.isFlashSale).map((item)=><Link to="/productdetails" state={item} key={item._id || item.id} className="single-item">
            <div className="image-item w-[270px] h-[250px] max-lg:w-[250px] max-lg:h-[230px]  max-md:w-[230px] max-md:h-[210px] bg-[#F5F5F5] flex justify-center items-center relative">
              {
                item.discount && item.discount.length > 0 ? <h4 className="absolute left-2 rounded top-4 bg-[#DB4444] px-3 py-1 text-sm max-md:text-[11px] max-sm:text-[9px] font-[Poppins] text-white ">{item.discount}</h4> : ''
              }
              <div onClick={(e)=>handleWishList(item,e)} className="absolute cursor-cell right-2 top-1.5 max-w-9 max-h-9 max-md:max-h-7 max-md:max-w-7 w-full h-full rounded-full bg-white flex justify-center items-center z-30"><img src={heart} alt="heart image" className="max-w-6 max-h-6 max-md:max-w-4 max-md:max-h-4 w-full h-full"/></div>
              <div onClick={(e)=>handleCart(item,e)} className="absolute cursor-cell right-2 top-12 max-sm:top-10 max-w-9 max-h-9 max-md:max-h-7 max-md:max-w-7 w-full h-full rounded-full bg-white flex justify-center items-center"><img src={eye} alt="heart image" className="max-w-5 max-h-4 max-md:max-w-3 max-md:max-h-2.5 w-full h-full"/></div>
              <img src={item.productImage} alt="controller" className="max-w-48" />
            </div>
            <div className="text-items flex flex-col gap-y-2 max-sm:gap-1">
              <h2 className="font-[Poppins] font-medium mt-2 max-md:text-sm max-sm:text-[12px]">
               {item.productName}
              </h2>
              <h3 className="flex font-[Poppins] font-medium gap-4 max-md:text-sm max-sm:text-[11px]">
                <span className="text-[#DB4444] ">${item.currentPrice}</span>{" "}
                <span className="line-through decoration-1 text-[#000000a3]">
                  ${item.oldPrice}
                </span>
              </h3>
              <div className="flex gap-x-2.5 max-h-5 max-w-5 max-md:max-h-4 max-md:max-w-4 max-sm:max-h-3 max-sm:max-w-3">
                <UseRating item={item}/>
                <span className="font-[Poppins] font-semibold max-md:text-sm max-sm:text-[11px]">({item.ratingCount})</span>
              </div>
            </div>
          </Link>)
        }
      
        </div>
        <div className="all-product-button flex justify-center mt-10"><Link to='/allitems' className="bg-[#DB4444] text-white font-[Poppins] font-medium py-2 px-6 rounded max-sm:text-[12px]">View All Products</Link></div>

      </section>
    )
}

