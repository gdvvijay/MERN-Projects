const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

const replacements = [
  {
    file: 'AllProducts.jsx',
    replace: [
      [/import useData from "(\.\.\/data\/data)"/g, 'import useProducts from "../Hooks/useProducts"'],
      [/const \[data,setData\]=useData\(\)/g, 'const { products } = useProducts();'],
      [/data\.allItem/g, 'products'],
      [/item\.id/g, 'item._id || item.id']
    ]
  },
  {
    file: 'Cart.jsx',
    replace: [
      [/import useData from "(\.\.\/data\/data)";/g, 'import useProducts from "../Hooks/useProducts";\nimport useData from "../data/data";'],
      [/const \[data, setData\] = useData\(\);/g, 'const { products } = useProducts();\n  const [data, setData] = useData();'],
      [/data\.allItem/g, 'products'],
      [/\[cartItem, data\]/g, '[cartItem, products]']
    ]
  },
  {
    file: 'MyCollection.jsx',
    replace: [
      [/import useData from "(\.\.\/data\/data)";/g, 'import useProducts from "../Hooks/useProducts";'],
      [/const \[data,setData\]=useData\(\)/g, 'const { products } = useProducts();'],
      [/data\.allItem/g, 'products'],
      [/item\.id/g, 'item._id || item.id']
    ]
  },
  {
    file: 'OurProductsSection.jsx',
    replace: [
      [/import useData from '\.\.\/data\/data'/g, "import useProducts from '../Hooks/useProducts'"],
      [/const \[data,setData\]=useData\(\)/g, 'const { products } = useProducts();'],
      [/data\.exploreOurProduct\.listOne/g, 'products.slice(0, 4)'],
      [/data\.exploreOurProduct\.listTwo/g, 'products.slice(4, 8)'],
      [/item\.id/g, 'item._id || item.id']
    ]
  },
  {
    file: 'SearchByCategory.jsx',
    replace: [
      [/import useData from "(\.\.\/data\/data)"/g, 'import useProducts from "../Hooks/useProducts"'],
      [/const \[data,setData\]=useData\(\)/g, 'const { products } = useProducts();'],
      [/data\.allItem/g, 'products'],
      [/item\.id/g, 'item._id || item.id']
    ]
  },
  {
    file: 'SearchProducts.jsx',
    replace: [
      [/import useData from "(\.\.\/data\/data)"/g, 'import useProducts from "../Hooks/useProducts"'],
      [/const \[data,setData\]=useData\(\)/g, 'const { products } = useProducts();'],
      [/data\.allItem/g, 'products'],
      [/item\.id/g, 'item._id || item.id']
    ]
  },
  {
    file: 'ThisMonthSection.jsx',
    replace: [
      [/import useData from '\.\.\/data\/data'/g, "import useData from '../data/data';\nimport useProducts from '../Hooks/useProducts';"],
      [/const \[data,setData\]=useData\(\)/g, 'const [data, setData] = useData();\n  const { products } = useProducts();'],
      [/data\.bestSelling/g, 'products.filter(p => p.isBestSelling)'],
      [/item\.id/g, 'item._id || item.id']
    ]
  },
  {
    file: 'TodaysSection.jsx',
    replace: [
      [/import useData  from '\.\.\/data\/data'/g, "import useProducts from '../Hooks/useProducts'"],
      [/const \[data,setData\]=useData\(\)/g, 'const { products } = useProducts();'],
      [/data\.flashSale/g, 'products.filter(p => p.isFlashSale)'],
      [/item\.id/g, 'item._id || item.id']
    ]
  },
  {
    file: 'WishList.jsx',
    replace: [
      [/import useData from '\.\.\/data\/data'/g, "import useProducts from '../Hooks/useProducts'"],
      [/const \[data,setData\]=useData\(\)/g, 'const { products } = useProducts();'],
      [/data\.allItem/g, 'products'],
      [/data\.bestSelling/g, 'products.filter(p => p.isBestSelling)'],
      [/item\.id/g, 'item._id || item.id']
    ]
  }
];

replacements.forEach(rep => {
  const filePath = path.join(componentsDir, rep.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    rep.replace.forEach(([regex, replaceStr]) => {
      content = content.replace(regex, replaceStr);
    });
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${rep.file}`);
  } else {
    console.log(`File not found: ${rep.file}`);
  }
});
