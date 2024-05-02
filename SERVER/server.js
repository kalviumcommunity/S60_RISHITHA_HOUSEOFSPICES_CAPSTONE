const express = require("express");
const app = express();
const connectdb = require("./mongo");

app.get("/ping", (req, res) => {
    return res.send("connected");
});

app.listen(5000, () => {
    connectdb(); 
    console.log("This is Express.js file.");
});


