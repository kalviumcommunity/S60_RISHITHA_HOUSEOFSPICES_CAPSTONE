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
spicesApp.delete("/delete",(req,res)=>{
    res.send("This is a delete.")
})
module.exports=spicesApp;