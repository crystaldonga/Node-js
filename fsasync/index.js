const fs = require('fs');
// fs.writeFile('async.txt','welcome',(err)=>{
//     console.log('file is created');
//     console.log(err);
// });
// fs.appendFile('async.txt','my you tube channle',()=>{
//     console.log('sucessfully append');
    
// })

fs.readFile('async.txt','utf-8',(err,data)=>{
    console.log(data);
    console.log(err);
})