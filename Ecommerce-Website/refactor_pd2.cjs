const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'ProductDetails.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace the first useEffect setting itemData
content = content.replace(/useEffect\(\(\)=>\{\s+const id=setTimeout\(\(\)=>\{\s+const currentItem=data\.allItem\?\.find\(\(singleItem\)=>singleItem\.productName === item\.state\?\.productName\)\s+setItemData\(currentItem\)\s+return \(\)=>clearTimeout\(id\)\s+\},100\)\s+return \(\)=>clearTimeout\(id\);\s+\},\[itemCount\]\)/, 
`useEffect(()=>{
    if(item.state) {
      setItemData(item.state);
    }
  }, [item.state])`);

// Replace handleItemCount
content = content.replace(/function handleItemCount\(item, e\) \{[\s\S]*?setItemCount\(targetItem\.quantity\);\s+\}\s+\}\s+\}/,
`function handleItemCount(itemObj, e) {
  if (e.target.name === 'increment') {
    setItemCount(prev => prev + 1);
  } else {
    setItemCount(prev => (prev > 1 ? prev - 1 : 1));
  }
}`);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Updated ProductDetails.jsx regex");
