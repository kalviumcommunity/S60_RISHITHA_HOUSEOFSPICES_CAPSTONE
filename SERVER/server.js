const express = require("express");
const app = express();
const route = require("./routes")
const connectdb = require("./mongo");
app.use("/",route)
app.get("/ping", (req, res) => {
    return res.send("connected");
});

app.listen(5000, () => {
    connectdb(); 
    console.log("This is Express.js file.");
});


