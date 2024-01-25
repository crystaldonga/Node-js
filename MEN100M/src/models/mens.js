const mongoss = require("mongoose")
const menSchema = new mongoss.Schema({  //create document structure using schema
    ranking:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        trim:true,

    },
        dob:{
             type:Date,
             required:true,
             trim:true
        },
        country:{
            type:String,
            required:true,
            trim:true
        },
        score:{
            type:Number,
            required:true,
            trim:true
        },
        event:{
         type:String,
         defualt:"100m"
        }
    
})
//create new collection
const MenRanking  = new mongoss.model("MenRanking",menSchema)
module.exports = MenRanking