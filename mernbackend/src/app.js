require("dotenv").config();
const express = require("express")
const app =express();
const path = require("path")
const hbs = require('hbs')
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("./middleware/auth")
console.log(__dirname)
const cookieParser = require("cookie-parser")

require("./db/conn")
const Register = require("../src/models/registers");
const port =process.env.PORT || 8000
const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partial_path = path.join(__dirname,"../templates/partials")
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false})) //read the data into form
app.use(express.static(static_path))
//set view engine 

app.set("view engine","hbs")

app.set("views",template_path)
hbs.registerPartials(partial_path)

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/secret",auth,(req,res)=>{
   // console.log(`the cookie is a ${req.cookies.jwt}`)
    res.render("secret")
})
app.get("/logout",auth,async(req,res)=>{
           try{
             
           console.log("hello")
           console.log(req.user)
           
      
           //for single user
            // req.user.tokens=req.user.tokens.filter((val)=>{
            //         return val.token !== req.token  //filter method create a new array
            // })

            //all user logout
            req.user.tokens=[]
            res.clearCookie("jwt")

          
          
           console.log("logout sucessfully")
           await req.user.save()
           res.render("login")
           }
           catch(e){
            console.log(e)
            res.status(500).send("error") //server error
           }
})
app.get("/register",(req,res)=>{
    res.render("register")
})
//create a new user in database
app.post("/register",async(req,res)=>{
    try {
        const password = req.body.password
        console.log(password)
        //res.send(password)
        const cpassword = req.body.confirmpassword
        console.log(cpassword)
        if(password===cpassword){
          const data = new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password,
            confirmpassword:req.body.confirmpassword,
            gender:req.body.gender
          })
          console.log("data is a"+data)
          //generate the token
          const token = await data.generateAuthToken()
          console.log( " t " +" "+ token) //getting error
          //password hasing 
          //cookies set
          res.cookie("jwt",token,{
            expires:new Date(Date.now()+3000000)
          })
          const registerdata = await data.save()
           //console.log("the register data is a"+registerdata)
          res.status(201).render("index.hbs")
        }else{
            res.send("password are not matching")
        }
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",async(req,res)=>{
    try{
    const email = req.body.email
    console.log(email)
    const password = req.body.password
    console.log(password)
    const userdetail = await Register.findOne({email:email})
    console.log(userdetail.password)
    //res.send(userdetail)
    const token = await userdetail.generateAuthToken()
    console.log("the token is" + token)
    //cookies set
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+10000000),
        //secure:true
      });


    const isMatch = await  bcrypt.compare(password,userdetail.password)
    if(isMatch){
        res.status(201).render("index")
    }else{
        res.send("invalid detail")
    }
    }catch(e){
           res.status(400).send("invalid detail...")
    }
})
app.listen(port,()=>{
    console.log("listing sucessfulyy")
})