const fs = require('fs');
const path = require('path');

const fullPath = path.join(__dirname, 'src', 'components', 'WishList.jsx');

let content = fs.readFileSync(fullPath, 'utf8');

const oldFunc = `  function addingAllToCart(e){
      e.stopPropagation()
    e.preventDefault()
    WishListArrayItem.map((item)=>{
        const isItemIncluded=cartItem.some((loopItem)=>loopItem === item.productName)
    if(isItemIncluded){
      toast(<h1 className="text-red-500 font-[Poppins] font-semibold">Already Added to cart</h1>)
      return
    }else{
      toast(<h1 className="text-green-500 font-[Poppins] font-semibold">Item Added to cart</h1>)
      setCartItem(prev=>[...prev,item.productName])
    }
    })
  }`;

// Use regex to tolerate whitespace
const oldRegex = /function\s+addingAllToCart\s*\(\s*e\s*\)\s*\{\s*e\.stopPropagation\(\)\s*e\.preventDefault\(\)\s*WishListArrayItem\.map\(\(item\)=>\{\s*const\s+isItemIncluded\s*=\s*cartItem\.some\(\(loopItem\)=>loopItem\s*===\s*item\.productName\)\s*if\(isItemIncluded\)\{\s*toast\(<h1 className="text-red-500 font-\[Poppins\] font-semibold">Already Added to cart<\/h1>\)\s*return\s*\}else\{\s*toast\(<h1 className="text-green-500 font-\[Poppins\] font-semibold">Item Added to cart<\/h1>\)\s*setCartItem\(prev=>\[\.\.\.prev,item\.productName\]\)\s*\}\s*\}\)\s*\}/;

const newFunc = `  function addingAllToCart(e){
    e.stopPropagation()
    e.preventDefault()

    try {
      const stored = JSON.parse(localStorage.getItem("CART_ITEM-ARRAY")) || [];
      WishListArrayItem.forEach((item)=>{
        const isItemIncluded = cartItem.some((loopItem)=>loopItem === item.productName)
        const existing = stored.find(i => i.productName === item.productName);
        if (existing) {
          existing.quantity = (Number(existing.quantity) || 1) + 1;
        } else {
          stored.push({ ...item, quantity: 1 });
        }
        if(!isItemIncluded){
          setCartItem(prev=>[...prev,item.productName])
        }
      });
      localStorage.setItem("CART_ITEM-ARRAY", JSON.stringify(stored));
      toast(<h1 className="text-green-500 font-[Poppins] font-semibold">Items moved to cart</h1>)
    } catch(err) {}
  }`;

if (oldRegex.test(content)) {
    content = content.replace(oldRegex, newFunc);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated WishList.jsx addingAllToCart');
} else {
    console.log('Did not find addingAllToCart');
}
