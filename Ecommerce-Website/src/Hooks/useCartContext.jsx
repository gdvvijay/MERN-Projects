import { createContext, useContext, useEffect, useState } from "react";

export const CartContext=createContext()
const LOCALHOST_KEY='CART_ITEM'
export default function CartContextProvider({children}){
    const [cartItem,setCartItem]=useState(()=>{
        try{
            const availableItem=localStorage.getItem(LOCALHOST_KEY);

        return availableItem ? JSON.parse(availableItem) : [];
        }catch(err){
            console.error('something went wrong: ',err)

            return []
        }

    })
    useEffect(()=>{

        try{
            localStorage.setItem(LOCALHOST_KEY,JSON.stringify(cartItem))
        }
        catch(err){
            console.error(err)
        }
    },[cartItem])
    return <CartContext.Provider value={[cartItem,setCartItem]}>{children}</CartContext.Provider>
}

export function useCartContext(){
 return useContext(CartContext)
}