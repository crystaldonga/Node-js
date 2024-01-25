const mongoss = require('mongoose');
mongoss.connect("mongodb://localhost:27017/students-api")
.then(()=>{
 console.log('connection is sucessfully')
}).catch((err)=>{
    console.log("no connection")
})

