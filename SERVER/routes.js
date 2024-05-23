const express=require("express");
const schema = require("./schemajoi")
const spicesApp=express();
spicesApp.get("/get",(req,res)=>{
    res.send("This is a get.")
})
spicesApp.put("/put/:id",(req,res)=>{
    res.send("This is a put.")
})
spicesApp.post("/post",(req,res)=>{
    const {error, value} = schema.validate(req.body)
    if(error){
        return res.json({message : "Invalid input", error : error.message})
    }
    res.send("This  is a post.")
})
spicesApp.delete("/delete/:key",(req,res)=>{
    const key = req.params.key;
    model.findByIdAndDelete(key)
    .then(e => res.json(e))
    .catch(error => res.status(404).json(error))
// spicesApp.delete("/delete",(req,res)=>{
//     res.send("This is a delete.")
})
module.exports=spicesApp;