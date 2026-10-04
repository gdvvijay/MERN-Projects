import { Link, useRouteError } from "react-router-dom";

export default function Error(){
    const error = useRouteError();
    return(
        <div className="error-component-main max-w-6xl w-full mx-auto flex justify-center items-center flex-col font-[Poppins] gap-y-10 max-md:gap-y-6 mt-25 max-md:mt-15">
            <h1 className="font-[inter] font-medium text-8xl max-lg:text-7xl max-md:text-6xl max-sm:text-[40px]">404 Not Found</h1>
            <h6 className="max-md:text-sm max-sm:text-[11px]">Your visited page not found. You may go home page.</h6>
            <pre className="text-red-500 bg-red-100 p-4 rounded w-full overflow-auto max-w-3xl text-xs text-left">
                {error?.message || String(error)}
                <br/>
                {error?.stack}
            </pre>
            <Link to='/' className="bg-[#DB4444] text-white font-medium px-8 py-4 max-sm:py-2 max-sm:px-4 rounded">Back to home page</Link>
        </div>
    )
}