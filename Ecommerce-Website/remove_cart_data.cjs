const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'Cart.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

content = content.replace(/import useData from "\.\.\/data\/data";\r?\n?/g, '');
content = content.replace(/const \[data, setData\] = useData\(\);\r?\n?/g, '');

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Updated Cart.jsx unused data");
