const fs = require('fs');
const http = require('http');
const server = http.createServer();
server.on('request',(req,res)=>{
    //   fs.readFile('input.txt','utf-8',(err,data)=>{
    //     if(err){
    //         return console.log(err);
    //     }
    //     res.end(data);
    //   });
    //const rstrem = fs.createReadStream('input.txt');
    // rstrem.on('data',(chunkdata)=>{
    //     res.end(chunkdata);
    // })
    // rstrem.on('end',()=>{
    //     res.end();
    // })
    // rstrem.on('error',(err)=>{
    //        res.end('file is not found');
    // })
    const rstrem = fs.createReadStream('input.txt');
    rstrem.pipe(res);

});
server.listen(8000,'127.0.0.1',()=>{
    console.log("done");
})
