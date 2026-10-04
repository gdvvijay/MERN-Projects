import { createContext, useContext, useEffect, useState } from "react";

export const WishListContext=createContext()
const localStorageKey='wishListData'
export default function WishListContextProvider({children}){
    const [wishListItem,setWishListItem]=useState(()=>{
       try{
         const wishListLocalhost=localStorage.getItem(localStorageKey)

        return wishListLocalhost ? JSON.parse(wishListLocalhost) : []
       }catch(err){
        console.error('something went wong in localhost ',err);
        return []
       }
    })

    useEffect(() => {
        try {
    
          window.localStorage.setItem(localStorageKey, JSON.stringify(wishListItem));
        } catch (error) {
          console.error("Error saving data to localStorage:", error);
        }
      }, [wishListItem]);

    return <WishListContext.Provider value={[wishListItem,setWishListItem]}>{children}</WishListContext.Provider>
}

export function useWishListContext(){
 return useContext(WishListContext)
}