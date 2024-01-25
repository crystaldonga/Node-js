const mongoss = require('mongoose')
mongoss.connect("mongodb://localhost:27017/olympics")
.then(()=>{
    console.log("connection sucessfully")
})
.catch((e)=>{
    console.log("no connection")
})
module.exports = mongoss