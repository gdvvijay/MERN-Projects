const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'ProductDetails.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. imports
content = content.replace(/import useData from '\.\.\/data\/data'/g, `import useProducts from '../Hooks/useProducts'`);

// 2. data declaration
content = content.replace(/const \[data,setData\]=useData\(\)/g, `const { products } = useProducts();\n const [data,setData] = [[], null];`);

// 3. The initial useEffect setting itemData
const oldEffect = `  useEffect(()=>{
    const id=setTimeout(()=>{
      const currentItem=data.allItem?.find((singleItem)=>singleItem.productName === item.state?.productName)
      setItemData(currentItem)

      return ()=>clearTimeout(id)
    },100)

    return ()=>clearTimeout(id);
  },[itemCount])`;

const newEffect = `  useEffect(()=>{
    // Just use the passed state object which has all the details.
    if(item.state) {
      setItemData(item.state);
    }
  }, [item.state])`;
content = content.replace(oldEffect, newEffect);

// 4. handleItemCount
const oldHandleItemCount = `function handleItemCount(item, e) {
  const targetItem = data.allItem.find(
    (i) => i.productName === item.productName
  );

  if (!targetItem) return;

  if (e.target.name === 'increment') {
    targetItem.quantity += 1;
    setItemCount(targetItem.quantity);
  } else {
    if (targetItem.quantity > 1) {
      targetItem.quantity -= 1;
      setItemCount(targetItem.quantity);
    }
  }
}`;

const newHandleItemCount = `function handleItemCount(itemObj, e) {
  if (e.target.name === 'increment') {
    setItemCount(prev => prev + 1);
  } else {
    setItemCount(prev => (prev > 1 ? prev - 1 : 1));
  }
}`;

content = content.replace(oldHandleItemCount, newHandleItemCount);

// 5. Replace data.bestSelling.map
content = content.replace(/data\.bestSelling/g, 'products.filter(p => p.isBestSelling)');

// 6. fix currentPrice rendering with itemCount instead of itemData.quantity
content = content.replace(/itemData\.currentPrice \* itemData\.quantity/g, 'itemData.currentPrice * itemCount');

// 7. item.id -> item._id || item.id
content = content.replace(/item\.id/g, 'item._id || item.id');

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Updated ProductDetails.jsx");
