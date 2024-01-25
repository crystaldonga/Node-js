const express = require('express')
const app = express();
const Student=require('./models/students')
const routerdata = require("./routers/student")
require('./db/conn.js')
const port = process.env.PORT||8000

app.use(express.json())
app.use(routerdata)



app.listen(port,()=>{
    console.log("listing");
})