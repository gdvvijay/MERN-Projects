import heart from "../assets/heart.png";
import eye from "../assets/eye.png";
import useDateTime from "../Hooks/useDateTime";
import useData from '../data/data';
import useProducts from '../Hooks/useProducts';
import UseRating from "./UseRaring";
import { Link } from "react-router-dom";
import { useWishListContext } from "../Hooks/useWishListContext";
import { useCartContext } from "../Hooks/useCartContext";
import { toast } from "react-toastify";

export default function ThisMonthSection(){
   const [cartItem,setCartItem]=useCartContext()
  const [wishListItem,setWishListItem]=useWishListContext()
  const dateTime=useDateTime()
  const [data, setData] = useData();
  const { products } = useProducts();

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
        <section className="thisMonth-section flex flex-col mt-20 gap-3.5 px-0.5">
        <div className="this-month-logo flex items-center  gap-4 max-md:gap-3">
          <span className="w-5 h-10 max-md:w-4 max-md:h-8 bg-[#DB4444] rounded"></span>
          <span className="text-[#DB4444] font-[Poppins] font-semibold max-lg:text-sm max-md:text-[12px]">
            This Month
          </span>
        </div>
        <div className="best-selling-text flex justify-between">
          <div className="font-[inter] text-4xl max-lg:text-3xl  max-md:text-[26px] max-sm:text-xl font-medium">Best Selling Products</div>
          <div className="">
            <Link to='/allitems' className="bg-[#DB4444] rounded text-white px-7 py-2 max-md:px-6 max-md:py-1.5 max-md:text-sm max-sm:text-[10px] ml-2.5">
              View All
            </Link>
          </div>
        </div>
        <div className="this-month-itemsList-container mt-20 max-md:mt-10 grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] justify-items-center gap-5 px-1.5">
          {
            products.filter(p => p.isBestSelling).map((item)=><Link state={item} to='/productdetails' key={item._id || item.id} className="item-1 flex flex-col gap-3.5 w-full  max-w-[400px]">
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
        {
          data?.enhanceExperience?.map((item)=><div key={item._id || item.id} className="enhance-your-experience bg-black flex p-10 max-md:p-8 mt-32 max-md:mt-20 max-sm:flex-col relative">
          <div className="flex flex-col gap-y-10 max-lg:gap-y-7 max-md:gap-y-5 basis-[40%] max-sm:order-2">
            <h5 className="text-[#00FF66] font-[Poppins] font-semibold max-lg:text-sm max-md:text-[12px] max-sm:text-[10px] max-sm:absolute top-2.5">Categories</h5>
            <h1 className="text-[#FAFAFA] text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl leading-14 max-lg:leading-10 max-md:leading-8 font-semibold tracking-[1px] "  dangerouslySetInnerHTML={{ __html: item.productTitle }}></h1>
            <div className="flex gap-5 font-[Poppins] max-lg:gap-4 max-md:gap-3">
              <div className="w-16 h-16 max-lg:w-14 max-lg:h-14 max-sm:w-10 max-sm:h-10 bg-white rounded-full flex justify-center items-center"><div className="flex flex-col items-center"><h2 className="font-semibold max-md:text-sm  max-sm:text-[10px]">{dateTime.hours}</h2><h5 className="text-[11px] max-md:text-[10px]  max-sm:text-[8px]">Hours</h5></div></div>
              <div className="w-16 h-16 max-lg:w-14 max-lg:h-14 max-sm:w-10 max-sm:h-10 bg-white rounded-full flex justify-center items-center"><div className="flex flex-col items-center"><h2 className="font-semibold max-md:text-sm  max-sm:text-[10px]">{dateTime.days}</h2><h5 className="text-[11px] max-md:text-[10px]  max-sm:text-[8px]" >Days</h5></div></div>
              <div className="w-16 h-16 max-lg:w-14 max-lg:h-14 max-sm:w-10 max-sm:h-10 bg-white rounded-full flex justify-center items-center"><div className="flex flex-col items-center"><h2 className="font-semibold max-md:text-sm  max-sm:text-[10px]">{dateTime.minutes}</h2><h5 className="text-[11px] max-md:text-[10px]  max-sm:text-[8px]">Minutes</h5></div></div>
              <div className="w-16 h-16 max-lg:w-14 max-lg:h-14 max-sm:w-10 max-sm:h-10 bg-white rounded-full flex justify-center items-center"><div className="flex flex-col items-center"><h2 className="font-semibold max-md:text-sm  max-sm:text-[10px]">{dateTime.seconds}</h2><h5 className="text-[11px] max-md:text-[10px]  max-sm:text-[8px]">Seconds</h5></div></div>
            </div>
            <div><Link to='/productdetails' state={item}  className="bg-[#00FF66] text-[#FAFAFA] font-[Poppins] font-medium px-7 max-lg:px-5 py-2.5 max-lg:py-1.5 max-md:text-sm max-sm:text-[10px] rounded">Buy Now!</Link></div>
          </div>
          <div className="basis-[60%] flex items-center max-sm:order-1">
            <div ><img src={item.productImage} alt={`${item.productName} image`} className="drop-shadow-[0_0px_120px_rgba(217,217,217,0.5)] p-6 max-sm:p-0"/></div>
          </div>
        </div>)
        }
      </section>
    )
}