import sideImage from '../assets/SideImage.png'
import service from '../assets/Services.png'
import doller from '../assets/Doller.png'
import customer from '../assets/customer.png'
import annualGross from '../assets/AnnualGross.png'
import person1 from '../assets/person1.png'
import person2 from '../assets/person2.png'
import girlImage from '../assets/girlImage.png'
import twitter from '../assets/Twitter.png'
import instagram from '../assets/Instagram.png'
import linkedIn from '../assets/Linkedin.png'
import deliveryService from '../assets/deliveryService.png'
import helpImage from '../assets/helpImage.png'
import guaranteeImage from '../assets/guaranteeImage.png'

export default function About(){
    return(
        <div className="about-container max-w-6xl w-full mx-auto flex flex-col mt-10 font-[Poppins] px-1.5 max-sm:px-1 gap-y-30 max-md:gap-y-7">
            <div className="flex justify-between">
                <div className="text-container w-full flex flex-col justify-center gap-y-6 max-lg:gap-y-5 max-md:gap-y-4 max-sm:gap-y-0.5">
                    <h2 className="font-[Inter] font-semibold text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-2xl">Our Story</h2>
                    <p className="mr-13 max-[1024px]:text-sm max-[768px]:text-xs max-[640px]:text-[9px] max-[460px]:text-[7px] max-[350px]:text-[6px]  max-lg:mr-12 max-md:mr-8 max-sm:mr-2">Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                    <p className="mr-13 max-[1024px]:text-sm max-[768px]:text-xs max-[640px]:text-[9px] max-[460px]:text-[7px] max-[350px]:text-[6px] max-lg:mr-12 max-md:mr-8 max-sm:mr-2">Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
                </div>
                <div className="image-container w-full">
                    <img src={sideImage} alt="two women side image"/>
                </div>
            </div>  
            <div className="flex justify-between gap-x-0.5">
                <div className=" border flex flex-col justify-center items-center p-6 max-sm:p-2 gap-y-2.5 hover:bg-amber-500">
                    <img src={service} alt="service icon" className="w-[40%]"/>
                    <h1 className="font-[Inter] text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-base font-bold">10.5k</h1>
                    <h6 className="max-lg:text-sm max-md:text-[10px] max-sm:text-[4px]">Our site's active Sellers</h6>
                </div>
                <div className=" border flex flex-col justify-center items-center p-6 max-sm:p-2 gap-y-2.5 hover:bg-amber-500">
                    <img src={doller} alt="service icon" className="w-[40%] "/>
                    <h1 className="font-[Inter] text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-base font-bold">33k</h1>
                    <h6 className="max-lg:text-sm max-md:text-[10px] max-sm:text-[4px]">Monthly Products Sale</h6>
                </div>
                <div className=" border flex flex-col justify-center items-center p-6 max-sm:p-2 gap-y-2.5 hover:bg-amber-500">
                    <img src={customer} alt="service icon" className="w-[40%]"/>
                    <h1 className="font-[Inter] text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-base font-bold">45.5k</h1>
                    <h6 className="max-lg:text-sm max-md:text-[10px] max-sm:text-[4px]">Customer active in our site</h6>
                </div>
                <div className=" border flex flex-col justify-center items-center p-6 max-sm:p-2 gap-y-2.5 hover:bg-amber-500">
                    <img src={annualGross} alt="service icon" className="w-[40%]"/>
                    <h1 className="font-[Inter] text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-base font-bold">25k</h1>
                    <h6 className="max-lg:text-sm max-md:text-[10px] max-sm:text-[4px]">Annual gross sale in our site</h6>
                </div>
            </div>
            <div className="people-container flex justify-between gap-x-2">
                <div className="item-1 flex flex-col gap-y-2 max-sm:gap-0.5">
                    <div className="image-container bg-[#F5F5F5] flex justify-center  max-w-[350px] px-3 w-full">
                        <img src={person1} alt="men image" className="w-full bg-cover"/>
                    </div>
                    <h1 className="font-[Inter] font-medium text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-sm">Tom Cruise</h1>
                    <h6 className="max-lg:text-sm max-md:text-xs max-sm:text-[8px]">Founder & Chairman</h6>
                    <div className="logos-container flex gap-x-1"><img src={twitter} alt="twitter icon" className="max-md:max-w-[50%] max-md:max-h-[50%]"/><img src={instagram} alt="instagram icon" className="max-md:max-w-[50%] max-md:max-h-[50%]"/><img src={linkedIn} alt="linked In Icon" className="max-md:max-w-[50%] max-md:max-h-[50%]"/></div>
                </div>
                <div className="item-2 flex flex-col gap-y-2 max-sm:gap-y-0.5">
                    <div className="image-container bg-[#F5F5F5] flex justify-center max-w-[350px] px-3 w-full">
                        <img src={person2} alt="men image" className="w-full bg-cover"/>
                    </div>
                    <h1 className="font-[Inter] font-medium text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-sm">Emma Watson</h1>
                    <h6 className="max-lg:text-sm max-md:text-xs max-sm:text-[8px]">Managing Director</h6>
                    <div className="logos-container flex gap-x-1"><img src={twitter} alt="twitter icon"  className="max-md:max-w-[50%] max-md:max-h-[50%]"/><img src={instagram} alt="instagram icon"  className="max-md:max-w-[50%] max-md:max-h-[50%]"/><img src={linkedIn} alt="linked In Icon"  className="max-md:max-w-[50%] max-md:max-h-[50%]"/></div>
                </div>
                <div className="item-3 flex flex-col gap-y-2 max-sm:gap-y-0.5">
                    <div className="image-container bg-[#F5F5F5] flex justify-center max-w-[350px] px-3">
                        <img src={girlImage} alt="men image" className="w-full bg-cover"/>
                    </div>
                    <h1 className="font-[Inter] font-medium text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-sm">Will Smith</h1>
                    <h6 className="max-lg:text-sm max-md:text-xs max-sm:text-[8px]">Product Designer</h6>
                    <div className="logos-container flex gap-x-1"><img src={twitter} alt="twitter icon"  className="max-md:max-w-[50%] max-md:max-h-[50%]"/><img src={instagram} alt="instagram icon"  className="max-md:max-w-[50%] max-md:max-h-[50%]"/><img src={linkedIn} alt="linked In Icon"  className="max-md:max-w-[50%] max-md:max-h-[50%]"/></div>
                </div>
            </div>
            <div className="services-container max-w-[943px] w-full flex justify-center  mx-auto mb-15">
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
        </div>
    )
}