import leftArrow from '../assets/leftArrow.png'
import rightArrow from '../assets/rightArrow.png'
import { useRef } from "react";
import useData from '../data/data'
import { Link } from 'react-router-dom'

export default function CategoriesSection(){
    // scroll functionality
    const scrollableDiv = useRef()
    const [data,setData]=useData()
     function scrollToLeft(){
       scrollableDiv.current?.scrollBy({
    left: -200,
    top: 0, 
    behavior: 'smooth'
  })
     }
      function scrollToRight(){
       scrollableDiv.current?.scrollBy({
    left: 200,
    top: 0, 
    behavior: 'smooth'
  })
     }
    
    return(
        <section className="categories-section flex flex-col gap-5 mt-20 border-b border-[#00000036] pb-12 px-0.5">
        <div className="categories-heading flex items-center gap-4 max-sm:gap-2"><span className="w-5 h-10 rounded bg-[#DB4444] max-md:w-4 max-md:h-8"></span><span className="text-[#DB4444] font-[Poppins] font-semibold max-md:text-sm max-sm:text-[10px]">Categories</span></div>
        <div className="flex justify-between mt-3.5 max-md:mt-0">
          <h2 className="text-4xl font-[Inter] font-semibold max-md:text-3xl max-sm:text-xl">Browse By Category</h2>
           <div className="flex gap-3">
                      <div className="rounded-full h-12 w-12 max-sm:w-8 max-sm:h-8 bg-[#F5F5F5] flex justify-center items-center" onClick={scrollToLeft}>
                        <img src={leftArrow} alt="left arrow" className="w-6 max-md:w-4" />
                      </div>
                      <div className="rounded-full h-12 w-12 max-sm:w-8 max-sm:h-8 bg-[#F5F5F5] flex justify-center items-center" onClick={scrollToRight}>
                        <img src={rightArrow} alt="right arrow" className="w-8 max-md:w-6" />
                      </div>
                    </div>
        </div>
        <div className="all-category-container flex gap-6 overflow-x-auto mt-14 max-md:mt-7 max-sm:mt-4" id="scroll-visibility" ref={scrollableDiv}>
          {
            data?.allCategories?.map((categoryItem)=><Link to={`/searchbycategory/${categoryItem.category}`} key={categoryItem.category} className={`${categoryItem.category}-category w-[170px] h-[145px] max-md:w-[150px] max-md:h-[125px] hover:bg-[#DB4444] hover:text-white border border-[#0000004d] rounded flex justify-center items-center shrink-0`}>
            <div className="flex flex-col items-center gap-2">
              <img src={categoryItem.categoryImage} alt="category cell phone" className="w-[56px] h-[56px] max-md:w-[46px] max-md:h-[46px]"/>
            <h6 className="font-[Poppins]  max-md:text-sm">{categoryItem.category}</h6>
            </div>
           
          </Link>)
          }
        </div>
      </section>
    )
}