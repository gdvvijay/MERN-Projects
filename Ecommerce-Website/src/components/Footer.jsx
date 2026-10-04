import sendIcon from '../assets/sendIcon.png'
import qrCode from '../assets/qrCode.png'
import playStore from '../assets/playStore.png'
import appleStore from '../assets/appleStore.png'
import facebookIcon from '../assets/Icon-Facebook.png'
import twitterIcon from '../assets/Icon-Twitter.png'
import instagramIcon from '../assets/icon-instagram.png'
import linkedInIcon from '../assets/Icon-Linkedin.png'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Footer(){
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      
      toast('subscribed successfully')
      
    }
  };
    return(
        <footer className="bg-black w-full min-h-[440px] flex flex-col justify-center mt-10 max-sm:mt-2 relative items-center px-0.5">
        <div className="footer-items-container max-w-6xl flex mx-auto  w-full max-lg:flex-wrap gap-10 max-md:justify-center min-lg:justify-between py-7 max-sm:py-14">
          <div className="flex flex-col text-white gap-y-6 max-sm:gap-y-3">
            <h1 className="text-2xl font-[Inter] font-bold tracking-wider max-sm:text-xl ">Exclusive</h1>
            <h3 className="font-[Poppins] text-xl font-medium max-sm:text-sm">Subscribe</h3>
            <Link to='/allitems' className="font-[Poppins] max-sm:text-[12px]">Get 10% off your first order</Link>
            <div className="relative flex items-center border rounded"><input onKeyDown={handleKeyDown} type="email" placeholder="Enter your email" className="placeholder:text-[#ffffffab] py-2 outline-0 pl-2.5 pr-8 bg-none"/><img  onClick={()=>toast('subscribed successfully')} src={sendIcon} alt="send icon" className="w-[24px] absolute right-1"/></div>
          </div>
          <div className="flex flex-col text-white gap-y-6 max-sm:gap-y-3 ">
            <h2 className="font-[Poppins] font-medium text-xl max-sm:text-sm">Support</h2>
            <h6 className='font-[Poppins] max-sm:text-[12px]'>111 Bijoy sarani, Dhaka,<br/> DH 1515, Bangladesh.</h6>
            <h6 className='font-[Poppins] max-sm:text-[12px]'>exclusive@gmail.com</h6>
            <h6 className="font-[Poppins] max-sm:text-[12px]">+88015-88888-9999</h6>
          </div>
          <div className="flex flex-col text-white gap-y-6 max-sm:gap-y-3 font-[Poppins]">
            <h2 className="text-xl font-medium  max-sm:text-sm">Account</h2>
            <Link to='/account' className=" max-sm:text-[12px]">My Account</Link>
            <Link to='/signup' className=" max-sm:text-[12px]">Login / Register</Link>
            <Link to='/cart' className=" max-sm:text-[12px]">Cart</Link>
            <Link to="/wishlist" className=" max-sm:text-[12px]">Wishlist</Link>
            <Link to='allitems' className="max-sm:text-[12px]">Shop</Link>
          </div>
          <div className="flex flex-col text-white gap-y-6 max-sm:gap-y-3 font-[Poppins]">
            <h2 className="text-xl font-medium  max-sm:text-sm">Quick Link</h2>
            <Link to='/privacypolicy' className=" max-sm:text-[12px]">Privacy Policy</Link>
            <Link to='/termofuse' className=" max-sm:text-[12px]">Terms Of Use</Link>
            <Link to='/faq' className=" max-sm:text-[12px]">FAQ</Link>
            <Link to='/contact' className=" max-sm:text-[12px]">Contact</Link>
          </div>
          <div className="flex flex-col text-white gap-y-6 max-sm:gap-y-3 font-[Poppins]">
            <h2 className="font-medium text-xl  max-sm:text-sm">Download App</h2>
            <h6 className="font-medium text-[12px] text-[#fafafab1]">Save $3 with App New User Only</h6>
            <div className="flex">
              <img src={qrCode} alt="qr code image"/>
              <div className="flex flex-col pl-4">
                <img src={playStore} alt="play store image" className="mb-auto"/>
                <img src={appleStore} alt="apple store image"/>
              </div>
            </div>
            <div className="flex gap-7">
              <img src={facebookIcon} alt="facebook icon"/>
              <img src={twitterIcon} alt="twitter icon"/>
              <img src={instagramIcon} alt="instagram icon"/>
              <img src={linkedInIcon} alt="linkedIn Icon"/>
            </div>
          </div>
        </div>
        <div className="text-[#ffffff90] flex items-end absolute font-[Poppins] bottom-0.5 max-sm:text-sm">&copy; Copyright gdv 2025. All right reserved</div>
      </footer>
    )
}