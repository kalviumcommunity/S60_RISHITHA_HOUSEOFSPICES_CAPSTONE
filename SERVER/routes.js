const express = require('express');
const schema = require('./schemajoi');
const spicesApp = express();
const dot = require("dotenv");
const jwt=require("jsonwebtoken");
const { model, clientModle, userExperienceModel, SpicesCart } = require('./mongo');
<<<<<<< HEAD

=======
const nodemailer = require("nodemailer");
const { model, clientModle, userExperienceModel } = require('./mongo');
>>>>>>> origin/google
spicesApp.use(express.json());
dot.config();

const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
        user: "mohanavamsi16@outlook.com",
        pass: "fmyeynjakqxqxtsm",
    },
});

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
    .catch((err) => res.status(500).json({ message: 'Error updating data', error: err }));
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

spicesApp.post('/sign/post', (req, res) => {
    clientModle.create(req.body)
        .then((ele) => {
            transporter.sendMail({ from: "mohanavamsi16@outlook.com", to: req.body.email, subject: "welcome to House of spices", text: "hey welcome to house of spice family! 🙏" })
                .then(() => {
                    res.json(ele)
                })
        })
        .catch((err) => res.json(err));
});

spicesApp.get('/sign', (req, res) => {
    clientModle.find({})
        .then((ele) => res.json(ele))
        .catch((err) => res.json(err));
});

spicesApp.post('/login', (req, res) => {
    const { name, email, pin } = req.body;
    console.log(req.body);
    
    clientModle.findOne({ email: email })
        .then((info) => {
            if (info) {
                if (info.pin === pin && info.name === name) {
                    console.log("User authenticated");
                    console.log(info);
                    
                    const payload = {
                        User: {
                            id: info._id  // Correct reference to info, not userinfo
                        }
                    };

                    jwt.sign(payload, process.env.secretkey, { expiresIn: "30d" }, (error, jwtToken) => {
                        if (error) {
                            console.error("Error signing JWT:", error);  // Better error logging
                            return res.status(500).json({ message: "Error generating token" });
                        } else {
                            res.json({ message: "User Login", Token: jwtToken, name: info.name });
                        }
                    });

                } else {
                    res.status(400).json({ message: "Invalid user details, prefer to signup" });
                    console.log("User details incorrect");
                }
            } else {
                res.status(404).json({ message: "No user found, prefer to signup" });
                console.log("No user found");
            }
        })
        .catch((err) => {
            console.error("Error during login process:", err);  // Better logging for the error
            res.status(500).json({ message: "An error occurred during login", error: err.message });
        });
});


spicesApp.delete('/delete/:key', (req, res) => {
    const key = req.params.key;
    model.findByIdAndDelete(key)
        .then((e) => res.json(e))
        .catch((err) => res.status(404).json(err));
});

async function getcartdetails(req, res, next) {
    let cartitems;
    try {
        cartitems = await SpicesCart.findOne({ userid: req.params.userid }).populate('spices.id');
        if (cartitems == null) {
            return res.status(404).json({ message: "Cannot find a user" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.cartitems = cartitems;
    next();
}

spicesApp.get('/cart/get/:userid', getcartdetails, (req, res) => {
    res.json(res.cartitems);
});

spicesApp.post('/cart/post/:userid', async (req, res) => {
    const SpicesList = req.body.spices;
    console.log(req.body,"body")
    if (!Array.isArray(SpicesList)) {
        return res.status(400).json({ message: "Need in format of array" });
    }
    try {
        let spicecart = await SpicesCart.findOne({ userid: req.params.userid });
        if (!spicecart) {
            spicecart = new SpicesCart({
                userid: req.params.userid,
                spices: SpicesList
            });
        } else {
            SpicesList.forEach(({ id, Numberof }) => {
                const spicesid = spicecart.spices.findIndex(i => i.id.toString() === id);
                if (spicesid > -1) {
                    spicecart.spices[spicesid].Numberof += Numberof;
                } else {
                    spicecart.spices.push({ id, Numberof });
                }
            });
        }
        await spicecart.save();
        res.json(spicecart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = spicesApp;
module.exports = spicesApp;
