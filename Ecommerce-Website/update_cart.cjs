const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

const oldHandleCart = `function handleCart(item,e){
    e.stopPropagation()
    e.preventDefault()
    
    const isItemIncluded=cartItem.some((loopItem)=>loopItem === item.productName)
    if(isItemIncluded){
      toast(<h1 className="text-red-500 font-[Poppins] font-semibold">Already Added to cart</h1>)
      return
    }else{
      toast(<h1 className="text-green-500 font-[Poppins] font-semibold">Item Added to cart</h1>)
      setCartItem(prev=>[...prev,item.productName])
    }

  }`;

// Notice the regex to catch variations in whitespace
const oldHandleCartRegex = /function\s+handleCart\s*\(\s*item\s*,\s*e\s*\)\s*\{\s*e\.stopPropagation\(\)\s*e\.preventDefault\(\)\s*const\s+isItemIncluded\s*=\s*cartItem\.some\(\(loopItem\)=>loopItem\s*===\s*item\.productName\)\s*if\s*\(isItemIncluded\)\s*\{\s*toast\(<h1 className="text-red-500 font-\[Poppins\] font-semibold">Already Added to cart<\/h1>\)\s*return\s*\}else\{\s*toast\(<h1 className="text-green-500 font-\[Poppins\] font-semibold">Item Added to cart<\/h1>\)\s*setCartItem\(prev=>\[\.\.\.prev,item\.productName\]\)\s*\}\s*\}/g;

const newHandleCart = `function handleCart(item,e){
    e.stopPropagation()
    e.preventDefault()
    
    const isItemIncluded = cartItem.some((loopItem)=>loopItem === item.productName)
    try {
      const stored = JSON.parse(localStorage.getItem("CART_ITEM-ARRAY")) || [];
      const existing = stored.find(i => i.productName === item.productName);
      if (existing) {
        existing.quantity = (Number(existing.quantity) || 1) + 1;
      } else {
        stored.push({ ...item, quantity: 1 });
      }
      localStorage.setItem("CART_ITEM-ARRAY", JSON.stringify(stored));
    } catch(err) {}

    if(isItemIncluded){
      toast(<h1 className="text-green-500 font-[Poppins] font-semibold">Increased quantity in cart</h1>)
    }else{
      toast(<h1 className="text-green-500 font-[Poppins] font-semibold">Item Added to cart</h1>)
      setCartItem(prev=>[...prev,item.productName])
    }
  }`;

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (oldHandleCartRegex.test(content)) {
                content = content.replace(oldHandleCartRegex, newHandleCart);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDirectory(componentsDir);
