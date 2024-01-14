const path = require('path');
console.log(path.dirname("D:/nodejs/pathModule/path.js"));
console.log(path.extname("D:/nodejs/pathModule/path.js"));
console.log(path.basename("D:/nodejs/pathModule/path.js"));
const p = path.parse("D:/nodejs/pathModule/path.js");
console.log(p.name);