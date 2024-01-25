const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")
//creat the documation

const employeeSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,

    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
        
    },
   
    gender:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})
//generate th token 
//methods= use of instance 
//statics =use of collection or class
employeeSchema.methods.generateAuthToken=async function(){
    try {
        console.log(this._id)
        const token =  jwt.sign({_id:this._id},process.env.Secrate_key,{ expiresIn: '180000s' })
             //.sign()=use generate the token (unique id ,secrete key)
             this.tokens=this.tokens.concat({token})
             console.log("token is"+token)
             console.log("this.tokens is"+this.tokens)
             await this.save()
             return token;
    } catch (e) {
        //res.send("error" + e)
        console.log(e)
    }
}
//middleware
employeeSchema.pre("save",async function(next) {
        if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
        console.log(this.password)
        //this.confirmpassword=this.password
        }
    next()
})
//create the coolections
const Register = new mongoose.model("Newresister",employeeSchema)
module.exports = Register;