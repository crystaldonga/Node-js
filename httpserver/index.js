const http =require('http');
const fs = require('fs');
const server = http.createServer((req,res)=>{
  const data=  fs.readFileSync(`${__dirname}/userApi/userapi.json`,'utf-8');
  const orgdata = JSON.parse(data);

       
    if(req.uri=='/'){
        res.end("home page");
    }else if(req.url=='/about'){
        res.end("about page");
    }else if(req.url=='/contact'){
        res.end("contact page");
    }else if(req.url=='/userapi'){
            res.writeHead(200,{"content-type":"application/json"});
            console.log(orgdata);
            res.end(orgdata[0]);

        }
        
    
    else{
        res.writeHead(404,{"Content-type":"text/html"});
        res.end("<h1>404 error found</h1>");
    }
    console.log(req.url);
    
});

server.listen(8000,'127.0.0.1',()=>{
    console.log("listing the req using port 8000");
});