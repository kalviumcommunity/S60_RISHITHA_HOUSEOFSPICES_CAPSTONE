const express=require("express");
const schema = require("./schemajoi")
const spicesApp=express();
const {model,clientModel} = require("./mongo")
spicesApp.use(express.json())
spicesApp.get("/get",(req,res)=>{
    model.find({})
    .then((a)=>{ 
        res.json({a});
    })
    .catch((err)=>{
        res.json({err});
    })
    // res.send("This is a get.")
})

// spicesApp.put("/put/:id",(req,res)=>{
//     res.send("This is a put.")
// })
spicesApp.put("/put/:key",(req,res)=>{
    const key = req.params.key;
    console.log(req.body)
    console.log(key)
    model.findByIdAndUpdate(key,{
    spice: req.body.cateory,
    image: req.body.image,
    health: req.body.health,
    commonAvailability: req.body.beauty,
    rarity: req.body.dos,
    }).then(()=>{res.send("done")})
})


spicesApp.post("/post", (req,res)=>{
    const {error, value} = schema.validate(req.body)
    if(error){
        return res.json({message : "Invalid input", error : error.message})
    }
    model.create(req.body)
    .then((ele)=>{
        res.json(ele)
    })
    .catch((err)=>{
        res.json(err)
    })
    // res.send("This  is a post.")
})
spicesApp.post("/sign", (req,res)=>{
    clientModel.create(req.body)
    .then((ele)=>{
        res.json(ele)
    })
    .catch((err)=>{
        console.log(err)
        res.json(err)
    })
})

spicesApp.get("/sign", (req,res)=>{
    clientModel.find({})
    .then((ele)=>{
        res.json(ele)
    })
    .catch((err)=>{
        console.log(err)
        res.json(err)
    })
})

spicesApp.post("/login", (req, res) => {
    const {name,email,pin} = req.body
    clientModel.findOne({email : email})
    .then(infro => {
        if(infro){
            if(infro.pin === pin && infro.name === name){
                res.json({message:"User Login"})

            }else{
                console.log("User detail did not match")
                res.json({message: "Invalid user details, Prefer to signup"})
            }
        }else{
            console.log("login failed")
            res.json({message: "Invalid user details, Prefer to signup"})
        }
    })
    .catch(error => {
        console.log(`Error: ${error.message}`);
        res.json({ message: "An error occurred during login" });
    });
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