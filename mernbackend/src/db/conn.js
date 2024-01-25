const mongoose =  require('mongoose')
mongoose.connect("mongodb://localhost:27017/newdatabase").then(() => {
    console.log("connection sucessfuly")
}).catch((err) => {
     console.log("no connection")
});
module.exports = mongoose