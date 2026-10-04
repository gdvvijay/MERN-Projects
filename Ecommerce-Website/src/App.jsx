import TopHeader from "./components/TopHeader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import UseWishListContextProvider from './Hooks/useWishListContext'
import { ToastContainer } from 'react-toastify'
import CartContextProvider from "./Hooks/useCartContext";
import { useState } from "react";
import SearchProduct from "./components/SearchProducts";
import ScrollToTop from "./components/ScrollToTop";
import { AuthContextProvider } from "./Hooks/useAuthContext";

export default function App(){
  const [searchProduct,setSearchProduct]=useState('')
  return(
      <>
      <AuthContextProvider>
        <ScrollToTop />
       <UseWishListContextProvider>
        <CartContextProvider>
       <ToastContainer position="top-center" autoClose={2000}/>
         <TopHeader/>
        <Header search={[searchProduct,setSearchProduct]}/>
        {
          searchProduct ? <SearchProduct searchProduct={searchProduct} setSearchProduct={setSearchProduct}/> : <Outlet/>
        }
       <Footer/>
       </CartContextProvider>
       </UseWishListContextProvider>
      </AuthContextProvider>
      
    </>
  )
}