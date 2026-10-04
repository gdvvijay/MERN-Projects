import mobileWithCart from '../assets/mobileWithCart.png'
import googleIcon from '../assets/googleIcon.png'
import { useRef } from 'react'
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuthContext from '../Hooks/useAuthContext'


export default function SignUp(){
    const nameRef=useRef()
    const emailRef=useRef()
    const passwordRef=useRef()
    const location=useLocation()
    const navigate=useNavigate()
    const { signup, isAuthenticated } = useAuthContext()

    async function formSubmission(e){
        e.preventDefault()

        const name=nameRef.current.value
        const email=emailRef.current.value
        const password=passwordRef.current.value
        if (!name || !email || !password) {
            toast.error('Please fill in all fields')
            return
        }

        try {
            await signup(name, email, password)
            toast.success('Account created successfully!')
            if(location.state?.from==='product'){
                navigate('/productdetails',{state:location.state?.data, replace: true})
            } else {
                navigate('/account/myprofile')
            }
        } catch(err) {
            toast.error(err.response?.data?.message || 'Sign up failed')
        }
    }
    function handleGoogleSignUp(){
        toast(<h2 className="text-sm font-[Poppins] text-red-500 font-semibold">Please direct sign up. Google sign up not working currently</h2>)
    }
    return(
        <section className="sing-up-container max-w-7xl pr-3.5">
            <div className="w-full flex justify-between">
                <div className="image-container w-full basis-[65%] max-sm:basis-[58%] "><img src={mobileWithCart} alt="mobile with cart image"/></div>
                <div className="form-container w-full basis-[42%] flex flex-col max-w-[330px] max-lg:max-w-[280px] max-sm:max-w-[250px] gap-y-8 max-lg:gap-y-4 max-sm:gap-y-1 justify-center pl-2 max-sm:pl-0.5 max-[400px]:mt-2">
                    
                        <h1 className="font-[Inter] text-4xl font-medium max-lg:text-[28px] max-md:text-[22px] max-sm:text-sm">Create an account</h1>
                        <h5 className="font-[poppins] max-lg:text-sm max-md:text-[10px] max-sm:text-[4px]">Enter your details below</h5>
                        <form className="flex flex-col gap-y-6.5 max-lg:gap-y-4 max-sm:gap-y-1 font-[Poppins] max-lg:text-sm max-md:text-[12px] max-sm:text-[7px]">
                            <input ref={nameRef} type="text"  className="outline-none border-b-2 border-[#00000048]" placeholder="Name"/>
                            <input ref={emailRef} type="email" className="outline-none border-b-2 border-[#00000048]" placeholder="Email"/>
                            <input ref={passwordRef} type="password" className="outline-none border-b-2 border-[#00000048]" placeholder="Password"/>
                            <button className="bg-[#DB4444] h-14 max-lg:h-12 max-md:h-10 max-sm:h-4 rounded font-[Poppins] font-medium text-[#FAFAFA] cursor-pointer" onClick={formSubmission}>Create Account</button>
                        </form>
                        <div className="flex gap-4 max-sm:gap-1 border rounded h-14 max-lg:h-12 max-md:h-10 max-sm:h-4 items-center justify-center font-[Poppins] cursor-pointer  max-lg:text-sm max-md:text-[10px] max-sm:text-[7px]" onClick={handleGoogleSignUp}><img src={googleIcon} alt="google icon" className="h-6 max-sm:h-3"/><h4>Sign Up With Google</h4></div>
                        <div className="flex justify-center font-[Poppins] gap-x-3.5 max-sm:gap-x-1 items-center h-7 max-lg:text-sm max-md:text-[12px] max-sm:text-[7px]"><h4 className="opacity-70">Already have account? </h4><Link state={location.state} to="/login" className="underline underline-offset-6 font-medium opacity-70 cursor-pointer">Log In</Link></div>
                </div>
            </div>
        </section>
    )

}