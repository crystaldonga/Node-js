const http = require('http');
const fs = require('fs');
const requests = require('requests');
const homeFile=fs.readFileSync("home.html","utf-8");
const replaceval=(tempval,orgval)=>{
       let temparature = tempval.replace("{%tempval%}",orgval.main.temp);
        temparature = temparature.replace("{%tempmin%}",orgval.main.temp_min);
        temparature = temparature.replace("{%tempmax%}",orgval.main.temp_max);
        temparature = temparature.replace("{%location%}",orgval.name);
        temparature = temparature.replace("{%country%}",orgval.sys.country);
        temparature = temparature.replace("{%tempstatus%}",orgval.weather[0].main);
        return temparature;
      
}
const server = http.createServer((req,res)=>{
    if(req.url=='/'){
        requests("https://api.openweathermap.org/data/2.5/weather?q=gandhinagar&units=metric&appid=7df34062b23801553372210fcaf711b0")
    
    .on('data',(chunkdata)=>{
        const objdata =JSON.parse(chunkdata);
        const arry = [objdata];
       // console.log(arry[0].main.temp);
      
        const realtimeData=arry.map((val)=>replaceval(homeFile,val)).join("");
        res.write(realtimeData);
    })

        .on('end',(err)=>{
        if(err){
            return console.log("connection is closed",err);
        }
        res.end();
    })
}

})
server.listen(8000,'127.0.0.1');