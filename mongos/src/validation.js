const mongoss = require('mongoose');
const valida = require('validator');
mongoss.connect("mongodb://localhost:27017/ttchannel")
.then(()=>{
    console.log("connect sucessfully")
})
.catch((err)=>{
    console.log(err)
})

const listSchema =  new mongoss.Schema({
    name:{
        type:String,                         //validation
        required:true,
        lowercase:true,
        trim:true,
        minlength:[2,'rewuire the minimum kength 2'],
        maxlength:[30]
      },
      ctype:{
      type:  String,
      lowercase:'true',
      enum:['frontend','backend','database']
    },

      videos:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error('minus number are not validate');
            }
        }          //custom validation
    
    
    },  
      author:String,
      email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!valida.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
      },
      active:Boolean,
      data:{
        type:Date,
        default:Date.now
      }
}) //create the obj

//create the class and collection
const  list = new mongoss.model('validatordata',listSchema);
//insert the data into documate
const create=async()=>{
    const valid = new list({
        name:'   react   js    ',
        ctype:'Frontend',
        videos:70,
        author:'thapa',
        email:'cry1@gmail.co',
        active:'true'
    })
    const respons =await list.insertMany([valid]);
    console.log(respons);
}
create();