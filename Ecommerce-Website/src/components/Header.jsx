import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userIcon from "../assets/userIcon.png";
import user from "../assets/user.png";
import mallbag from "../assets/mallbag.png";
import cancel from "../assets/cancel.png";
import review from "../assets/Reviews.png";
import logout from "../assets/logout.png";
import { toast } from "react-toastify";
import useAuthContext from "../Hooks/useAuthContext";

export default function Header({search}) {

  const [searchProduct,setSearchProduct]=search
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate=useNavigate()
  const { isAuthenticated, isAdmin, logout: logoutFn, user: currentUser } = useAuthContext()
  const body = document.querySelector("body");
  body.addEventListener("click", () => setIsUserMenuOpen(false));

  function handleAccount(){
    if(isAuthenticated){
      navigate('/account/myprofile')
    } else {
      navigate('/signup')
    }
  }

  async function handleLogout(){
    try {
      await logoutFn()
      localStorage.removeItem("ORDERS")
      localStorage.removeItem('REVIEWS')
      toast.success('Logged out successfully')
      navigate('/login')
    } catch(err) {
      toast.error('Logout failed')
    }
  }

  return (
    <header className="flex max-w-6xl w-full mx-auto justify-between items-center h-[94px] max-[800px]:h-[60px] px-1">
      <h1 className="font-[Inter] text-2xl font-bold tracking-wider max-[600px]:text-xl max-[430px]:text-lg">
        Exclusive
      </h1>
      <div
        className={`flex gap-7 max-[400px]:text-[10px] font-[Poppins] max-[800px]:absolute max-[800px]:flex-col max-[800px]:right-1 max-[800px]:gap-2 max-[800px]:top-28 max-[800px]:border max-[800px]:rounded max-[800px]:px-2.5 max-[800px]:py-0.5 ${
          isOpen ? "max-[800px]:flex" : "max-[800px]:hidden"
        } max-[800px]:z-50 bg-white/70 backdrop-blur-sm`}
      >
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/cart" className="hidden max-[400px]:block">
          Cart
        </Link>
        <Link to="/wishlist" className="hidden max-[400px]:block">
          WhishList
        </Link>
        {!isAuthenticated && <Link to="/signup">Sign Up</Link>}
        {isAdmin && <Link to="/admin" className="text-[#DB4444] font-medium">Admin</Link>}
      </div>
      <div className="flex items-center space-x-2.5 max-[430px]:space-x-1">
        <div className="search-box relative px-3 max-[400px]:px-2 flex items-center w-[243px] max-[800px]:w-[220px] max-[600px]:w-[209px] max-[430px]:w-[180px] max-[400px]:w-40 bg-[#F5F5F5] focus-within:outline-2 rounded">
          <input
            type="text"
            value={searchProduct}
            onChange={(e)=>setSearchProduct(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full pr-6 my-4 max-[800px]:my-2 max-[400px]:my-1 max-[400px]:pr-4  max-[430px]:my-1 outline-none max-[800px]:placeholder:text-[14px]  max-[430px]:placeholder:text-[11px] max-[400px]:text-[12px] max-[800px]:text-[14px]"
          />
          <div className="absolute right-3">
            {" "}
            <svg
              className="w-5 h-5 max-[600px]:w-3 max-[600px]:h-3 max-[430px]:w-2 max-[430px]:h-2"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 17L13.2223 13.2156M15.3158 8.15789C15.3158 10.0563 14.5617 11.8769 13.2193 13.2193C11.8769 14.5617 10.0563 15.3158 8.15789 15.3158C6.2595 15.3158 4.43886 14.5617 3.0965 13.2193C1.75413 11.8769 1 10.0563 1 8.15789C1 6.2595 1.75413 4.43886 3.0965 3.0965C4.43886 1.75413 6.2595 1 8.15789 1C10.0563 1 11.8769 1.75413 13.2193 3.0965C14.5617 4.43886 15.3158 6.2595 15.3158 8.15789V8.15789Z"
                stroke="black"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <Link to="wishlist" className="whish-list max-[400px]:hidden">
          {" "}
          <svg
            className="w-8 max-[600px]:w-6 max-[430px]:w-5"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z"
              stroke="black"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <Link to="cart" className="cart max-[400px]:hidden">
          <svg
            className="w-7 max-[600px]:w-5 max-[430px]:w-4"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z"
              stroke="black"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z"
              stroke="black"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 5H7L10 22H26"
              stroke="black"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8"
              stroke="black"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <div
          className={`user-icon ${
            isUserMenuOpen && "bg-[#DB4444]"
          } rounded-full relative`}
          onClick={(e) => {
            e.stopPropagation();
            setIsUserMenuOpen(!isUserMenuOpen);
          }}
        >
          <img
            src={userIcon}
            alt="user icon"
            className="w-7 max-[600px]:w-5 max-[430px]:w-4 p-1"
          />
          <div
            className={`account-menu-container top-13  max-md:top-9 right-0 max-md:-right-6 absolute font-[Poppins] bg-[rgba(0,0,0,0.14)] backdrop-blur-2xl text-white w-60 max-md:w-45 max-sm:w-35 z-50 rounded overflow-hidden p-5 max-md:p-3 text-sm max-md:text-[11px] max-sm:text-[8px] space-y-3 ${
              isUserMenuOpen ? "block" : "hidden"
            }`}
          >
            <button onClick={handleAccount} className="flex gap-2">
              <img
                src={user}
                alt="user icon"
                className="h-7 w-7 max-md:w-4 max-md:h-4"
              />
              <h3 className="">{isAuthenticated ? `Hi, ${currentUser?.name}` : 'Manage My Account'}</h3>
            </button>
            {isAdmin && (
              <Link to='/admin' className="flex gap-2">
                <span className="h-7 w-7 max-md:w-4 max-md:h-4 flex items-center justify-center">🛡️</span>
                <h3>Admin Dashboard</h3>
              </Link>
            )}
            <Link to='/myorder' className="flex gap-2 ">
              <img
                src={mallbag}
                alt="user icon"
                className="h-7 w-7 max-md:w-4 max-md:h-4"
              />
              <h3>My Order</h3>
            </Link>
            <Link to='/mycancellations' className="flex gap-2 ">
              <img
                src={cancel}
                alt="user icon"
                className="h-7 w-7 max-md:w-4 max-md:h-4"
              />
              <h3>My Cancellations</h3>
            </Link>
            <Link to='/myreviews' className="flex gap-2 ">
              <img
                src={review}
                alt="user icon"
                className="h-7 w-7 max-md:w-4 max-md:h-4"
              />
              <h3>My Reviews</h3>
            </Link>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="flex gap-2 ">
                <img
                  src={logout}
                  alt="user icon"
                  className="h-7 w-7 max-md:w-4 max-md:h-4"
                />
                <h3>Logout</h3>
              </button>
            ) : (
              <Link to='/login' className="flex gap-2 ">
                <img
                  src={logout}
                  alt="user icon"
                  className="h-7 w-7 max-md:w-4 max-md:h-4"
                />
                <h3>Log In</h3>
              </Link>
            )}
          </div>
        </div>

        <div
          className="menu hidden max-[800px]:block"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
        >
          <svg
            className="w-7 stroke-[#000000be] max-[600px]:w-5 max-[430px]:w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <hr className="absolute top-[142px] max-[800px]:top-[107px] right-0 left-0 text-[#00000084]" />
    </header>
  );
}
