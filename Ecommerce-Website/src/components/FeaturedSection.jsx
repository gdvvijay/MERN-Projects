import ps5 from '../assets/ps5.png'
import womenCollection from '../assets/womenCollection.png'
import speakers from '../assets/speakers.png'
import perfume from '../assets/perfume.png'
import deliveryService from '../assets/deliveryService.png'
import helpImage from '../assets/helpImage.png'
import guaranteeImage from '../assets/guaranteeImage.png'
import upArrowIcon from '../assets/upArrowIcon.png'
import { Link } from 'react-router-dom'

export default function FeaturedSection(){
    return(
        <section className="featured-section flex flex-col mt-20 max-sm:mt-10 gap-y-7 max-md:gap-y-6 max-sm:gap-y-4 px-0.5">
        <div className="featured-text-logo flex items-center gap-4 max-md:gap-2"><div className="w-5 h-10 max-md:w-4 max-md:h-8 bg-[#DB4444] rounded"></div><div className="text-[#DB4444] font-[Poppins] font-semibold max-lg:text-sm max-md:text-[12px] max-sm:text-[10px]">Featured</div></div>
        <div className="new-arrival-text text-4xl font-semibold font-[Inter] max-lg:text-3xl max-md:text-2xl max-sm:text-xl">New Arrival</div>
        <div className="grid-items grid grid-cols-4 grid-rows-2 gap-5 max-md:gap-4 max-sm:gap-3">
          <Link to='/searchbycategory/gaming' className="row-start-1 row-end-3 col-start-1 col-end-3 max-w-[570px] max-h-[600px] bg-black w-full h-full relative flex rounded overflow-hidden">
            <img src={ps5} alt="ps 5 image" className="w-full max-w-[500px] px-5 pt-20"/>
            <div className="flex flex-col gap-2.5 items-start px-5 text-white absolute justify-end h-full pb-5">
              <h3 className="font-[Inter] text-2xl font-semibold max-md:text-xl max-sm:text-sm">PlayStation 5</h3>
            <p className="text-sm font-[Poppins] max-w-[242px]  max-md:text-[12px] max-sm:text-[10px]">Black and White version of the PS5 coming out on side.</p>
            <button className='font-[Poppins] underline underline-offset-[5px] decoration-1 max-md:text-sm max-sm:text-[12px] max-sm:underline-offset-[2px]'>Shop Now</button>
            </div>
          </Link>
          <Link to='/searchbycategory/beauty and care' className="col-start-3 col-end-5 flex justify-end bg-black max-h-[284px] relative rounded overflow-hidden">
            <img src={womenCollection} alt="women collection image" className="w-full max-w-[447px]"/>
            <div className="absolute flex flex-col text-white w-full justify-end items-start pl-5 pb-5  max-sm:pl-2 max-sm:pb-2 gap-2.5 max-sm:gap-0 h-full">
              <h2 className="font-[Inter] text-2xl font-semibold max-md:text-xl max-sm:text-[12px]">Women's Collections</h2>
              <p className="text-[14px] font-[Poppins] max-w-[242px] max-md:text-[12px] max-sm:text-[7px]">Featured woman collections that give you another vibe.</p>
              <button className='font-[Poppins] underline underline-offset-[5px] decoration-1 max-md:text-sm max-sm:text-[7px] max-sm:underline-offset-[2px]'>Shop Now</button>
            </div>
          </Link>
          <Link to='/searchbycategory/speakers' className="col-start-3 relative rounded bg-black overflow-hidden flex max-h-[290px] h-full">
            <img src={speakers} alt="speakers image" className="p-10 max-md:p-5 max-sm:p-2 w-full max-w-[270px]"/>
            <div className="absolute text-white flex flex-col justify-end h-full w-full items-start pl-5 pb-5 max-sm:pl-2 max-sm:pb-2 gap-2 max-sm:gap-0">
              <h2 className="font-[Inter] text-2xl font-semibold max-md:text-xl max-sm:text-[12px]">Speakers</h2>
              <p className="text-[14px] font-[Poppins] max-w-[242px] max-md:text-[12px] max-sm:text-[7px]">Amazon wireless speakers</p>
              <button className='font-[Poppins] underline underline-offset-[5px] decoration-1 max-md:text-sm max-sm:text-[7px] max-sm:underline-offset-[2px]'>Shop Now</button>
            </div>
          </Link>
          <Link to='/searchbycategory/beauty and care' className="col-start-4 max-h-[290px] h-full overflow-hidden bg-black rounded relative flex">
            <img src={perfume} alt="perfume image" className="p-10 max-md:p-5 max-sm:p-2 w-full max-w-[270px]"/>
            <div className="absolute text-white flex flex-col justify-end h-full w-full items-start pl-5 pb-5 max-sm:pl-2 max-sm:pb-2 gap-2 max-sm:gap-0">
              <h2 className="font-[Inter] text-2xl font-semibold max-md:text-xl max-sm:text-[12px]">Perfume</h2>
              <p className="text-[14px] font-[Poppins] max-w-[242px] max-md:text-[12px] max-sm:text-[7px]">GUCCI INTENSE OUD EDP</p>
              <button className='font-[Poppins] underline underline-offset-[5px] decoration-1 max-md:text-sm max-sm:text-[7px] max-sm:underline-offset-[2px]'>Shop Now</button>
            </div>
          </Link>
        </div>
        <div className="services-container max-w-[943px] w-full flex justify-center  mx-auto mt-28 max-lg:mt-25">
          <div className="flex gap-20 max-lg:gap-15 max-md:gap-10 max-sm:gap-5 justify-center w-full">
            <div className="flex flex-col items-center gap-1">
              <img src={deliveryService} alt="delivery service image" className="w-[80px] max-md:w-[60px] max-sm:w-[40px]"/>
              <h1 className="font-[Poppins] font-semibold text-[20px] mt-3.5 max-lg:text-[16px] max-md:text-[13px] max-sm:text-[10px]">FREE AND FAST DELIVERY</h1>
              <h6 className="font-[Poppins] text-[14px] max-lg:text-[12px] max-md:text-[10px] max-sm:text-[8px]">Free delivery for all orders over $140</h6>
            </div>
            <div className="flex flex-col items-center gap-1">
              <img src={helpImage} alt="delivery service image" className="w-[80px] max-md:w-[60px] max-sm:w-[40px]"/>
              <h1 className="font-[Poppins] font-semibold text-[20px] mt-3.5 max-lg:text-[16px] max-md:text-[13px] max-sm:text-[10px]">24/7 CUSTOMER SERVICE</h1>
              <h6 className="font-[Poppins] text-[14px] max-lg:text-[12px] max-md:text-[10px] max-sm:text-[8px]">Friendly 24/7 customer support</h6>
            </div>
            <div className="flex flex-col items-center gap-1">
              <img src={guaranteeImage} alt="delivery service image" className="w-[80px] max-md:w-[60px] max-sm:w-[40px]"/>
              <h1 className="font-[Poppins] font-semibold text-[20px] mt-3.5 max-lg:text-[16px] max-md:text-[13px] max-sm:text-[10px]">MONEY BACK GUARANTEE</h1>
              <h6 className="font-[Poppins] text-[14px] max-lg:text-[12px] max-md:text-[10px] max-sm:text-[8px]">We return money within 30 days</h6>
            </div>
          </div>
        </div>
        <div onClick={()=>window.scrollTo(0,0)} className="w-full flex justify-end mt-6 max-sm:mt-4">
          <div className="w-[46px] h-[46px] max-sm:w-[30px] max-sm:h-[30px] bg-[#F5F5F5] rounded-full flex justify-center items-center">
             <img src={upArrowIcon} alt="Up Arrow Icon"/>
          </div>
        </div>
      </section>
    )
}