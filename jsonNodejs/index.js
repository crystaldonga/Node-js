const fs = require('fs');
const biodata={
    name:'dc',
    age:20,
    channel:'technical'


};
 const jsondata = JSON.stringify(biodata);
// console.log(jsondata);

// const orgdata = JSON.parse(jsondata);
// console.log(orgdata);
// fs.writeFile('json1.json',jsondata,(err)=>{
//     console.log('done');
// })

fs.readFile('json1.json','utf-8',(err,data)=>{
    const orgdata = JSON.parse(data);
    console.log(data);
    console.log(orgdata);
});



