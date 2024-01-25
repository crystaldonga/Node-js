const mongoos = require('mongoose')
const validator = require('validator');
//create the schema 
//structure of the documate
const studentSchema = new mongoos.Schema({
    name:{
        type:String,
        required:true,
        minlength:3

    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email is alredy present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid')
            }
        }
    },
    phone:{
        type:Number,
        min:10,
        
        required:true
    },
    address:{
        type:String,
        required:true
    }
});

//create the collections
const Student = new mongoos.model("Student",studentSchema);
module.exports = Student;