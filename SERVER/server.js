const express = require("express");
const app = express();
const route = require("./routes")
const {connectdb,model} = require("./mongo");
const cors = require("cors")
const path = require("path");
app.use(cors())
function getted(){
    return model.db.readyState === 1
}
app.use("/",route)
app.get("/ping", (req, res) => {
    const ret = getted();
    const cra = ret?"successfully":"not successful";
    res.send(cra)
});
app.get("/test-results", (req, res) => {
    res.sendFile(path.join(__dirname, "test-results.json"));
  });
app.listen(5000, async() => {
    await connectdb(); 
    console.log("This is Express.js file.");
});


