import heart from "../assets/heart.png";
import deliveryIcon from '../assets/delivery.png'
import eye from '../assets/eye.png'
import useProducts from '../Hooks/useProducts'
import returnIcon from '../assets/return.png'
import { Link, useLocation, useNavigate, useNavigation, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import UseRating from "./UseRaring";
import useWindowWidth from '../Hooks/useWindowWidth'
import DeliveryPortal from "./DeliveryPortal";
import { useWishListContext } from "../Hooks/useWishListContext";
import { toast } from "react-toastify";
import { useCartContext } from "../Hooks/useCartContext";
import useAuthContext from "../Hooks/useAuthContext";

export default function ProductDetails() {
 const width=useWindowWidth()
   const [wishListItem,setWishListItem]=useWishListContext()
 const { products } = useProducts();
 const [data,setData] = [[], null];
 const [showPortal, setShowPortal] = useState(false);
  const [itemCount,setItemCount]=useState(1)
  const [itemSize,setItemSize]=useState(null)
  const [selectedColor,setSelectedColor]=useState(null)
  const [itemData,setItemData]=useState(null)
  const item=useLocation()
  const [cartItem,setCartItem]=useCartContext()
  const [isStock,setStock]=useState(true)
  const { user } = useAuthContext()
    const navigate = useNavigate()
    const location =useLocation()


  useEffect(()=>{
    if(item.state) {
      setItemData(item.state);
    }
  }, [item.state])
   
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  
function handleItemCount(itemObj, e) {
  if (e.target.name === 'increment') {
    setItemCount(prev => prev + 1);
  } else {
    setItemCount(prev => (prev > 1 ? prev - 1 : 1));
  }
}



  const handleSize=(e)=>{
    setItemSize(e.target.value)
 

    const id=setTimeout(()=>{
      const stock=itemData?.availableSizes?.find((singleItem)=>singleItem.value.includes(e.target.value))

    setStock(stock?.isStock)
    },100)

   
 
    return ()=>clearInterval(id)
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
  function handleLink(){
    location.reload()
    window.scrollTo(0,0)
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

  function handleBuyOrder(e){
    
   if(!user){
    navigate('/signup',{ state: {from:'product',data: item.state} })
   }

   if(user){
    navigate('/checkout',{ state: {from:'product',data: item.state} })
   }

  }
  
 if(!itemData) return <h1 className="flex justify-center text-red-500 text-2xl font-[Poppins] font-bold">Loading...</h1>
  return (
    <div className="product-details-container max-w-6xl mx-auto flex flex-col mt-20 max-sm:mt-10 px-1 font-[Poppins]">
      <div className="flex justify-between w-full">
        <div className="item-1 flex flex-col gap-y-3.5 max-sm:gap-y-1">
          <div className="max-w-[200px] w-full max-h-[160px] h-full border flex justify-center items-center">
            <img src={itemData.preview[0]} alt="remote controller" className="p-4 max-lg:p-3 max-md:p-1.5 max-sm:p-0.5 max-h-[200px] h-full" />
          </div>
          <div className="max-w-[200px] w-full max-h-[160px] h-full border flex justify-center items-center">
            <img src={itemData.preview[1]} alt="remote controller" className="p-4 max-lg:p-3 max-md:p-1.5 max-sm:p-0.5" />
          </div>
          <div className="max-w-[200px] w-full max-h-[160px] h-full border flex justify-center items-center">
            <img src={itemData.preview[2]} alt="remote controller" className="p-4 max-lg:p-3 max-md:p-1.5 max-sm:p-0.5" />
          </div>
          <div className="max-w-[200px] w-full max-h-[160px] h-full border flex justify-center items-center">
            <img src={itemData.preview[3]} alt="remote controller" className="p-4 max-lg:p-3 max-md:p-1.5 max-sm:p-0.5" />
          </div>
        </div>
        <div className="item-2 bg-[#F5F5F5] flex justify-center items-center ml-1 w-full max-w-[470px]">
          <img src={itemData.productImage} alt="remote controller image" className="p-4 w-full max-lg:p-3 max-md:p-1.5 max-sm:p-0.5" />
        </div>
        <div className="item-3 flex flex-col max-w-[400px] w-full ml-5 max-lg:ml-3 max-sm:ml-1 gap-y-4 max-lg:gap-y-3 max-md:gap-y-1 max-sm:gap-y-2">
          <h1 className="font-[Inter] text-2xl font-semibold max-lg:text-xl max-md:text-lg max-sm:text-[10px]">{itemData.productName}</h1>
          <div className="star-container flex gap-3 max-sm:gap-1 items-center max-h-[20px] h-full">
            <div className="stars h-4 flex gap-x-1.5 max-md:gap-x-1 max-sm:gap-x-0.5 max-lg:h-3 max-md:h-2 max-sm:h-1.5">
              <UseRating item={itemData}/>
            </div>
            <div className="text-sm opacity-50 max-lg:text-xs max-md:text-[10px] max-sm:text-[5px]">({itemData.ratingCount} Reviews)</div>
            <span className="text-sm max-lg:text-xs max-md:text-[10px] max-sm:text-[5px]">|</span>
            {
              isStock ? <div className="text-sm max-lg:text-xs text-[#00FF66]  max-md:text-[10px] max-sm:text-[5px]">In Stock</div> : <div className="text-sm max-lg:text-xs text-red-500  max-md:text-[10px] max-sm:text-[5px]">Out of Stock</div>
            }
          </div>
          <h3 className="font-[Inter] text-2xl max-lg:text-xl max-md:text-base max-sm:text-xs">${itemData.currentPrice * itemCount}.00</h3>
          <p className="text-sm max-lg:text-xs max-md:text-[10px] max-sm:text-[5px]">
            {itemData.description}
          </p>
          <div className="border-b"></div>
          {
            itemData.availableColors && <div className="available-colors flex items-center gap-x-1">
            <h2 className="font-[Inter] text-xl max-lg:text-lg mr-4 max-md:mr-2 max-md:text-base max-sm:text-xs">Colors:</h2>
            {
              itemData.availableColors.map((item)=><button key={crypto.randomUUID()} onClick={handleColor} value={item.colorCode} style={{outline: item.colorCode === selectedColor ? '3px solid red' : ''}}><span className={`w-5 h-5 max-lg:w-4 max-lg:h-4 max-md:h-3 max-md:w-3 max-sm:h-2 max-sm:w-2 rounded-full flex justify-center items-center`} style={{border: item.blackBorder ? '1px solid black': '' }}>
              <span id="inner-color" className={` rounded-full w-full h-full ${item.whiteBorder ? 'border-2  max-sm:border border-white' : ''}`} style={{backgroundColor:item.colorCode, border:item.whiteBorder ? width > 640 ? '2px solid white' : '1px solid white' : ''}}></span>
            </span></button>)
            }
          </div>
          }
          {
            itemData.availableSizes && <div className="sizes-container flex">
            <h3 className="font-[Inter] text-lg max-lg:text-base mr-2.5 max-sm:text-xs max-sm:mr-1.5">Size:</h3>
            <div className="flex gap-x-3 max-sm:gap-x-1">
              {
                itemData.availableSizes.map((item)=><button key={item.value} onClick={handleSize} value={item.value} isavailable={item.isStock?.toString()} className={`border rounded w-8 max-lg:w-7 max-md:w-5 max-sm:w-4 flex justify-center items-center font-medium text-sm max-lg:text-xs max-md:text-[10px] max-sm:text-[7px] hover:bg-[#DB4444] hover:text-white cursor-pointer ${item.value === itemSize ? 'bg-[#DB4444] text-white' : ''}`}>{item.label}</button>)
              }
            </div>
          </div>
          }
          <div className="buy-button-container flex gap-x-3 max-sm:gap-x-1">
            <div className="flex items-center border rounded">
              <button className="border-r h-full text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-base flex justify-center items-center px-3.5 max-md:px-2 max-sm:px-1 hover:bg-[#DB4444] hover:text-white cursor-pointer" onClick={(e)=>handleItemCount(itemData,e)} name='decrement'>-</button>
              <h2 className="border-r h-full flex items-center text-2xl max-lg:text-xl justify-center px-10 max-md:px-6 max-sm:px-3 max-sm:text-sm">{itemCount}</h2>
              <button className="h-full text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-base px-3.5 max-md:px-2 max-sm:px-1 hover:bg-[#DB4444] hover:text-white cursor-pointer" name='increment' onClick={(e)=>handleItemCount(itemData,e)}>+</button>
            </div>
            <button onClick={handleBuyOrder} className="bg-[#DB4444] rounded px-7 max-lg:px-5 max-md:px-5 max-sm:px-3 max-md:text-sm max-sm:text-[10px] text-white ">Buy Now</button>
            <div  onClick={(e)=>handleWishList(item,e)} className="border cursor-pointer rounded flex justify-center items-center min-w-5"><img src={heart} alt="heart image" className="w-[40px] max-lg:w-[35px] max-md:w-[30px] max-sm:w-[15px]"/></div>

          </div>
          <div className="delivery-return-condition flex flex-col border rounded">
            <div className="flex items-center gap-3 max-lg:gap-2.5 p-5 max-lg:p-4 max-md:p-2 max-sm:p-0.5">
                <div><img src={deliveryIcon} alt="delivery icon" className=""/></div>
                {showPortal && <DeliveryPortal onClose={() => setShowPortal(false)} />}
                <div className="flex flex-col gap-1 max-md:gap-0.5"><h2 className="font-medium max-md:text-sm max-sm:text-[10px]">Free Delivery</h2><button className="font-medium text-xs max-md:text-[10px] max-sm:text-[6px] underline" onClick={() => setShowPortal(true)}>Enter your postal code for Delivery Availability</button></div>
            </div>
            <div className="border-b"></div>
            <div className="flex items-center gap-3 max-lg:gap-2.5 p-5 max-lg:p-4 max-md:p-2 max-sm:p-0.5">
                <div><img src={returnIcon} alt="delivery icon"/></div>
                <div className="flex flex-col gap-1 max-md:gap-0.5"><h2 className="font-medium max-md:text-sm max-sm:text-[10px]">Free Delivery</h2><h3 className="font-medium text-xs max-md:text-[10px] max-sm:text-[6px]">Free 30 Days Delivery Returns. <Link to='/' className="underline">Details</Link></h3></div>
            </div>
          </div>
        </div>
      </div>
      <div className="just-for-you-text flex justify-between mt-19 px-1.5">
           <div className="this-month-logo flex items-center  gap-4 max-md:gap-3">
          <span className="w-5 h-10 max-md:w-4 max-md:h-8 bg-[#DB4444] rounded"></span>
          <span className="text-[#DB4444] font-[Poppins] font-semibold max-lg:text-sm max-md:text-[12px]">
            Related Item
          </span>
        </div>
          <div className="">
            <Link to='/allitems' className="rounded border px-7 py-2 max-md:px-6 max-md:py-1.5 max-md:text-sm max-sm:text-[10px] ml-2.5 font-medium">
              See All
            </Link>
          </div>
        </div>
      <div className="just-for-you-container mt-20 max-md:mt-10 grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] justify-items-center gap-5 px-1.5">
                {
                  products.filter(p => p.isBestSelling).map((item)=> <Link to='/productdetails' onClick={handleLink} state={item} key={item._id || item.id} className="item-1 flex flex-col gap-3.5 w-full  max-w-[400px]">
                          <div className="w-full h-[250px] bg-[#F5F5F5] rounded flex justify-center items-center relative overflow-hidden group">
                            <div  onClick={(e)=>handleWishList(item,e)} className="absolute w-9 h-9 bg-white rounded-full flex justify-center items-center top-2 right-3">
                              <img src={eye} alt="eye image" className="w-5 h-4" />
                            </div>
                                {item.discount && <div className="absolute bg-[#DB4444] px-3 rounded top-2 left-1.5 text-[12px] py-1 text-white">{item.discount}</div>}
                            <div className="w-40 h-40 flex justify-center items-center"><img
                              src={item.productImage}
                              alt="north coat image"
                              className=""
                            /></div>
                                <div onClick={(e)=>handleCart(item,e)} className="hidden group-hover:block bg-black absolute left-0 right-0 bottom-0 text-white text-sm font-[Poppins] py-1.5 text-center cursor-pointer">Add To Cart</div>
      
                          </div>
                          <h2 className="font-[Poppins] font-medium">{item.productName}</h2>
                          <div className="font-[Poppins] font-medium flex gap-3">
                            <span className="text-[#DB4444]">${item.currentPrice}</span>
                            {item.oldPrice && <span className="line-through decoration-1 decoration-[#000000d0] text-[#0000007a]">
                              ${item.oldPrice}
                            </span>}
                          </div>
                          <div className="start-container flex h-5 items-center gap-1">
                            <span className="flex gap-1 h-full"><UseRating item={item}/></span>
                            <span className="font-[Poppins] font-semibold text-[#00000080]">({item.ratingCount})</span>
                          </div>
                        </Link>)
                }
                      </div>
    </div>
  );
}
