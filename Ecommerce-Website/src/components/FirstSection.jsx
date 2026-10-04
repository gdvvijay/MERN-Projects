import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useData from "../data/data";
import leftArrow from '../assets/leftArrow.png';
import rightArrow from '../assets/rightArrow.png';

export default function FirstSection() {
  const [data] = useData();
  

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = data?.firstSection || [];
  const totalSlides = slides.length;

  const prevSlide = () => {

    const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };


  const nextSlide = () => {

    const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };



  useEffect(() => {

    if (isPaused || totalSlides === 0) return;


    const autoPlayInterval = setInterval(nextSlide, 4000);


    return () => clearInterval(autoPlayInterval);
  }, [isPaused, currentIndex, totalSlides]); 


  return (
    <section className="first-section flex w-full h-full px-1 max-[350px]:px-0.5">

      <ul className="list-none font-[Poppins] max-[700px]:text-[14px] max-[610px]:text-[12px] max-[400px]:text-[9px] border-r w-fit pr-16 max-[800px]:pr-8 max-[610px]:pr-4 max-[400px]:pr-2 space-y-2 max-[750px]:space-y-1.5 max-[500px]:space-y-0 pt-6 max-[500px]:pt-3 border-[#00000084] shrink-0">
        <li><Link to="/searchbycategory/womenfashion">Woman's Fashion</Link></li>
        <li><Link to="/searchbycategory/clothes">Men's Fashion</Link></li>
        <li><Link to="/searchbycategory/phones">Electronics</Link></li>
        <li><Link to="/searchbycategory/furniture">Home & Lifestyle</Link></li>
        <li><Link to="/searchbycategory/medicine">Medicine</Link></li>
        <li><Link to="/searchbycategory/sports">Sports & Outdoor</Link></li>
        <li><Link to="/searchbycategory/gaming">Baby's & Toys</Link></li>
        <li><Link to="/searchbycategory/food">Groceries & Pets</Link></li>
        <li><Link to="/searchbycategory/beauty and care">Health & Beauty</Link></li>
      </ul>
       
     
      <div 
        className="relative h-full w-full overflow-hidden mt-6 max-[500px]:mt-3 ml-12 max-[800px]:ml-6 max-[610px]:ml-3 max-[400px]:ml-1.5"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
     
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((item) => (
            <Link 
              to="/productdetails" 
              state={item} 
              key={item.id} 
              className="shrink-0 w-full h-full min-h-[290px] max-[700px]:min-h-[240px] max-[610px]:min-h-[210px] max-[500px]:min-h-[150px] max-[400px]:min-h-[120px] bg-black text-white flex justify-between"
            >
              {/* Text Content */}
              <div className="flex flex-col justify-center w-full pl-14 max-[750px]:pl-7 max-[560px]:pl-3 gap-y-4 max-[1000px]:gap-y-2 max-[500px]:gap-y-1">
                <div className="flex items-center">
                  <img src={item.companyLogo} alt={`${item.productName} logo`} className="w-[30px] max-[560px]:w-[20px] "/>
                  <h4 className="font-[Poppins] ml-6 max-sm:ml-1 max-[700px]:text-[12px] max-[560px]:text-[9px] max-[400px]:text-[8px]">{item.productName}</h4>
                </div>
                <h1 className="font-['Inter'] font-semibold tracking-wide text-5xl leading-tight max-[1040px]:text-4xl max-[700px]:text-3xl max-[560px]:text-2xl max-[400px]:text-base" dangerouslySetInnerHTML={{ __html: item.productDiscount }}/>
                <button className="flex items-center w-fit">
                  <span className="pb-1 underline underline-offset-8 max-[500px]:underline-offset-4 text-base max-[700px]:text-sm max-[560px]:text-xs">Shop Now</span>{" "}
                  <img src={item.arrowIcon || rightArrow} alt="Shop now" className="ml-2 w-6 h-6 max-[700px]:w-4 max-[700px]:h-4"/>
                </button>
              </div>

              {/* Image Content */}
              <div className="flex items-center justify-center w-full px-4">
                <img src={item.productImage} alt={item.productName} className="object-contain h-[70%] max-h-[240px] max-w-full"/>
              </div>
            </Link>
          ))}
        </div>
          
        {/* --- Navigation Arrows --- */}
        <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
            <button onClick={prevSlide} className="pointer-events-auto w-10 h-10 max-sm:w-8 max-sm:h-8 rounded-full bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center">
                <img src={leftArrow} alt="Previous" className="w-1/2"/>
            </button>
            <button onClick={nextSlide} className="pointer-events-auto w-10 h-10 max-sm:w-8 max-sm:h-8 rounded-full bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center">
                <img src={rightArrow} alt="Next" className="w-1/2"/>
            </button>
        </div>


        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === i ? 'bg-red-500 scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
            ))}
        </div>
      </div>
    </section>
  );
}