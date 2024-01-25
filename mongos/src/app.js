const mongoss = require("mongoose");
mongoss 
  .connect("mongodb://localhost:27017/ttchannel")
  .then(() => console.log("connection sucessful...."))
  .catch((err) => console.log(err)); //connect node js to mongodb campass using mongoose
//create the obj
  const playlistSchema = new mongoss.Schema({  //schema define structure of documate work just like promise
                                              //get defult value ,validators etx..,
    name:{
      type:String,                         //validation
      required:true
    },
    ctype:String,
    videos:Number,
    author:String,
    active:Boolean,
    data:{
      type:Date,
      default:Date.now
    }
  })
  //mongose model is wrapper on mongoss schema.
  //create collections 
  const Playlist = new mongoss.model("PlayList",playlistSchema); //create the class Playlist sengular and convert campass in pular
  //create document or insert

const create=async()=>{
  try{
  const reactPlaylist = new Playlist({
       name:'react js',
       ctype:'front end',
       videos:70,
       author:'thapa',
       active:'true'
  })

  const nodePlaylist = new Playlist({
    name:'node js',
    ctype:'backend',
    videos:70,
    author:'thapa',
    active:'true'
})


const expressPlaylist = new Playlist({
  name:'express js',
  ctype:'backend ',
  videos:70,
  author:'thapa',
  active:'true'
})

const mongo = new Playlist({
  name:'mongo',
  ctype:'backend',
  videos:70,
  author:'thapa',
  active:'true'
})
  const respone=await Playlist.insertMany([reactPlaylist,nodePlaylist ,expressPlaylist,mongo]);
  console.log(respone);
}
catch(err){
  console.log(err)
}
}
// create()

//read opreation
// const getdocument=async()=>{
//   const response = await Playlist.find({ctype:'backend'}).select({name:1}).limit(1);
//   console.log(response);
// }
//  comparision query opreator opreation


//lessthan =$lt amd lessthan equl to=$lte;
// const getdocument=async()=>{
//   const response = await Playlist
//   .find({videos:{$lte:50}})
//   console.log(response);
// }


//greterthan=$gt or greaterthan equal =$gte
// const getdocument=async()=>{
//   const response = await Playlist
//   .find({videos:{$gt:50}})
//   console.log(response);
// }


//$in and $nin used in array
// const getdocument=async()=>{
//   const response = await Playlist
//   .find({ctype:{$nin:['front end','back end']}})
//   console.log(response);
// }

//logical opreator
//$or,$and,$nor,$not and sorting,counting 1=asending,-1=desending
const getdocument=async()=>{
  const response = await Playlist
  .find({$or:[{ctype:'backend'},{author:'thapa'}]})
  .select({name:1,_id:0})
  //.countDocuments()
  .sort({name:1})
  console.log(response);
}
//getdocument();
// const updateDocument=async(_id)=>{
//     const result=await Playlist.updateOne({_id},{
//       $set:{
//         name:'Express js'
//       }
//     });
//     console.log(result);

// const updateDocument=async(_id)=>{
//   const result=await Playlist.findByIdAndUpdate({_id},{
//     $set:{
//       name:'Express js_12'
//     }
//   },{
//     new:true
//   });
//   console.log(result);
// }
// updateDocument("65a8e9bde5e7775e5a5b36f4");

//delet
const delet=async(_id)=>{
      const result=await   Playlist.findByIdAndDelete({_id})
      console.log(result)
}
delet("65a8e9bde5e7775e5a5b36f4");
