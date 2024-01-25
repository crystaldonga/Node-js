const express = require('express')
const router = new express.Router()
const Student = require("../models/students")
router.post("/students",async(req,res)=>{
    try{
    const user = new Student(req.body)
    const createdata = await user.save();
    res.status(201).send(createdata);
    }
    catch(e){
      res.status(400).send(e);
    }
})

router.get("/students",async(req,res)=>{
  try{
            const studentsData  =  await Student.find();
            res.status(200).send(studentsData)
  }
  catch(e){
      res.status(400).send(e);
  }
})
router.get("/students/:id",async(req,res)=>{
  try{
       const _id = req.params.id
       const studentData = await Student.findById(_id)
       if(!studentData){
         res.status(404)
       }
       else{
        res.send(studentData)
       }
  }catch(e){
         res.status(400).send(e)
  }
})
router.patch("/students/:id",async(req,res)=>{
  try{
      const _id = req.params.id;
      const updateData= await Student.findByIdAndUpdate(_id,req.body,{
        new:true
      });
      res.status(200).send(updateData);

  }
  catch(e){
    res.status(404).send()
  }
})
router.delete('/students/:id',async(req,res)=>{
   const _id = req.params.id
  const deleteData=await Student.findByIdAndDelete(_id)
  try{
  if(!_id){
 return   res.status(404)
    
  }else{
    res.send(deleteData)
  }
}
catch(e){
  res.status(400).send(e)
}
})

module.exports = router