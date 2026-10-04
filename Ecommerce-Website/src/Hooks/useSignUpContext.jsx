import { createContext, useContext, useEffect, useState } from "react";

const SignUpContext=createContext()

const   SING_UP_AUTH_KEY='IS_LOGIN'
export function SignUpContextProvider({children}){
    const [signUpAuth,setSignUpAuth]=useState(()=>{
        try{
            const isAvailable=localStorage.getItem(SING_UP_AUTH_KEY)

            return isAvailable ? JSON.parse(isAvailable) : false
        }catch(err){
            console.error(err)
            return false
        }
    })

    useEffect(()=>{
        try{
            localStorage.setItem(SING_UP_AUTH_KEY,signUpAuth)
        }catch(err){
            console.error(err)
        }
    },[signUpAuth])

    return(
        <SignUpContext.Provider value={[signUpAuth,setSignUpAuth]}>{children}</SignUpContext.Provider>
    )

}

export default function useSignUpContext(){
    return useContext(SignUpContext)
}