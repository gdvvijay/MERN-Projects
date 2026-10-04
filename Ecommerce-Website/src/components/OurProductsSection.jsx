import leftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";
import heartIcon from "../assets/heart.png";
import eyeIcon from "../assets/eye.png";
import { useRef, useState } from "react";
import useProducts from '../Hooks/useProducts'
import UseRating from './UseRaring'
import { useWishListContext } from "../Hooks/useWishListContext";
import { toast } from "react-toastify";
import { useCartContext } from "../Hooks/useCartContext";
import { Link } from "react-router-dom";


export default function OurProductsSection(){
    const [selectedColor,setSelectedColor]=useState(null)
     const [wishListItem,setWishListItem]=useWishListContext()
     const { products } = useProducts();
      // scroll functionality
      const scrollableDiv1 = useRef()
      const scrollableDiv2 = useRef()
      const [cartItem,setCartItem]=useCartContext()
       function scrollToLeft(){
         scrollableDiv1.current?.scrollBy({
      left: -200,
      top: 0, 
      behavior: 'smooth'
    }),
    scrollableDiv2.current?.scrollBy({
      left: -200,
      top: 0, 
      behavior: 'smooth'
    })
       }
        function scrollToRight(){
         scrollableDiv1.current?.scrollBy({
      left: 200,
      top: 0, 
      behavior: 'smooth'
    }),
     scrollableDiv2.current?.scrollBy({
      left: 200,
      top: 0, 
      behavior: 'smooth'
    })
       }
       function handleColor(e){
  setSelectedColor(e.currentTarget.value)
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
    return(
        <section className="our-products-section flex flex-col gap-6 max-lg:gap-5 max-md:gap-4 max-sm:gap-3 mt-20 max-sm:mt-10 px-0.5">
        <div className="our-product-text-logo flex items-center gap-4 max-sm:gap-2 tracking-[1px]">
          <span className="w-5 h-10 max-sm:w-4 max-sm:h-8 bg-[#DB4444] rounded"></span>
          <span className="font-[poppins] font-semibold text-[#DB4444] max-lg:text-sm max-md:text-[12px]">
            Our Products
          </span>
        </div>
        <div className="explore-our-products-text flex justify-between">
          <h2 className="font-[Inter] font-semibold text-4xl max-lg:text-3xl max-md:text-2xl">
            Explore Our Products
          </h2>{" "}
          <div className="flex gap-3 text-3xl">
            <div className="rounded-full h-12 w-12 max-sm:h-8 max-sm:w-8 bg-[#F5F5F5] flex justify-center items-center" onClick={scrollToLeft}>
              <img src={leftArrow} alt="left arrow" className="w-6 max-md:w-5 max-sm:w-4" />
            </div>
            <div className="rounded-full h-12 w-12  max-sm:h-8 max-sm:w-8 bg-[#F5F5F5] flex justify-center items-center" onClick={scrollToRight}>
              <img src={rightArrow} alt="right arrow" className="w-8 max-md:w-6 max-sm:w-5" />
            </div>
          </div>
        </div>
        <div className="all-products-list-flex-1 flex gap-x-6 overflow-x-auto overflow-y-hidden" id="scroll-visibility" ref={scrollableDiv1}>
          {
            products.slice(0, 4).map((item)=><Link to="/productdetails" state={item} key={item._id || item.id} className="product-1 flex flex-col gap-y-2 shrink-0">
            <div className="image-container w-[270px] h-[250px] max-md:w-[250px] max-md:h-[230px] max-sm:w-[230px] max-sm:h-[210px] bg-[#F5F5F5] flex justify-center items-center relative">
              <div onClick={(e)=>handleCart(item,e)} className="absolute top-2 right-2 w-9 h-9 bg-white rounded-full flex items-center justify-center">
                <img src={heartIcon} alt="heart icon" className="w-6 h-6" />
              </div>
              <div onClick={(e)=>handleWishList(item,e)} className="absolute top-[52px] right-2 w-9 h-9 bg-white rounded-full flex items-center justify-center">
                <img src={eyeIcon} alt="eye icon" className="w-5 h-4" />
              </div>
              <div className="w-[150px] h-[190px] flex justify-center items-center p-4">
                <img src={item.productImage} alt={`${item.productName} image`} className="" />
              </div>
            </div>
            <h3 className="font-[Poppins] font-medium">{item.productName}</h3>
            <div className="flex gap-x-3 items-center font-[Poppins] h-4">
              <h5 className=" font-medium text-[#DB4444]">${item.currentPrice}</h5>
              <div className="flex items-center gap-1 h-full">
                <UseRating item={item}/>
              </div>
              <h5 className="text-[#00000069] font-semibold h-full flex items-center">
                ({item.ratingCount})
              </h5>
            </div>
          </Link>)
          }

           
        </div>
        <div className="all-products-list-flex-2 flex gap-x-6 mt-7 overflow-auto" id="scroll-visibility" ref={scrollableDiv2}>
          {
            products.slice(4, 8).map((item)=><Link to="/productdetails" state={item} key={item._id || item.id} className="product-1 flex flex-col gap-y-2 shrink-0">
            <div className="image-container w-[270px] h-[250px] max-md:w-[250px] max-md:h-[230px] max-sm:w-[230px] max-sm:h-[210px] bg-[#F5F5F5] flex justify-center items-center relative">
              <div onClick={(e)=>handleCart(item,e)} className="absolute top-2 right-2 w-9 h-9 bg-white rounded-full flex items-center justify-center">
                <img src={heartIcon} alt="heart icon" className="w-6 h-6" />
              </div>
              {
                item.isNew && <div className="bg-[#00FF66] text-[12px] font-[Poppins] text-white px-2 py-0.5 rounded top-2.5 left-2 absolute">
                NEW
              </div>
              }
              <div onClick={(e)=>handleWishList(item,e)} className="absolute top-[52px] right-2 w-9 h-9 bg-white rounded-full flex items-center justify-center">
                <img src={eyeIcon} alt="eye icon" className="w-5 h-4" />
              </div>
              <div className="w-[150px] h-[190px] flex justify-center items-center p-4">
                <img src={item.productImage} alt={`${item.productName} image`} className="" />
              </div>
            </div>
            <h3 className="font-[Poppins] font-medium">{item.productName}</h3>
            <div className="flex gap-x-2 items-center font-[Poppins] h-4">
              <h5 className=" font-medium text-[#DB4444]">${item.currentPrice}</h5>
              <div className="flex items-center h-full gap-1">
               <UseRating item={item}/>
              </div>
              <h5 className="text-[#00000069] font-semibold h-full flex items-center">
                ({item.ratingCount})
              </h5>
            </div>
           <div className="available-colors flex items-center gap-x-1">
  {
              item.availableColors.map((Item)=><button key={crypto.randomUUID()} onClick={handleColor} value={Item.colorCode} className={`${Item.colorCode === selectedColor ? ' outline-3 outline-red-500' : ''}`}><span className={`w-5 h-5 max-lg:w-4 max-lg:h-4 max-md:h-3 max-md:w-3 max-sm:h-2 max-sm:w-2 ${Item.blackBorder ? 'border' : ''}  rounded-full flex justify-center items-center`}>
                {/* here inside class bg-[${Item?.colorCode}] this is not work so here we should use style to set bg color */}
              <span className={` rounded-full w-full h-full ${Item.whiteBorder ? 'border-2  max-sm:border border-white' : ''}`} style={{backgroundColor:Item.colorCode}}></span>
            </span></button>)
            }
</div>
          </Link>)
          }

           
        </div>
        <div className="view-all-products-button flex justify-center mt-10 max-sm:mt-7 font-[Poppins] "><Link to='/allitems' className="bg-[#DB4444] px-6 py-1.5 max-sm:text-[12px] max-md:text-sm rounded font-medius text-white">View All Products</Link></div>
      </section>
    )
}