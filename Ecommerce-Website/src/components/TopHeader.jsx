export default function TopHeader() {
  return (
    <div className="top-header h-[48px] bg-black font-['Poppins']">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-center h-full relative">
        <span className="text-[#fafafad3] text-[14px] max-[800px]:text-[10px] max-[600px]:text-[8px] max-[470px]:text-[6px] max-[350px]:text-[5px] line-through">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <button className="font-semibold underline text-white">
            ShopNow
          </button>
        </span>
        <select className="text-white pr-2 mr-1 absolute right-0 max-[800px]:text-[12px] max-[600px]:text-[9px] max-[470px]:text-[6px] max-[470px]:pr-0.5 max-[350px]:text-[5px]">
          <option>English</option>
        </select>
      </div>
    </div>
  );
}
