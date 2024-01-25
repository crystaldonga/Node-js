const express = require('express')
const app = express()
require("../src/db/conn")

const MenRanking = require("../src/models/mens")
const port = process.env.PORT || 8000

app.use(express.json())
//handle post request
app.post("/mens",async(req,res)=>{
    try {
        const addingrecord = new MenRanking(req.body)
        const data =await addingrecord.save();
        res.status(201).send(data)

    } 
    catch (e) {
        res.status(400).send(e)
    }
})

app.get("/mens",async(req,res)=>{
    try {
       
        const getdata =await MenRanking.find().sort({"ranking":1});
        res.send(getdata)

    } 
    catch (e) {
        res.status(400).send(e)
    }
})

app.patch("/mens/:id",async(req,res)=>{
    try {
       const _id = req.params.id
        const updata =await MenRanking.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.send(updata)

    } 
    catch (e) {
        res.status(500).send(e)
    }
})
app.delete("/mens/:id",async(req,res)=>{
    try {
       const _id = req.params.id
        const deletdata =await MenRanking.findByIdAndDelete(_id)
       
        res.send(deletdata)

    } 
    catch (e) {
        res.status(500).send(e)
    }
})

app.listen(port,(req,res)=>{
    console.log("listing....")
})