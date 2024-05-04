const express=require("express");
const spicesApp=express();
spicesApp.get("/get",(req,res)=>{
    res.send("This is a get.")
})
spicesApp.put("/put/:id",(req,res)=>{
    res.send("This is a put.")
})
spicesApp.post("/post",(req,res)=>{
    res.send("This  is a post.")
})
spicesApp.delete("/delete",(req,res)=>{
    res.send("This is a delete.")
})
module.exports=spicesApp;