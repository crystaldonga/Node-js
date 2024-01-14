const os = require('os');
console.log(os.arch());
const freemem = os.freemem();
console.log(`${freemem/1024/1024/1024}`);


const totmem = os.totalmem();
console.log(`${totmem/1024/1024/1024}`);
console.log(os.hostname());
console.log(os.platform());
console.log(os.tmpdir())
console.log(os.type())