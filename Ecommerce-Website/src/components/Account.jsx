import {  NavLink, Outlet } from "react-router-dom";
export default function Account() {
  return (
    <div className="account-container max-w-6xl mx-auto flex justify-between w-full mt-15 px-1.5">
      <div className="all-links-container max-w-[200px] w-full font-[Poppins] max-md:shrink-0  max-md:max-w-[160px] max-sm:max-w-[110px]">
        <h2 className="font-medium max-md:text-sm max-sm:text-[10px]">Manage My Account</h2>
        <div className="ml-6 flex flex-col max-md:text-sm max-sm:text-[8px]">
          <NavLink className={({isActive})=>isActive ? 'text-[#DB4444]' : 'text-[#000000] opacity-40'} to="/account/myprofile">My Profile</NavLink>
          <NavLink className={({isActive})=>isActive ? 'text-[#DB4444]' : 'text-[#000000] opacity-40'} to="/account/addressbook">Address Book</NavLink>
          <NavLink className={({isActive})=>isActive ? 'text-[#DB4444]' : 'text-[#000000] opacity-40'} to="/account/paymentoption">My payment Options</NavLink>
        </div>
        <h2 className="font-medium  max-md:text-sm max-sm:text-[10px]">My Orders</h2>
        <div className="ml-6 flex flex-col max-md:text-sm max-sm:text-[8px] ">
          <NavLink className={({isActive})=>isActive ? 'text-[#DB4444]' : 'text-[#000000] opacity-40'} to="/account/myreturn">My Returns</NavLink>
          <NavLink className={({isActive})=>isActive ? 'text-[#DB4444]' : 'text-[#000000] opacity-40'} to="/account/mycollection">My Collections</NavLink>
        </div>
        <h2 className="font-medium  max-md:text-sm max-sm:text-[10px]">My WishList</h2>
      </div>
      <div className="all-links-content-main w-full flex justify-end font-[poppins]">
        <Outlet/>
      </div>
    </div>
  );
}
