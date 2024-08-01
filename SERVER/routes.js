// const express=require("express");
// const schema = require("./schemajoi")
// const spicesApp=express();
// const {model,clientModle,userExperienceModel} = require("./mongo")
// spicesApp.use(express.json())
// spicesApp.get("/getfile",(req,res)=>{
//     userExperienceModel.find({})
//     .then((listexp)=>{res.json({listexp})})
//     .catch((err)=>{res.json({err})})
// })

// spicesApp.post("/postfile",async (req,res)=>{
//     userExperienceModel.create(req.body)
//     .then(data=>{res.json(data)})
//     .catch(err=>{res.json(err)})
// })
// spicesApp.delete("/deletefile/:id", async(req,res)=>{
//     const id=req.params.id;
//     userExperienceModel.findByIdAndDelete({_id : id})
//     .then(data=>{res.json(data)})
//     .catch(err=>{res.json(err)})
// })
// spicesApp.get("/get",(req,res)=>{
//     model.find({})
//     .then((a)=>{ 
//         res.json({a});
//     })
//     .catch((err)=>{
//         res.json({err});
//     })
//     // res.send("This is a get.")
// })

// // spicesApp.put("/put/:id",(req,res)=>{
// //     res.send("This is a put.")
// // })
// spicesApp.put('/put/:key', (req, res) => {
//     const key = req.params.key;
//     console.log(req.body);
//     console.log(key);
//     model.findByIdAndUpdate(key, {
//         spice: req.body.spice,
//         image: req.body.image,
//         health: req.body.health,
//         commonAvailability: req.body.commonAvailability,
//         rarity: req.body.rarity,
//     }).then(() => {
//         res.send('done');
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).send('Error updating data');
//     });
// });

// spicesApp.post("/post", (req,res)=>{
//     const {error, value} = schema.validate(req.body)
//     if(error){
//         return res.json({message : "Invalid input", error : error.message})
//     }
//     model.create(req.body)
//     .then((ele)=>{
//         res.json(ele)
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
//     // res.send("This  is a post.")
// })
// spicesApp.post("/sign", (req,res)=>{
//     clientModle.create(req.body)
//     .then((ele)=>{
//         res.json(ele)
//     })
//     .catch((err)=>{
//         console.log(err)
//         res.json(err)
//     })
// })

// spicesApp.get("/sign", (req,res)=>{
//     clientModle.find({})
//     .then((ele)=>{
//         res.json(ele)
//     })
//     .catch((err)=>{
//         console.log(err)
//         res.json(err)
//     })
// })

// spicesApp.post("/login", (req, res) => {
//     const {name,email,pin} = req.body
//     clientModle.findOne({email : email})
//     .then(infro => {
//         if(infro){
//             if(infro.pin === pin && infro.name === name){
//                 res.json({message:"User Login"})

//             }else{
//                 console.log("User detail did not match")
//                 res.json({message: "Invalid user details, Prefer to signup"})
//             }
//         }else{
//             console.log("login failed")
//             res.json({message: "Invalid user details, Prefer to signup"})
//         }
//     })
//     .catch(error => {
//         console.log(`Error: ${error.message}`);
//         res.json({ message: "An error occurred during login" });
//     });
// })

// spicesApp.delete("/delete/:key",(req,res)=>{
//     const key = req.params.key;
//     model.findByIdAndDelete(key)
//     .then(e => res.json(e))
//     .catch(error => res.status(404).json(error))
// // spicesApp.delete("/delete",(req,res)=>{
// //     res.send("This is a delete.")
// })
// module.exports=spicesApp;
const express = require('express');
const schema = require('./schemajoi');
const spicesApp = express();
const { model, clientModle, userExperienceModel } = require('./mongo');
spicesApp.use(express.json());

spicesApp.get('/getfile', (req, res) => {
    userExperienceModel.find({})
        .then((listexp) => res.json({ listexp }))
        .catch((err) => res.json({ err }));
});

spicesApp.post('/postfile', async (req, res) => {
    userExperienceModel.create(req.body)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

spicesApp.delete('/deletefile/:id', async (req, res) => {
    const id = req.params.id;
    userExperienceModel.findByIdAndDelete({ _id: id })
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

spicesApp.put('/updateExp/:id', (req, res) => {
    const id = req.params.id;
    userExperienceModel.findByIdAndUpdate(id, {
        review: req.body.review,
        image: req.body.image,
    })
    .then(() => res.json({ message: 'Update successful' }))
    .catch((err) => res.status(500).send('Error updating data'));
});

spicesApp.get('/get', (req, res) => {
    model.find({})
        .then((a) => res.json({ a }))
        .catch((err) => res.json({ err }));
});

spicesApp.put('/put/:key', (req, res) => {
    const key = req.params.key;
    model.findByIdAndUpdate(key, {
        spice: req.body.spice,
        image: req.body.image,
        health: req.body.health,
        commonAvailability: req.body.commonAvailability,
        rarity: req.body.rarity,
    })
    .then(() => res.send('done'))
    .catch((err) => res.status(500).send('Error updating data'));
});

spicesApp.post('/post', (req, res) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.json({ message: 'Invalid input', error: error.message });
    }
    model.create(req.body)
        .then((ele) => res.json(ele))
        .catch((err) => res.json(err));
});

spicesApp.post('/sign', (req, res) => {
    clientModle.create(req.body)
        .then((ele) => res.json(ele))
        .catch((err) => res.json(err));
});

spicesApp.get('/sign', (req, res) => {
    clientModle.find({})
        .then((ele) => res.json(ele))
        .catch((err) => res.json(err));
});

spicesApp.post('/login', (req, res) => {
    const { name, email, pin } = req.body;
    clientModle.findOne({ email: email })
        .then((info) => {
            if (info) {
                if (info.pin === pin && info.name === name) {
                    res.json({ message: "User Login" });
                } else {
                    res.json({ message: "Invalid user details, Prefer to signup" });
                }
            } else {
                res.json({ message: "Invalid user details, Prefer to signup" });
            }
        })
        .catch((err) => res.json({ message: "An error occurred during login" }));
});

spicesApp.delete('/delete/:key', (req, res) => {
    const key = req.params.key;
    model.findByIdAndDelete(key)
        .then((e) => res.json(e))
        .catch((err) => res.status(404).json(err));
});

module.exports = spicesApp;
